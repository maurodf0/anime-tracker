// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@formkit/auto-animate/nuxt', '@nuxtjs/pwa']

  pwa: {
    manifest: {
      name: 'Nome della tua app',
      short_name: 'App',
      description: 'Descrizione della tua app',
      lang: 'it',  // Imposta la lingua della tua PWA
      display: 'standalone', // Come verrà mostrata l'app (standalone = come una app nativa)
      background_color: '#ffffff', // Colore di sfondo
      theme_color: '#4DBA87', // Colore principale della tua app
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://your-api-url.com/.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'api-cache'
          }
        },
        {
          urlPattern: 'https://cdn.jsdelivr.net/.*',
          handler: 'CacheFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'cdn-cache'
          }
        }
      ]
    }
  }
})