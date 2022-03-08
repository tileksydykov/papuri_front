import {TextEditorEngine} from "./TextEditorEngine";
import {ImageEditorEngine} from "./ImageEditorEngine";

export const Engine = {
    fromObjectToJson(obj){
        return JSON.stringify(obj)
    },
    fromObjToHtml(obj){
        // TODO implement
        return obj
    },
    fromBlocksToText(blocks){
        let text = ''
        blocks.forEach(block => {
            switch (block.container) {
                case 'TextEditor':
                    text += TextEditorEngine.fromBlock(block) + '\n\n'
                    break
                case 'ImageEditor':
                    text += ImageEditorEngine.fromBlock(block) + '\n\n'
                    break
            }
        })
        return text;
    },
    fromTextToBlocks(text){
        // TODO implement
        return text
    }
}
