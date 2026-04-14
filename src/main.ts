import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsersService } from './services/users'
import { authToken, usersServiceToken } from './token'
import { AuthService } from './services/auth'
import { createPinia } from 'pinia'
import './interceptor'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.provide(usersServiceToken, new UsersService())
app.provide(authToken, new AuthService())

app.mount('#app')
