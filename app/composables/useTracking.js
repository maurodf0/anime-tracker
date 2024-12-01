import { ref, watch, reactive, onMounted } from 'vue';

export default function useTracking() {

    onMounted(() => {
        const storedList = localStorage.getItem('animeStorage');
        if (storedList) {
            myAnimeList.value = JSON.parse(storedList);
        }
    });

    const toast = useToast(); 
    const myAnimeList = ref([]);
    const startTracking = (anime) => {
        const newAnime = reactive({
         
            id: anime.mal_id,
            title: anime.title,
            img: anime.images?.webp?.large_image_url,
            totalEpisodes: anime.episodes,
            currentEps: 0,
            completed: ref(false),
    });

    if (myAnimeList.value.some((a) => a.id === newAnime.id)) {
        toast.add({
            title: 'Anime already tracked',
            description: `${anime.title} is already in your list`,
            color: 'yellow',
        });
        return;
    }


    myAnimeList.value.push(newAnime);
        toast.add({
            title: 'Anime tracking with success',
            description: `You're added ${anime.title} to your anime tracked list`,
            color: 'green',
        })
   

    }

    watch(myAnimeList, () => {
        localStorage.setItem('animeStorage', JSON.stringify(myAnimeList.value));
       
            }, { deep: true })
    

    return {
        startTracking,
        myAnimeList
    }

}