<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import axios from 'axios'
import { useSearch } from '../composable/useSearch';
import type { User } from '../types/user';
import UserCard from './UserCard.vue';

const users = ref<User[]>([])
const { usersFiltered, search } = useSearch(users)

const  { title } = defineProps<{
    title?: string
}>()

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
    <UserCard v-for="user in usersFiltered" :key="user.id" :user="user" />
</template>