<script setup lang="ts">
const {
  hero: arboricultureHero,
  geste: arboricultureGeste,
  steps: arboricultureSteps,
  cta: arboricultureCta,
  seo: arboricultureSeo,
} = await useArboricultureContent()

useSeoMeta({ title: arboricultureSeo.value.title, description: arboricultureSeo.value.description })
</script>

<template>
  <div>
    <SectionsHeroSection
      :badge="arboricultureHero.badge"
      :heading="arboricultureHero.heading"
      :image="arboricultureHero.image"
      gradient-from="#6a7548"
      gradient-to="#3f4a2e"
      :height="420"
      :height-mobile="400"
      text-align="left"
      desktop-align="bottom"
      mobile-align="bottom"
    />

    <SectionsMediaTextSection v-bind="arboricultureGeste" reverse gradient-from="#e2e5cf" gradient-to="#cdd4b0" />

    <section class="border-t border-hairline bg-[#FAF6F0] px-6 py-12 md:px-14 md:py-[72px]">
      <p class="mb-9 font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
        {{ arboricultureSteps.eyebrow }}
      </p>
      <SectionsStepList :items="arboricultureSteps.items" gradient-from="#e2e5cf" gradient-to="#cdd4b0" />
    </section>

    <section class="border-t border-hairline bg-white px-6 py-10 md:px-14 md:py-14">
      <div class="mx-auto flex max-w-content flex-col flex-wrap items-start justify-between gap-8 md:flex-row md:items-center">
        <div class="max-w-md">
          <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
            {{ arboricultureCta.eyebrow }}
          </p>
          <h2 class="mt-2 font-serif text-2xl text-ink md:text-[28px]">{{ arboricultureCta.heading }}</h2>
        </div>
        <UiButtonCta :to="arboricultureCta.to" :label="arboricultureCta.ctaLabel" arrow variant="solid" block class="md:w-auto" />
      </div>
    </section>
  </div>
</template>
