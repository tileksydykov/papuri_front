export const ImageEditorEngine = {
    fromBlock(block) {
        return `image ${block.data.url}`
    },
    toBlock(text) {
        return text
    }
}
