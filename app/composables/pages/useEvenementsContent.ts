import type { HeroContent, MediaTextContent, SeoFields } from '~/content/types'
import type { IconName } from '~/types/icons'

interface RawProgrammeItem { icon: IconName; title: string; body: string }

interface RawPageEvenements {
  hero_eyebrow: string
  hero_heading: string
  hero_image?: { filename: string; alt: string }
  esprit_eyebrow: string
  esprit_heading: string
  esprit_body: string
  esprit_image?: { filename: string; alt: string }
  esprit_caption: string
  programme_eyebrow: string
  programme_heading: string
  programme_items: RawProgrammeItem[]
  cadre_eyebrow: string
  parfait_heading: string
  parfait_chips: string
  parfait_last_chip: string
  cta_heading: string
  cta_note: string
  seo_title: string
  seo_description: string
}

export async function useEvenementsContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageEvenements>('evenements', 'page-evenements')

  const hero = computed<HeroContent>(() => ({
    eyebrow: raw.value?.hero_eyebrow,
    heading: raw.value?.hero_heading ?? '',
    image: raw.value?.hero_image?.filename ? raw.value.hero_image : undefined,
  }))

  const esprit = computed<MediaTextContent>(() => ({
    eyebrow: raw.value?.esprit_eyebrow ?? '',
    heading: raw.value?.esprit_heading ?? '',
    body: splitParagraphs(raw.value?.esprit_body),
    image: raw.value?.esprit_image?.filename ? raw.value.esprit_image : undefined,
    caption: raw.value?.esprit_caption,
  }))

  const programme = computed(() => ({
    eyebrow: raw.value?.programme_eyebrow ?? '',
    heading: raw.value?.programme_heading ?? '',
    items: (raw.value?.programme_items ?? []).map((i) => ({ icon: i.icon, title: i.title, body: i.body })),
  }))

  const cadre = computed(() => ({ eyebrow: raw.value?.cadre_eyebrow ?? '' }))

  const parfaitPour = computed(() => ({
    heading: raw.value?.parfait_heading ?? '',
    chips: splitCsv(raw.value?.parfait_chips),
    lastChip: raw.value?.parfait_last_chip ?? '',
  }))

  const cta = computed(() => ({
    heading: raw.value?.cta_heading ?? '',
    note: raw.value?.cta_note ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { hero, esprit, programme, cadre, parfaitPour, cta, seo, ...rest }
}
