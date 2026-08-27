<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'transparent' | 'solid'
    phone?: string
    email?: string
  }>(),
  {
    variant: 'transparent',
    phone: '04 •• •• •• ••',
    email: 'contact@veuvemichel.fr',
  },
)

const route = useRoute()
const menuOpen = ref(false)

const isTransparent = computed(() => props.variant === 'transparent')
</script>

<template>
  <header
    class="z-20 w-full"
    :class="isTransparent
      ? 'absolute inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent'
      : 'relative border-b border-hairline bg-white'"
  >
    <div class="flex w-full px-6 py-5 md:px-14 md:py-6">
      <div class="mx-auto flex w-full max-w-content items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3" :class="isTransparent ? 'text-white' : 'text-maroon'">
          <UiLogoMark :size="60" />
          <span class="flex flex-col leading-none">
            <span
              class="font-sans text-[9px] font-semibold uppercase tracking-[0.5em]"
              :class="isTransparent ? 'text-white/50' : 'text-muted'"
            >Domaine</span>
            <div class="font-script leading-[0.9] text-3xl relative -left-[2px] py-1.5">Veuve Michel</div>
            <span
              class="font-sans text-[9px] font-semibold uppercase tracking-[0.5em]"
              :class="isTransparent ? 'text-white/50' : 'text-muted/80'"
            >Octon · Hérault</span>
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-7 lg:flex">
          <NuxtLink
            v-for="item in NAV_ITEMS"
            :key="item.to"
            :to="item.to"
            class="border-b pb-0.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
            :class="[
              isTransparent ? 'text-white/85 hover:text-white' : 'text-body hover:text-maroon',
              isNavActive(route.path, item.to)
                ? (isTransparent ? 'border-white text-white' : 'border-maroon text-maroon')
                : 'border-transparent',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
          <UiButtonCta
            :to="CONTACT_ITEM.to"
            :label="CONTACT_ITEM.label"
            variant="outline"
            :tone="isTransparent ? 'light' : 'maroon'"
            size="sm"
          />
        </nav>

        <!-- Mobile burger -->
        <button
          type="button"
          class="flex flex-col items-end gap-[5px] lg:hidden"
          aria-label="Ouvrir le menu"
          @click="menuOpen = true"
        >
          <span class="block h-[2px] w-[25px]" :class="isTransparent ? 'bg-white' : 'bg-maroon'" />
          <span class="block h-[2px] w-[25px]" :class="isTransparent ? 'bg-white' : 'bg-maroon'" />
          <span class="block h-[2px] w-[25px]" :class="isTransparent ? 'bg-white' : 'bg-maroon'" />
        </button>
      </div>
    </div>
  </header>

  <LayoutMobileNavOverlay :open="menuOpen" :phone="phone" :email="email" @close="menuOpen = false" />
</template>
