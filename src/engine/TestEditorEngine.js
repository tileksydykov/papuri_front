import {uuidv4} from "@/store/repo/functions";

export const TestEditorEngine = {
    fromBlock(block) {
        let options = ''
        block.data.options.forEach(opt => {
            options += `\n* ${opt}`
        })
        return `:test ${block.data.title}${options}`
    },
    toBlock(text) {
        const testParts = text.split("\n")
        const title = testParts.length > 0 ? testParts[0].replace(":test ", ''): ''
        return {
            id: uuidv4(),
            container: "TestEditor",
            data: {
                title,
                options: testParts.slice(1).map(opt => opt.slice(2))
            }
        }
    },
    fromBlockToHtml(block) {
        return block
    }
}
