import {uuidv4} from "@/store/repo/functions";
import {Axios} from "../axios/axios";

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
    },
    fromBlockToHtml(block) {
        return `<img class="image" src="${
            Axios.generateMediaLink(block.data.imageId.slice(0, block.data.imageId.indexOf("-")))
        }" alt="desc"/>`
    }
}
