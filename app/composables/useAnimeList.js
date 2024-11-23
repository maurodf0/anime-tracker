export const useAnimeList = () => {
    const myAnimeList = ref(
        JSON.parse(localStorage.getItem('animeStorage')) || [] // Recupera i dati salvati o crea un array vuoto
    );
    const toast = useToast();

// Funzione per iniziare a tracciare un anime
const startTracking = (anime) => {
    const newAnime = {
        id: anime.mal_id,
        title: anime.title,
        img: anime.images?.webp?.large_image_url,
        totalEpisodes: anime.episodes,
        currentEps: 0,
    };

   
    if (myAnimeList.value.some((a) => a.id === newAnime.id)) {
        toast.add({
            title: 'Anime already tracked',
            description: `${anime.value.title} is already in your list`,
            color: 'yellow',
        });
        return;
    }

    // Aggiungi il nuovo anime
    myAnimeList.value.push(newAnime);

    toast.add({
        title: 'Anime tracking with success',
        description: `You've added ${anime.title} to your anime tracked list`,
        color: 'green',
    });

    console.log('Updated myAnimeList:', myAnimeList.value);
    watch(myAnimeList, () => {
        localStorage.setItem('animeStorage', JSON.stringify(myAnimeList.value));
    }, { deep: true });
};

return { 
    startTracking,
    myAnimeList
}
}

