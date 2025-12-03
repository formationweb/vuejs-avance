<template>
    <Datatable :columns :items="users">
        <template #email="{ item }">
            <strong>{{ item.email }}</strong>
        </template>
        <template #action>
            <button>Supprimer</button>
        </template>
        <template #footer>
            aaa
        </template>
    </Datatable>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../store/users';
import Datatable from './Datatable.vue';
import { ref } from 'vue';

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

const columns = ref([
    {
        key: 'name',
        label: 'Nom'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'action',
        label: 'Action'
    }
])
</script>