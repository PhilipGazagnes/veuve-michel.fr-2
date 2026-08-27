<script setup lang="ts">
const { hero: homeHero, transmission: homeTransmission, univers: homeUnivers, seo: homeSeo } = await useHomeContent()
const { data: activityCards } = await useActivityCards()

useSeoMeta({
  title: homeSeo.value.title,
  description: homeSeo.value.description,
  ogTitle: homeSeo.value.title,
  ogDescription: homeSeo.value.description,
  ogImage: 'https://domaine-veuve-michel.fr/images/cover.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :heading="homeHero.heading"
      :subheading="homeHero.subheading"
      :image="homeHero.image"
      :cta-primary="homeHero.ctaPrimary"
      :cta-secondary="homeHero.ctaSecondary"
      :height="680"
      :height-mobile="490"
      text-align="center"
      desktop-align="center"
      mobile-align="bottom"
    />

    <SectionsMediaTextSection v-bind="homeTransmission" aspect-class="aspect-[4/3]" />

    <section class="border-t border-hairline bg-[#FAFAFA] px-6 py-14 md:px-14 md:pt-[100px] pb-[150px] bg-[url('/images/soil.png')] bg-left-bottom bg-no-repeat">
      <div class="mx-auto max-w-content">
        <div class="text-center">
          <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
            {{ homeUnivers.eyebrow }}
          </p>
          <h2 class="mt-2 font-serif text-[28px] text-ink md:text-[42px]">{{ homeUnivers.heading }}</h2>
        </div>
        <div class="mt-9 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-4 md:gap-6">
          <CardsActivityCard v-for="item in activityCards" :key="item.key" :item="item" />
        </div>
      </div>
    </section>
  </div>
</template>
