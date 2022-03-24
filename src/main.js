import {createApp} from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import mixins from './mixins'
import icons from './styles/icons'
import i18n from "./locales";

const app = createApp(App)
icons(app)
app.mixin(mixins)
app.use(router)
app.use(i18n)
app.use(store)
app.mount('#app')
