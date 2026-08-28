<script setup lang="ts">
import type { CmsImage, Cta } from '~/content/types'

withDefaults(
  defineProps<{
    eyebrow?: string
    badge?: string
    heading: string
    subheading?: string
    image?: CmsImage
    gradientFrom?: string
    gradientTo?: string
    ctaPrimary?: Cta
    ctaSecondary?: Cta
    height?: number
    heightMobile?: number
    textAlign?: 'left' | 'center'
    desktopAlign?: 'center' | 'bottom'
    mobileAlign?: 'center' | 'bottom'
    headingLevel?: 'h1' | 'h2'
  }>(),
  {
    gradientFrom: '#6b5142',
    gradientTo: '#3a2a22',
    height: 440,
    textAlign: 'left',
    desktopAlign: 'center',
    mobileAlign: 'bottom',
    headingLevel: 'h1',
  },
)
</script>

<template>
  <section
    class="relative flex overflow-hidden"
    :style="{ '--h': `${heightMobile ?? height}px`, '--h-md': `${height}px` }"
    style="height: var(--h)"
  >
    <div class="absolute inset-0">
      <NuxtImg
        v-if="image?.filename"
        :src="image.filename"
        :alt="image.alt"
        class="h-full w-full object-cover"
        sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        densities="1x"
        width="1920"
        :height="height"
        preload
      />
      <div
        v-else
        class="h-full w-full"
        :style="{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-[#280a0a]/30 to-[#180a0a]/65" />
    </div>

    <div class="relative z-10 flex w-full px-6 md:px-14">
      <div
        class="mx-auto flex w-full max-w-content pb-9"
        :class="[
          mobileAlign === 'bottom' ? 'items-end' : 'items-center',
          desktopAlign === 'bottom' ? 'sm:items-end sm:pb-12' : 'sm:items-center sm:pb-0',
          textAlign === 'center' ? 'justify-center text-center' : 'justify-start text-left',
        ]"
      >
        <div class="flex flex-col gap-4" :class="textAlign === 'center' ? 'max-w-2xl items-center' : 'max-w-2xl items-start'">
          <UiBadgePill v-if="badge" :label="badge" tone="outline-light" />
          <p
            v-if="eyebrow"
            class="font-sans text-[10px] font-semibold uppercase tracking-label text-white/70 sm:text-[11px] sm:tracking-[0.3em]"
          >
            {{ eyebrow }}
          </p>
          <component
            :is="headingLevel"
            class="font-serif text-3xl leading-tight text-white sm:text-6xl sm:leading-[1.08]"
          >
            {{ heading }}
          </component>
          <p v-if="subheading" class="max-w-xl font-sans text-[15px] leading-relaxed text-white sm:text-lg">
            {{ subheading }}
          </p>
          <div v-if="ctaPrimary || ctaSecondary" class="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <UiButtonCta v-if="ctaPrimary" :to="ctaPrimary.to" :label="ctaPrimary.label" variant="solid" arrow block />
            <UiButtonCta
              v-if="ctaSecondary"
              :to="ctaSecondary.to"
              :label="ctaSecondary.label"
              variant="outline"
              tone="light"
              block
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 640px) {
  section {
    height: var(--h-md) !important;
  }
}
</style>
