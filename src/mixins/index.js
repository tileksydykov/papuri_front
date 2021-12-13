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
