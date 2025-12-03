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
import { useSchemaForm, type FieldSchema, type Schema } from './useSchemaForm';
import { fieldRegistry } from './fields/registry';
import { getCurrentInstance, onMounted } from 'vue';

const props = defineProps<{
  schema: Schema<readonly FieldSchema[]>
}>()

const emit = defineEmits<{
  (event: 'submitSuccess', data: any): void
}>()

const { form, errors, submit } = useSchemaForm(props.schema)

const handleSubmit = () =>
  submit((data) => emit('submitSuccess', data))

onMounted(() => {
    const instance = getCurrentInstance()
    instance?.appContext.config.globalProperties.$log(`Init ${JSON.stringify(props.schema, null, 2)}`)
})
</script>