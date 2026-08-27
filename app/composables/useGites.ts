import type { Gite } from '~/content/types'

interface RawGite {
  name: string
  price_per_night: number
  description: string
  images?: { filename: string; alt: string }[]
  surface_m2: string
  capacity: string
  rooms: string
  inventory: string
}

function mapGite(raw: RawGite, slug: string): Gite {
  return {
    slug,
    name: raw.name,
    pricePerNight: raw.price_per_night,
    description: raw.description,
    images: raw.images ?? [],
    surfaceM2: raw.surface_m2,
    capacity: raw.capacity,
    rooms: raw.rooms,
    inventory: splitLines(raw.inventory),
  }
}

export async function useGites() {
  const api = useStoryblokApi()
  const { data: raw, ...rest } = await useAsyncData('gites-stories-raw', async () => {
    const stories = await api.getAll('cdn/stories', {
      starts_with: 'collections/gites/',
      version: import.meta.dev ? 'draft' : 'published',
    })
    return stories.map((s: any) => ({ slug: s.slug as string, content: s.content as RawGite }))
  })
  const data = computed<Gite[]>(() => (raw.value ?? []).map((s) => mapGite(s.content, s.slug)))
  return { data, ...rest }
}
