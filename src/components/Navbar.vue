<template>
    <h1 v-tooltip="tooltipName">Titre</h1>
    <input type="text" v-model="firstName">
    <button @click="search">Rechercher</button>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const firstName = ref('')
const tooltipName = ref('Mon App')

setTimeout(() => {
    tooltipName.value = 'Foo'
}, 2000)

function search() {
     userStore.setNameSearch(firstName.value)
}

// watchEffect(() => {
   
// })
</script>