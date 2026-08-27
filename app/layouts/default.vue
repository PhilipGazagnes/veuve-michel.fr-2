<script setup lang="ts">
const route = useRoute()
const headerVariant = computed(() => (route.meta.headerVariant as 'transparent' | 'solid') ?? 'transparent')

const { data: config } = await useGlobalConfig()
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <LayoutAppHeader :variant="headerVariant" :phone="config?.phone" :email="config?.email" />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter :show-ornaments="config?.showOrnaments ?? true" :address="config?.addressLine" />
  </div>
</template>
