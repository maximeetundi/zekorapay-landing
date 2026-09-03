<script setup lang="ts">
import { getLegal } from "~/content/legal/legal";

const config = useRuntimeConfig();
const { t, locale } = useI18n();

const legal = computed(() => getLegal(locale.value));

usePageSeo({
  title: "Conditions d'utilisation — ZekoraPay",
  description: "Les conditions qui régissent votre utilisation de ZekoraPay.",
  path: "/terms",
});
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <h1 class="text-3xl font-black text-deep sm:text-4xl">{{ t("legal.termsTitle") }}</h1>
    <p class="mt-2 text-sm font-semibold text-slate-400">{{ t("legal.lastUpdated", { date: "3 septembre 2026" }) }}</p>

    <div class="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-slate-600 sm:text-base">
      <div v-for="section in legal.terms" :key="section.title">
        <h2 class="text-lg font-extrabold text-deep">{{ section.title }}</h2>
        <p class="mt-2">{{ section.body }}</p>
      </div>

      <div>
        <h2 class="text-lg font-extrabold text-deep">{{ t("legal.contactHeading") }}</h2>
        <p class="mt-2">
          {{ t("legal.contactTermsBody") }}
          <NuxtLink to="/contact" class="font-semibold text-brand hover:underline">{{ t("legal.contactLinkText") }}</NuxtLink>&#32;<template
            v-if="config.public.contactEmail"
          >{{ t("legal.contactOr") }} {{ config.public.contactEmail }}</template>.
        </p>
      </div>
    </div>
  </section>
</template>
