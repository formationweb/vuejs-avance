import '@picocss/pico/css/pico.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import { UsersService } from './services/UsersService'

const app = createApp(App)

app.provide('usersService', new UsersService())

app.mount('#app')
