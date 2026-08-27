import type { ActivityCardContent, GlobalConfig } from '~/content/types'

interface RawConfig {
  phone: string
  email: string
  address_line: string
  legal_page_link: string
  show_ornaments: boolean
  activity_cards: { key: string; title: string; text: string; to: string }[]
}

// Cached under one key so Home/Contact/layout all share a single fetch.
async function useRawGlobalConfig() {
  return await useSbStory<RawConfig>('config/global', 'global-config-raw')
}

export async function useGlobalConfig() {
  const { data: raw, ...rest } = await useRawGlobalConfig()
  const data = computed<GlobalConfig | null>(() =>
    raw.value
      ? {
          phone: raw.value.phone,
          email: raw.value.email,
          addressLine: raw.value.address_line,
          legalPageLink: raw.value.legal_page_link,
          showOrnaments: raw.value.show_ornaments,
        }
      : null,
  )
  return { data, ...rest }
}

export async function useActivityCards() {
  const { data: raw, ...rest } = await useRawGlobalConfig()
  const data = computed<ActivityCardContent[]>(() =>
    (raw.value?.activity_cards ?? []).map((c) => ({
      key: c.key as ActivityCardContent['key'],
      title: c.title,
      text: c.text,
      to: c.to,
    })),
  )
  return { data, ...rest }
}
