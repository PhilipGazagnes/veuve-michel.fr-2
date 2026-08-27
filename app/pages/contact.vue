<script setup lang="ts">
definePageMeta({ headerVariant: 'solid' })

const {
  titleBand: contactTitleBand,
  infoRows: contactInfoRows,
  mapCaption: contactMapCaption,
  activities: contactActivities,
  seo: contactSeo,
} = await useContactContent()
const { data: activityCards } = await useActivityCards()

useSeoMeta({ title: contactSeo.value.title, description: contactSeo.value.description })
</script>

<template>
  <div>
    <SectionsTitleBand :eyebrow="contactTitleBand.eyebrow" :heading="contactTitleBand.heading" />

    <section class="px-6 py-9 md:px-14 md:py-14">
      <div class="mx-auto flex max-w-content flex-col gap-8 md:flex-row md:items-stretch md:gap-14">
        <div class="flex flex-1 flex-col justify-center gap-6">
          <div v-for="row in contactInfoRows" :key="row.label" class="flex items-center gap-4">
            <UiIconBadge :icon="row.icon" :size="44" />
            <div>
              <p class="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{{ row.label }}</p>
              <p class="whitespace-pre-line font-serif text-lg text-ink">{{ row.value }}</p>
            </div>
          </div>
        </div>
        <div class="min-h-[220px] flex-[1.2] md:min-h-[380px]">
          <UiMapPlaceholder :caption="contactMapCaption" />
        </div>
      </div>
    </section>

    <section class="border-t border-hairline bg-[#FAF6F0] px-6 py-9 text-center md:px-14 md:py-14">
      <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
        {{ contactActivities.eyebrow }}
      </p>
      <h2 class="mt-2 font-serif text-2xl text-ink md:text-[28px]">{{ contactActivities.heading }}</h2>
      <div class="mx-auto mt-7 grid max-w-content grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-5">
        <CardsActivityCard v-for="item in activityCards" :key="item.key" :item="item" :show-text="false" />
      </div>
    </section>
  </div>
</template>
