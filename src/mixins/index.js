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
        translit(str){
            let sp = '_';
            let text = str.toLowerCase();
            let transl = {
                '\u0430': 'a', '\u0431': 'b', '\u0432': 'v', '\u0433': 'g', '\u0434': 'd', '\u0435': 'e', '\u0451': 'e', '\u0436': 'zh',
                '\u0437': 'z', '\u0438': 'i', '\u0439': 'j', '\u043a': 'k', '\u043b': 'l', '\u043c': 'm', '\u043d': 'n', '\u043e': 'o',
                '\u043f': 'p', '\u0440': 'r', '\u0441': 's', '\u0442': 't', '\u0443': 'u', '\u0444': 'f', '\u0445': 'h', '\u0446': 'c',
                '\u0447': 'ch', '\u0448': 'sh', '\u0449': 'shch', '\u044a': '\'', '\u044b': 'y', '\u044c': '', '\u044d': 'e', '\u044e': 'yu',
                '\u044f': 'ya',
                '\u00AB':'_', '\u00BB':'_',
                ' ': sp, '_': sp, '`': sp, '~': sp,
                '!': sp, '@': sp, '#': sp, '$': sp,
                '%': sp, '^': sp, '&': sp, '*': sp, '(': sp, ')': sp, '-': sp, '=': sp,
                '+': sp, '[': sp, ']': sp, '\\': sp, '|': sp, '/': sp, '.': sp, ',': sp,
                '{': sp, '}': sp, '\'': sp, '"': sp, ';': sp, ':': sp, '?': sp, '<': sp,
                '>': sp, '№': sp
            }
            let result = '';
            let curent_sim = '';
            for(let i=0; i < text.length; i++) {
                if(transl[text[i]] !== undefined) {
                    if(curent_sim !== transl[text[i]] || curent_sim !== sp){
                        result += transl[text[i]];
                        curent_sim = transl[text[i]];
                    }
                } else {
                    result += text[i];
                    curent_sim = text[i];
                }
            }
            result = result.replace(/^_/, '').replace(/_$/, ''); // trim
            return result
        }
    }
}
