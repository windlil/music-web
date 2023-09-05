import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import pinia from '@/store/index'
import '@/assets/css/index.scss'
import 'normalize.css'

const app = createApp(App)
app.use(router).use(pinia)
app.mount('#app')
