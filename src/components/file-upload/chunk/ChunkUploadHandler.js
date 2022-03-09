import {
  default as request,
  createRequest,
  sendFormRequest
} from '../utils/request'

export default class ChunkUploadHandler {

  constructor(file, options) {
    this.file = file
    this.options = options
    this.chunks = []
    this.sessionId = null
    this.chunkSize = null
    this.speedInterval = null
  }

  get maxRetries() {
    return parseInt(this.options.maxRetries, 10)
  }

  get maxActiveChunks() {
    return parseInt(this.options.maxActive, 10)
  }

  get fileType() {
    return this.file.type
  }

  get fileSize() {
    return this.file.size
  }

  get fileName() {
    return this.file.name
  }

  get action() {
    return this.options.action || null
  }

  get startBody() {
    return this.options.startBody || {}
  }

  get uploadBody() {
    return this.options.uploadBody || {}
  }

  get finishBody() {
    return this.options.finishBody || {}
  }

  get headers() {
    return this.options.headers || {}
  }

  get readyToUpload() {
    return !!this.chunks
  }

  get progress() {
    const completedProgress = (this.chunksUploaded.length / this.chunks.length) * 100
    const uploadingProgress = this.chunksUploading.reduce((progress, chunk) => {
      return progress + ((chunk.progress | 0) / this.chunks.length)
    }, 0)

    return Math.min(completedProgress + uploadingProgress, 100)
  }
  get chunksToUpload() {
    return this.chunks.filter(chunk => {
      return !chunk.active && !chunk.uploaded
    })
  }

  get hasChunksToUpload() {
    return this.chunksToUpload.length > 0
  }

  get chunksUploading() {
    return this.chunks.filter(chunk => {
      return !!chunk.xhr && !!chunk.active
    })
  }

  get chunksUploaded() {
    return this.chunks.filter(chunk => {
      return !!chunk.uploaded
    })
  }

  createChunks() {
    this.chunks = []

    let start = 0
    let end = this.chunkSize
    while (start < this.fileSize) {
      this.chunks.push({
        blob: this.file.file.slice(start, end),
        startOffset: start,
        active: false,
        retries: this.maxRetries
      })
      start = end
      end = start + this.chunkSize
    }
  }

  updateFileProgress() {
    this.file.progress = this.progress
  }

  pause() {
    this.file.active = false
    this.stopChunks()
  }

  stopChunks() {
    this.chunksUploading.forEach(chunk => {
      chunk.xhr.abort()
      chunk.active = false
    })

    this.stopSpeedCalc()
  }

  resume() {
    this.file.active = true
    this.startChunking()
  }

  upload() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.start()

    return this.promise
  }

  start() {
    request({
      method: 'POST',
      headers: { ...this.headers, 'Content-Type': 'application/json'},
      url: this.action,
      body: Object.assign(this.startBody, {
        phase: 'start',
        mime_type: this.fileType,
        size: this.fileSize,
        name: this.fileName
      })
    }).then(res => {
      if (res.status !== 'success') {
        this.file.response = res
        return this.reject('server')
      }

      this.sessionId = res.data.session_id
      this.chunkSize = res.data.end_offset

      this.createChunks()
      this.startChunking()
    }).catch(res => {
      this.file.response = res
      this.reject('server')
    })
  }

  startChunking() {
    for (let i = 0; i < this.maxActiveChunks; i++) {
      this.uploadNextChunk()
    }

    this.startSpeedCalc()
  }

  uploadNextChunk() {
    if (this.file.active) {
      if (this.hasChunksToUpload) {
        return this.uploadChunk(this.chunksToUpload[0])
      }

      if (this.chunksUploading.length === 0) {
        return this.finish()
      }
    }
  }

  uploadChunk(chunk) {
    chunk.progress = 0
    chunk.active = true
    this.updateFileProgress()
    chunk.xhr = createRequest({
      method: 'POST',
      headers: this.headers,
      url: this.action
    })

    chunk.xhr.upload.addEventListener('progress', function (evt) {
      if (evt.lengthComputable) {
        chunk.progress = Math.round(evt.loaded / evt.total * 100)
      }
    }, false)

    sendFormRequest(chunk.xhr, Object.assign(this.uploadBody, {
      phase: 'upload',
      session_id: this.sessionId,
      start_offset: chunk.startOffset,
      chunk: chunk.blob
    })).then(res => {
      chunk.active = false
      if (res.status === 'success') {
        chunk.uploaded = true
      } else {
        if (chunk.retries-- <= 0) {
          this.stopChunks()
          return this.reject('upload')
        }
      }

      this.uploadNextChunk()
    }).catch(() => {
      chunk.active = false
      if (chunk.retries-- <= 0) {
        this.stopChunks()
        return this.reject('upload')
      }

      this.uploadNextChunk()
    })
  }

  finish() {
    this.updateFileProgress()
    this.stopSpeedCalc()

    request({
      method: 'POST',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      url: this.action,
      body: Object.assign(this.finishBody, {
        phase: 'finish',
        session_id: this.sessionId
      })
    }).then(res => {
      this.file.response = res
      if (res.status !== 'success') {
        return this.reject('server')
      }

      this.resolve(res)
    }).catch(res => {
      this.file.response = res
      this.reject('server')
    })
  }

  startSpeedCalc() {
    this.file.speed = 0
    let lastUploadedBytes = 0
    if (!this.speedInterval) {
      this.speedInterval = window.setInterval(() => {
        let uploadedBytes = (this.progress / 100) * this.fileSize
        this.file.speed = (uploadedBytes - lastUploadedBytes)
        lastUploadedBytes = uploadedBytes
      }, 1000)
    }
  }

  stopSpeedCalc() {
    this.speedInterval && window.clearInterval(this.speedInterval)
    this.speedInterval = null
    this.file.speed = 0
  }
}
