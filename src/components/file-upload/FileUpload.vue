<template lang="pug">
  span(:class='className')
  slot
  label(:for='forId')
  input(
    v-if='!reload'
    ref='input'
    type='file'
    :name='name'
    :id='forId'
    :accept='accept'
    :capture='capture'
    :disabled='disabled'
    :webkitdirectory='directory && features.directory' :allowdirs='directory && features.directory' :directory='directory && features.directory'
    :multiple='multiple && features.html5'
    @change='inputOnChange'
  )
</template>

<script>
import * as handler from "chunk/ChunkUploadHandler"

let __awaiter = function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

let __generator = function (thisArg, body) {
  let _ = { label: 0, sent() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
let __spreadArray =  (to, from, pack) => {
  if (pack || arguments.length === 2) for (let i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat( ar || Array.prototype.slice.call(from));
};
let CHUNK_DEFAULT_OPTIONS = {
  headers: {},
  action: '',
  minSize: 1048576,
  maxActive: 3,
  maxRetries: 5,
  handler,
};
export default {
  name: "Uploader",
  props: {
    inputId: {
      type: String,
    },
    name: {
      type: String,
      default: 'file',
    },
    accept: {
      type: String,
    },
    capture: {},
    disabled: {
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    maximum: {
      type: Number,
    },
    addIndex: {
      type: [Boolean, Number],
    },
    directory: {
      type: Boolean,
    },
    createDirectory: {
      type: Boolean,
      default: false
    },
    postAction: {
      type: String,
    },
    putAction: {
      type: String,
    },
    customAction: {
      type: Function
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    timeout: {
      type: Number,
      default: 0,
    },
    drop: {
      default: false,
    },
    dropDirectory: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 0,
    },
    extensions: {
      type: [RegExp, String, Array],
      default: () => {
        return [];
      },
    },
    modelValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
    thread: {
      type: Number,
      default: 1,
    },
    chunkEnabled: {
      type: Boolean,
      default: false
    },
    chunk: {
      type: Object,
      default: () => {
        return CHUNK_DEFAULT_OPTIONS;
      }
    }
  },
  emits: [
    'update:modelValue',
    'input-filter',
    'input-file',
  ],
  data() {
    return {
      files: this.modelValue,
      features: {
        html5: true,
        directory: false,
        drop: false,
      },
      active: false,
      dropActive: false,
      uploading: 0,
      destroy: false,
      maps: {},
      dropElement: null,
      reload: false,
    };
  },

  mounted() {
    let _this = this;
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    if (window.FormData && input.files) {
      if (typeof input.webkitdirectory === 'boolean' || typeof input.directory === 'boolean') {
        this.features.directory = true;
      }
      if (this.features.html5 && typeof input.ondrop !== 'undefined') {
        this.features.drop = true;
      }
    } else {
      this.features.html5 = false;
    }
    this.maps = {};
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        this.maps[file.id] = file;
      }
    }
    this.$nextTick(() => {
      if (_this.$parent) {
        _this.$parent.$forceUpdate();
        _this.$parent.$nextTick( () => {
          _this.watchDrop(_this.drop);
        });
      } else {
        _this.watchDrop(_this.drop);
      }
    });
  },

  beforeUnmount() {
    this.destroy = true;
    this.active = false;
    this.watchDrop(false);
    this.watchActive(false);
  },
  computed: {

    uploaded() {
      let file;
      for (let i = 0; i < this.files.length; i++) {
        file = this.files[i];
        if (file.fileObject && !file.error && !file.success) {
          return false;
        }
      }
      return true;
    },
    chunkOptions() {
      return Object.assign(CHUNK_DEFAULT_OPTIONS, this.chunk);
    },
    className() {
      return [
        'file-uploads',
        this.features.html5 ? 'file-uploads-html5' : 'file-uploads-html4',
        this.features.directory && this.directory ? 'file-uploads-directory' : undefined,
        this.features.drop && this.drop ? 'file-uploads-drop' : undefined,
        this.disabled ? 'file-uploads-disabled' : undefined,
      ];
    },
    forId() {
      return this.inputId || this.name;
    },
    iMaximum () {
      if (this.maximum === undefined) {
        return this.multiple ? 0 : 1;
      }
      return this.maximum;
    },
    iExtensions () {
      if (!this.extensions) {
        return;
      }
      if (this.extensions instanceof RegExp) {
        return this.extensions;
      }
      if (!this.extensions.length) {
        return;
      }
      let exts = [];
      if (typeof this.extensions === 'string') {
        exts = this.extensions.split(',');
      } else {
        exts = this.extensions;
      }
      exts = exts.map((value) => {
        return value.trim();
      }).filter((value) => {
        return value;
      });
      return new RegExp('\\.(' + exts.join('|').replace(/\./g, '\\.') + ')$', 'i');
    },
  },
  watch: {
    active (active) {
      this.watchActive(active);
    },
    dropActive () {
      if (this.$parent) {
        this.$parent.$forceUpdate();
      }
    },
    drop (value) {
      this.watchDrop(value);
    },
    modelValue (files) {
      if (this.files === files) {
        return;
      }
      this.files = files;
      let oldMaps = this.maps;
      this.maps = {};
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        this.maps[file.id] = file;
      }
      for (let key in this.maps) {
        let newFile = this.maps[key];
        let oldFile = oldMaps[key];
        if (newFile !== oldFile) {
          this.emitFile(newFile, oldFile);
        }
      }
      for (let key in oldMaps) {
        if (!this.maps[key]) {
          this.emitFile(undefined, oldMaps[key]);
        }
      }
    },
  },
  methods: {
    newId () {
      return Math.random().toString(36).substr(2);
    },
    clear () {
      if (this.files.length) {
        let files = this.files;
        this.files = [];
        this.maps = {};
        this.emitInput();
        for (let i = 0; i < files.length; i++) {
          this.emitFile(undefined, files[i]);
        }
      }
      return true;
    },
    get (id) {
      if (!id) {
        return false;
      }
      if (typeof id === 'object') {
        return this.maps[id.id || ''] || false;
      }
      return this.maps[id] || false;
    },
    add (_files, index) {
      let files;
      if (_files instanceof Array) {
        files = _files;
      } else {
        files = [_files];
      }
      if (index === undefined) {
        index = this.addIndex;
      }
      let addFiles = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (this.features.html5 && file instanceof Blob) {
          file = {
            id: '',
            file: file,
            size: file.size,
            name: file.webkitRelativePath || file.relativePath || file.name || 'unknown',
            type: file.type,
          };
        }
        let fileObject = false;
        if (file.fileObject === false) {
          // false
        } else if (file.fileObject) {
          fileObject = true;
        } else if (typeof Element !== 'undefined' && file.el instanceof HTMLInputElement) {
          fileObject = true;
        } else if (typeof Blob !== 'undefined' && file.file instanceof Blob) {
          fileObject = true;
        }
        if (fileObject) {
          file = Object.assign(Object.assign({
            fileObject: true,
            size: -1,
            name: 'Filename',
            type: '',
            active: false,
            error: '',
            success: false,
            putAction: this.putAction,
            postAction: this.postAction,
            timeout: this.timeout
          }, file), {response: {}, progress: '0.00', speed: 0});
          file.data = Object.assign(Object.assign({}, this.data), file.data ? file.data : {});
          file.headers = Object.assign(Object.assign({}, this.headers), file.headers ? file.headers : {});
        }
        if (!file.id) {
          file.id = this.newId();
        }
        if (this.emitFilter(file, undefined)) {
          continue;
        }
        if (this.iMaximum > 1 && (addFiles.length + this.files.length) >= this.iMaximum) {
          break;
        }
        addFiles.push(file);
        if (this.iMaximum === 1) {
          break;
        }
      }
      if (!addFiles.length) {
        return;
      }
      if (this.iMaximum === 1) {
        this.clear();
      }
      let newFiles;
      if (index === true || index === 0) {
        newFiles = addFiles.concat(this.files);
      } else if (index) {
        newFiles = this.files.concat([]);
        newFiles.splice.apply(newFiles, __spreadArray([index, 0], addFiles, false));
      } else {
        newFiles = this.files.concat(addFiles);
      }
      this.files = newFiles;
      let index2 = 0;
      if (index === true || index === 0) {
        index2 = 0;
      } else if (index) {
        if (index >= 0) {
          if ((index + addFiles.length) > this.files.length) {
            index2 = this.files.length - addFiles.length;
          } else {
            index2 = index;
          }
        } else {
          index2 = this.files.length - addFiles.length + index;
          if (index2 < 0) {
            index2 = 0;
          }
        }
      } else {
        index2 = this.files.length - addFiles.length;
      }
      addFiles = this.files.slice(index2, index2 + addFiles.length);
      for (let i = 0; i < addFiles.length; i++) {
        let file = addFiles[i];
        this.maps[file.id] = file;
      }
      this.emitInput();
      for (let i = 0; i < addFiles.length; i++) {
        this.emitFile(addFiles[i], undefined);
      }
      return _files instanceof Array ? addFiles : addFiles[0];
    },
    addInputFile (el) {
      let _this = this;
      let files = [];
      let entrys = el.webkitEntries || el.entries || undefined;
      if (entrys === null || entrys === void 0 ? void 0 : entrys.length) {
        return this.getFileSystemEntry(entrys).then(function (files) {
          return _this.add(files);
        });
      }
      if (el.files) {
        for (let i = 0; i < el.files.length; i++) {
          let file = el.files[i];
          files.push({
            id: '',
            size: file.size,
            name: file.webkitRelativePath || file.relativePath || file.name,
            type: file.type,
            file: file,
          });
        }
      } else {
        let names = el.value.replace(/\\/g, '/').split('/');
        if (!names || !names.length) {
          names = [el.value];
        }
        delete el.__vuex__;
        files.push({
          id: '',
          name: names[names.length - 1],
          el: el,
        });
      }
      return Promise.resolve(this.add(files));
    },
    addDataTransfer (dataTransfer) {
      let _this = this;
      let _a;
      if ((_a = dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.items) === null || _a === void 0 ? void 0 : _a.length) {
        let entrys = [];
        for (let i = 0; i < dataTransfer.items.length; i++) {
          let dataTransferTtem = dataTransfer.items[i];
          let entry = void 0;
          if (dataTransferTtem.getAsEntry) {
            entry = dataTransferTtem.getAsEntry() || dataTransferTtem.getAsFile();
          } else if (dataTransferTtem.webkitGetAsEntry) {
            entry = dataTransferTtem.webkitGetAsEntry() || dataTransferTtem.getAsFile();
          } else {
            entry = dataTransferTtem.getAsFile();
          }
          if (entry) {
            entrys.push(entry);
          }
        }
        return this.getFileSystemEntry(entrys).then( (files) => {
          return _this.add(files);
        });
      }
      let maximumValue = this.iMaximum;
      let files = [];
      if (dataTransfer.files.length) {
        for (let i = 0; i < dataTransfer.files.length; i++) {
          files.push(dataTransfer.files[i]);
          if (maximumValue > 0 && files.length >= maximumValue) {
            break;
          }
        }
        return Promise.resolve(this.add(files));
      }
      return Promise.resolve([]);
    },
    getFileSystemEntry (entry, path) {
      let _this = this;
      if (path === void 0) {
        path = '';
      }
      return new Promise(function (resolve) {
        let maximumValue = _this.iMaximum;
        if (!entry) {
          resolve([]);
          return;
        }
        if (entry instanceof Array) {
          let uploadFiles_1 = [];
          let forEach_1 = (i) => {
            let v = entry[i];
            if (!v || (maximumValue > 0 && uploadFiles_1.length >= maximumValue)) {
              return resolve(uploadFiles_1);
            }
            _this.getFileSystemEntry(v, path).then((results) => {
              uploadFiles_1.push.apply(uploadFiles_1, results);
              forEach_1(i + 1);
            });
          };
          forEach_1(0);
          return;
        }
        if (entry instanceof Blob) {
          resolve([
            {
              id: '',
              size: entry.size,
              name: path + entry.name,
              type: entry.type,
              file: entry,
            }
          ]);
          return;
        }
        if (entry.isFile) {
          let fileEntry = entry;
          fileEntry.file(function (file) {
            resolve([
              {
                id: '',
                size: file.size,
                name: path + file.name,
                type: file.type,
                file: file,
              }
            ]);
          });
          return;
        }
        if (entry.isDirectory && _this.dropDirectory) {
          let directoryEntry_1 = entry;
          let uploadFiles_2 = [];
          if (_this.createDirectory) {
            uploadFiles_2.push({
              id: '',
              name: path + directoryEntry_1.name,
              size: 0,
              type: 'text/directory',
              file: new File([], path + directoryEntry_1.name, {type: 'text/directory'}),
            });
          }
          let dirReader_1 = directoryEntry_1.createReader();
          let readEntries_1 =  () => {
            dirReader_1.readEntries( (entries) => {
              let forEach =  (i) => {
                if ((!entries[i] && i === 0) || (maximumValue > 0 && uploadFiles_2.length >= maximumValue)) {
                  return resolve(uploadFiles_2);
                }
                if (!entries[i]) {
                  return readEntries_1();
                }
                _this.getFileSystemEntry(entries[i], path + directoryEntry_1.name + '/').then( (results) => {
                  uploadFiles_2.push.apply(uploadFiles_2, results);
                  forEach(i + 1);
                });
              };
              forEach(0);
            });
          };
          readEntries_1();
          return;
        }
        resolve([]);
      });
    },
    // 替换
    replace (id1, id2) {
      let file1 = this.get(id1);
      let file2 = this.get(id2);
      if (!file1 || !file2 || file1 === file2) {
        return false;
      }
      let files = this.files.concat([]);
      let index1 = files.indexOf(file1);
      let index2 = files.indexOf(file2);
      if (index1 === -1 || index2 === -1) {
        return false;
      }
      files[index1] = file2;
      files[index2] = file1;
      this.files = files;
      this.emitInput();
      return true;
    },
    remove (id) {
      let file = this.get(id);
      if (file) {
        if (this.emitFilter(undefined, file)) {
          return false;
        }
        let files = this.files.concat([]);
        let index = files.indexOf(file);
        if (index === -1) {
          console.error('remove', file);
          return false;
        }
        files.splice(index, 1);
        this.files = files;
        delete this.maps[file.id];
        this.emitInput();
        this.emitFile(undefined, file);
      }
      return file;
    },
    update (id, data) {
      let file = this.get(id);
      if (file) {
        let newFile = Object.assign(Object.assign({}, file), data);
        if (file.fileObject && file.active && !newFile.active && !newFile.error && !newFile.success) {
          newFile.error = 'abort';
        }
        if (this.emitFilter(newFile, file)) {
          return false;
        }
        let files = this.files.concat([]);
        let index = files.indexOf(file);
        if (index === -1) {
          console.error('update', file);
          return false;
        }
        files.splice(index, 1, newFile);
        this.files = files;
        newFile = this.files[index];
        delete this.maps[file.id];
        this.maps[newFile.id] = newFile;
        this.emitInput();
        this.emitFile(newFile, file);
        return newFile;
      }
      return false;
    },
    emitFilter (newFile, oldFile) {
      let isPrevent = false;
      this.$emit('input-filter', newFile, oldFile,  (prevent) => {
        if (prevent === void 0) {
          prevent = true;
        }
        isPrevent = prevent;
        return isPrevent;
      });
      return isPrevent;
    },
    emitFile (newFile, oldFile) {
      let _this = this;
      this.$emit('input-file', newFile, oldFile);
      if ((newFile === null || newFile === void 0 ? void 0 : newFile.fileObject) && newFile.active && (!oldFile || !oldFile.active)) {
        this.uploading++;
        this.$nextTick( () => {
          setTimeout( () => {
            newFile && _this.upload(newFile).then( () => {
              if (newFile) {
                newFile = _this.get(newFile) || undefined;
              }
              if (newFile === null || newFile === void 0 ? void 0 : newFile.fileObject) {
                _this.update(newFile, {
                  active: false,
                  success: !newFile.error
                });
              }
            }).catch((e) => {
              newFile && _this.update(newFile, {
                active: false,
                success: false,
                error: e.code || e.error || e.message || e
              });
            });
          }, Math.ceil(Math.random() * 50 + 50));
        });
      } else if ((!newFile || !newFile.fileObject || !newFile.active) && oldFile && oldFile.fileObject && oldFile.active) {
        // 停止
        this.uploading--;
      }
      // 自动延续激活
      // @ts-ignore
      if (this.active && (Boolean(newFile) !== Boolean(oldFile) || newFile.active !== oldFile.active)) {
        this.watchActive(true);
      }
    },
    emitInput () {
      this.$emit('update:modelValue', this.files);
    },
    // 上传
    upload (id) {
      let file = this.get(id);
      // 被删除
      if (!file) {
        return Promise.reject(new Error('not_exists'));
      }
      // 不是文件对象
      if (!file.fileObject) {
        return Promise.reject(new Error('file_object'));
      }
      // 有错误直接响应
      if (file.error) {
        if (file.error instanceof Error) {
          return Promise.reject(file.error);
        }
        return Promise.reject(new Error(file.error));
      }
      // 已完成直接响应
      if (file.success) {
        return Promise.resolve(file);
      }
      // 后缀
      if (file.name && this.iExtensions) {
        if (file.name.search(this.iExtensions) === -1) {
          return Promise.reject(new Error('extension'));
        }
      }
      // 大小
      if (this.size > 0 && file.size !== undefined && file.size >= 0 && file.size > this.size) {
        return Promise.reject(new Error('size'));
      }
      if (this.customAction) {
        return this.customAction(file, this);
      }
      if (this.features.html5) {
        if (this.shouldUseChunkUpload(file)) {
          return this.uploadChunk(file);
        }
        if (file.putAction) {
          return this.uploadPut(file);
        }
        if (file.postAction) {
          return this.uploadHtml5(file);
        }
      }
      if (file.postAction) {
        return this.uploadHtml4(file);
      }
      return Promise.reject(new Error('No action configured'));
    },

    shouldUseChunkUpload: (file) => {
      return this.chunkEnabled &&
          !!this.chunkOptions.handler &&
          file.size && file.size > this.chunkOptions.minSize;
    },

    uploadChunk: (file) => {
      let HandlerClass = this.chunkOptions.handler;
      file.chunk = new HandlerClass(file, this.chunkOptions);
      return file.chunk.upload().then(() => {
        return file;
      });
    },
    uploadPut: (file) => {
      let querys = [];
      let value;
      for (let key in file.data) {
        value = file.data[key];
        if (value !== null && value !== undefined) {
          querys.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
      }
      let putAction = file.putAction || '';
      let queryString = querys.length ? (putAction.indexOf('?') === -1 ? '?' : '&') + querys.join('&') : '';
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', putAction + queryString);
      return this.uploadXhr(xhr, file, file.file);
    },
    uploadHtml5: (file) => {
      let form = new window.FormData();
      let value;
      for (let key in file.data) {
        value = file.data[key];
        if (value && typeof value === 'object' && typeof value.toString !== 'function') {
          if (value instanceof File) {
            form.append(key, value, value.name);
          } else {
            form.append(key, JSON.stringify(value));
          }
        } else if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      }
      form.append(this.name, file.file, file.file.name || file.file.filename || file.name);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', file.postAction || '');
      return this.uploadXhr(xhr, file, form);
    },
    uploadXhr (xhr, ufile, body) {
      let _this = this;
      let file = ufile;
      let speedTime = 0;
      let speedLoaded = 0;
      xhr.upload.onprogress = (e) => {
        if (!file) {
          return;
        }
        file = _this.get(file);
        if (!e.lengthComputable || !file || !file.fileObject || !file.active) {
          return;
        }
        let speedTime2 = Math.round(Date.now() / 1000);
        if (speedTime2 === speedTime) {
          return;
        }
        speedTime = speedTime2;
        file = _this.update(file, {
          progress: (e.loaded / e.total * 100).toFixed(2),
          speed: e.loaded - speedLoaded,
        });
        speedLoaded = e.loaded;
      };
      let interval = window.setInterval( () => {
        if (file) {
          if ((file = _this.get(file))) {
            if ((file === null || file === void 0 ? void 0 : file.fileObject) && !file.success && !file.error && file.active) {
              return;
            }
          }
        }
        if (interval) {
          clearInterval(interval);
          interval = undefined;
        }
        try {
          xhr.abort();
          xhr.timeout = 1;
        } catch (e) {
          // error
        }
      }, 100);
      return new Promise( (resolve, reject) => {
        if (!file) {
          reject(new Error('not_exists'));
          return;
        }
        let complete;
        let fn = (e) => {
          if (complete) {
            return;
          }
          complete = true;
          if (interval) {
            clearInterval(interval);
            interval = undefined;
          }
          if (!file) {
            return reject(new Error('not_exists'));
          }
          file = _this.get(file);
          if (!file) {
            return reject(new Error('not_exists'));
          }
          if (!file.fileObject) {
            return reject(new Error('file_object'));
          }
          if (file.error) {
            if (file.error instanceof Error) {
              return reject(file.error);
            }
            return reject(new Error(file.error));
          }
          if (!file.active) {
            return reject(new Error('abort'));
          }
          if (file.success) {
            return resolve(file);
          }
          let data = {};
          switch (e.type) {
            case 'timeout':
            case 'abort':
              data.error = e.type;
              break;
            case 'error':
              if (!xhr.status) {
                data.error = 'network';
              } else if (xhr.status >= 500) {
                data.error = 'server';
              } else if (xhr.status >= 400) {
                data.error = 'denied';
              }
              break;
            default:
              if (xhr.status >= 500) {
                data.error = 'server';
              } else if (xhr.status >= 400) {
                data.error = 'denied';
              } else {
                data.progress = '100.00';
              }
          }
          if (xhr.responseText) {
            let contentType = xhr.getResponseHeader('Content-Type');
            if (contentType && contentType.indexOf('/json') !== -1) {
              data.response = JSON.parse(xhr.responseText);
            } else {
              data.response = xhr.responseText;
            }
          }
          file = _this.update(file, data);
          if (!file) {
            return reject(new Error('abort'));
          }
          if (file.error) {
            if (file.error instanceof Error) {
              return reject(file.error);
            }
            return reject(new Error(file.error));
          }
          return resolve(file);
        };
        xhr.onload = fn;
        xhr.onerror = fn;
        xhr.onabort = fn;
        xhr.ontimeout = fn;
        if (file.timeout) {
          xhr.timeout = file.timeout;
        }
        for (let key in file.headers) {
          xhr.setRequestHeader(key, file.headers[key]);
        }
        file = _this.update(file, {xhr: xhr});
        file && xhr.send(body);
      });
    },
    uploadHtml4 (ufile) {
      let _this = this;
      let file = ufile;
      if (!file) {
        return Promise.reject(new Error('not_exists'));
      }
      let onKeydown = (e) => {
        if (e.keyCode === 27) {
          e.preventDefault();
        }
      };
      let iframe = document.createElement('iframe');
      iframe.id = 'upload-iframe-' + file.id;
      iframe.name = 'upload-iframe-' + file.id;
      iframe.src = 'about:blank';
      iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;');
      let form = document.createElement('form');
      form.setAttribute('action', file.postAction || '');
      form.name = 'upload-form-' + file.id;
      form.setAttribute('method', 'POST');
      form.setAttribute('target', 'upload-iframe-' + file.id);
      form.setAttribute('enctype', 'multipart/form-data');
      for (let key in file.data) {
        let value = file.data[key];
        if (value && typeof value === 'object' && typeof value.toString !== 'function') {
          value = JSON.stringify(value);
        }
        if (value !== null && value !== undefined) {
          let el = document.createElement('input');
          el.type = 'hidden';
          el.name = key;
          el.value = value;
          form.appendChild(el);
        }
      }
      form.appendChild(file.el);
      document.body.appendChild(iframe).appendChild(form);
      let getResponseData = () => {
        let doc;
        try {
          if (iframe.contentWindow) {
            doc = iframe.contentWindow.document;
          }
        } catch (err) {
          // error
        }
        if (!doc) {
          try {
            doc = iframe.contentDocument ? iframe.contentDocument : iframe.document;
          } catch (err) {
            doc = iframe.document;
          }
        }
        if (doc === null || doc === void 0 ? void 0 : doc.body) {
          return doc.body.innerHTML;
        }
        return null;
      };
      return new Promise( (resolve, reject) => {
        setTimeout( () => {
          if (!file) {
            reject(new Error('not_exists'));
            return;
          }
          file = _this.update(file, {iframe: iframe});
          if (!file) {
            return reject(new Error('not_exists'));
          }
          let interval = window.setInterval( () => {
            if (file) {
              if ((file = _this.get(file))) {
                if (file.fileObject && !file.success && !file.error && file.active) {
                  return;
                }
              }
            }
            if (interval) {
              clearInterval(interval);
              interval = undefined;
            }
            iframe.onabort({type: file ? 'abort' : 'not_exists'});
          }, 100);
          let complete;
          let fn = (e) => {
            if (complete) {
              return;
            }
            complete = true;
            if (interval) {
              clearInterval(interval);
              interval = undefined;
            }
            document.body.removeEventListener('keydown', onKeydown);
            if (!file) {
              return reject(new Error('not_exists'));
            }
            file = _this.get(file);
            if (!file) {
              return reject(new Error('not_exists'));
            }
            if (!file.fileObject) {
              return reject(new Error('file_object'));
            }
            if (file.error) {
              if (file.error instanceof Error) {
                return reject(file.error);
              }
              return reject(new Error(file.error));
            }
            if (!file.active) {
              return reject(new Error('abort'));
            }
            if (file.success) {
              return resolve(file);
            }
            let response = getResponseData();
            let data = {};
            if (typeof e === 'string') {
              return reject(new Error(e));
            }
            switch (e.type) {
              case 'abort':
                data.error = 'abort';
                break;
              case 'error':
                if (file.error) {
                  data.error = file.error;
                } else if (response === null) {
                  data.error = 'network';
                } else {
                  data.error = 'denied';
                }
                break;
              default:
                if (file.error) {
                  data.error = file.error;
                } else if (response === null) {
                  data.error = 'network';
                } else {
                  data.progress = '100.00';
                }
            }
            if (response !== null) {
              if (response && response.substr(0, 1) === '{' && response.substr(response.length - 1, 1) === '}') {
                try {
                  response = JSON.parse(response);
                } catch (err) {
                  // error
                }
              }
              data.response = response;
            }
            file = _this.update(file, data);
            if (!file) {
              return reject(new Error('not_exists'));
            }
            if (file === null || file === void 0 ? void 0 : file.error) {
              if (file.error instanceof Error) {
                return reject(file.error);
              }
              return reject(new Error(file.error));
            }
            return resolve(file);
          };
          iframe.onload = fn;
          iframe.onerror = fn;
          iframe.onabort = fn;
          document.body.addEventListener('keydown', onKeydown);
          form.submit();
        }, 50);
      }).then( (res) => {
        let _a;
        (_a = iframe === null || iframe === void 0 ? void 0 : iframe.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(iframe);
        return res;
      }).catch( (res) => {
        let _a;
        (_a = iframe === null || iframe === void 0 ? void 0 : iframe.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(iframe);
        return res;
      });
    },
    watchActive (active) {
      let file;
      let index = 0;
      while ((file = this.files[index])) {
        index++;
        if (!file.fileObject) {
          // empty
        } else if (active && !this.destroy) {
          if (this.uploading >= this.thread || (this.uploading && !this.features.html5)) {
            break;
          }
          if (!file.active && !file.error && !file.success) {
            this.update(file, {active: true});
          }
        } else {
          if (file.active) {
            this.update(file, {active: false});
          }
        }
      }
      if (this.uploading === 0) {
        this.active = false;
      }
    },
    watchDrop (newDrop, oldDrop) {
      if (oldDrop === void 0) {
        oldDrop = undefined;
      }
      if (!this.features.drop) {
        return;
      }
      if (newDrop === oldDrop) {
        return;
      }
      if (this.dropElement) {
        try {
          document.removeEventListener('dragenter', this.onDragenter, false);
          document.removeEventListener('dragleave', this.onDragleave, false);
          document.removeEventListener('drop', this.onDocumentDrop, false);
          this.dropElement.removeEventListener('dragover', this.onDragover, false);
          this.dropElement.removeEventListener('drop', this.onDrop, false);
        } catch (e) {
          // error
        }
      }
      let el = null;
      if (!newDrop) {
        // empty
      } else if (typeof newDrop === 'string') {
        el = document.querySelector(newDrop) || this.$root.$el.querySelector(newDrop);
      } else if (newDrop === true) {
        el = this.$parent.$el;
      } else {
        el = newDrop;
      }
      this.dropElement = el;
      if (this.dropElement) {
        document.addEventListener('dragenter', this.onDragenter, false);
        document.addEventListener('dragleave', this.onDragleave, false);
        document.addEventListener('drop', this.onDocumentDrop, false);
        this.dropElement.addEventListener('dragover', this.onDragover, false);
        this.dropElement.addEventListener('drop', this.onDrop, false);
      }
    },
    onDragenter (e) {
      let _a, _b;
      e.preventDefault();
      if (this.dropActive) {
        return;
      }
      if (!e.dataTransfer) {
        return;
      }
      let dt = e.dataTransfer;
      if ((_a = dt === null || dt === void 0 ? void 0 : dt.files) === null || _a === void 0 ? void 0 : _a.length) {
        this.dropActive = true;
      } else if (!dt.types) {
        this.dropActive = true;
      } else if (dt.types.indexOf && dt.types.indexOf('Files') !== -1) {
        this.dropActive = true;
      } else if (((_b = dt.types) === null || _b === void 0 ? void 0 : _b.contains) && dt.types.contains('Files')) {
        this.dropActive = true;
      }
    },
    onDragleave (e) {
      e.preventDefault();
      if (!this.dropActive) {
        return;
      }
      if (e.target.nodeName === 'HTML' || e.target === e.explicitOriginalTarget || (!e.fromElement && (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight))) {
        this.dropActive = false;
      }
    },
    onDragover (e) {
      e.preventDefault();
    },
    onDocumentDrop () {
      this.dropActive = false;
    },
    onDrop (e) {
      e.preventDefault();
      e.dataTransfer && this.addDataTransfer(e.dataTransfer);
    },
    inputOnChange (e) {
      return __awaiter(this, void 0, void 0,  () => {
        let reinput;
        let _this = this;
        return __generator(this, () => {
          if (!(e.target instanceof HTMLInputElement)) {
            return [2 , Promise.reject(new Error("not HTMLInputElement"))];
          }
          e.target;
          reinput =  (res) => {
            _this.reload = true;
            _this.$nextTick( () => {
              _this.reload = false;
            });
            return res;
          };
          return [2 , this.addInputFile(e.target).then(reinput).catch(reinput)];
        });
      });
    },
  },
};
</script>

<style lang="stylus">
.file-uploads
  overflow hidden
  position relative
  text-align center
  display inline-block

.file-uploads.file-uploads-html4 input, .file-uploads.file-uploads-html5 label
  background #fff
  opacity 0
  font-size 20em
  z-index 1
  top 0
  left 0
  right 0
  bottom 0
  position absolute
  width 100%
  height 100%

.file-uploads.file-uploads-html5 input, .file-uploads.file-uploads-html4 label
  background rgba(255, 255, 255, 0)
  overflow hidden
  position fixed
  width 1px
  height 1px
  z-index -1
  opacity 0
</style>
