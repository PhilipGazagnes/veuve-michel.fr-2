<script setup lang="ts">
import type { CmsImage } from '~/content/types'

withDefaults(
  defineProps<{
    eyebrow: string
    heading: string
    body: string[]
    image?: CmsImage
    gradientFrom?: string
    gradientTo?: string
    caption?: string
    signature?: string
    reverse?: boolean
    bg?: 'white' | 'cream'
    headingLevel?: 'h1' | 'h2'
    aspectClass?: string
  }>(),
  {
    reverse: false,
    bg: 'white',
    headingLevel: 'h2',
    aspectClass: 'aspect-[4/3]',
  },
)
</script>

<template>
  <section
    class="px-6 py-14 md:px-14 md:py-[104px]"
    :class="[bg === 'cream' ? 'border-t border-hairline bg-[#FAF6F0]' : 'bg-white']"
  >
    <div
      class="mx-auto flex max-w-content flex-col-reverse gap-8 md:items-center md:gap-16"
      :class="reverse ? 'md:flex-row-reverse' : 'md:flex-row'"
    >
      <div class="w-full overflow-hidden rounded-card md:flex-1" :class="aspectClass">
        <UiPlaceholderImage
          :image="image"
          :gradient-from="gradientFrom"
          :gradient-to="gradientTo"
          :caption="caption"
        />
      </div>

      <div class="flex flex-col gap-4 md:flex-[1.05]">
        <p class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">{{ eyebrow }}</p>
        <component :is="headingLevel" class="font-serif text-[26px] leading-tight text-ink md:text-[42px]">
          {{ heading }}
        </component>
        <p v-for="(paragraph, i) in body" :key="i" class="font-sans text-[15px] leading-[1.8] text-body md:text-[16.5px]">
          {{ paragraph }}
        </p>
        <p v-if="signature" class="mt-1 font-serif text-xl italic text-maroon md:text-2xl">
          {{ signature }}
        </p>
        <slot />
      </div>
    </div>
  </section>
</template>
