<template>
    <ul>
        <li v-for="anime in storedList" :key="anime.id">{{ anime.title }}</li>
    </ul>
</template>

<script setup>

onMounted(() => {
    const storedList = localStorage.getItem('animeStorage');
    if (storedList) {
        myAnimeList.value = JSON.parse(storedList);
    }
});

</script>