import {uuidv4} from "@/store/repo/functions";

export const VideoEditorEngine = {
    fromBlock(block) {
        return `:video ${block.data.id}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "VideoEditor",
            data: {
                id: text.slice(text.indexOf(" ")+1)
            }
        }
    }
}
