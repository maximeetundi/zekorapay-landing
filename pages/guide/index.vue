<script setup lang="ts">
import { getGuideTopics } from "~/content/guide/guide";

const { t, locale } = useI18n();
const config = useRuntimeConfig();

usePageSeo({
  title: "Guide utilisateur — ZekoraPay",
  description: "Guide complet pour utiliser ZekoraPay : compte, dépôts, tontines, événements, entreprise, boutique et cartes.",
  path: "/guide",
});

const topics = computed(() => getGuideTopics(locale.value));

useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: topics.value.map((topic, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: topic.title,
          url: `${config.public.siteUrl}/guide/${topic.slug}`,
        })),
      }),
    },
  ],
}));
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
        {{ t("docsNav.guideBadge") }}
      </span>
      <h1 class="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{{ t("docsNav.guideHeading") }}</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">{{ t("docsNav.guideSubtitle") }}</p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.slug"
        :to="`/guide/${topic.slug}`"
        class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-500/40"
      >
        <h2 class="font-extrabold text-slate-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">{{ topic.title }}</h2>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ topic.tagline }}</p>
      </NuxtLink>
    </div>

    <div class="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-900/60">
      <p class="text-sm text-slate-600 dark:text-slate-300">{{ t("docsNav.apiCallout") }}</p>
      <NuxtLink to="/docs" class="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline">
        {{ t("docsNav.apiCalloutLink") }} →
      </NuxtLink>
    </div>
  </section>
</template>
