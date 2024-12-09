<template>
    <header>
        <UContainer class="max-w-[1080px] mx-auto px-4 flex justify-between align-middle items-center">
                            <div class="overflow-hidden">
            <NuxtLink to="/">

                <h1 ref="logo" class="text-4xl my-5">Anime<span class="tracker">Tracker</span></h1></NuxtLink>
                </div>
            <ul>
                <li><NuxtLink to="/my-list/">My Anime</NuxtLink></li>
            </ul>
        </UContainer>
    </header>   


</template>

<style scoped>
    .tracker {
        color: #4ade80 !important;
        font-style: italic;
    }
</style>

