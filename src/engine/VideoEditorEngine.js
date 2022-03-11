import {uuidv4} from "@/store/repo/functions";

export const VideoEditorEngine = {
    fromBlock(block) {
        return `:video ${block.data.url}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "VideoEditor",
            data: {
                text
            }
        }
    }
}
