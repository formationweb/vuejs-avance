import { ref } from "vue"

type FormFields = {
    [key: string]: any
}

export function useSchemaForm(schema: {
    fields: any[]
}) {
    const form = ref<FormFields>({}) // { name: ...., email: ... }
    const errors = ref<FormFields>({}) // { name: .... }

    function validate() {
        let valid = true
        schema.fields.forEach(field => {
            if (field.rules?.includes('required') && !form.value[field.name]) {
                errors.value[field.name] = 'Champs requis'
                valid = false
            }
            else {
                errors.value[field.name] = ''
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