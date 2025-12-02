<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useSearch } from '../composable/useSearch';
import type { User } from '../types/user';
import { useUsersFetch } from '../composable/useUsersFetch';
import { useUsersStore } from '../store/users';
import FormRenderer from './FormRenderer.vue';
import { userFormSchema } from '../schema/userSchema';

const config = {
    component: defineAsyncComponent(() => import('./UserCard.vue')),
    props: {
        bar: 'foo',
        test: 'dzze'
    }
}

const usersStore = useUsersStore()
const { usersFiltered, search } = useSearch()
const { loading, getAll } = useUsersFetch()

onMounted(async() => {
    await getAll()
})
</script>

<template>
    <input type="text" placeholder="Rechercher" v-model="search">

    <h1>Créer</h1>

    <FormRenderer 
        :schema="userFormSchema" 
        @onSubmitSuccess="usersStore.createUser">
        <button>Créer utilisateur</button>
    </FormRenderer>

    <hr />

    <!-- <UserCard v-for="user in usersFiltered" :key="user.id" :user="user" @on-delete="usersStore.deleteUser" /> -->
     <component 
        :is="config.component" 
        v-bind="config.props"
        v-for="user in usersFiltered" :key="user.id" 
        :user="user" @on-delete="usersStore.deleteUser"
    />
</template>