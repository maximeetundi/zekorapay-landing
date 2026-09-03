<script setup lang="ts">
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Heart,
  Landmark,
  QrCode,
  Repeat,
  Send,
  ShoppingBag,
  Sparkles,
  Ticket,
  Users,
  Video,
  Wallet,
} from "lucide-vue-next";
import { getFeature } from "~/content/features/features";

const route = useRoute();
const { t, locale } = useI18n();
const config = useRuntimeConfig();

const feature = computed(() => getFeature(String(route.params.slug), locale.value));
if (!feature.value) {
  throw createError({ statusCode: 404, statusMessage: "Feature not found" });
}

const iconMap = {
  wallet: Wallet,
  transfer: Send,
  cards: CreditCard,
  exchange: Repeat,
  qr: QrCode,
  tontines: Users,
  enterprise: Building2,
  shop: ShoppingBag,
  donations: Heart,
  events: Ticket,
  cash: Landmark,
  video: Video,
  ai: Sparkles,
} as const;

const title = computed(() => t(`features.${feature.value!.key}.title`));
const tagline = computed(() => t(`features.${feature.value!.key}.description`));

usePageSeo({
  title: `${title.value} — ZekoraPay`,
  description: tagline.value,
  path: `/features/${feature.value.slug}`,
});

// Service (pas Article) : ce sont des pages qui décrivent une fonctionnalité
// de l'app, pas un contenu éditorial daté — schema.org Service colle mieux
// pour le SEO/IA que Article ici.
useHead(() => ({
  script: feature.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: title.value,
            description: tagline.value,
            provider: { "@id": `${config.public.siteUrl}/#organization` },
            url: `${config.public.siteUrl}/features/${feature.value!.slug}`,
          }),
        },
      ]
    : [],
}));

const priceLine = computed(() => t("pricing.default"));
</script>

<template>
  <div v-if="feature">
    <section class="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-tint/70 via-white to-white"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-24 -top-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-brand/40 blur-3xl"
      />

      <div class="mx-auto max-w-3xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-16">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft class="h-4 w-4" />
          {{ t("features.detail.back") }}
        </NuxtLink>

        <div class="mt-6 flex items-center gap-4">
          <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-deep text-white shadow-lg shadow-brand/30">
            <component :is="iconMap[feature.icon]" class="h-7 w-7" stroke-width="2.25" />
          </span>
          <div>
            <h1 class="text-3xl font-black leading-tight text-deep sm:text-4xl">{{ title }}</h1>
            <p class="mt-1 text-base text-slate-600">{{ tagline }}</p>
          </div>
        </div>

        <div class="prose-legal mt-10 space-y-5 text-base leading-relaxed text-slate-700">
          <p v-for="(paragraph, index) in feature.body" :key="index">
            {{ paragraph }}
          </p>
        </div>

        <div class="mt-10 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm shadow-slate-100 backdrop-blur">
          <h2 class="text-sm font-bold uppercase tracking-wide text-brand">{{ t("features.detail.highlightsHeading") }}</h2>
          <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li
              v-for="highlight in feature.highlights"
              :key="highlight"
              class="flex items-start gap-2.5 text-sm font-semibold text-deep"
            >
              <CheckCircle2 class="mt-0.5 h-[18px] w-[18px] shrink-0 text-ok" stroke-width="2.25" />
              {{ highlight }}
            </li>
          </ul>
        </div>

        <div class="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-deep via-[#132b6b] to-brand px-8 py-10 text-center shadow-xl shadow-deep/30 sm:px-12">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          />
          <div class="relative flex flex-col items-center gap-5">
            <h2 class="max-w-md text-2xl font-black text-white">{{ t("features.detail.ctaTitle") }}</h2>
            <div class="flex flex-col gap-3 sm:flex-row">
              <OpenAppButton variant="outline" />
            </div>
            <p class="text-sm font-semibold text-white/70">{{ priceLine }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
