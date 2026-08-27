<script setup lang="ts">
const {
  hero: gitesHero,
  intro: gitesIntro,
  lieuxCommuns: gitesLieuxCommuns,
  reservation: gitesReservation,
  seo: gitesSeo,
} = await useGitesPageContent()

useSeoMeta({ title: gitesSeo.value.title, description: gitesSeo.value.description })

const { data: gitesList } = await useGites()

useSchemaOrg(
  (gitesList.value ?? []).map((gite) =>
    defineLocalBusiness({
      '@id': `https://domaine-veuve-michel.fr/gites#${gite.slug}`,
      '@type': 'LodgingBusiness',
      name: gite.name,
      description: gite.description,
    }),
  ),
)
</script>

<template>
  <div>
    <SectionsHeroSection
      :eyebrow="gitesHero.eyebrow"
      :heading="gitesHero.heading"
      :image="gitesHero.image"
      gradient-from="#6b5142"
      gradient-to="#3a2a22"
      :height="400"
      :height-mobile="390"
      text-align="left"
      desktop-align="center"
      mobile-align="center"
    />

    <section class="px-6 pb-6 pt-12 text-center md:px-14 md:pb-4 md:pt-[72px]">
      <div class="mx-auto max-w-lg">
        <h2 class="font-serif text-[25px] text-ink md:text-[30px]">{{ gitesIntro.heading }}</h2>
        <p class="mt-3 font-sans text-[15px] leading-relaxed text-body">{{ gitesIntro.body }}</p>
      </div>
    </section>

    <section class="px-6 py-8 md:px-14 md:py-10">
      <div class="mx-auto flex max-w-content flex-col gap-7">
        <CardsGiteCard v-for="gite in gitesList" :key="gite.slug" :gite="gite" />
      </div>
    </section>

    <SectionsMediaTextSection v-bind="gitesLieuxCommuns" reverse gradient-from="#e6d9c8" gradient-to="#c9b291" />

    <SectionsCtaBand
      :heading="gitesReservation.heading"
      :note="gitesReservation.note"
      note-italic
    >
      <UiButtonCta to="/contact" label="Nous contacter" variant="solid" />
    </SectionsCtaBand>
  </div>
</template>
