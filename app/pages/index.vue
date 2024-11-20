<script setup>

  const query = ref('');
  const pagination = ref({});
  const myAnime = ref([]);
  const searchResult = ref([]);
  const pending = ref(false);
  const page = ref(1);


  const toast = useToast()

  const myAbineSort = computed ( () => {
    return myAnime.value.sort( (a, b) => {
       return a.title.localeCompare(b.title)
    } )
  })

  const searchAnime = async (number = 1) => {
    if (!query.value){
      toast.add({
        title: 'You must insert data for search',
        description: 'Write your anime before start searching',
        color: 'red'
      })
    }; 

    pending.value = true;
    const url = `https://api.jikan.moe/v4/anime?q=${query.value}&page=${number}`;
    try {
    const {data, error} = await useFetch(url);
    if(error.value){
      toast.add({
        title: 'Error in fetching data',
        description: error.value,
        color: 'red'
      })
    } else {
      searchResult.value = data.value.data;
      pagination.value = data.value.pagination;
      console.log(searchResult.value);
      console.log(pagination.value);
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
    <UContainer class="max-w-[1080px] mx-auto px-4">

<UForm @submit="searchAnime()">
 <UFormGroup help="Search for your anime">
   <UInput v-model="query" placeholder="Naruto"></UInput>
 </UFormGroup>
 <UButton variant="solid" :loading="pending">Search</UButton>
</UForm>


   <h2 class="text-5xl font-bold my-4">Anime List</h2>

   <div v-if="searchResult.length">
    <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 items-stretch">
      <div v-for="anime in searchResult" :key="anime.mal_id">
       <UCard>
        <template #header>
          <h3>{{ anime.title }}</h3>
        </template>
        <img :src="anime.images.webp.image_url">
        <p class="mt-4">Sinossi: {{ anime.synopsis ? anime.synopsis.substring(0, 100) : 'No synopsis available' }}</p>
        <p class="my-4 border-y py-2 border-gray-500">Date: {{anime.aired.from ? anime.aired.from.split('T')[0] : 'no data'}}</p>
        <div class="flex justify-between">
         <p> Episode: {{anime.episodes == 1 ? 'Film' : anime.episodes}}</p>
          <p :class="anime.score > 6 ? 'text-green-500' : 'text-red-500' ">{{anime.score}}</p>
        </div>
        <UButton class="mt-4" variant="solid">
          <NuxtLink :to="anime.mal_id.toString()">Discover More</NuxtLink>
          </UButton>
      </UCard>
      </div>
    </div>
    <div class="my-4 mx-auto">
 <UPagination
          v-model="page"
          :page-count="pagination?.items?.per_page" 
          :total="pagination?.items?.total"
          show-last
          show-first
          :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
          :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
        />
    </div>

  </div>

  <div v-else>
    No anime selected
  </div>



  <UNotifications />
</UContainer>
</template>