import type { Cuvee } from '~/content/types'

interface RawSpecItem { label: string; value: string }

interface RawCuvee {
  name: string
  cepages: string
  millesime: string
  price: number
  description: string
  image?: { filename: string; alt: string }
  is_prestige: boolean
  spec_grid?: RawSpecItem[]
  degustation_eyebrow?: string
  degustation_heading?: string
  degustation_body?: string
  degustation_caption?: string
  histoire_eyebrow?: string
  histoire_heading?: string
  histoire_body?: string
  histoire_caption?: string
  video_url?: string
}

function mapCuvee(raw: RawCuvee, slug: string): Cuvee {
  return {
    slug,
    name: raw.name,
    cepages: raw.cepages,
    millesime: raw.millesime,
    price: raw.price,
    description: raw.description,
    image: raw.image?.filename ? raw.image : undefined,
    isPrestige: raw.is_prestige,
    specGrid: raw.spec_grid?.map((s) => ({ label: s.label, value: s.value })),
    degustation: raw.is_prestige
      ? {
          eyebrow: raw.degustation_eyebrow ?? '',
          heading: raw.degustation_heading ?? '',
          body: splitParagraphs(raw.degustation_body),
          caption: raw.degustation_caption,
        }
      : undefined,
    histoire: raw.is_prestige
      ? {
          eyebrow: raw.histoire_eyebrow ?? '',
          heading: raw.histoire_heading ?? '',
          body: splitParagraphs(raw.histoire_body),
          caption: raw.histoire_caption,
        }
      : undefined,
    videoUrl: raw.video_url,
  }
}

// useSbStories only exposes `.content`, which doesn't carry the story slug —
// fetch with full story objects instead so we can derive each cuvée's route slug.
async function useRawCuveeStories() {
  const api = useStoryblokApi()
  return await useAsyncData('cuvees-stories-raw', async () => {
    const stories = await api.getAll('cdn/stories', {
      starts_with: 'collections/cuvees/',
      version: import.meta.dev ? 'draft' : 'published',
    })
    return stories.map((s: any) => ({ slug: s.slug as string, content: s.content as RawCuvee }))
  })
}

export async function useCuvees() {
  const { data: raw, ...rest } = await useRawCuveeStories()
  const data = computed<Cuvee[]>(() => (raw.value ?? []).map((s) => mapCuvee(s.content, s.slug)))
  return { data, ...rest }
}

export async function useGammeCuvees() {
  const { data: all, ...rest } = await useCuvees()
  const data = computed(() => all.value.filter((c) => !c.isPrestige))
  return { data, ...rest }
}

export async function usePrestigeCuvee() {
  const { data: all, ...rest } = await useCuvees()
  const data = computed(() => all.value.find((c) => c.isPrestige))
  return { data, ...rest }
}
