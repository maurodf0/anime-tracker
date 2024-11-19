<template>
    <article>
        <h1>test</h1>
        {{ route.params.id }}
    </article>
</template>

<script setup>

const route = useRoute()

console.log(route.params.id);
</script>