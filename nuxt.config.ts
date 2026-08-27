// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@storyblok/nuxt',
  ],

  storyblok: {
    accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
    apiOptions: { region: 'eu' },
    bridge: false,
  },

  imports: {
    dirs: ['composables/cms', 'composables/pages'],
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://domaine-veuve-michel.fr',
    name: 'Domaine Veuve Michel',
  },

  googleFonts: {
    families: {
      Lora: [400, 500, 600],
      Raleway: [300, 400, 500, 600, 700],
      Playball: true,
    },
    display: 'swap',
    preconnect: true,
  },

  image: {
    quality: 82,
  },

  nitro: {
    prerender: {
      failOnError: true,
      routes: [
        '/',
        '/contact',
        '/vins',
        '/vins/cuvee-prestige',
        '/gites',
        '/evenements',
        '/arboriculture',
        '/mentions-legales',
      ],
    },
  },
})
