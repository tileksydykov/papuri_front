import adapters from './adapters'
import blockinfo from "./blockinfo";

export const Engine = {
    fromObjectToJson(obj) {
        return JSON.stringify(obj)
    },
    fromBlockToHtml(blocks) {
        let text = ''
        blocks.forEach(block => {
            text += adapters[block.container + 'Adapter'].fromBlockToHtml(block) + '\n\n'
        })
        return text;
    },
    fromBlocksToText(blocks){
        let text = ''
        blocks.forEach(block => {
            text += adapters[block.container + 'Adapter'].fromBlock(block) + '\n\n'
        })
        return text;
    },
    fromTextToBlocks(text){
        let blocks = []
        if (!text) {
            return
        }
        if (text.slice(-2) === "\n\n"){
            text = text.slice(0, -2)
        }
        text.split('\n\n').forEach(textPiece => {
            if (textPiece.charAt(0) !== ':') {
                blocks.push(adapters['TextAdapter'].toBlock(textPiece))
            } else {
                const blockName = textPiece.slice(1, textPiece.indexOf(" "))
                if(blockinfo[blockName] && blockinfo[blockName].adapter){
                    const adapterName = blockinfo[blockName].adapter
                    blocks.push(adapters[adapterName].toBlock(textPiece))
                } else {
                   console.warn("[papuri] you are using adapter which is not available in this version")
                }
            }
        })
        return blocks
    }
}
