<template>
    <UContainer class="max-w-[1080px] mx-auto px-4">
        <article>
            <h1 class="text-6xl font-weight mb-4">{{ anime.title }}</h1>
            <div class="info-wrapper flex justify-center gap-4">
                <img class="mb-4" :src="anime.images?.webp?.large_image_url" />
                <p>{{ anime.synopsis }}</p>
            </div>

        </article>
    </UContainer>
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