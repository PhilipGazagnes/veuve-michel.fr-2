export interface CmsImage {
  filename: string
  alt: string
}

export interface Cta {
  label: string
  to: string
}

export interface HeroContent {
  eyebrow?: string
  heading: string
  subheading?: string
  image?: CmsImage
  ctaPrimary?: Cta
  ctaSecondary?: Cta
  badge?: string
}

export interface MediaTextContent {
  eyebrow: string
  heading: string
  body: string[]
  image?: CmsImage
  caption?: string
  signature?: string
}

export interface SeoFields {
  title: string
  description: string
}

export interface GlobalConfig {
  phone: string
  email: string
  addressLine: string
  legalPageLink: string
  showOrnaments: boolean
}

export interface Cuvee {
  slug: string
  name: string
  cepages: string
  millesime: string
  price: number
  description: string
  image?: CmsImage
  isPrestige: boolean
  specGrid?: { label: string; value: string }[]
  degustation?: MediaTextContent
  histoire?: MediaTextContent
  videoUrl?: string
}

export interface GiteInventoryItem {
  label: string
}

export interface Gite {
  slug: string
  name: string
  pricePerNight: number
  description: string
  images: CmsImage[]
  surfaceM2: string
  capacity: string
  rooms: string
  inventory: string[]
}

export interface ActivityCardContent {
  key: 'vins' | 'arboriculture' | 'gites' | 'evenements'
  title: string
  text: string
  to: string
}
