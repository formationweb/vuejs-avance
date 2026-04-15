<template>
    <form @submit.prevent="handleSubmit">
        <div v-for="field in schema.fields" :key="field.name">
            <component 
                :is="fieldRegistry[field.type]" 
                v-bind="field"
                v-model="form[field.name]"
            />
            <p v-show="errors[field.name]">
                {{ errors[field.name] }}
            </p>
        </div>
        <slot>
            <button>Soumettre</button>
        </slot>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fieldRegistry } from './fields/registry';
import { useSchemaForm, type FieldSchema, type Schema } from './useSchemaForm';

const props = defineProps<{
    schema: Schema<readonly FieldSchema[]>
}>()

const { form, submit, errors } = useSchemaForm(props.schema)

const emits = defineEmits<{
    'submitSuccess': [any]
}>()

const handleSubmit = () => {
    submit((data) => emits('submitSuccess', data))
}
</script>