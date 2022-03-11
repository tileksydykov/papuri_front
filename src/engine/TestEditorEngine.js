import {uuidv4} from "@/store/repo/functions";

export const TestEditorEngine = {
    fromBlock(block) {
        return `:test ${block.data.title}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "TestEditor",
            data: {
                text
            }
        }
    }
}
