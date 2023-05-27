import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import cors from 'cors'

createApp(App).use(router,VueAxios,axios,cors).mount('#app')
