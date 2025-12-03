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
import { confirmDirective } from './directives/confirm'
import { tooltip } from './directives/tooltip'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaLogger())
pinia.use(piniaPersist({
    include: ['users']
}))

app.provide('usersService', new UsersService())
app.provide('authService', new AuthService())

app.directive('confirm', confirmDirective)
app.directive('tooltip', tooltip)

app.use(router)
app.use(pinia)
app.use(FormSchemaPlugin, {
    debug: true
})

app.mount('#app')
