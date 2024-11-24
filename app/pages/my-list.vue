<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <div 
            v-for="anime in myAnimeList" :key="anime.id"
            class="flex my-4 bg-gray-900 items-center justify-between border border-gray-700 rounded p-4">
            <div class="anime-info flex gap-4 items-center align-middle">
            <img :src="anime.img">
           <h4 class="text-xl"> {{ anime.title }}</h4>
           <h5>{{ episodesWatched }}</h5>/<h5>{{ anime.episodes }}</h5>
           <div class="counter flex gap-4 items-center ">
            <UButton>+</UButton>
            <UButton>-</UButton>
           </div>
            </div>
        </div>
    </UContainer>
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

<style scoped>
     img {
        max-width: 100px;
     }

</style>