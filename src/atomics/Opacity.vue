<template>
    <input id="opacity" type="range" min="0"  max="1"  step="0.01" v-model="alpha" />
    <div id="preview" :style="{ backgroundColor: color, opacity: alpha }"></div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const props = defineProps<{
    color: string
    opacity: number
}>()

const emits = defineEmits<{
    change: [number]
}>()

const alpha = ref(props.opacity)

watchEffect(() => {
    emits('change', alpha.value)
})
</script>

<style scoped>
div {    
    width: 100px;    
    height: 100px; 
}
</style>