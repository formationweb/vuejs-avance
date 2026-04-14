import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsersService } from './services/users'
import { authToken, usersServiceToken } from './token'
import { AuthService } from './services/auth'
import { createPinia } from 'pinia'
import './interceptor'
import { piniaLogger } from './stores/plugins/logger'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaLogger())

app.use(router)
app.use(pinia)
app.provide(usersServiceToken, new UsersService())
app.provide(authToken, new AuthService())

app.mount('#app')
