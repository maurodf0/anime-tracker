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


    

    <h2 class="py-4">Anime Tracked</h2>
    <AnimeTracked :items="myAnimeList" :limit="4"/>
   

    <!-- Notifiche -->
    <UNotifications />
    
  </UContainer>
  </div>
</template>
