<script setup>
const { myAnimeList } = useTracking();

useSeoMeta({
  title: 'AnimeTracker: The App for Track your animes',
  ogTitle: 'AnimeTracker: The App for Track your animes',
  description: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it',
  ogDescription: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it.',
})

</script>

<template>
  <div class="wrapper">
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
      
    <KeepAlive>
      <AnimeSearch />
    </KeepAlive>

      <h2 class="py-4">Anime Tracked</h2>
      <AnimeTracked :items="myAnimeList" :limit="4"/>
    

      <!-- Notifiche -->
      <UNotifications />
      
    </UContainer>
  </div>
</template>


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