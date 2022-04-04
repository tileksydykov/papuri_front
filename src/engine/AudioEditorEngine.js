import {uuidv4} from "@/store/repo/functions";

export const AudioEditorEngine = {
    fromBlock(block) {
        return `:audio ${block.data.id}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "AudioEditor",
            data: {
                id: text.slice(text.indexOf(" ")+1)
            }
        }
    },
    fromBlockToHtml(block) {
        return block
    }
}
