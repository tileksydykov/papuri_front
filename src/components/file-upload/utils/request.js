
export const createRequest = (options) => {
  const xhr = new XMLHttpRequest()
  xhr.open(options.method || 'GET', options.url)
  xhr.responseType = 'json'
  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key])
    })
  }

  return xhr
}

export const sendRequest = (xhr, body) => {
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response
        try {
          response = JSON.parse(xhr.response)
        } catch (err) {
          response = xhr.response
        }
        resolve(response)
      } else {
        reject(xhr.response)
      }
    }
    xhr.onerror = () => reject(xhr.response)
    xhr.send(JSON.stringify(body))
  })
}

export const sendFormRequest = (xhr, data) => {
  const body = new FormData()
  for (let name in data) {
    body.append(name, data[name])
  }

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response
        try {
          response = JSON.parse(xhr.response)
        } catch (err) {
          response = xhr.response
        }
        resolve(response)
      } else {
        reject(xhr.response)
      }
    }
    xhr.onerror = () => reject(xhr.response)
    xhr.send(body)
  })
}

export default function (options) {
  const xhr = createRequest(options)

  return sendRequest(xhr, options.body)
}
