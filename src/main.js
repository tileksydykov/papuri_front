import {createApp} from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import messages from "./locales"
import {createI18n} from 'vue-i18n';
import mixins from './mixins'
import icons from './styles/icons'

const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages
})

const app = createApp(App)
icons(app)
app.mixin(mixins)
app.use(router)
app.use(i18n)
app.use(store)
app.mount('#app')
