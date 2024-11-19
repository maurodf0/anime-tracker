<template>
    <article>
        <h1>test</h1>
        {{ route.params.id }}

        {{ url }}
    </article>
</template>

<script setup>

const route = useRoute()
const toast = useToast();
const id = route.params.id;

const url = `https://api.jikan.moe/v4/anime/${id}`;



    const fetchSingleAnime = async (url) => {
        console.log('START');
    try {
    const {data, error} = await useFetch(url);
    if(error){
        toast.add({
        title: 'Error retriving data',
        color: 'red'
      })
    } else {
        console.log(data.value);
    }

} catch(error) {
      console.error('Errore durante la ricerca:', error);
    } finally {
      
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