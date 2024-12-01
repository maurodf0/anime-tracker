import { ref } from 'vue'   

onMounted(() => {
    const storedList = localStorage.getItem('animeStorage');
    if (storedList) {
        myAnimeList.value = JSON.parse(storedList);
    }
});

export default function useTracking() {
    const myAnimeList = ref([]);
    const startTracking = (anime) => {
        
        console.log(anime);
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
            description: `${anime.value.title} is already in your list`,
            color: 'yellow',
        });
        return;
    }


    myAnimeList.value.push(newAnime);
        toast.add({
            title: 'Anime tracking with success',
            description: `You're added ${anime.value.title} to your anime tracked list`,
            color: 'green',
        })
   

    }

    return {
        startTracking,
        myAnimeList
    }

}