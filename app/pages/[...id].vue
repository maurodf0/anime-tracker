<template>
    <article>
        <h1>test</h1>
        {{ route.params.id }}
    </article>
</template>

<script setup>

const route = useRoute()
const id = route.params.id;

const url = `https://api.jikan.moe/v4/anime/${id}`;

onMounted( () => {
    const {data, error} = await useFetch(url);
    if(error){
        toast.add({
        title: 'Error retriving data',
        description: 'Write your anime before start searching',
        color: 'red'
      })
    }
}) 


const searchAnime = async (number = 1) => {
    if (!query.value){
      toast.add({
        title: 'You must insert data for search',
        description: 'Write your anime before start searching',
        color: 'red'
      })
    }; 

    pending.value = true;
    const url = `https://api.jikan.moe/v4/anime?q=${query.value}&page=${number}`;
    try {
    const {data, error} = await useFetch(url);
    if(error.value){
      toast.add({
        title: 'Error in fetching data',
        description: error.value,
        color: 'red'
      })
    } else {
      searchResult.value = data.value.data;
      pagination.value = data.value.pagination;
      console.log(searchResult.value);
      console.log(pagination.value);
    }

    } catch(error) {
      console.error('Errore durante la ricerca:', error);
    } finally {
      pending.value = false;
     
    }
  }
</script>