<script setup lang="ts">
const route = useRoute()
const siteUrl = 'https://domaine-veuve-michel.fr'

useHead({
  link: [{ rel: 'canonical', href: () => `${siteUrl}${route.path === '/' ? '' : route.path}` }],
})

const { data: config } = await useGlobalConfig()

useSchemaOrg([
  defineWebSite({ name: 'Domaine Veuve Michel' }),
  defineOrganization({
    name: 'Domaine Veuve Michel',
    '@type': ['Organization', 'LocalBusiness'],
    additionalType: 'https://schema.org/Winery',
    telephone: config.value?.phone,
    email: config.value?.email,
    address: {
      streetAddress: 'Mas de l\'Église',
      postalCode: '34800',
      addressLocality: 'Octon',
      addressCountry: 'FR',
    },
  }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
