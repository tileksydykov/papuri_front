import {TextEditorEngine} from "./TextEditorEngine";
import {ImageEditorEngine} from "./ImageEditorEngine";
import {TestEditorEngine} from "@/engine/TestEditorEngine";
import {VideoEditorEngine} from "@/engine/VideoEditorEngine";
import {AudioEditorEngine} from "@/engine/AudioEditorEngine";

export const Engine = {
    fromObjectToJson(obj) {
        return JSON.stringify(obj)
    },
    fromBlockToHtml(blocks){
        let text = ''
        blocks.forEach(block => {
            switch (block.container) {
                case 'TextEditor':
                    text += TextEditorEngine.fromBlockToHtml(block) + '\n\n'
                    break
                case 'ImageEditor':
                    text += ImageEditorEngine.fromBlockToHtml(block) + '\n\n'
                    break
                case 'VideoEditor':
                    text += VideoEditorEngine.fromBlockToHtml(block) + '\n\n'
                    break
                case 'AudioEditor':
                    text += AudioEditorEngine.fromBlockToHtml(block) + '\n\n'
                    break
                case 'TestEditor':
                    text += TestEditorEngine.fromBlockToHtml(block) + '\n\n'
                    break
            }
        })
        return text;
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
                case 'VideoEditor':
                    text += VideoEditorEngine.fromBlock(block) + '\n\n'
                    break
                case 'AudioEditor':
                    text += AudioEditorEngine.fromBlock(block) + '\n\n'
                    break
                case 'TestEditor':
                    text += TestEditorEngine.fromBlock(block) + '\n\n'
                    break
            }
        })
        return text;
    },
    fromTextToBlocks(text, type = "Editor"){
        let blocks = []
        if (!text) {
            return
        }
        if (text.slice(-2) === "\n\n"){
            text = text.slice(0, -2)
        }
        text.split('\n\n').forEach(textPiece => {
            if (textPiece.charAt(0) !== ':') {
                blocks.push(TextEditorEngine.toBlock(textPiece))
            } else {
                switch (textPiece.slice(0, textPiece.indexOf(" "))) {
                    case ":image":
                        blocks.push(ImageEditorEngine.toBlock(textPiece))
                        break;
                    case ":video":
                        blocks.push(VideoEditorEngine.toBlock(textPiece))
                        break;
                    case ":audio":
                        blocks.push(AudioEditorEngine.toBlock(textPiece))
                        break;
                    case ":test":
                        blocks.push(TestEditorEngine.toBlock(textPiece))
                }
            }
        })
        return blocks.map(block => {
            block.container += type
            return block
        })
    }
}
