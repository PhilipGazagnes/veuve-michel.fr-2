import type { HeroContent, MediaTextContent, SeoFields } from '~/content/types'

interface RawPageHome {
  hero_heading: string
  hero_subheading: string
  hero_image?: { filename: string; alt: string }
  hero_cta_primary_label: string
  hero_cta_primary_to: string
  hero_cta_secondary_label: string
  hero_cta_secondary_to: string
  transmission_eyebrow: string
  transmission_heading: string
  transmission_body: string
  transmission_image?: { filename: string; alt: string }
  transmission_caption: string
  transmission_signature: string
  univers_eyebrow: string
  univers_heading: string
  seo_title: string
  seo_description: string
}

export async function useHomeContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageHome>('home', 'page-home')

  const hero = computed<HeroContent>(() => ({
    heading: raw.value?.hero_heading ?? '',
    subheading: raw.value?.hero_subheading,
    image: raw.value?.hero_image?.filename ? raw.value.hero_image : undefined,
    ctaPrimary: raw.value ? { label: raw.value.hero_cta_primary_label, to: raw.value.hero_cta_primary_to } : undefined,
    ctaSecondary: raw.value ? { label: raw.value.hero_cta_secondary_label, to: raw.value.hero_cta_secondary_to } : undefined,
  }))

  const transmission = computed<MediaTextContent>(() => ({
    eyebrow: raw.value?.transmission_eyebrow ?? '',
    heading: raw.value?.transmission_heading ?? '',
    body: splitParagraphs(raw.value?.transmission_body),
    image: raw.value?.transmission_image?.filename ? raw.value.transmission_image : undefined,
    caption: raw.value?.transmission_caption,
    signature: raw.value?.transmission_signature,
  }))

  const univers = computed(() => ({
    eyebrow: raw.value?.univers_eyebrow ?? '',
    heading: raw.value?.univers_heading ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { hero, transmission, univers, seo, ...rest }
}
