<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <div 
            v-for="anime in myAnimeList" :key="anime.id"
            class="flex my-4 bg-gray-900 items-center justify-between border rounded p-4"
            :class="completed ? 'border-green-400' : 'border-gray-700'">
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
const completed = ref(false);

onMounted(() => {
    const storedList = localStorage.getItem('animeStorage');
    if (storedList) {
        myAnimeList.value = JSON.parse(storedList);
    }
});

    const addEps = (anime) => {
        if(anime.currentEps == anime.totalEpisodes){
        completed.value = true;
        return
       }
       anime.currentEps++
       completed.value = false;

    }

    const removeEps = (anime) => {
        if(anime.currentEps <= 0){
        return
       }
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