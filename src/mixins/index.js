export default {
    methods: {
        shortenNumbers: (number) => {
            if (number < 1_000) {
                return number + ""
            }else if (number < 1_000_000) {
                return (Math.round(number / 100) / 10) + "k"
            }else if (number < 1_000_000_000) {
                return (Math.round(number / 1_000_00) / 10) + "m"
            }else {
                return (Math.round(number / 1_000_000_00) / 10) + "b"
            }
        },
        bytesToSize(bytes) {
            let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 Byte';
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
        },
        isActiveRoute(tab, route) {
            if (route.name === tab.name) {
                return true
            }
            const matched = route.matched.find(r => r.name === tab.parent)?.children
            if (matched){
                for (let i = 0; i < matched.length; i++) {
                    if (matched[i].name === route.name) {
                        return true
                    }
                }
            }
            return false
        },
    }
}
