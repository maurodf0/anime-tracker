<template>
    <ul>
        <li v-for="anime in myAnimeList" :key="anime.id">{{ anime.title }}</li>
    </ul>
</template>

<script setup>

const myAnimeList = ref([]);

onMounted(() => {
    const storedList = localStorage.getItem('animeStorage');
    if (storedList) {
        myAnimeList.value = JSON.parse(storedList);
    }
});

</script>