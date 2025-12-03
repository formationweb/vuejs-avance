import '@picocss/pico/css/pico.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import { UsersService } from './services/UsersService'
import { router } from './routes'
import { AuthService } from './services/AuthService'
import './interceptor'
import { createPinia } from 'pinia'
import { FormSchemaPlugin } from './plugins/form-schema'
import { piniaLogger } from './store/plugins/logger'
import { piniaPersist } from './store/plugins/persist'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaLogger())
pinia.use(piniaPersist({
    include: ['users']
}))

app.provide('usersService', new UsersService())
app.provide('authService', new AuthService())

app.use(router)
app.use(pinia)
app.use(FormSchemaPlugin, {
    debug: true
})

app.mount('#app')
