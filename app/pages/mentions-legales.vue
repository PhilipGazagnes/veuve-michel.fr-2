<script setup lang="ts">
definePageMeta({ headerVariant: 'solid' })
useSeoMeta({
  title: 'Mentions légales — Domaine Veuve Michel',
  description: 'Mentions légales du site du Domaine Veuve Michel.',
})
</script>

<template>
  <div>
    <SectionsTitleBand heading="Mentions légales" />

    <section class="px-6 py-12 md:px-14 md:py-16">
      <div class="mx-auto flex max-w-2xl flex-col gap-6 font-sans text-[15px] leading-relaxed text-body">
        <p class="rounded border border-hairline-strong bg-cream px-5 py-4 text-sm italic text-muted">
          Contenu à compléter par le client : raison sociale, forme juridique, capital, SIRET,
          adresse du siège, nom de l'hébergeur, directeur de la publication.
        </p>
        <div>
          <h2 class="font-serif text-lg text-ink">Éditeur du site</h2>
          <p class="mt-2">Domaine Veuve Michel — Mas de l'Église, 34800 Octon, France.</p>
        </div>
        <div>
          <h2 class="font-serif text-lg text-ink">Hébergement</h2>
          <p class="mt-2">À compléter.</p>
        </div>
        <div>
          <h2 class="font-serif text-lg text-ink">Propriété intellectuelle</h2>
          <p class="mt-2">
            L'ensemble des contenus (textes, images, logo) de ce site est la propriété du
            Domaine Veuve Michel, sauf mention contraire.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
