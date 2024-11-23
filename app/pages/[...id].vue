<template>
    <UContainer class="max-w-[1080px] mx-auto px-4 min-h-screen">
        <article>
            <h1 class="text-6xl font-weight mb-4">{{ anime.title }} - {{ anime.title_japanese && anime.title_japanese }}</h1>
            <div class="info-wrapper flex justify-center gap-4">
                <div class="img-wrapper relative w-1/4">
                    <img class="mb-4" :src="anime.images?.webp?.large_image_url" />
                    <p 
                        :class="anime.score > 6 ? 'text-green-500' : 'text-red-500' "
                        class="absolute top-5 right-5 bg-slate-800 px-2 py-1 border rounded-full font-bold">{{anime.score}}</p>

                 </div>
                <div class="w-3/4">
                    <em>{{ anime.background }}</em>
                    <p class="mt-4">{{ anime.synopsis }}</p>
                </div>
            </div>

            <h2 class="text-2xl mb-4">Trailer</h2>
            <iframe width="560" height="315" :src="anime?.trailer?.embed_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </article>
        <UButton class="my-8" @click="anime && startTracking(anime)" variant="solid">Start Tracking</UButton>
    </UContainer>
    <UNotifications />
</template>

<script setup>

import {watch} from 'vue';

const route = useRoute()
const toast = useToast();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
let anime = ref({});
const { startTracking, myAnimeList } = useAnimeList();


const url = `https://api.jikan.moe/v4/anime/${id}`;


const fetchSingleAnime = async (url) => {
    try {
        const dataFetch = await $fetch(url);
        if (!dataFetch) {
            toast.add({
                title: 'Error retrieving data',
                color: 'red',
            });
        } else {
            anime.value = dataFetch.data;
        }
    } catch (error) {
        toast.add({
            title: 'Error fetching anime',
            description: error.message,
            color: 'red',
        });
    }
};


watch(() => id, (newId) => {
    if (newId) {
        const updatedUrl = `https://api.jikan.moe/v4/anime/${newId}`;
        fetchSingleAnime(updatedUrl);
    }
}, { immediate: true });