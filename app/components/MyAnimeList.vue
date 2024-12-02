<template>
     <div v-if="filteredAnime.length" class="lg:grid lg:grid-cols-2 gap-4">
        <div
          v-for="anime in filteredAnime"
          :key="anime.id"
          class="flex flex-col md:flex-row bg-gray-900 border rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out items-center justify-between"
          :class="anime.completed ? 'border-green-400' : 'border-gray-700'">
          
          <!-- Sezione Immagine -->
          <div class="anime-info flex basis-8/12 flex-col md:flex-row mx-auto text-center md:text-left md:mx-2 gap-4 items-center mb-4 md:mb-0">
            <img :src="anime.img" class="w-24 h-24 rounded-lg object-cover" />
            
            <!-- Dati Anime -->
            <div class="anime-data flex flex-col justify-center">
              <h4 class="text-xl font-semibold text-white">{{ anime.title }}</h4>
              <div class="episodes flex mx-auto md:mx-0 text-sm text-gray-400 mt-2">
                <h5>{{ anime.currentEps }} / {{ anime.totalEpisodes }}</h5>
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
</template>

<script setup>

const toast = useToast()
const { myAnimeList } = useTracking();

const addEps = (anime) => {
        if(anime.currentEps == anime.totalEpisodes){
        anime.completed = true
        toast.add({
            title: 'You must insert data for search',
            description: 'Write your anime before start searching',
            color: 'red'
      })
        return
       }
       anime.currentEps++
      

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