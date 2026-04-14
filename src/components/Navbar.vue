<template>
    <input type="text" v-model="firstName">
    <button @click="search">Rechercher</button>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const firstName = ref('')

function search() {
     userStore.setNameSearch(firstName.value)
}

// watchEffect(() => {
   
// })
</script>