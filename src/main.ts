import './assets/main.css'
import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'

const app = createApp(App)
app.use(MotionPlugin)
app.use(VueTheMask)
app.use(router)
app.mount('#app')

