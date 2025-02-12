// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: ['~/plugins/axios', { src: '~/plugins/localStorage.client.ts', mode: 'client' }],
  modules: [
    '@pinia/nuxt',
  ],
})
