<script setup>

const { startTracking, myAnimeList } = useTracking();

useSeoMeta({
  title: 'AnimeTracker: The App for Track your animes',
  ogTitle: 'AnimeTracker: The App for Track your animes',
  description: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it',
  ogDescription: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it.',
})

  import { z } from 'zod'

  const pagination = ref({});
  const myAnime = ref([]);
  const searchResult = ref([]);
  const pending = ref(false);
  const page = ref(1);

  const schema = z.object({
      query: z.string().min(2, 'Must be at least 2 characters')
});

const state = ref({
   query: ''
});


  const toast = useToast()

  const myAbineSort = computed ( () => {
    return myAnime.value.sort( (a, b) => {
       return a.title.localeCompare(b.title)
    } )
  })

  const searchAnime = async (number = 1) => {
    
   

    if (!state.value.query){
      toast.add({
        title: 'You must insert data for search',
        description: 'Write your anime before start searching',
        color: 'red'
      })
      return ;
    }; 

    pending.value = true;
    const url = `https://api.jikan.moe/v4/anime?q=${state.value.query}&page=${number}`;
    
    try {
    const {data, error} = await useFetch(url);
    if(error.value){
      toast.add({
        title: 'Error in fetching data',
        description: error.value,
        color: 'red'
      })

    } else {
      if(!data.value.data.length ){  
        toast.add({
        title: 'No anime founded',
        description: "we could not found you're anime, try with another keyword",
        color: 'red'
      })
      state.value.query = '';
      }

      searchResult.value = data.value.data;
      pagination.value = data.value.pagination;

   
   
    }

    } catch(error) {
      console.error('Errore durante la ricerca:', error);
    } finally {
      pending.value = false;
     
    }
  }

  watch(page, () => {
    searchAnime(page.value);
  })

  


</script>

<template>
  <div class="wrapper">
  <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">

    <!-- Form di Ricerca -->
    <UForm @submit="searchAnime()" :state="state" :schema="schema" class="flex w-full gap-4">
      <UFormGroup :required="true" class="w-full" name="query">
        <UInput 
          v-model="state.query" 
          placeholder="Search for anime..."
          icon="i-heroicons-tv"
          class="w-full bg-neutral-800 text-neutral-100 border-neutral-600 focus:ring-indigo-500"
        />
      </UFormGroup>
      <UButton 
        variant="solid" 
        :loading="pending"
        icon="i-heroicons-outline-magnifying-glass"
        class="bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors rounded-lg px-6 py-2"
        type="submit"
      >
        Search
      </UButton>
    </UForm>

    <!-- Titolo della Lista di Anime -->
    <h2 class="text-4xl font-semibold my-4">Anime List</h2>

    <!-- Risultati della Ricerca -->
    <div v-if="searchResult.length" class="min-h-[50%] overflow-y-auto max-h-[80vh]">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="anime in searchResult" :key="anime.mal_id">
          <UCard class="bg-neutral-900 text-neutral-100 shadow-lg rounded-lg overflow-hidden">
            <template #header>
              <NuxtLink :to="anime.mal_id.toString()">
                <h3 class="text-lg font-semibold">{{ anime.title }}</h3>
              </NuxtLink>
            </template>
            <NuxtLink :to="anime.mal_id.toString()">
              <img :src="anime.images.webp.image_url" class="w-full h-64 object-cover rounded-t-lg" alt="Anime Image" />
            </NuxtLink>
            <div class="p-4">
              <p class="mt-2 text-sm text-neutral-300">
                Sinossi: {{ anime.synopsis ? anime.synopsis.substring(0, 100) : 'No synopsis available' }}
              </p>
              <p class="my-4 text-sm text-neutral-400">
                Date: {{ anime.aired.from ? anime.aired.from.split('T')[0] : 'No data' }}
              </p>
              <div class="flex justify-between items-center">
                <p class="text-sm">Episodes: {{ anime.episodes == 1 ? 'Film' : anime.episodes }}</p>
                <p :class="anime.score > 6 ? 'text-green-500' : 'text-red-500'" class="font-semibold">{{ anime.score }}</p>
              </div>
              <div class="flex justify-between flex-col">
              <NuxtLink class="text-center mx-auto mt-4 flex w-full" :to="anime.mal_id.toString()">
                <UButton class="text-center mx-auto mt-4 flex w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 rounded-lg py-2">
                Discover More
                </UButton>
              </NuxtLink>
               
                <UButton @click="startTracking(anime)" class="text-center mx-auto mt-4 flex justify-center w-full bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 rounded-lg py-2">
               Start Tracking
                </UButton>
              </div>
           
            </div>
          </UCard>
        </div>
      </div>

      <!-- Paginazione -->
      <div class="my-4 mx-auto">
        <UPagination
          v-model="page"
          :page-count="pagination?.items?.per_page"
          :total="pagination?.items?.total"
          show-last
          show-first
          :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'neutral' }"
          :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'neutral' }"
          class="my-4 mx-auto"
        
        />
      </div>

    </div>

    <!-- Messaggio quando non ci sono risultati -->
    <div v-else class="py-20">
      <p class="text-center text-neutral-500">No anime found. Please try again with a different search.</p>
    </div>

    <h2 class="py-4">Anime Tracked</h2>
    <AnimeTracked :items="myAnimeList" :limit="4"/>
   

    <!-- Notifiche -->
    <UNotifications />
    
  </UContainer>
  </div>
</template>
