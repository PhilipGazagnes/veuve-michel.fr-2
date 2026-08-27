import type { HeroContent, MediaTextContent, SeoFields } from '~/content/types'

interface RawPageGites {
  hero_eyebrow: string
  hero_heading: string
  hero_image?: { filename: string; alt: string }
  intro_heading: string
  intro_body: string
  lieux_communs_eyebrow: string
  lieux_communs_heading: string
  lieux_communs_body: string
  lieux_communs_image?: { filename: string; alt: string }
  lieux_communs_caption: string
  reservation_heading: string
  reservation_note: string
  reservation_email_cta_label: string
  reservation_to: string
  seo_title: string
  seo_description: string
}

export async function useGitesPageContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageGites>('gites', 'page-gites')

  const hero = computed<HeroContent>(() => ({
    eyebrow: raw.value?.hero_eyebrow,
    heading: raw.value?.hero_heading ?? '',
    image: raw.value?.hero_image?.filename ? raw.value.hero_image : undefined,
  }))

  const intro = computed(() => ({
    heading: raw.value?.intro_heading ?? '',
    body: raw.value?.intro_body ?? '',
  }))

  const lieuxCommuns = computed<MediaTextContent>(() => ({
    eyebrow: raw.value?.lieux_communs_eyebrow ?? '',
    heading: raw.value?.lieux_communs_heading ?? '',
    body: splitParagraphs(raw.value?.lieux_communs_body),
    image: raw.value?.lieux_communs_image?.filename ? raw.value.lieux_communs_image : undefined,
    caption: raw.value?.lieux_communs_caption,
  }))

  const reservation = computed(() => ({
    heading: raw.value?.reservation_heading ?? '',
    note: raw.value?.reservation_note ?? '',
    emailCtaLabel: raw.value?.reservation_email_cta_label ?? '',
    to: raw.value?.reservation_to ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { hero, intro, lieuxCommuns, reservation, seo, ...rest }
}
