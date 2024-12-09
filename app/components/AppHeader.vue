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

<script setup>
    import { gsap } from 'gsap'

    const logo = ref(null);


    onMounted(() => {
        const Tracker = document.querySelector('.tracker')
        gsap.from(logo.value, {
            duration: 1,
            opacity: 0,
            y: -40,
            stagger: 0.1
        })

        gsap.fromTo(Tracker, {
            duration: 1,
            opacity: 0,
            y: -40,
            stagger: 0.1,
            letterSpacing: '10px',
            fontWeight: 'bold'
        }, {
            fontWeight: 'normal',
            letterSpacing: '0px',
            opacity: 1,
            y: 0,
        })
    
    })
 
</script>