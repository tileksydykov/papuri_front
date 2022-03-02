
export default {
    name: 'eraser',
    icon: 'fa fa-eraser',
    i18n: 'eraser',
    handler(editor) {
        editor.execCommand('removeFormat')
    }
}
