<template>
    <form @submit.prevent="handleSubmit">
        {{ tmpField }}
        <div v-for="field in schema.fields" :key="field.name">
            <component 
                :is="fieldRegistry[field.type]" 
                v-bind="field"
                v-model="tmpField"
            />
        </div>
        <slot>
            <button>Soumettre</button>
        </slot>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fieldRegistry } from './fields/registry';

const tmpField = ref('toto')

defineProps<{
    schema: {
        fields: any[]
    }
}>()

defineEmits<{
    'submitSuccess': [any]
}>()

const handleSubmit = () => {

}
</script>