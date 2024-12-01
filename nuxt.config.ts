// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  head: {
        link: [
          { rel: 'manifest', href: '/manifest.webmanifest' },
        ],
      },
    },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      name: 'AnimeTracker',
      short_name: 'AnimeTracker',
      description: 'AnimeTracker: The App for Track your animes, choose every anime you are watching and start tracking it',
      display: 'standalone',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'],
      globIgnores: ['**/node_modules/**/*', '**/@fs/**/*'], // Escludi node_modules e percorsi @fs
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  }
})