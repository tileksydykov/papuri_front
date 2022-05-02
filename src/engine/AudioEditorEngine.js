import {uuidv4} from "@/store/repo/functions";
import {Axios} from "../axios/axios";

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
        return `<audio controls> <source src="${
            Axios.generateMediaLink(block.data.id.slice(0, block.data.id.indexOf("-")))
        }"> </audio>`
    }
}
