// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/fruit-explorer/'
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://www.fruityvice.com'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: [{ src: '~/plugins/localStorage.client.ts', mode: 'client' }],
  modules: [
    '@pinia/nuxt',
  ],
})
