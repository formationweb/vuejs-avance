import type { App } from "vue";
import FormRenderer from "./FormRenderer.vue";

export interface FormSchemaOptions {
    debug?: boolean
}

export const FormSchemaPlugin = {
    install(app: App, options?: FormSchemaOptions) {
        app.component('FormRenderer', FormRenderer)
    }
}