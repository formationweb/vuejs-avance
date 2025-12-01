<script setup lang="ts">
import { ref, watchEffect } from 'vue';

let users = ref([])

async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await res.json()
}

watchEffect(() => {
    console.log(users.value)
})

getUsers()
</script>

<template>
    <article v-for="user in users" :key="user.id">
        <header>{{  user.name }}</header>
        <p>{{ user.email }}</p>
    </article>
</template>