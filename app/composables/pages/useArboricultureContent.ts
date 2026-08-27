import type { HeroContent, MediaTextContent, SeoFields } from '~/content/types'

interface RawStepItem { title: string; body: string }

interface RawPageArboriculture {
  hero_badge: string
  hero_heading: string
  hero_image?: { filename: string; alt: string }
  geste_eyebrow: string
  geste_heading: string
  geste_body: string
  geste_image?: { filename: string; alt: string }
  geste_caption: string
  demarche_eyebrow: string
  demarche_steps: RawStepItem[]
  cta_eyebrow: string
  cta_heading: string
  cta_label: string
  cta_to: string
  seo_title: string
  seo_description: string
}

export async function useArboricultureContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageArboriculture>('arboriculture', 'page-arboriculture')

  const hero = computed<HeroContent>(() => ({
    badge: raw.value?.hero_badge,
    heading: raw.value?.hero_heading ?? '',
    image: raw.value?.hero_image?.filename ? raw.value.hero_image : undefined,
  }))

  const geste = computed<MediaTextContent>(() => ({
    eyebrow: raw.value?.geste_eyebrow ?? '',
    heading: raw.value?.geste_heading ?? '',
    body: splitParagraphs(raw.value?.geste_body),
    image: raw.value?.geste_image?.filename ? raw.value.geste_image : undefined,
    caption: raw.value?.geste_caption,
  }))

  const steps = computed(() => ({
    eyebrow: raw.value?.demarche_eyebrow ?? '',
    items: (raw.value?.demarche_steps ?? []).map((s) => ({ title: s.title, body: s.body })),
  }))

  const cta = computed(() => ({
    eyebrow: raw.value?.cta_eyebrow ?? '',
    heading: raw.value?.cta_heading ?? '',
    ctaLabel: raw.value?.cta_label ?? '',
    to: raw.value?.cta_to ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { hero, geste, steps, cta, seo, ...rest }
}
