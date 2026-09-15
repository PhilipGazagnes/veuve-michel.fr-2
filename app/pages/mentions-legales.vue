<script setup lang="ts">
definePageMeta({ headerVariant: 'solid' })

const { updatedAt, editeur, hebergeur, seo } = await useMentionsLegalesContent()
const { data: globalConfig } = await useGlobalConfig()

useSeoMeta({ title: seo.value.title, description: seo.value.description })
</script>

<template>
  <div>
    <SectionsTitleBand heading="Mentions légales" />

    <section class="px-6 py-12 md:px-14 md:py-16">
      <div class="mx-auto flex max-w-2xl flex-col gap-6 font-sans text-[15px] leading-relaxed text-body">
        <p class="text-sm italic text-muted">En vigueur au {{ updatedAt }}</p>

        <p>
          Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575 du 21 juin
          2004 pour la confiance dans l'économie numérique, il est porté à la connaissance des
          utilisateurs du site https://domaine-veuve-michel.fr les présentes mentions légales. La
          navigation sur le site implique l'acceptation intégrale et sans réserve de ces mentions
          légales.
        </p>

        <div>
          <h2 class="font-serif text-lg text-ink">Article 1 — L'éditeur</h2>
          <p class="mt-2">
            L'édition du site https://domaine-veuve-michel.fr est assurée par {{ editeur.name }},
            immatriculé sous le numéro SIRET {{ editeur.siret }}, domicilié {{ editeur.address }}.<br>
            Email : <a :href="`mailto:${globalConfig?.email}`" class="text-maroon hover:underline">{{ globalConfig?.email }}</a><br>
            Téléphone : <a :href="`tel:${globalConfig?.phone?.replace(/\s/g, '')}`" class="text-maroon hover:underline">{{ globalConfig?.phone }}</a><br>
            TVA intracommunautaire : {{ editeur.tva }}<br>
            Le directeur de la publication est {{ editeur.directeurPublication }}.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-lg text-ink">Article 2 — L'hébergeur</h2>
          <p class="mt-2">
            L'hébergeur du site https://domaine-veuve-michel.fr est la société
            {{ hebergeur.name }}, dont le siège social est situé au {{ hebergeur.address }},
            joignable à l'adresse
            <a :href="hebergeur.supportUrl" target="_blank" rel="noopener" class="text-maroon hover:underline">{{ hebergeur.supportUrl }}</a>.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-lg text-ink">Article 3 — Accès au site</h2>
          <p class="mt-2">
            Le site est accessible en tout lieu, 7j/7 et 24h/24, sauf cas de force majeure ou
            interruption liée à une nécessité de maintenance, programmée ou non. Le site ne
            saurait être tenu responsable en cas de modification, d'interruption ou de suspension
            de ses services.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-lg text-ink">Article 4 — Collecte des données</h2>
          <p class="mt-2">
            Le site assure à l'utilisateur une collecte et un traitement d'informations
            personnelles dans le respect de la vie privée, conformément à la loi n°78-17 du 6
            janvier 1978 relative à l'informatique, aux fichiers et aux libertés. L'utilisateur
            dispose d'un droit d'accès, de rectification, de suppression et d'opposition sur ses
            données personnelles, qu'il peut exercer via le formulaire de contact du site.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-lg text-ink">Article 5 — Cookies</h2>
          <p class="mt-2">
            Lors de ses visites sur le site, un cookie peut s'installer automatiquement sur le
            logiciel de navigation de l'utilisateur. En naviguant sur le site, il en accepte
            l'usage. Un cookie ne permet pas d'identifier l'utilisateur ; il sert à enregistrer
            des informations relatives à sa navigation sur le site. L'utilisateur peut désactiver
            ce cookie via les paramètres de son logiciel de navigation.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-lg text-ink">Article 6 — Propriété intellectuelle</h2>
          <p class="mt-2">
            Toute utilisation, reproduction, diffusion, commercialisation ou modification de tout
            ou partie du site https://domaine-veuve-michel.fr sans autorisation de l'éditeur est
            prohibée et pourra entraîner des actions et poursuites judiciaires, telles que
            notamment prévues par le Code de la propriété intellectuelle et le Code civil.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
