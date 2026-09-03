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
      <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
        {{ t("docsNav.guideBadge") }}
      </span>
      <h1 class="mt-4 text-4xl font-black tracking-tight text-deep">{{ t("docsNav.guideHeading") }}</h1>
      <p class="mt-3 text-slate-600">{{ t("docsNav.guideSubtitle") }}</p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.slug"
        :to="`/guide/${topic.slug}`"
        class="group rounded-2xl border border-slate-100 p-5 transition hover:border-brand-tint hover:bg-brand-tint/30"
      >
        <h2 class="font-extrabold text-deep group-hover:text-brand">{{ topic.title }}</h2>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600">{{ topic.tagline }}</p>
      </NuxtLink>
    </div>

    <div class="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
      <p class="text-sm text-slate-600">{{ t("docsNav.apiCallout") }}</p>
      <NuxtLink to="/docs" class="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline">
        {{ t("docsNav.apiCalloutLink") }} →
      </NuxtLink>
    </div>
  </section>
</template>
