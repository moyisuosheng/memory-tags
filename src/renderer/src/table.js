import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Table from './Table.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const table = createApp(Table)
const pinia = createPinia()

table.use(pinia).use(Antd).mount('#table')
