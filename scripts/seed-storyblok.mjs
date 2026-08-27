// Idempotent Storyblok content-model + content seed script.
// Usage: node --env-file=.env scripts/seed-storyblok.mjs
//
// Creates nestable + root components via the Management API, then folders
// and stories, then publishes every non-folder story. Safe to re-run: it
// looks up existing components/stories by name/slug and updates in place
// rather than erroring on conflict.

const SPACE_ID = process.env.STORYBLOK_SPACE_ID
const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN

if (!SPACE_ID || !TOKEN) {
  console.error('Missing STORYBLOK_SPACE_ID or STORYBLOK_MANAGEMENT_TOKEN env vars.')
  process.exit(1)
}

const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function sb(path, opts = {}, attempt = 0) {
  await sleep(350) // stay under Storyblok's ~6 req/s Management API rate limit
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
      ...opts.headers,
    },
  })
  if (res.status === 429 && attempt < 5) {
    const wait = 1000 * (attempt + 1)
    console.log(`  rate limited, retrying in ${wait}ms…`)
    await sleep(wait)
    return sb(path, opts, attempt + 1)
  }
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`${opts.method ?? 'GET'} ${path} -> ${res.status}: ${body}`)
  }
  return res.status === 204 ? null : res.json()
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

const section = (name) => ({ type: 'section', keys: [] , display_name: name })

const nestableComponents = [
  {
    name: 'step_item',
    display_name: 'Étape (démarche)',
    schema: {
      title: { type: 'text', display_name: 'Titre' },
      body: { type: 'textarea', display_name: 'Texte' },
    },
  },
  {
    name: 'programme_item',
    display_name: 'Élément du programme',
    schema: {
      icon: {
        type: 'option',
        display_name: 'Icône',
        options: [
          { name: 'Flamme', value: 'flame' },
          { name: 'Verre de vin', value: 'wine' },
          { name: 'Vagues', value: 'waves' },
          { name: 'Personnes', value: 'users' },
        ],
      },
      title: { type: 'text', display_name: 'Titre' },
      body: { type: 'textarea', display_name: 'Texte' },
    },
  },
  {
    name: 'contact_info_row',
    display_name: 'Ligne de contact',
    schema: {
      icon: {
        type: 'option',
        display_name: 'Icône',
        options: [
          { name: 'Téléphone', value: 'phone' },
          { name: 'Email', value: 'mail' },
          { name: 'Adresse', value: 'map-pin' },
          { name: 'Horaires', value: 'clock' },
        ],
      },
      label: { type: 'text', display_name: 'Libellé' },
      value: { type: 'textarea', display_name: 'Valeur' },
    },
  },
  {
    name: 'spec_item',
    display_name: 'Caractéristique (fiche vin)',
    schema: {
      label: { type: 'text', display_name: 'Libellé' },
      value: { type: 'text', display_name: 'Valeur' },
    },
  },
  {
    name: 'activity_card_item',
    display_name: 'Carte activité',
    schema: {
      key: {
        type: 'option',
        display_name: 'Clé',
        options: [
          { name: 'Vins', value: 'vins' },
          { name: 'Arboriculture', value: 'arboriculture' },
          { name: 'Gîtes', value: 'gites' },
          { name: 'Événements', value: 'evenements' },
        ],
      },
      title: { type: 'text', display_name: 'Titre' },
      text: { type: 'textarea', display_name: 'Texte' },
      to: { type: 'text', display_name: 'Lien' },
    },
  },
]

const rootComponents = [
  {
    name: 'config',
    display_name: 'Configuration globale',
    schema: {
      phone: { type: 'text', display_name: 'Téléphone' },
      email: { type: 'text', display_name: 'Email' },
      address_line: { type: 'text', display_name: 'Adresse (ligne complète)' },
      legal_page_link: { type: 'text', display_name: 'Lien mentions légales' },
      show_ornaments: { type: 'boolean', display_name: 'Afficher les ornements décoratifs', default_value: true },
      activity_cards: {
        type: 'bloks',
        display_name: 'Cartes "Nos univers"',
        restrict_components: true,
        component_whitelist: ['activity_card_item'],
      },
    },
  },
  {
    name: 'page_home',
    display_name: 'Page — Accueil',
    schema: {
      hero_sec: section('Hero'),
      hero_heading: { type: 'text', display_name: 'Titre hero' },
      hero_subheading: { type: 'textarea', display_name: 'Sous-titre hero' },
      hero_image: { type: 'asset', display_name: 'Image hero', filetypes: ['images'] },
      hero_cta_primary_label: { type: 'text', display_name: 'CTA principal — libellé' },
      hero_cta_primary_to: { type: 'text', display_name: 'CTA principal — lien' },
      hero_cta_secondary_label: { type: 'text', display_name: 'CTA secondaire — libellé' },
      hero_cta_secondary_to: { type: 'text', display_name: 'CTA secondaire — lien' },
      transmission_sec: section('Transmission'),
      transmission_eyebrow: { type: 'text', display_name: 'Transmission — kicker' },
      transmission_heading: { type: 'text', display_name: 'Transmission — titre' },
      transmission_body: { type: 'textarea', display_name: 'Transmission — texte (paragraphes séparés par une ligne vide)' },
      transmission_image: { type: 'asset', display_name: 'Transmission — image', filetypes: ['images'] },
      transmission_caption: { type: 'text', display_name: 'Transmission — légende photo' },
      transmission_signature: { type: 'text', display_name: 'Transmission — signature' },
      univers_sec: section('Nos univers'),
      univers_eyebrow: { type: 'text', display_name: 'Univers — kicker' },
      univers_heading: { type: 'text', display_name: 'Univers — titre' },
      seo_sec: section('SEO'),
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'page_vins',
    display_name: 'Page — Nos vins',
    schema: {
      hero_sec: section('Hero'),
      hero_eyebrow: { type: 'text', display_name: 'Hero — kicker' },
      hero_heading: { type: 'text', display_name: 'Hero — titre' },
      hero_image: { type: 'asset', display_name: 'Hero — image', filetypes: ['images'] },
      video_sec: section('Vidéo'),
      video_eyebrow: { type: 'text', display_name: 'Vidéo — kicker' },
      video_heading: { type: 'text', display_name: 'Vidéo — titre' },
      video_body: { type: 'textarea', display_name: 'Vidéo — texte' },
      video_url: { type: 'text', display_name: 'Vidéo — URL YouTube' },
      video_thumbnail: { type: 'asset', display_name: 'Vidéo — vignette', filetypes: ['images'] },
      star_sec: section('Cuvée star'),
      star_badge: { type: 'text', display_name: 'Star — badge' },
      star_heading: { type: 'text', display_name: 'Star — titre' },
      star_body: { type: 'textarea', display_name: 'Star — texte' },
      star_cta_label: { type: 'text', display_name: 'Star — CTA libellé' },
      star_to: { type: 'text', display_name: 'Star — CTA lien' },
      gamme_sec: section('Gamme'),
      gamme_eyebrow: { type: 'text', display_name: 'Gamme — kicker' },
      order_sec: section('Commander'),
      order_eyebrow: { type: 'text', display_name: 'Commander — kicker' },
      order_heading: { type: 'text', display_name: 'Commander — titre' },
      order_body: { type: 'textarea', display_name: 'Commander — texte' },
      order_cta_label: { type: 'text', display_name: 'Commander — CTA libellé' },
      order_to: { type: 'text', display_name: 'Commander — CTA lien' },
      seo_sec: section('SEO'),
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'page_gites',
    display_name: 'Page — Gîtes',
    schema: {
      hero_sec: section('Hero'),
      hero_eyebrow: { type: 'text', display_name: 'Hero — kicker' },
      hero_heading: { type: 'text', display_name: 'Hero — titre' },
      hero_image: { type: 'asset', display_name: 'Hero — image', filetypes: ['images'] },
      intro_sec: section('Intro'),
      intro_heading: { type: 'text', display_name: 'Intro — titre' },
      intro_body: { type: 'textarea', display_name: 'Intro — texte' },
      lieux_communs_sec: section('Lieux communs'),
      lieux_communs_eyebrow: { type: 'text', display_name: 'Lieux communs — kicker' },
      lieux_communs_heading: { type: 'text', display_name: 'Lieux communs — titre' },
      lieux_communs_body: { type: 'textarea', display_name: 'Lieux communs — texte' },
      lieux_communs_image: { type: 'asset', display_name: 'Lieux communs — image', filetypes: ['images'] },
      lieux_communs_caption: { type: 'text', display_name: 'Lieux communs — légende photo' },
      reservation_sec: section('Réservation'),
      reservation_heading: { type: 'text', display_name: 'Réservation — titre' },
      reservation_note: { type: 'textarea', display_name: 'Réservation — note' },
      reservation_email_cta_label: { type: 'text', display_name: 'Réservation — CTA email libellé' },
      reservation_to: { type: 'text', display_name: 'Réservation — lien contact' },
      seo_sec: section('SEO'),
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'page_evenements',
    display_name: 'Page — Événements',
    schema: {
      hero_sec: section('Hero'),
      hero_eyebrow: { type: 'text', display_name: 'Hero — kicker' },
      hero_heading: { type: 'text', display_name: 'Hero — titre' },
      hero_image: { type: 'asset', display_name: 'Hero — image', filetypes: ['images'] },
      esprit_sec: section('L\'esprit'),
      esprit_eyebrow: { type: 'text', display_name: 'Esprit — kicker' },
      esprit_heading: { type: 'text', display_name: 'Esprit — titre' },
      esprit_body: { type: 'textarea', display_name: 'Esprit — texte' },
      esprit_image: { type: 'asset', display_name: 'Esprit — image', filetypes: ['images'] },
      esprit_caption: { type: 'text', display_name: 'Esprit — légende photo' },
      programme_sec: section('Au programme'),
      programme_eyebrow: { type: 'text', display_name: 'Programme — kicker' },
      programme_heading: { type: 'text', display_name: 'Programme — titre' },
      programme_items: {
        type: 'bloks',
        display_name: 'Programme — éléments',
        restrict_components: true,
        component_whitelist: ['programme_item'],
      },
      cadre_sec: section('Le cadre'),
      cadre_eyebrow: { type: 'text', display_name: 'Cadre — kicker' },
      parfait_sec: section('Parfait pour'),
      parfait_heading: { type: 'text', display_name: 'Parfait pour — titre' },
      parfait_chips: { type: 'text', display_name: 'Parfait pour — chips (séparés par des virgules)' },
      parfait_last_chip: { type: 'text', display_name: 'Parfait pour — dernier chip (desktop)' },
      cta_sec: section('CTA'),
      cta_heading: { type: 'text', display_name: 'CTA — titre' },
      cta_note: { type: 'textarea', display_name: 'CTA — note' },
      seo_sec: section('SEO'),
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'page_arboriculture',
    display_name: 'Page — Arboriculture',
    schema: {
      hero_sec: section('Hero'),
      hero_badge: { type: 'text', display_name: 'Hero — badge' },
      hero_heading: { type: 'text', display_name: 'Hero — titre' },
      hero_image: { type: 'asset', display_name: 'Hero — image', filetypes: ['images'] },
      geste_sec: section('Le geste'),
      geste_eyebrow: { type: 'text', display_name: 'Geste — kicker' },
      geste_heading: { type: 'text', display_name: 'Geste — titre' },
      geste_body: { type: 'textarea', display_name: 'Geste — texte' },
      geste_image: { type: 'asset', display_name: 'Geste — image', filetypes: ['images'] },
      geste_caption: { type: 'text', display_name: 'Geste — légende photo' },
      demarche_sec: section('Notre démarche'),
      demarche_eyebrow: { type: 'text', display_name: 'Démarche — kicker' },
      demarche_steps: {
        type: 'bloks',
        display_name: 'Démarche — étapes',
        restrict_components: true,
        component_whitelist: ['step_item'],
      },
      cta_sec: section('CTA'),
      cta_eyebrow: { type: 'text', display_name: 'CTA — kicker' },
      cta_heading: { type: 'text', display_name: 'CTA — titre' },
      cta_label: { type: 'text', display_name: 'CTA — libellé' },
      cta_to: { type: 'text', display_name: 'CTA — lien' },
      seo_sec: section('SEO'),
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'page_contact',
    display_name: 'Page — Contact',
    schema: {
      title_sec: section('Titre'),
      title_eyebrow: { type: 'text', display_name: 'Titre — kicker' },
      title_heading: { type: 'text', display_name: 'Titre — titre' },
      info_sec: section('Coordonnées'),
      info_rows: {
        type: 'bloks',
        display_name: 'Coordonnées — lignes',
        restrict_components: true,
        component_whitelist: ['contact_info_row'],
      },
      map_caption: { type: 'text', display_name: 'Carte — légende' },
      activities_sec: section('Activités'),
      activities_eyebrow: { type: 'text', display_name: 'Activités — kicker' },
      activities_heading: { type: 'text', display_name: 'Activités — titre' },
      seo_sec: section('SEO'),
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'cuvee',
    display_name: 'Cuvée (vin)',
    schema: {
      name: { type: 'text', display_name: 'Nom' },
      cepages: { type: 'text', display_name: 'Cépages' },
      millesime: { type: 'text', display_name: 'Millésime' },
      price: { type: 'number', display_name: 'Prix (€)' },
      description: { type: 'textarea', display_name: 'Description' },
      image: { type: 'asset', display_name: 'Photo', filetypes: ['images'] },
      is_prestige: { type: 'boolean', display_name: 'Cuvée phare (fiche dédiée)', default_value: false },
      prestige_sec: section('Fiche dédiée (cuvée phare uniquement)'),
      spec_grid: {
        type: 'bloks',
        display_name: 'Caractéristiques',
        restrict_components: true,
        component_whitelist: ['spec_item'],
      },
      degustation_eyebrow: { type: 'text', display_name: 'Dégustation — kicker' },
      degustation_heading: { type: 'text', display_name: 'Dégustation — titre' },
      degustation_body: { type: 'textarea', display_name: 'Dégustation — texte' },
      degustation_caption: { type: 'text', display_name: 'Dégustation — légende photo' },
      histoire_eyebrow: { type: 'text', display_name: 'Histoire — kicker' },
      histoire_heading: { type: 'text', display_name: 'Histoire — titre' },
      histoire_body: { type: 'textarea', display_name: 'Histoire — texte' },
      histoire_caption: { type: 'text', display_name: 'Histoire — légende photo' },
      video_url: { type: 'text', display_name: 'Vidéo — URL YouTube' },
    },
  },
  {
    name: 'gite',
    display_name: 'Gîte',
    schema: {
      name: { type: 'text', display_name: 'Nom' },
      price_per_night: { type: 'number', display_name: 'Prix / nuit (€)' },
      description: { type: 'textarea', display_name: 'Description' },
      images: { type: 'multiasset', display_name: 'Photos', filetypes: ['images'] },
      surface_m2: { type: 'text', display_name: 'Surface (m²)' },
      capacity: { type: 'text', display_name: 'Capacité (pers.)' },
      rooms: { type: 'text', display_name: 'Chambres' },
      inventory: { type: 'textarea', display_name: 'Équipements (un par ligne)' },
    },
  },
]

async function upsertComponent(def, existingByName) {
  const existing = existingByName.get(def.name)
  const payload = {
    component: {
      name: def.name,
      display_name: def.display_name,
      schema: def.schema,
      is_root: def.isRoot ?? true,
      is_nestable: def.isNestable ?? false,
    },
  }
  if (existing) {
    await sb(`/components/${existing.id}`, { method: 'PUT', body: JSON.stringify(payload) })
    console.log(`  updated component: ${def.name}`)
  }
  else {
    await sb('/components', { method: 'POST', body: JSON.stringify(payload) })
    console.log(`  created component: ${def.name}`)
  }
}

async function seedComponents() {
  console.log('Seeding components…')
  const { components } = await sb('/components?per_page=100')
  const byName = new Map(components.map((c) => [c.name, c]))

  for (const def of nestableComponents) {
    await upsertComponent({ ...def, isRoot: false, isNestable: true }, byName)
  }
  for (const def of rootComponents) {
    await upsertComponent({ ...def, isRoot: true, isNestable: false }, byName)
  }
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

async function findStoryBySlug(fullSlug) {
  const { stories } = await sb(`/stories?with_slug=${encodeURIComponent(fullSlug)}`)
  return stories[0] ?? null
}

async function upsertStory({ slug, name, content, parentId, isFolder = false }) {
  const fullSlug = parentId ? undefined : slug
  // with_slug matches full_slug; for nested stories we look up by name+parent instead.
  let existing = null
  if (parentId) {
    const { stories } = await sb(`/stories?with_parent=${parentId}&per_page=100`)
    existing = stories.find((s) => s.slug === slug) ?? null
  }
  else {
    existing = await findStoryBySlug(slug)
  }

  const payload = {
    story: {
      name,
      slug,
      parent_id: parentId ?? 0,
      is_folder: isFolder,
      content: isFolder ? undefined : content,
    },
    publish: isFolder ? undefined : 1,
  }

  let story
  if (existing) {
    story = (await sb(`/stories/${existing.id}`, { method: 'PUT', body: JSON.stringify(payload) })).story
    console.log(`  updated story: ${existing.full_slug || slug}`)
  }
  else {
    story = (await sb('/stories', { method: 'POST', body: JSON.stringify(payload) })).story
    console.log(`  created story: ${story.full_slug || slug}`)
  }
  return story
}

const para = (...lines) => lines.join('\n\n')

async function seedContent() {
  console.log('Seeding folders + stories…')

  const configFolder = await upsertStory({ slug: 'config', name: 'Config', isFolder: true })
  const collectionsFolder = await upsertStory({ slug: 'collections', name: 'Collections', isFolder: true })
  const cuveesFolder = await upsertStory({
    slug: 'cuvees',
    name: 'Cuvées',
    isFolder: true,
    parentId: collectionsFolder.id,
  })
  const gitesFolder = await upsertStory({
    slug: 'gites',
    name: 'Gîtes',
    isFolder: true,
    parentId: collectionsFolder.id,
  })

  const activityCards = [
    { component: 'activity_card_item', key: 'vins', title: 'Vins', text: 'Des cépages méridionaux vinifiés avec élégance.', to: '/vins' },
    { component: 'activity_card_item', key: 'arboriculture', title: 'Arboriculture', text: 'De jeunes vergers pour préparer le domaine de demain.', to: '/arboriculture' },
    { component: 'activity_card_item', key: 'gites', title: 'Gîtes', text: 'Une maison de village rénovée, au cœur du domaine.', to: '/gites' },
    { component: 'activity_card_item', key: 'evenements', title: 'Événements', text: 'Grillades et dégustations au bord du lac.', to: '/evenements' },
  ]

  await upsertStory({
    slug: 'global',
    name: 'Configuration globale',
    parentId: configFolder.id,
    content: {
      component: 'config',
      phone: '04 •• •• •• ••',
      email: 'contact@veuvemichel.fr',
      address_line: 'Veuve Michel — Mas de l\'Église, 34800 Octon, France',
      legal_page_link: '/mentions-legales',
      show_ornaments: true,
      activity_cards: activityCards,
    },
  })

  await upsertStory({
    slug: 'home',
    name: 'Accueil',
    content: {
      component: 'page_home',
      hero_heading: 'Enracinés & tournés vers l\'avenir',
      hero_subheading: 'Vins de caractère, arboriculture, gîtes et événements — sur les sols rougeâtres du lac du Salagou.',
      hero_image: { filename: '/images/cover.jpg', alt: 'Rangs de vigne du domaine au couchant, près du lac du Salagou' },
      hero_cta_primary_label: 'Découvrir nos vins',
      hero_cta_primary_to: '/vins',
      hero_cta_secondary_label: 'Réserver un gîte',
      hero_cta_secondary_to: '/gites',
      transmission_eyebrow: 'La transmission',
      transmission_heading: 'Une histoire de famille qui continue',
      transmission_body: para(
        'Au Mas de l\'Église, à Octon, le domaine se transmet de main en main. Le père se retire peu à peu ; le fils reprend le flambeau, fidèle à l\'esprit des lieux.',
        'Une même terre, des sols rougeâtres façonnés par le lac du Salagou, et l\'envie d\'écrire la suite sans rien renier du passé.',
      ),
      transmission_caption: 'Photo — le père & le fils dans les vignes',
      transmission_signature: 'La famille Michel',
      univers_eyebrow: 'Nos univers',
      univers_heading: 'Quatre activités, une même terre',
      seo_title: 'Domaine Veuve Michel — Vins, gîtes & arboriculture à Octon, Hérault',
      seo_description: 'Domaine familial à Octon, au bord du lac du Salagou : vins de caractère, gîtes de charme, arboriculture durable et événements au domaine.',
    },
  })

  await upsertStory({
    slug: 'vins',
    name: 'Nos vins',
    content: {
      component: 'page_vins',
      hero_eyebrow: 'Nos vins',
      hero_heading: 'Cépages méridionaux & élégance',
      hero_image: { filename: '/images/cave.jpg', alt: 'Chai et barriques du Domaine Veuve Michel' },
      video_eyebrow: 'En vidéo',
      video_heading: 'Le gérant vous présente nos vins',
      video_body: 'Quelques minutes dans le chai et les vignes, pour comprendre notre approche du terroir et notre façon de vinifier.',
      video_url: 'https://www.youtube.com/watch?v=-UTU2k5hhWA&t=11s',
      video_thumbnail: { filename: '/images/video-thumb.png', alt: 'Le gérant vous présente nos vins' },
      star_badge: 'La cuvée star',
      star_heading: 'Notre bouteille d\'exception',
      star_body: 'La cuvée qui incarne le domaine : élevée avec patience, elle réunit le meilleur de nos parcelles sur les sols rougeâtres du Salagou.',
      star_cta_label: 'Voir la fiche',
      star_to: '/vins/cuvee-prestige',
      gamme_eyebrow: 'La gamme',
      order_eyebrow: 'Commander',
      order_heading: 'Commander nos vins',
      order_body: 'Vitrine du domaine — la commande se fait directement par téléphone ou par email, en direct avec la famille.',
      order_cta_label: 'Nous contacter',
      order_to: '/contact',
      seo_title: 'Nos vins — Domaine Veuve Michel',
      seo_description: 'Découvrez la gamme de vins du Domaine Veuve Michel, vinifiés sur les sols rougeâtres du lac du Salagou, à Octon dans l\'Hérault.',
    },
  })

  await upsertStory({
    slug: 'gites',
    name: 'Gîtes',
    content: {
      component: 'page_gites',
      hero_eyebrow: 'Nos gîtes',
      hero_heading: 'Séjourner au cœur du domaine',
      intro_heading: 'Une maison ancienne, entièrement rénovée',
      intro_body: 'Au cœur d\'Octon, une maison de village restaurée avec soin accueille deux gîtes indépendants. Un pied-à-terre idéal pour explorer le lac du Salagou, les vignes et l\'arrière-pays héraultais.',
      lieux_communs_eyebrow: 'Lieux communs',
      lieux_communs_heading: 'Des espaces partagés, pensés pour se retrouver',
      lieux_communs_body: 'Cour intérieure, jardin ombragé et terrasse commune prolongent le séjour à l\'extérieur, entre les deux gîtes. Un lieu de passage où l\'on croise volontiers la famille et les autres hôtes.',
      lieux_communs_caption: 'Photo — cour et jardin communs',
      reservation_heading: 'Réserver votre séjour',
      reservation_note: 'Pour le moment, la réservation se fait par téléphone ou par email, en direct avec la famille.',
      reservation_email_cta_label: 'Envoyer un email',
      reservation_to: '/contact',
      seo_title: 'Nos gîtes — Domaine Veuve Michel',
      seo_description: 'Deux gîtes indépendants dans une maison de village rénovée à Octon, au cœur du Domaine Veuve Michel, près du lac du Salagou.',
    },
  })

  await upsertStory({
    slug: 'evenements',
    name: 'Événements',
    content: {
      component: 'page_evenements',
      hero_eyebrow: 'Nos événements',
      hero_heading: 'Grillades & vins au bord du lac du Salagou',
      esprit_eyebrow: 'L\'esprit',
      esprit_heading: 'Comme à la campagne, autour du feu et d\'un bon verre',
      esprit_body: 'Le temps d\'une journée, le domaine ouvre ses terres en bordure du lac. On allume le feu, on débouche les cuvées, on partage un repas à l\'ombre des arbres — sans chichi, à la bonne franquette.',
      esprit_caption: 'Photo — grillade sous les arbres',
      programme_eyebrow: 'Au programme',
      programme_heading: 'Les ingrédients d\'une belle journée',
      programme_items: [
        { component: 'programme_item', icon: 'flame', title: 'Grillades locales', body: 'Viandes et légumes de producteurs voisins, cuits au feu de bois.' },
        { component: 'programme_item', icon: 'wine', title: 'Dégustation des vins', body: 'Nos cuvées servies à la fraîche, commentées par la famille.' },
        { component: 'programme_item', icon: 'waves', title: 'Baignade au lac', body: 'Le lac du Salagou à deux pas, pour se rafraîchir entre deux verres.' },
        { component: 'programme_item', icon: 'users', title: 'Rencontre avec les vignerons', body: 'Un moment simple et vrai, au contact de celles et ceux qui font le domaine.' },
      ],
      cadre_eyebrow: 'Le cadre',
      parfait_heading: 'Parfait pour…',
      parfait_chips: 'Anniversaires,Groupes d\'amis,Événements de famille',
      parfait_last_chip: 'Séminaires',
      cta_heading: 'Organisons votre journée',
      cta_note: 'Contactez-nous par téléphone ou email pour en parler et construire votre événement.',
      seo_title: 'Événements — Domaine Veuve Michel',
      seo_description: 'Grillades et dégustations au bord du lac du Salagou : organisez votre événement au Domaine Veuve Michel, à Octon.',
    },
  })

  await upsertStory({
    slug: 'arboriculture',
    name: 'Arboriculture',
    content: {
      component: 'page_arboriculture',
      hero_badge: 'Initiative en développement',
      hero_heading: 'Arboriculture : préparer le domaine de demain',
      geste_eyebrow: 'Le geste',
      geste_heading: 'Faire évoluer le domaine face au changement climatique',
      geste_body: 'Le climat change, et le domaine évolue avec lui. Certaines vignes en fin de vie laissent place à de jeunes arbres fruitiers, mieux adaptés aux étés secs du Salagou.\n\nUne transition menée pas à pas, dans le respect du terroir et du vivant.',
      geste_caption: 'Photo — jeunes arbres plantés',
      demarche_eyebrow: 'Notre démarche',
      demarche_steps: [
        { component: 'step_item', title: 'Arracher, observer', body: 'Certaines vignes en fin de vie sont arrachées. On observe le sol, l\'exposition, la ressource en eau avant de replanter.' },
        { component: 'step_item', title: 'Planter les jeunes arbres', body: 'De jeunes arbres fruitiers adaptés au climat méridional prennent le relais, plantés parcelle par parcelle.' },
        { component: 'step_item', title: 'Accompagner sur le long terme', body: 'Taille, irrigation raisonnée, patience : on accompagne ces cultures qui feront le domaine de demain.' },
      ],
      cta_eyebrow: 'À découvrir sur place',
      cta_heading: 'Le propriétaire vous explique ces cultures lors des événements',
      cta_label: 'Voir les événements',
      cta_to: '/evenements',
      seo_title: 'Arboriculture — Domaine Veuve Michel',
      seo_description: 'Le Domaine Veuve Michel fait évoluer ses parcelles face au changement climatique : découvrez notre démarche d\'arboriculture à Octon.',
    },
  })

  await upsertStory({
    slug: 'contact',
    name: 'Contact',
    content: {
      component: 'page_contact',
      title_eyebrow: 'Nous trouver, nous joindre',
      title_heading: 'Contact',
      info_rows: [
        { component: 'contact_info_row', icon: 'phone', label: 'Téléphone', value: '04 •• •• •• ••' },
        { component: 'contact_info_row', icon: 'mail', label: 'Email', value: 'contact@veuvemichel.fr' },
        { component: 'contact_info_row', icon: 'map-pin', label: 'Adresse', value: 'Mas de l\'Église\n34800 Octon, France' },
        { component: 'contact_info_row', icon: 'clock', label: 'Accueil', value: 'Sur rendez-vous — nous appeler avant votre visite' },
      ],
      map_caption: 'Google Maps — localisation du domaine',
      activities_eyebrow: 'Le domaine',
      activities_heading: 'Découvrez aussi nos activités',
      seo_title: 'Contact — Domaine Veuve Michel',
      seo_description: 'Coordonnées et localisation du Domaine Veuve Michel à Octon (Hérault) : téléphone, email, adresse et accès sur rendez-vous.',
    },
  })

  // --- Cuvées collection ---
  await upsertStory({
    slug: 'cuvee-prestige',
    name: 'La cuvée star',
    parentId: cuveesFolder.id,
    content: {
      component: 'cuvee',
      name: 'La cuvée star',
      cepages: '—',
      millesime: '—',
      price: 0,
      description: 'La cuvée qui incarne le domaine : élevée avec patience, elle réunit le meilleur de nos parcelles sur les sols rougeâtres du Salagou. Une bouche ample, une trame tannique soyeuse et une longue finale sur la garrigue.',
      is_prestige: true,
      spec_grid: [
        { component: 'spec_item', label: 'Cépage', value: '—' },
        { component: 'spec_item', label: 'Millésime', value: '—' },
        { component: 'spec_item', label: 'Élevage', value: '—' },
        { component: 'spec_item', label: 'Garde', value: '—' },
      ],
      degustation_eyebrow: 'Dégustation',
      degustation_heading: 'Notes & accords mets-vins',
      degustation_body: 'Fruits noirs, épices douces et notes de garrigue. À servir à 16–17°C, sur un agneau confit, une daube ou des fromages de caractère.',
      degustation_caption: 'Photo — verre / table dressée',
      histoire_eyebrow: 'L\'histoire de la cuvée',
      histoire_heading: 'Née d\'une parcelle, portée par une transmission',
      histoire_body: 'Cette cuvée naît des vieilles vignes d\'une parcelle unique, travaillée à la main. Elle porte le fil rouge du domaine : le père qui transmet, le fils qui poursuit, fidèles à l\'esprit des lieux.',
      histoire_caption: 'Photo — la parcelle',
      video_url: 'https://www.youtube.com/watch?v=-UTU2k5hhWA&t=11s',
    },
  })

  for (let i = 1; i <= 6; i++) {
    await upsertStory({
      slug: `cuvee-${i}`,
      name: 'Cuvée —',
      parentId: cuveesFolder.id,
      content: {
        component: 'cuvee',
        name: 'Cuvée —',
        cepages: '—',
        millesime: '—',
        price: 0,
        description: '',
        is_prestige: false,
      },
    })
  }

  // --- Gîtes collection ---
  const sharedInventory = 'Cuisine équipée\nLave-linge\nWifi\nClimatisation\nLinge de maison fourni\nTerrasse ombragée'
  for (let i = 1; i <= 2; i++) {
    await upsertStory({
      slug: `gite-${i}`,
      name: `Gîte ${i} — nom`,
      parentId: gitesFolder.id,
      content: {
        component: 'gite',
        name: `Gîte ${i} — nom`,
        price_per_night: 0,
        description: 'Un gîte lumineux au cœur du village, mêlant pierres anciennes et confort contemporain, à quelques pas des vignes.',
        images: [],
        surface_m2: '••',
        capacity: '••',
        rooms: '••',
        inventory: sharedInventory,
      },
    })
  }
}

async function main() {
  await seedComponents()
  await seedContent()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
