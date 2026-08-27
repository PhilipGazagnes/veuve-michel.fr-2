<script setup lang="ts">
const {
  hero: evenementsHero,
  esprit: evenementsEsprit,
  programme: evenementsProgramme,
  cadre: evenementsCadre,
  parfaitPour: evenementsParfaitPour,
  cta: evenementsCta,
  seo: evenementsSeo,
} = await useEvenementsContent()

useSeoMeta({ title: evenementsSeo.value.title, description: evenementsSeo.value.description })

useSchemaOrg([
  defineService({
    name: 'Journées grillades & dégustation au Domaine Veuve Michel',
    description: evenementsHero.value.heading,
    serviceType: 'Réception événementielle',
  }),
])
</script>

<template>
  <div>
    <SectionsHeroSection
      :eyebrow="evenementsHero.eyebrow"
      :heading="evenementsHero.heading"
      :image="evenementsHero.image"
      gradient-from="#4d6b74"
      gradient-to="#2c4048"
      :height="420"
      :height-mobile="400"
      text-align="left"
      desktop-align="center"
      mobile-align="bottom"
    />

    <SectionsMediaTextSection v-bind="evenementsEsprit" reverse gradient-from="#e0d0b8" gradient-to="#c9b291" />

    <section class="border-t border-hairline bg-[#FAF6F0] px-6 py-12 text-center md:px-14 md:py-[72px]">
      <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
        {{ evenementsProgramme.eyebrow }}
      </p>
      <h2 class="mt-2 font-serif text-[26px] text-ink md:text-[30px]">{{ evenementsProgramme.heading }}</h2>
      <div class="mx-auto mt-9 grid max-w-content grid-cols-2 gap-8 md:grid-cols-4">
        <div v-for="item in evenementsProgramme.items" :key="item.title" class="flex flex-col items-center gap-3">
          <UiIconBadge :icon="item.icon" :size="56" />
          <h3 class="font-serif text-base text-ink md:text-[19px]">{{ item.title }}</h3>
          <p class="font-sans text-[13px] leading-relaxed text-body md:text-sm">{{ item.body }}</p>
        </div>
      </div>
    </section>

    <section class="px-6 py-10 md:px-14 md:py-14">
      <p class="text-center font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
        {{ evenementsCadre.eyebrow }}
      </p>
      <div class="mt-6">
        <SectionsPhotoMosaic />
      </div>
    </section>

    <section class="border-t border-hairline bg-[#FAF6F0] px-6 py-10 text-center md:px-14 md:py-12">
      <h2 class="font-serif text-xl text-ink md:text-2xl">{{ evenementsParfaitPour.heading }}</h2>
      <div class="mt-5 flex flex-wrap justify-center gap-3">
        <span
          v-for="chip in [...evenementsParfaitPour.chips, evenementsParfaitPour.lastChip]"
          :key="chip"
          class="rounded-full border border-[#e2d8ca] bg-white px-5 py-2.5 font-sans text-xs font-semibold text-maroon"
        >
          {{ chip }}
        </span>
      </div>
    </section>

    <SectionsCtaBand :heading="evenementsCta.heading" :note="evenementsCta.note" note-italic>
      <UiButtonCta href="tel:+330000000" label="04 •• •• •• ••" variant="solid" />
      <UiButtonCta to="/contact" label="Envoyer un email" variant="outline" />
    </SectionsCtaBand>
  </div>
</template>
