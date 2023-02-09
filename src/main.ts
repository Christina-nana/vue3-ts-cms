import { createApp } from 'vue'

import App from './App.vue'
import store from '@/store'
import router from './router'
import 'normalize.css'
import './assets/css/index.less'
import icons from '@/global/register-icons'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(icons)
app.mount('#app')
