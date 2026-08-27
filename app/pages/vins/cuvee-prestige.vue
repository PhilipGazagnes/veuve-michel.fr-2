<script setup lang="ts">
import { usePrestigeCuvee } from '~/composables/useCuvees'

definePageMeta({ headerVariant: 'solid' })

const { data: cuvee } = await usePrestigeCuvee()

useSeoMeta({
  title: `${cuvee.value!.name} — Domaine Veuve Michel`,
  description: cuvee.value!.description,
  ogTitle: cuvee.value!.name,
  ogDescription: cuvee.value!.description,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineProduct({
    name: cuvee.value!.name,
    description: cuvee.value!.description,
    brand: { name: 'Domaine Veuve Michel' },
  }),
])
</script>

<template>
  <div v-if="cuvee">
    <div class="mx-auto max-w-content px-6 pt-5 md:px-14">
      <NuxtLink to="/vins" class="font-sans text-sm text-muted transition-colors hover:text-maroon">
        ← Retour à tous les vins
      </NuxtLink>
    </div>

    <section class="px-6 pb-6 pt-4 md:px-14 md:pb-6 md:pt-8">
      <div class="mx-auto flex max-w-content flex-col gap-8 md:flex-row md:items-start md:gap-[52px]">
        <div class="w-full md:sticky md:top-6 md:w-[340px] md:shrink-0">
          <div class="aspect-[3/4] overflow-hidden rounded-card">
            <UiPlaceholderImage gradient-from="#efe7db" gradient-to="#dccbb8" />
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
          <UiBadgePill label="Cuvée d'exception" />
          <h1 class="font-serif text-[33px] leading-tight text-ink md:text-[44px]">{{ cuvee.name }}</h1>
          <p class="font-serif text-base italic text-[#8a6f5f] md:text-lg">Notre bouteille d'exception</p>
          <p class="font-serif text-2xl text-maroon md:text-[28px]">{{ cuvee.price }} €</p>
          <div class="border-t border-[#eee2d3]" />
          <p class="max-w-[480px] font-sans text-[15px] leading-[1.85] text-body md:text-base">
            {{ cuvee.description }}
          </p>
          <SectionsSpecGrid :items="cuvee.specGrid!" />
          <UiButtonCta
            to="/contact"
            label="Commander — nous contacter"
            arrow
            variant="solid"
            class="mt-1 justify-center md:justify-start"
          />
          <p class="font-sans text-[13px] italic text-muted">
            Vitrine du domaine — la commande se fait en direct avec la famille.
          </p>
        </div>
      </div>
    </section>

    <SectionsMediaTextSection
      v-if="cuvee.degustation"
      v-bind="cuvee.degustation"
      bg="cream"
      reverse
      aspect-class="aspect-[16/11]"
    />

    <SectionsMediaTextSection
      v-if="cuvee.histoire"
      v-bind="cuvee.histoire"
      bg="white"
      aspect-class="aspect-[16/11]"
    />
  </div>
</template>
