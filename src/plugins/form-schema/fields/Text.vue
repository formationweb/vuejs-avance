<template>
    <label>{{ label }}</label>
    <input 
        type="text" 
        :placeholder 
        :value="modelValue"
        @input="emits('update:modelValue', $event?.target?.value)"
    >
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string
    label: string
    placeholder?: string
}>()

const emits = defineEmits<{
    'update:modelValue': [string | null]
}>()
</script>