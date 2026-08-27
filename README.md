# Domaine Veuve Michel — site web

Site vitrine statique (Nuxt 4 + Tailwind CSS + TypeScript) pour le Domaine Veuve Michel
(Octon, Hérault).

## Stack

- **Nuxt 4** (Vue 3, TypeScript), **Tailwind CSS** (`@nuxtjs/tailwindcss`)
- **Google Fonts** module (Lora / Raleway / Playball)
- **@nuxt/image** (Storyblok/IPX providers), **@nuxtjs/sitemap**, **@nuxtjs/robots**,
  **nuxt-schema-org** (JSON-LD)
- **Storyblok** (`@storyblok/nuxt`) : tout le contenu texte/images du site est géré
  depuis l'espace Storyblok — voir "Contenu (Storyblok)" ci-dessous.

## Développement

```bash
cp .env.example .env   # renseigner STORYBLOK_PREVIEW_TOKEN et STORYBLOK_SPACE_ID
npm install
npm run dev        # http://localhost:3000 — nécessite les variables d'env ci-dessus
npx nuxi typecheck  # vérification TypeScript (vue-tsc)
```

En dev, le contenu est lu en version `draft` (les modifications non publiées dans
Storyblok apparaissent immédiatement) ; en build (`generate`), il est lu en version
`published` (voir `app/composables/cms/useSbStory.ts`).

## Build statique

```bash
node --env-file=.env node_modules/.bin/nuxt generate   # écrit .output/public
npx serve .output/public   # prévisualiser sans serveur Nuxt
```

(sur un hébergeur, passer les variables d'environnement via son interface plutôt que
`--env-file` — voir "Déploiement" ci-dessous.)

Les 8 routes (`/`, `/vins`, `/vins/cuvee-prestige`, `/gites`, `/evenements`,
`/arboriculture`, `/contact`, `/mentions-legales`) sont explicitement listées dans
`nitro.prerender.routes` (`nuxt.config.ts`) — le build échoue (`failOnError: true`) si
l'une d'elles ne se génère pas, pour éviter de livrer un site avec une page manquante.

## Déploiement (Netlify ou Cloudflare Pages)

1. Créer un nouveau site à partir de ce dépôt Git.
2. Renseigner les variables d'environnement du site (`STORYBLOK_PREVIEW_TOKEN`,
   `STORYBLOK_SPACE_ID`) dans les réglages du dépôt/site sur l'hébergeur.
3. Build command : `npm run generate` — Publish directory : `.output/public`.
4. Copier l'URL du "Build Hook" (Netlify : Site settings → Build & deploy → Build hooks ;
   Cloudflare Pages : Settings → Builds & deployments → Deploy hooks).
5. Coller cette URL dans Storyblok (Settings → Webhooks → "Story published / unpublished")
   — chaque publication de contenu redéclenchera alors un build statique à jour.

## Contenu (Storyblok)

Le modèle de contenu vit dans l'espace Storyblok (config globale + 6 "page stories" +
deux collections `collections/cuvees/` et `collections/gites/`, sous un dossier
`collections/` séparé pour éviter toute collision avec les routes `/vins` et `/gites`).
Trois familles de composables l'exposent au front (`app/composables/`) :

- `useGlobalConfig()` / `useActivityCards()` — config globale (`config/global`)
- `useCuvees()` / `useGammeCuvees()` / `usePrestigeCuvee()` — collection `cuvees/`
- `useGites()` — collection `gites/`
- `app/composables/pages/use*Content.ts` (un par page) — champs éditoriaux propres à
  chaque page (hero, sections, SEO)

`scripts/seed-storyblok.mjs` (à lancer avec
`node --env-file=.env scripts/seed-storyblok.mjs`) crée/maintient tous les types de
contenu (Management API) et seed le contenu français d'origine — idempotent, donc
relançable sans risque pour recréer un espace ou re-synchroniser les schémas de champs
après une modification du script.

## Notes

- Les photos réelles (`cave.jpg`, `cover.jpg`, `soil.jpg`, `video-thumb.png`, logos SVG)
  sont dans `public/images/`. Le reste des visuels (bouteilles, gîtes, arboriculture,
  mosaïque d'événements) sont des blocs dégradés (`UiPlaceholderImage`) en attendant de
  vraies photos — ils basculent automatiquement sur une vraie image dès qu'un champ
  `image` du contenu est renseigné.
- `/mentions-legales` contient un texte de substitution : à compléter par le client
  (SIRET, hébergeur, directeur de publication...).
- Coordonnées (téléphone, prix, cépages, noms des gîtes) sont des placeholders `••` —
  volontairement gardés visibles pour que le client sache quoi compléter.
