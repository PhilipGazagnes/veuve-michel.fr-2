import type { SeoFields } from '~/content/types'
import type { IconName } from '~/types/icons'

interface RawInfoRow { icon: IconName; label: string; value: string }

interface RawPageContact {
  title_eyebrow: string
  title_heading: string
  info_rows: RawInfoRow[]
  map_caption: string
  activities_eyebrow: string
  activities_heading: string
  seo_title: string
  seo_description: string
}

export async function useContactContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageContact>('contact', 'page-contact')

  const titleBand = computed(() => ({
    eyebrow: raw.value?.title_eyebrow ?? '',
    heading: raw.value?.title_heading ?? '',
  }))

  // Phone/email are always sourced from the global config (see contact.vue) so they only
  // ever need to be entered once — any phone/mail row saved on this page's own content is ignored.
  const infoRows = computed(() =>
    (raw.value?.info_rows ?? [])
      .filter((r) => r.icon !== 'phone' && r.icon !== 'mail')
      .map((r) => ({ icon: r.icon, label: r.label, value: r.value })),
  )

  const mapCaption = computed(() => raw.value?.map_caption ?? '')

  const activities = computed(() => ({
    eyebrow: raw.value?.activities_eyebrow ?? '',
    heading: raw.value?.activities_heading ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { titleBand, infoRows, mapCaption, activities, seo, ...rest }
}
