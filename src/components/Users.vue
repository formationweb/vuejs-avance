<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import axios from 'axios'
import { useSearch } from '../composable/useSearch';
import type { User } from '../types/user';

const users = ref<User[]>([])
const search = ref('')
const { usersFiltered } = useSearch(users, search)

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
    <input type="text" placeholder="Rechercher" v-model="search">
    <article v-for="user in usersFiltered" :key="user.id">
        <header>{{  user.name }}</header>
        <p>{{ user.email }}</p>
    </article>
</template>