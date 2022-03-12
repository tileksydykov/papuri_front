import {uuidv4} from "@/store/repo/functions";

export const ImageEditorEngine = {
    fromBlock(block) {
        return `:image ${block.data.imageId}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "ImageEditor",
            data: {
                imageId: text.slice(text.indexOf(" ")+1)
            }
        }
    }
}
