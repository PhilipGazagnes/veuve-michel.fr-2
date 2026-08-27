<script setup lang="ts">
type Variant = 'solid' | 'outline'
type Tone = 'maroon' | 'light'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    label: string
    to?: string
    href?: string
    variant?: Variant
    tone?: Tone
    size?: Size
    arrow?: boolean
    block?: boolean
  }>(),
  {
    variant: 'solid',
    tone: 'maroon',
    size: 'md',
    arrow: false,
    block: false,
  },
)

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-6 py-3.5 text-xs',
  lg: 'px-7 py-4 text-xs',
}

const variantClasses = computed(() => {
  if (props.variant === 'solid') {
    return 'bg-maroon text-white hover:bg-maroon-dark border border-maroon'
  }
  // outline
  return props.tone === 'light'
    ? 'bg-transparent text-white border border-white/65 hover:bg-white/10'
    : 'bg-transparent text-maroon border border-maroon/40 hover:bg-maroon/5'
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    class="inline-flex items-center justify-center gap-2 rounded font-sans font-semibold uppercase tracking-[0.15em] transition-colors duration-150"
    :class="[sizeClasses[size], variantClasses, block ? 'w-full' : '']"
  >
    <span>{{ label }}</span>
    <span v-if="arrow" aria-hidden="true">→</span>
  </component>
</template>
