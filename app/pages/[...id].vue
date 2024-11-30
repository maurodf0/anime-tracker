<template>
  <div>
      <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <article>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {{ anime.title }} 
            <span v-if="anime.title_japanese" class="text-lg text-gray-500">- {{ anime.title_japanese }}</span>
          </h1>
    
          <div class="info-wrapper flex flex-col md:flex-row gap-6 mb-8">
            <!-- Immagine -->
            <div class="img-wrapper w-full md:w-1/3 relative">
              <img class="mb-4 w-full rounded-lg shadow-lg" :src="anime.images?.webp?.large_image_url" />
              <p 
                :class="anime.score > 6 ? 'text-green-500' : 'text-red-500'" 
                class="absolute top-4 right-4 bg-slate-800 px-3 py-1 border rounded-full font-bold">
                {{ anime.score }}
              </p>
            </div>
    
            <!-- Dettagli Anime -->
            <div class="w-full md:w-2/3">
              <em class="block text-gray-600 mb-4">{{ anime.background }}</em>
              <p class="text-lg leading-relaxed">{{ anime.synopsis }}</p>
            </div>
          </div>
    
          <!-- Trailer -->
          <h2 class="text-3xl mb-4">Trailer</h2>
          <div class="relative pb-[56.25%] mb-8">
            <iframe 
              class="absolute top-0 left-0 w-full h-full rounded-lg"
              :src="anime?.trailer?.embed_url" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
            </iframe>
          </div>
    
        </article>
    
        <UButton class="my-8" @click="startTracking" variant="solid">
          Start Tracking
        </UButton>
        
      </UContainer>
    
      <UNotifications />
    </div>
  </template>
  

<script setup>


import {Fragment, watch} from 'vue';

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

        const newAnime = reactive({
            id: id.value,
            title: anime.value.title,
            img: anime.value.images?.webp?.large_image_url,
            totalEpisodes: anime.value.episodes,
            currentEps: 0,
            completed: false
    });

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



useSeoMeta({
  title: `AnimeTracker: Anime Detail Page`,
  description: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it',

})
</script>