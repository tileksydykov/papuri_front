import {uuidv4} from "@/store/repo/functions";

export const KatexAdapter = {
    fromBlock(block) {
        return ':katex ' + block.data.text
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "Katex",
            data: {
                text: text.slice(text.indexOf(" ")+1)
            }
        }
    },
    fromBlockToHtml(block) {
        return block.data.text
    },
}
