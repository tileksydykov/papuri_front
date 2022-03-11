import {uuidv4} from "@/store/repo/functions";

export const AudioEditorEngine = {
    fromBlock(block) {
        return `:audio ${block.data.url}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "AudioEditor",
            data: {
                text
            }
        }
    }
}
