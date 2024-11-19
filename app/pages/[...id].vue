<template>
    <article>
        <h1>{{ anime.title }}</h1>
        <img :src="anime.images?.webp?.large_image_url" />
        <p>{{ anime.synopsis }}</p>

    </article>
</template>

<script setup>

const route = useRoute()
const toast = useToast();
const id = route.params.id;

let anime = ref({});

const url = `https://api.jikan.moe/v4/anime/${id}`;



    const fetchSingleAnime = async (url) => {
   const dataFecth = await $fetch(url);

    if(!dataFecth){
        toast.add({
        title: 'Error retriving data',
        color: 'red'
      })
    } else {
        anime.value = dataFecth.data;
        console.log(anime.value);
    }

}

watch( () => id, (newId) => {
        if (newId) {
            fetchSingleAnime(url);
        }
    },
    { immediate: true }
);
</script>