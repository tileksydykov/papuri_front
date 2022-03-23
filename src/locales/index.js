import en from "./en"
import ru from "./ru"
import {createI18n} from "vue-i18n";

const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: { en, ru, }
})

export default i18n
