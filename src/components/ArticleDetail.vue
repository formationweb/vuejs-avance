<template>
    <article>
        <header>{{  article.title }}</header>
        <p>{{  article.body }}</p>
    </article>
    <hr>
</template>

<script setup lang="ts">
defineProps<{
    article: any
}>()
</script>