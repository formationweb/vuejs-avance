<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import axios from 'axios'

let users = ref([])

async function getUsers() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = res.data
}

watchEffect(() => {
    console.log(users.value)
})

onMounted(async () => {
    await getUsers()
})
</script>

<template>
    <article v-for="user in users" :key="user.id">
        <header>{{  user.name }}</header>
        <p>{{ user.email }}</p>
    </article>
</template>