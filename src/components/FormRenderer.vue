<template>
    <form @submit.prevent="handleSubmit">
        <div v-for="field in schema.fields" :key="field.name">
            <component 
                :is="fieldRegistry[field.type]" 
                v-model="form[field.name]"
                v-bind="field" 
            />
            <p v-if="errors[field.name]">
                {{ errors[field.name] }}
            </p>
        </div>
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { useSchemaForm, type FormData } from '../composable/useSchemaForm';
import { fieldRegistry } from './fields/registry';

const props = defineProps<{
    schema: any
}>()

const emits = defineEmits<{
    onSubmitSuccess: [any]
}>()

const { form, errors, submit } = useSchemaForm(props.schema)

const handleSubmit = () => submit((formData) => {
    emits('onSubmitSuccess', formData)
})
</script>