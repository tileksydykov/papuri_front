import 'quill/dist/quill.core.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.bubble.css'

export default app => {
    app.use(VueQuillEditor)
}

