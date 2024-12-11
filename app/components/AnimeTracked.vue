<template>
    <div>
        <div v-if="animeItems.length" class="lg:grid lg:grid-cols-2 gap-4">
          <div
            v-for="anime in animeItems"
            :key="anime.id"
            class="flex relative flex-col md:flex-row bg-gray-900 border rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out items-center justify-between single-anime"
            :class="anime.completed ? 'border-green-400 completed' : 'border-gray-700'">
            
            <!-- Sezione Immagine -->
            <div class="anime-info flex basis-8/12 flex-col md:flex-row mx-auto text-center md:text-left md:mx-2 gap-4 items-center mb-4 md:mb-0">
              <img :src="anime.img" class="w-24 h-auto rounded-lg object-cover" />
              
              <!-- Dati Anime -->
              <div class="anime-data flex flex-col justify-center">
                <h4 class="text-xl font-semibold text-white">{{ anime.title }}</h4>
                <div @click="isOpen = !isOpen" class="episodes flex mx-auto md:mx-0 text-sm text-gray-400 mt-2">
                  <h5 >{{ anime.currentEps }} / {{ anime.totalEpisodes }}</h5>
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

        <UModal v-model="isOpen">
          <div class="p-4">
          <h4>Insert episodes seen</h4>
          <UForm @submit="updateEps(anime)"
            class="flex items-center py-2 w-full gap-4">
          <UFormGroup class="py-2 w-full" :required="true" name="episodes">
              <UInput 
                v-model="animeupdateCurrentEps" 
                placeholder="Episodes seen"
                type="number"
                max="anime.totalEpisodes"   
                class="w-full bg-neutral-800 text-neutral-100 border-neutral-600 focus:ring-indigo-500"
              />
          </UFormGroup>
          <UButton 
            variant="solid" 
            :loading="pending"
            icon="i-heroicons-outline-magnifying-glass"
            class="bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors rounded-lg px-6 py-2"
            type="submit" >
            Update
        </UButton>
        </UForm>
      </div>
    </UModal>

      <div v-if="limit">
       <NuxtLink to="/my-list"> <UButton class="text-center mx-auto mt-4 flex w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 rounded-lg py-2">
          Show All
        </UButton>  
      </NuxtLink>
      </div>

   
    </div>
</template>

<script setup>

import { gsap } from 'gsap';


  const isOpen = ref(false);  
  const animeupdateCurrentEps = ref(0);

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

const openModal = (anime) => {
  selectedAnime.value = anime;
  animeupdateCurrentEps.value = anime.currentEps;
  isOpen.value = true;
};

const updateEps = () => {
  if (selectedAnime.value) {
    selectedAnime.value.currentEps = animeupdateCurrentEps.value;
    if (selectedAnime.value.currentEps >= selectedAnime.value.totalEpisodes) {
      selectedAnime.value.completed = true;
      toast.add({
        title: 'Congratulations, you completed this anime!',
        color: 'green',
      });
    } else {
      selectedAnime.value.completed = false;
    }
    isOpen.value = false;
  }
};

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