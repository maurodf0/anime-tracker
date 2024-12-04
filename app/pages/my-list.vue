<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
      <UFormGroup class="w-full mb-4" name="search">
        <UInput 
          v-model="search" 
          placeholder="Search for anime..."
          icon="i-heroicons-tv"
          class="w-full bg-neutral-800 text-neutral-100 border-neutral-600 focus:ring-indigo-500"
        />
        </UFormGroup>
        <AnimeTracked :items="filteredAnime"/>
    </UContainer>
  </template>

<script setup>

useSeoMeta({
  title: 'AnimeTracker: My Anime List',
  description: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it',
})

onMounted(() => {
  
  console.log('Test controllo',myAnimeList.value)
})
const { myAnimeList } = useTracking();


const search = ref('');

const filteredAnime = computed(() => {
    return myAnimeList.value.filter((r) =>
      r.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    );
  });

  console.log('Test controllo',filteredAnime.value)
  console.log('Test controllo',myAnimeList.value)

       
</script>

<style scoped>
     img {
        max-width: 100px;
        aspect-ratio: 1/1;
     }

</style>



<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;

}
</style>