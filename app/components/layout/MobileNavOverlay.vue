<script setup lang="ts">
const props = defineProps<{ open: boolean; phone: string; email: string }>()
const emit = defineEmits<{ close: [] }>()

watch(
  () => props.open,
  (open) => {
    if (import.meta.client) {
      document.documentElement.style.overflow = open ? 'hidden' : ''
    }
  },
)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-150"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-maroon px-8 pb-10 pt-6"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute bottom-0 right-0 -z-10 opacity-[0.07]">
        <UiOliveBranch :width="220" :height="132" class="text-white" />
      </div>

      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 text-white" @click="emit('close')">
          <UiLogoMark :size="34" />
          <span class="font-script text-2xl leading-none">Veuve Michel</span>
        </NuxtLink>
        <button
          type="button"
          class="text-3xl font-light leading-none text-cream"
          aria-label="Fermer le menu"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <nav class="mt-8 flex flex-col">
        <NuxtLink
          v-for="item in NAV_ITEMS"
          :key="item.to"
          :to="item.to"
          class="border-b border-white/[0.16] py-5 font-serif text-3xl text-cream"
          @click="emit('close')"
        >
          {{ item.label }}
        </NuxtLink>
        <div class="pt-6">
          <UiButtonCta
            :to="CONTACT_ITEM.to"
            :label="CONTACT_ITEM.label"
            variant="outline"
            tone="light"
            block
            @click="emit('close')"
          />
        </div>
      </nav>

      <div class="mt-auto pt-10">
        <p class="font-sans text-[10px] uppercase tracking-label text-white/50">Nous joindre</p>
        <a :href="`tel:${phone.replace(/\s/g, '')}`" class="mt-2 block font-sans text-[15px] text-cream">{{ phone }}</a>
        <a :href="`mailto:${email}`" class="mt-1 block font-sans text-[15px] text-cream">{{ email }}</a>
      </div>
    </div>
  </Transition>
</template>
