<template>
    <article 
    class="prose max-w-none dark:prose-invert prose-pre:bg-white prose-pre:text-gray-800 dark:prose-pre:text-gray-200 dark:prose-pre:bg-gray-800">
        <ContentDoc>
            <template #not-found>
             <h1>Nothing Found (404)</h1>
             <p>Blog post not found</p>
            </template>
            <template  v-slot="{ doc }">
                <div class="grid grid-cols-6 gap-16">
                <div :class="{'col-span-6 md:col-span-4': doc.toc, 'col-span-6': !doc.toc}">
                    <ContentRenderer :value="doc" />
                </div>
                <div v-if="doc.toc" class="hidden md:col-span-2 md:block not-prose">
             
                        <aside class="sticky top-8">
                            <div class="font-semibold mb-2">
                                Table of contents
                            </div>
                            <nav>
                                <TocLinks :links="doc.body.toc.links" :activeId="activeId" />
                            </nav>
                        </aside>
    
                </div>
            </div>
            </template>
          
       
        </ContentDoc>
    </article>
</template>
<script setup >
const activeId = ref(null);

    onMounted( () => {
        let elements = [];

        const callback = (entries) => {
            entries.forEach( entry => {
                if(entry.isIntersecting){
                    activeId.value = entry.target.id
                }
            })
        }
        const observer = new IntersectionObserver(callback, {
        threshold: 0.5,
        root: null
        });

        setTimeout( () => {
        
        elements = document.querySelectorAll('h2, h3');

        elements.forEach( e => {
            observer.observe(e);
        } )

        onBeforeUnmount( () => {
            elements.forEach( el => {
                observer.unobserve(el);
            })
        })

        }, 250)
     })

  
    
    
</script>