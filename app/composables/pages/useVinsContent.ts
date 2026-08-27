import type { HeroContent, SeoFields } from '~/content/types'

interface RawPageVins {
  hero_eyebrow: string
  hero_heading: string
  hero_image?: { filename: string; alt: string }
  video_eyebrow: string
  video_heading: string
  video_body: string
  video_url: string
  video_thumbnail?: { filename: string; alt: string }
  star_badge: string
  star_heading: string
  star_body: string
  star_cta_label: string
  star_to: string
  gamme_eyebrow: string
  order_eyebrow: string
  order_heading: string
  order_body: string
  order_cta_label: string
  order_to: string
  seo_title: string
  seo_description: string
}

export async function useVinsContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageVins>('vins', 'page-vins')

  const hero = computed<HeroContent>(() => ({
    eyebrow: raw.value?.hero_eyebrow,
    heading: raw.value?.hero_heading ?? '',
    image: raw.value?.hero_image?.filename ? raw.value.hero_image : undefined,
  }))

  const video = computed(() => ({
    eyebrow: raw.value?.video_eyebrow ?? '',
    heading: raw.value?.video_heading ?? '',
    body: raw.value?.video_body ?? '',
    videoUrl: raw.value?.video_url ?? '',
    thumbnail: raw.value?.video_thumbnail ?? { filename: '', alt: '' },
  }))

  const starCard = computed(() => ({
    badge: raw.value?.star_badge ?? '',
    heading: raw.value?.star_heading ?? '',
    body: raw.value?.star_body ?? '',
    ctaLabel: raw.value?.star_cta_label ?? '',
    to: raw.value?.star_to ?? '',
  }))

  const gamme = computed(() => ({ eyebrow: raw.value?.gamme_eyebrow ?? '' }))

  const orderBand = computed(() => ({
    eyebrow: raw.value?.order_eyebrow ?? '',
    heading: raw.value?.order_heading ?? '',
    body: raw.value?.order_body ?? '',
    ctaLabel: raw.value?.order_cta_label ?? '',
    to: raw.value?.order_to ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { hero, video, starCard, gamme, orderBand, seo, ...rest }
}
