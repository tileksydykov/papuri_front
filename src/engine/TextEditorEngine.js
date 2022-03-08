export const TextEditorEngine = {
    fromBlock(block) {
        return `text "${block.data.text}"`
    },
    toBlock(text) {
        return text
    }
}
