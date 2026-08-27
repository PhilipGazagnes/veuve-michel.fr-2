<script setup lang="ts">
const {
  hero: vinsHero,
  video: vinsVideo,
  starCard: vinsStarCard,
  gamme: vinsGamme,
  orderBand: vinsOrderBand,
  seo: vinsSeo,
} = await useVinsContent()

useSeoMeta({
  title: vinsSeo.value.title,
  description: vinsSeo.value.description,
  ogTitle: vinsSeo.value.title,
  ogDescription: vinsSeo.value.description,
  ogImage: 'https://domaine-veuve-michel.fr/images/cave.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const { data: gammeCuvees } = await useGammeCuvees()
</script>

<template>
  <div>
    <SectionsHeroSection
      :eyebrow="vinsHero.eyebrow"
      :heading="vinsHero.heading"
      :image="vinsHero.image"
      :height="440"
      text-align="left"
      desktop-align="center"
      mobile-align="bottom"
    />

    <!-- Video band -->
    <section class="border-b border-hairline bg-[#FAF6F0] px-6 py-12 md:px-14 md:py-16">
      <div class="mx-auto flex max-w-content flex-col items-center gap-8 md:flex-row">
        <a
          :href="vinsVideo.videoUrl"
          target="_blank"
          rel="noopener"
          class="group relative block aspect-video w-full overflow-hidden rounded md:w-[420px] md:shrink-0"
        >
          <NuxtImg :src="vinsVideo.thumbnail.filename" :alt="vinsVideo.thumbnail.alt" class="h-full w-full object-cover" />
          <span class="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
            <span class="flex h-12 w-[68px] items-center justify-center rounded-lg bg-maroon/90">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="white"><path d="M0 0 16 9 0 18Z" /></svg>
            </span>
          </span>
        </a>
        <div class="flex-1">
          <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">{{ vinsVideo.eyebrow }}</p>
          <h2 class="mt-2 font-serif text-2xl text-ink md:text-[32px]">{{ vinsVideo.heading }}</h2>
          <p class="mt-3 max-w-[440px] font-sans text-[15px] leading-relaxed text-body">
            {{ vinsVideo.body }}
          </p>
        </div>
      </div>
    </section>

    <!-- Star card -->
    <section class="bg-white px-6 pb-10 pt-10 md:px-14 md:pb-10 md:pt-20">
      <div class="mx-auto flex max-w-content flex-col overflow-hidden rounded-card border border-hairline-strong shadow-card md:flex-row">
        <div class="w-full md:w-[300px] md:shrink-0">
          <div class="relative aspect-[4/3] md:aspect-auto md:h-full" style="background: linear-gradient(135deg, #efe7db, #dccbb8)">
            <span class="absolute bottom-1/2 left-1/2 h-[230px] w-[52px] -translate-x-1/2 translate-y-1/2 rounded-t-full bg-[#a5321f]/50" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-3 p-7 md:p-11">
          <UiBadgePill :label="vinsStarCard.badge" />
          <h2 class="font-serif text-[27px] text-ink md:text-[38px]">{{ vinsStarCard.heading }}</h2>
          <p class="max-w-[480px] font-sans text-[15px] leading-relaxed text-body">{{ vinsStarCard.body }}</p>
          <div class="mt-2 flex items-center justify-between gap-4 border-t border-hairline pt-4 sm:justify-start sm:gap-8">
            <span class="font-serif text-xl text-ink">•• €</span>
            <UiButtonCta :to="vinsStarCard.to" :label="vinsStarCard.ctaLabel" arrow variant="solid" />
          </div>
        </div>
      </div>
    </section>

    <!-- Gamme grid -->
    <section class="bg-white px-6 pb-16 pt-2 md:px-14 md:pb-[92px] md:pt-6">
      <div class="mx-auto max-w-content">
        <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">{{ vinsGamme.eyebrow }}</p>
        <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <CardsWineCard v-for="c in gammeCuvees" :key="c.slug" :cuvee="c" />
        </div>
      </div>
    </section>

    <SectionsCtaBand :eyebrow="vinsOrderBand.eyebrow" :heading="vinsOrderBand.heading" :note="vinsOrderBand.body">
      <UiButtonCta :to="vinsOrderBand.to" :label="vinsOrderBand.ctaLabel" arrow variant="solid" />
    </SectionsCtaBand>
  </div>
</template>
