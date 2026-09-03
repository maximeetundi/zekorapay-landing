<script setup lang="ts">
import { getDocPages } from "~/content/docs/docs";

const { t, locale } = useI18n();

usePageSeo({
  title: "Documentation API — ZekoraPay",
  description: "Documentation développeurs de l'API publique ZekoraPay : authentification, portefeuilles, paiements, boutique, webhooks et plus.",
  path: "/docs",
});

const pages = computed(() => getDocPages(locale.value));
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
        {{ t("docsNav.apiBadge") }}
      </span>
      <h1 class="mt-4 text-4xl font-black tracking-tight text-deep">{{ t("docsNav.apiHeading") }}</h1>
      <p class="mt-3 text-slate-600">{{ t("docsNav.apiSubtitle") }}</p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="page in pages"
        :key="page.slug"
        :to="`/docs/${page.slug}`"
        class="group rounded-2xl border border-slate-100 p-5 transition hover:border-brand-tint hover:bg-brand-tint/30"
      >
        <h2 class="font-extrabold text-deep group-hover:text-brand">{{ page.title }}</h2>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600">{{ page.tagline }}</p>
      </NuxtLink>
    </div>

    <div class="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
      <p class="text-sm text-slate-600">{{ t("docsNav.guideCallout") }}</p>
      <NuxtLink to="/guide" class="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline">
        {{ t("docsNav.guideCalloutLink") }} →
      </NuxtLink>
    </div>
  </section>
</template>
