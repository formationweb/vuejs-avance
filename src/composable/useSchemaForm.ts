import { reactive, ref } from "vue"

type FormFields = {
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

    function submit(onValid: (form: any) => void) {
        if (validate()) {
            onValid(form.value)
        }
    }

    return {
        form,
        errors,
        validate,
        submit
    }
}