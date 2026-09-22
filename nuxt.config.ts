// https://nuxt.com/docs/api/configuration/nuxt-config

// Coupe-circuit SEO global : quand DISCOURAGE_SEO=true, le site entier passe
// en noindex/nofollow, le sitemap est désactivé et robots.txt bloque tous les
// robots (y compris les bots IA). Utile pour les environnements de
// preview/staging qu'on ne veut jamais voir indexés.
const discourageSeo = process.env.DISCOURAGE_SEO === 'true'

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
    // Propagé à @nuxtjs/robots (meta tag + header) et @nuxtjs/sitemap
    // (exclusion des routes) par nuxt-site-config.
    indexable: !discourageSeo,
  },

  robots: {
    disallow: discourageSeo ? ['/'] : [],
    blockAiBots: discourageSeo,
    blockNonSeoBots: discourageSeo,
  },

  sitemap: {
    enabled: !discourageSeo,
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
    quality: 70,
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
        '/aide',
      ],
    },
  },

  routeRules: {
    // Guide interne protégé (voir netlify/edge-functions/aide-auth.ts) : exclu de
    // l'indexation et du sitemap public.
    '/aide': { robots: false },
  },
})
