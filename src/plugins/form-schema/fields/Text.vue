<template>
     <label>{{ label }}</label>
     <input 
        type="text" 
        :placeholder
        v-model="model"
    >
</template>

<script setup lang="ts">
const model = defineModel<string | null>()

defineProps<{
    label: string
    placeholder: string
}>()
</script>

<!--
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
    placeholder: string
}>()

const emits = defineEmits<{
    'update:modelValue': [string | null]
}>()
</script>
-->