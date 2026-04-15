import { reactive, ref } from "vue";

export type RuleString = string

export type FieldSchema<Name extends string = string> = {
  name: Name
  type: string
  label: string
  placeholder?: string
  rules?: RuleString
}

export type Schema<F extends readonly FieldSchema[]> = {
  fields: F
}

type Names<F extends readonly FieldSchema[]> = F[number]["name"]

type FormFromFields<F extends readonly FieldSchema[]> = {
  [K in Names<F>]: string
}

type ErrorsFromFields<F extends readonly FieldSchema[]> = {
  [K in Names<F>]: string
}

export function useSchemaForm<const F extends readonly FieldSchema[]>(
  schema: Schema<F>
) {
    type Form = FormFromFields<F>
    type Errors = ErrorsFromFields<F>
    type Name = Names<F>

    const form = reactive({} as Form) as Form
    const errors = reactive({} as Errors) as Errors
    const  valid = ref(true)

    function validate() {
         valid.value = true
        for (const field of schema.fields) {
            const name = field.name as Name
            const value = form[name]
            const rules = field.rules?.split('|') ?? []
            if (rules.includes('required') && !value) {
                errors[name] = 'Champs requis'
                valid.value = false
            }
            else if (rules.includes('email') && !value?.includes('@')) {
                errors[name] = 'Email invalide'
                valid.value = false
            }
            else {
                errors[name] = ''
            }
        }
        return valid.value
    }

    function submit(onValid: (form: Form) => void) {
         if (validate()) {
            onValid({ ...form })
         }
    }

    return {
        form,
        submit,
        valid,
        validate,
        errors
    }
}