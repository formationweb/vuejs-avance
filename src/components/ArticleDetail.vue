<template>
    <article>
        <slot name="header" :active></slot>
       <header>{{  article.title }}</header>
       <p>{{ article.body }}</p>
       <slot></slot>
       <input type="checkbox" v-model="active">
   </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Article } from '../types/article';

const active = ref(false)

defineProps<{
   article: Article
}>()

</script>