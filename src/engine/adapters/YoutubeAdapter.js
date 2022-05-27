import {uuidv4} from "@/store/repo/functions";

export const YoutubeAdapter = {
    fromBlock(block) {
        return `:youtube ${block.data.id}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "Youtube",
            data: {
                id: text.slice(text.indexOf(" ")+1)
            }
        }
    },
    fromBlockToHtml(block) {
        return `<iframe src="https://www.youtube.com/embed/${block.data.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
}
