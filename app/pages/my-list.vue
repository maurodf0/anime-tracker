<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <div 
            v-for="anime in myAnimeList" :key="anime.id"
            class="flex my-4 bg-gray-900 items-center justify-between border border-gray-700 rounded p-4">
            <div class="anime-info flex gap-4 items-center align-middle">
            <img :src="anime.img">
            <div class="anime-data flex flex-col">
                <h4 class="text-xl"> {{ anime.title }}</h4>
                <div class="episodes flex">
                    <h5>{{ anime.currentEps }}</h5>/<h5>{{ anime.totalEpisodes }}</h5>
                </div>
            </div>
           <div class="counter flex gap-4 items-center ">
            <UButton @click="addEps(anime)">+</UButton>
            <UButton @click="removeEps(anime)">-</UButton>
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

    const addEps = (anime) => {
       anime.currentEps++
       if(anime.currentEps === anime.totalEps){
        return
       }
    }

    const removeEps = (anime) => {
       anime.currentEps--
    }

    watch(myAnimeList, () => {
    localStorage.setItem('animeStorage', JSON.stringify(myAnimeList.value));
    console.log(myAnimeList.value);
        }, { deep: true })

</script>

<style scoped>
     img {
        max-width: 100px;
     }

</style>