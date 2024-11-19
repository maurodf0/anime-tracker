<template>
    <UContainer class="max-w-[1080px] mx-auto px-4">
        <NuxtLink to="/"><h1 class="text-4xl my-5">AnimeTracker</h1></NuxtLink>

        <UForm @submit="searchAnime()">
        <UFormGroup help="Search for your anime">
        <UInput v-model="query" placeholder="Naruto"></UInput>
        </UFormGroup>
        <UButton variant="solid" :loading="pending">Search</UButton>
        </UForm>

        <slot />
    </UContainer>
</template>
