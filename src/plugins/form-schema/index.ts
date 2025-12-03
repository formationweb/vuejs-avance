import type { App } from "vue";
import FormRenderer from "./FormRenderer.vue";

export interface FormSchemaOptions {
    debug?: boolean
}

declare module "vue" {
    interface ComponentCustomProperties {
        $log: (msg: string) => void
    }
}

export const FormSchemaPlugin = {
    install(app: App, options?: FormSchemaOptions) {
        app.component('FormRenderer', FormRenderer)
        app.config.globalProperties.$log = (msg: string) => {
            if (options?.debug) {
                console.log(`[Schema Log] ${msg}`)
            }
        }
    }
}