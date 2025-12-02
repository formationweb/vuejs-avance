import { reactive, ref, type Reactive } from "vue"

export type FormFields = {
    [key: string]: any
}

export type FormData = {
    [key: string]: any
}

export function useSchemaForm(schema: {
    fields: any[]
}) {
    const form = reactive<FormFields>({}) // { name: ...., email: ... }
    const errors = reactive<FormFields>({}) // { name: .... }

    function validate() {
        let valid = true
        schema.fields.forEach(field => {
            if (field.rules?.includes('required') && !form[field.name]) {
                errors[field.name] = 'Champs requis'
                valid = false
            }
            else {
                errors[field.name] = ''
            }
        })
        return valid
    }

    function submit(onValid: (form: Reactive<FormFields>) => void) {
        if (validate()) {
            onValid({...form})
        }
    }

    return {
        form,
        errors,
        validate,
        submit
    }
}