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
        <UNotifications />
    </UContainer>

     
  </template>

<script setup>

useSeoMeta({
  title: 'AnimeTracker: My Anime List',
  description: 'AnimeTracker: The App for Track your animes, choose an anime, Watch and track it'
})

const { myAnimeList } = useTracking();


const search = ref('');

const filteredAnime = computed(() => {
    return myAnimeList.value.filter((r) =>
      r.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    );
  });
       
</script>




