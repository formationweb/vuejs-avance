import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsersService } from './services/users'
import { authToken, usersServiceToken } from './token'
import { AuthService } from './services/auth'
import { createPinia } from 'pinia'
import './interceptor'
import { piniaLogger } from './stores/plugins/logger'
import { piniaPersist } from './stores/plugins/persist'
import { FormSchemaPlugin } from './plugins/form-schema'
import { tooltip } from './directives/tooltip'
import { confirm } from './directives/confirm'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaLogger())

pinia.use(piniaPersist({
 include: ['user'],
}))

app.use(router)
app.use(pinia)
app.use(FormSchemaPlugin, {
    debug: true
})
app.provide(usersServiceToken, new UsersService())
app.provide(authToken, new AuthService())
app.directive('tooltip', tooltip)
app.directive('confirm', confirm)

app.mount('#app')
