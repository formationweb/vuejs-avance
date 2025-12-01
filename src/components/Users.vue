<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSearch } from '../composable/useSearch';
import type { User } from '../types/user';
import UserCard from './UserCard.vue';
import { useUsersFetch } from '../composable/useUsersFetch';

const users = ref<User[]>([])
const { usersFiltered, search } = useSearch(users)
const { loading, getAll } = useUsersFetch(users)

onMounted(async() => {
    await getAll()
})
</script>

<template>
    <input type="text" placeholder="Rechercher" v-model="search">
    <UserCard v-for="user in usersFiltered" :key="user.id" :user="user" />
</template>