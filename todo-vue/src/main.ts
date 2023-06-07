import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import components from '@/components/UI'
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia();

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(pinia)
    .use(router)
    .mount('#app')
