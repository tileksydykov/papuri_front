import {uuidv4} from "@/store/repo/functions";

export const TestAdapter = {
    fromBlock(block) {
        let options = ''
        block.data.options.forEach(opt => {
            options += `\n* ${opt}`
        })
        return `:test ${block.data.title}${options}`
    },
    toBlock(text) {
        const testParts = text.split("\n")
        const title = testParts.length > 0 ? testParts[0].replace(":test ", ''): ''
        return {
            id: uuidv4(),
            container: "Test",
            data: {
                title,
                options: testParts.slice(1).map(opt => opt.slice(2))
            }
        }
    },
    fromBlockToHtml(block) {
        return `<p><h3>${block.data.title}</h3> <ul>${
            block.data.options.map(option => `<li>${option}</li>`).join("")
        }</ul></p>`
    }
}
