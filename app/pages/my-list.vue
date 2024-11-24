<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <div 
            v-for="anime in myAnimeList" :key="anime.id"
            class="flex justify-between border border-gray-700 rounded p-4">
            <div class="anime-info">
           <h4> {{ anime.title }}</h4>
           <img :src="anime.img">
           <div class="counter">
            +
            -
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