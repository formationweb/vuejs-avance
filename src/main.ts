import '@picocss/pico/css/pico.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import { UsersService } from './services/UsersService'
import { router } from './routes'
import { AuthService } from './services/AuthService'

const app = createApp(App)

app.provide('usersService', new UsersService())
app.provide('authService', new AuthService())
app.use(router)

app.mount('#app')
