<template>
    <UContainer class="max-w-[1080px] mx-auto px-4">
        <article>
            <h1 class="text-6xl font-weight mb-4">{{ anime.title }}</h1>
            <div class="info-wrapper flex justify-center gap-4">
                <div class="img-wrapper relative w-1/3">
                    <img class="mb-4" :src="anime.images?.webp?.large_image_url" />
                    <p 
                        :class="anime.score > 6 ? 'text-green-500' : 'text-red-500' "
                        class="absolute top-5 right-10 bg-slate-800 p-2 py-3 border rounded-full font-bold">{{anime.score}}</p>

                 </div>
                <div class="w-2/3">
                    <em>{{ anime.background }}</em>
                    <p class="mt-4">{{ anime.synopsis }}</p>
                </div>
            </div>

            <h2 class="text-2xl mb-4">Trailer</h2>
            <iframe width="560" height="315" :src="anime.trailer.embed_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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