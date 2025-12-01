<template>
    <form @submit.prevent="login">
        <label>Email</label>
        <input type="text" v-model="email">

        <label>Password</label>
        <input type="password" v-model="password">

        <button>Se connecter</button>
    </form>
</template>

<script setup lang="ts">
import { useAuth } from '../composable/useAuth';

const { email, password, login } = useAuth()
</script>