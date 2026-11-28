<script setup lang="ts">
import { getDocPages } from "~/content/docs/docs";

const { t, locale } = useI18n();
const config = useRuntimeConfig();

usePageSeo({
  title: "Documentation API — ZekoraPay",
  description: "Documentation développeurs de l'API publique ZekoraPay : authentification, portefeuilles, paiements, boutique, webhooks et plus.",
  path: "/docs",
});

const pages = computed(() => getDocPages(locale.value));

useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: pages.value.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${config.public.siteUrl}/docs/${page.slug}`,
        })),
      }),
    },
  ],
}));
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        {{ t("docsNav.apiBadge") }}
      </span>
      <h1 class="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{{ t("docsNav.apiHeading") }}</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">{{ t("docsNav.apiSubtitle") }}</p>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs">
        <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
          {{ t("docsNav.baseUrl") }}: https://api.zekorapay.com/v1
        </span>
        <a
          href="https://api.zekorapay.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 font-bold text-white transition hover:opacity-90"
        >
          {{ t("docsNav.interactiveDocs") }} ↗
        </a>
        <a
          href="https://api.zekorapay.com/openapi.json"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-bold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {{ t("docsNav.openapiSpec") }} ↗
        </a>
      </div>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="page in pages"
        :key="page.slug"
        :to="`/docs/${page.slug}`"
        class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40"
      >
        <h2 class="font-extrabold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">{{ page.title }}</h2>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ page.tagline }}</p>
      </NuxtLink>
    </div>

    <div class="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-900/60">
      <p class="text-sm text-slate-600 dark:text-slate-300">{{ t("docsNav.guideCallout") }}</p>
      <NuxtLink to="/features/assistant-ia" class="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline">
        {{ t("docsNav.guideCalloutLink") }} →
      </NuxtLink>
    </div>
  </section>
</template>
