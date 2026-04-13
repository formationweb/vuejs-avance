import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsersService } from './services/users'
import { usersServiceToken } from './token'

const app = createApp(App)

app.use(router)
app.provide(usersServiceToken, new UsersService())

app.mount('#app')
