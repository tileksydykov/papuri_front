import {uuidv4} from "@/store/repo/functions";

export const ImageEditorEngine = {
    fromBlock(block) {
        return `:image ${block.data.url}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "ImageEditor",
            data: {
                text
            }
        }
    }
}
