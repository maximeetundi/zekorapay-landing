<script setup lang="ts">
import { Eye, Gift, Globe2, ShieldCheck } from "lucide-vue-next";

const { t } = useI18n();

usePageSeo({
  title: "À propos de ZekoraPay — Notre mission",
  description:
    "Découvrez la mission, les valeurs et l'équipe derrière ZekoraPay, la plateforme financière globale pour particuliers, associations et entreprises.",
  path: "/about",
});

const values = [
  { icon: ShieldCheck, key: "verified" },
  { icon: Gift, key: "free" },
  { icon: Eye, key: "private" },
  { icon: Globe2, key: "accessible" },
] as const;
</script>

<template>
  <div>
    <section class="mx-auto max-w-4xl px-6 pb-12 pt-12 text-center sm:pt-16">
      <span class="inline-flex items-center rounded-full border border-brand-tint bg-brand-tint px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
        {{ t("about.badge") }}
      </span>
      <h1 class="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-deep sm:text-5xl">
        {{ t("about.title") }}
      </h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
        {{ t("about.subtitle") }}
      </p>
    </section>

    <section class="border-y border-slate-100 bg-slate-50/60">
      <div class="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2 class="text-2xl font-black text-deep">{{ t("about.missionTitle") }}</h2>
        <p class="mt-4 text-base leading-relaxed text-slate-600">{{ t("about.missionText") }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h2 class="text-center text-3xl font-black text-deep">{{ t("about.valuesTitle") }}</h2>
      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="value in values"
          :key="value.key"
          class="rounded-2xl border border-slate-100 p-6"
        >
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
            <component :is="value.icon" class="h-5 w-5" stroke-width="2.25" />
          </span>
          <h3 class="mt-4 text-base font-extrabold text-deep">
            {{ t(`about.values.${value.key}.title`) }}
          </h3>
          <p class="mt-1.5 text-sm leading-relaxed text-slate-600">
            {{ t(`about.values.${value.key}.text`) }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
      <div class="flex flex-col items-center gap-6 rounded-3xl bg-deep px-8 py-14 text-center sm:px-16">
        <h2 class="max-w-lg text-3xl font-black text-white">{{ t("about.ctaTitle") }}</h2>
        <p class="max-w-md text-white/70">{{ t("about.ctaSubtitle") }}</p>
        <div class="mt-2 flex flex-col gap-3 sm:flex-row">
          <OpenAppButton variant="outline" />
        </div>
      </div>
    </section>
  </div>
</template>
