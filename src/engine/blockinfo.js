export default {
    image: {
        container: 'Image',
        data: {
            imageId: '0'
        },
        adapter: "ImageAdapter",
    },
    video: {
        container: 'Video',
        data: {
            videoId: ''
        },
        adapter: "VideoAdapter"
    },
    text: {
        container: 'Text',
        data: {
            text: ''
        },
        adapter: "TextAdapter"
    },
    katex: {
        container: 'Katex',
        data: {
            text: ''
        },
        adapter: "KatexAdapter"
    },
    audio: {
        container: 'Audio',
        data: {
            audioId: ''
        },
        adapter: "AudioAdapter"
    },
    test: {
        container: 'Test',
        data: {
            title: '',
            options: [''],
        },
        adapter: "TestAdapter"
    }
}
