<script setup lang="ts">
definePageMeta({ headerVariant: 'solid' })
useSeoMeta({
  title: 'Guide de gestion du contenu — Domaine Veuve Michel',
  description: 'Aide-mémoire à usage interne pour gérer le contenu du site depuis Storyblok.',
  robots: 'noindex, nofollow',
})

const sommaire = [
  { id: 'connexion', label: '1. Se connecter' },
  { id: 'organisation', label: '2. Comment le contenu est organisé' },
  { id: 'modifier', label: '3. Modifier un texte ou une image' },
  { id: 'brouillon-publie', label: '4. Brouillon vs Publié ⚠️' },
  { id: 'cuvees', label: '5. Ajouter / retirer une cuvée' },
  { id: 'gites', label: '6. Ajouter / retirer un gîte' },
  { id: 'photos', label: '7. Changer une photo' },
  { id: 'coordonnees', label: '8. Coordonnées, horaires, tarifs' },
  { id: 'placeholders', label: '9. Les « •• » à compléter' },
  { id: 'annuler', label: '10. Annuler une erreur' },
  { id: 'probleme', label: '11. Si ça bloque' },
  { id: 'glossaire', label: '12. Glossaire éclair' },
]
</script>

<template>
  <div>
    <SectionsTitleBand eyebrow="Espace propriétaire" heading="Guide de gestion du contenu" />

    <section class="px-6 py-12 md:px-14 md:py-16">
      <div class="mx-auto flex max-w-2xl flex-col gap-10 font-sans text-[15px] leading-relaxed text-body">
        <p class="rounded border border-hairline-strong bg-cream px-5 py-4 text-sm italic text-muted">
          Ce guide est à usage interne : il explique comment mettre à jour les textes, photos et
          fiches (cuvées, gîtes) du site depuis Storyblok, sans intervention d'un développeur.
        </p>

        <nav aria-label="Sommaire" class="rounded border border-hairline-strong px-5 py-4">
          <p class="font-serif text-base text-ink">Sommaire</p>
          <ul class="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            <li v-for="item in sommaire" :key="item.id">
              <a :href="`#${item.id}`" class="text-maroon underline decoration-maroon/30 underline-offset-2 hover:decoration-maroon">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div id="connexion" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">1. Se connecter</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>URL : <a href="https://app.storyblok.com" class="text-maroon underline underline-offset-2">app.storyblok.com</a></li>
            <li>Identifiant : à compléter (email transmis à la mise en service).</li>
            <li>Espace : « Domaine Veuve Michel », visible en haut à gauche une fois connecté.</li>
          </ul>
        </div>

        <div id="organisation" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">2. Comment le contenu est organisé</h2>
          <p class="mt-2">Trois familles de contenu, dans le menu de gauche :</p>
          <ul class="mt-2 list-disc space-y-2 pl-5">
            <li><strong class="text-ink">Pages</strong> — les 6 pages du site (Accueil, Vins, Gîtes, Événements, Arboriculture, Contact). Un clic sur une page = tout son contenu.</li>
            <li><strong class="text-ink">Collections</strong> — des fiches répétables : <em>cuvees/</em> et <em>gites/</em>. Ajouter une fiche ici ajoute une carte sur le site.</li>
            <li><strong class="text-ink">Config globale</strong> (<em>config/global</em>) — coordonnées, horaires, réseaux sociaux, cartes « activités » affichées sur plusieurs pages à la fois.</li>
          </ul>
        </div>

        <div id="modifier" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">3. Modifier un texte ou une image</h2>
          <ol class="mt-2 list-decimal space-y-1 pl-5">
            <li>Ouvrir la story concernée (page, cuvée ou gîte).</li>
            <li>Cliquer sur le champ à modifier dans le panneau de gauche.</li>
            <li>Taper le nouveau texte, ou cliquer sur la vignette pour remplacer une image.</li>
            <li>Cliquer <strong class="text-ink">Save</strong>, puis <strong class="text-ink">Publish</strong> en haut à droite.</li>
          </ol>
        </div>

        <div id="brouillon-publie" class="scroll-mt-6 rounded border border-maroon/20 bg-maroon/5 px-5 py-4">
          <h2 class="font-serif text-lg text-ink">4. Brouillon vs Publié ⚠️</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>Tant que <strong class="text-ink">Publish</strong> n'a pas été cliqué, rien ne change sur le site — même après « Save ».</li>
            <li>Une fois publié, compter <strong class="text-ink">2 à 5 minutes</strong> : la publication relance une reconstruction automatique du site (site statique), pas une mise à jour instantanée.</li>
            <li>Si le changement ne semble pas là après 5 minutes, rafraîchir avec Ctrl+F5 (ou Cmd+Maj+R).</li>
          </ul>
        </div>

        <div id="cuvees" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">5. Ajouter / retirer une cuvée</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>Aller dans <em>collections/cuvees</em>.</li>
            <li>Dupliquer une fiche existante (« ... » → <em>Copy</em>) plutôt que « Create new » : conserve tous les champs déjà en place.</li>
            <li>Renommer, modifier les champs, Publish.</li>
            <li>Pour retirer une cuvée : <em>Unpublish</em> plutôt que supprimer — elle reste récupérable.</li>
          </ul>
        </div>

        <div id="gites" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">6. Ajouter / retirer un gîte</h2>
          <p class="mt-2">Même méthode que les cuvées, dans <em>collections/gites</em>.</p>
        </div>

        <div id="photos" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">7. Changer une photo</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>Formats JPG ou PNG, idéalement moins de 2 Mo.</li>
            <li>Garder le même ratio (paysage / carré / portrait) que la photo remplacée pour éviter un cadrage déformé.</li>
            <li>Uploader directement depuis le champ image → <em>Upload</em>.</li>
            <li>Le site compresse et optimise les images automatiquement — pas besoin de les retoucher avant.</li>
          </ul>
        </div>

        <div id="coordonnees" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">8. Coordonnées, horaires, tarifs</h2>
          <p class="mt-2">
            Tout se trouve dans <em>config/global</em> : téléphone, email, adresse, réseaux sociaux,
            cartes « activités » de l'accueil. Un seul endroit à modifier — ces informations
            apparaissent automatiquement sur toutes les pages concernées.
          </p>
        </div>

        <div id="placeholders" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">9. Les « •• » à compléter</h2>
          <p class="mt-2">
            Certains champs affichent volontairement <code class="rounded bg-hairline-strong px-1.5 py-0.5 text-[13px]">••</code>
            : ce sont des informations pas encore fournies (tarifs, téléphone, noms de gîtes...).
            À remplacer au fur et à mesure, sans attendre une refonte. Idem pour la page
            <NuxtLink to="/mentions-legales" class="text-maroon underline underline-offset-2">Mentions légales</NuxtLink>
            (SIRET, hébergeur, directeur de publication).
          </p>
        </div>

        <div id="annuler" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">10. Annuler une erreur</h2>
          <p class="mt-2">
            Dans une story, onglet <em>History</em> (icône horloge, en haut à droite) → liste des
            versions précédentes → <em>Restore</em>. Fonctionne même après publication.
          </p>
        </div>

        <div id="probleme" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">11. Si ça bloque</h2>
          <p class="mt-2">
            Contacter le développeur, en précisant : la page concernée, une capture d'écran, et
            l'heure approximative (ex. « j'ai changé la photo de la page Gîtes vers 14h »).
          </p>
        </div>

        <div id="glossaire" class="scroll-mt-6">
          <h2 class="font-serif text-lg text-ink">12. Glossaire éclair</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li><strong class="text-ink">Story</strong> — une page ou une fiche de contenu.</li>
            <li><strong class="text-ink">Composant</strong> — un bloc de champs réutilisable (ex. « texte + image »).</li>
            <li><strong class="text-ink">Champ</strong> — une zone modifiable (texte, image, nombre...).</li>
            <li><strong class="text-ink">Brouillon</strong> — version enregistrée mais pas encore visible sur le site.</li>
            <li><strong class="text-ink">Publié</strong> — version en ligne sur le site, après reconstruction.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
