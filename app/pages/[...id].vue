<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <article>
            <h1 class="text-6xl font-weight mb-4">{{ anime.title }} - {{ anime.title_japanese && anime.title_japanese }}</h1>
            <div class="info-wrapper flex justify-center gap-4">
                <div class="img-wrapper relative w-1/4">
                    <img class="mb-4" :src="anime.images?.webp?.large_image_url" />
                    <p 
                        :class="anime.score > 6 ? 'text-green-500' : 'text-red-500' "
                        class="absolute top-5 right-5 bg-slate-800 px-2 py-1 border rounded-full font-bold">{{anime.score}}</p>

                 </div>
                <div class="w-3/4">
                    <em>{{ anime.background }}</em>
                    <p class="mt-4">{{ anime.synopsis }}</p>
                </div>
            </div>

            <h2 class="text-2xl mb-4">Trailer</h2>
            <iframe width="560" height="315" :src="anime?.trailer?.embed_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </article>
        <UButton class="my-8" @click="startTracking" variant="solid">Start Tracking</UButton>
    </UContainer>
    <UNotifications />
</template>

<script setup>

import {watch} from 'vue';

const route = useRoute()
const toast = useToast();
const id = ref(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);
let anime = ref({});
const myAnimeList = ref([]);

onMounted(() => {
    const storedList = localStorage.getItem('animeStorage');
    if (storedList) {
        myAnimeList.value = JSON.parse(storedList);
    }
});


const url = `https://api.jikan.moe/v4/anime/${id}`;


    const startTracking = () => {

        const newAnime = {
            id: id.value,
            title: anime.value.title,
            img: anime.value.images?.webp?.large_image_url,
            totalEpisodes: anime.value.episodes,
            currentEps: 0,
            completed: false,
    };

    if (myAnimeList.value.some((a) => a.id === newAnime.id)) {
        toast.add({
            title: 'Anime already tracked',
            description: `${anime.value.title} is already in your list`,
            color: 'yellow',
        });
        return;
    }


    myAnimeList.value.push(newAnime);
        toast.add({
            title: 'Anime tracking with success',
            description: `You're added ${anime.value.title} to your anime tracked list`,
            color: 'green',
        })
   

    }


    
    watch(myAnimeList, () => {
    localStorage.setItem('animeStorage', JSON.stringify(myAnimeList.value));
    console.log(myAnimeList.value);
        }, { deep: true })

    const fetchSingleAnime = async (url) => {
   const dataFecth = await $fetch(url);

    if(!dataFecth){
        toast.add({
        title: 'Error retriving data',
        color: 'red'
      })
    } else {
        anime.value = dataFecth.data;
    }

}

watch(() => id.value, (newId) => {
    if (newId) {
        const updatedUrl = `https://api.jikan.moe/v4/anime/${newId}`;
        fetchSingleAnime(updatedUrl);
    }
}, { immediate: true });
</script>