import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Table from './Table.vue'

const pinia = createPinia()
const app = createApp(Table)

app.use(pinia)
app.mount('#table')
