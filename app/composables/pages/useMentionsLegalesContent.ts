import type { SeoFields } from '~/content/types'

interface RawPageLegal {
  seo_title: string
  seo_description: string
  updated_at: string
  editeur_name: string
  editeur_siret: string
  editeur_address: string
  editeur_tva: string
  directeur_publication: string
  hebergeur_name: string
  hebergeur_address: string
  hebergeur_support_url: string
}

export async function useMentionsLegalesContent() {
  const { data: raw, ...rest } = await useSbStory<RawPageLegal>('mentions-legales', 'page-mentions-legales')

  const updatedAt = computed(() => raw.value?.updated_at ?? '')

  const editeur = computed(() => ({
    name: raw.value?.editeur_name ?? '',
    siret: raw.value?.editeur_siret ?? '',
    address: raw.value?.editeur_address ?? '',
    tva: raw.value?.editeur_tva ?? '',
    directeurPublication: raw.value?.directeur_publication ?? '',
  }))

  const hebergeur = computed(() => ({
    name: raw.value?.hebergeur_name ?? '',
    address: raw.value?.hebergeur_address ?? '',
    supportUrl: raw.value?.hebergeur_support_url ?? '',
  }))

  const seo = computed<SeoFields>(() => ({
    title: raw.value?.seo_title ?? '',
    description: raw.value?.seo_description ?? '',
  }))

  return { updatedAt, editeur, hebergeur, seo, ...rest }
}
