<template>
    <div>
        <div v-if="animeItems.length" class="lg:grid lg:grid-cols-2 gap-4">
        <div
          v-for="anime in animeItems"
          :key="anime.id"
          class="flex relative flex-col md:flex-row bg-gray-900 border rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out items-center justify-between"
          :class="anime.completed ? 'border-green-400 completed' : 'border-gray-700'">
          
          <!-- Sezione Immagine -->
          <div class="anime-info flex basis-8/12 flex-col md:flex-row mx-auto text-center md:text-left md:mx-2 gap-4 items-center mb-4 md:mb-0">
            <img :src="anime.img" class="w-24 h-auto rounded-lg object-cover" />
            
            <!-- Dati Anime -->
            <div class="anime-data flex flex-col justify-center">
              <h4 class="text-xl font-semibold text-white">{{ anime.title }}</h4>
              <div class="episodes flex mx-auto md:mx-0 text-sm text-gray-400 mt-2">
                <h5 @click="isOpen = !isOpen">{{ anime.currentEps }} / {{ anime.totalEpisodes }}</h5>
              </div>
            </div>
          </div>
          
          <!-- Controlli -->
          <div class="counter flex gap-4 items-center ">
            <UButton 
              @click="addEps(anime)" 
              variant="solid" 
              class="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
              +
            </UButton>
            <UButton 
              @click="removeEps(anime)" 
              variant="solid" 
              class="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md transition duration-200">
              -
            </UButton>
            
          </div>
          <a 
              @click="removeAnime(anime)" 
              class="text-red-600 hover:text-red-400 text-sm cursor-pointer float-end text-right max-[680px]:my-4">
              Remove Anime
            </a>
        </div>
      </div>

      <div class="text-gray-400 text-center" v-else>
        There's nothing here, <NuxtLink class="underline" to="/">add anime to your list</NuxtLink>
      </div>

      <div v-if="limit">
       <NuxtLink to="/my-list"> <UButton class="text-center mx-auto mt-4 flex w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 rounded-lg py-2">
          Show All
        </UButton>  
      </NuxtLink>
      </div>

      <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>

    </div>
</template>

<script setup>

  const isOpen = ref(false);  

const props =defineProps({
    items: Array,
    limit: {
        type: Number,
        default: null
    }
})

const animeItems = computed(() => {
  return props.limit !== null ? props.items.slice(0, props.limit) : props.items;
});

const toast = useToast()
const { myAnimeList } = useTracking();

const addEps = (anime) => {
  if(anime.completed){
    return
   }
       anime.currentEps++
        if(anime.currentEps == anime.totalEpisodes){
        anime.completed = true
        toast.add({
            title: 'Congratulation, you completed this anime!',
            color: 'green'
      })
        return
       }
    }

    const removeEps = (anime) => {
        if(anime.currentEps <= 0){
        return
       }
       anime.currentEps--
       anime.completed && (anime.completed = false);

    }
    
    const removeAnime = (anime) => {
        const index = myAnimeList.value.findIndex((a) => a.id === anime.id);
        if (index > -1) { 
            myAnimeList.value.splice(index, 1); // 2nd parameter means remove one item only
        }
        toast.add({
            title: `${anime.title} removed with success!`,
            color: 'green'
        })
    }

    watch(myAnimeList, () => {
    localStorage.setItem('animeStorage', JSON.stringify(myAnimeList.value));
        }, { deep: true })

</script>

<style scoped>
.completed:after {
  content: 'COMPLETED';
  position: absolute;
  bottom: 5px;
  right: 15px;
  font-size: 28px;
  z-index: 0;
  opacity: 0.75;
  color:black;
  font-weight: bold;
}

@media (max-width: 768px) {
  .completed:after {
    content: none;
  }
}
</style>