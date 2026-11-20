<script setup lang="ts">
import {
  ArrowRight,
  Building2,
  Heart,
  Lightbulb,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingUp,
  Users,
} from "lucide-vue-next";

const { t } = useI18n();
const config = useRuntimeConfig();

usePageSeo({
  title: "À propos de ZekoraPay — Notre mission",
  description:
    "Découvrez la mission, les valeurs et l'architecture double application (ZekoraPay Particuliers & ZekoraPay Pro) de la plateforme financière globale.",
  path: "/about",
});

const stats = [
  { icon: Users, value: "12", key: "resources" },
  { icon: TrendingUp, value: "5", key: "counties" },
  { icon: Heart, value: "24/7", key: "categories" },
  { icon: ShieldCheck, value: "100%", key: "free" },
];

const values = [
  { icon: Lightbulb, gradient: "from-orange-500 to-amber-500", key: "innovation" },
  { icon: SearchCheck, gradient: "from-emerald-500 to-teal-500", key: "transparency" },
  { icon: Users, gradient: "from-sky-500 to-blue-600", key: "inclusion" },
  { icon: ShieldCheck, gradient: "from-rose-500 to-orange-500", key: "security" },
] as const;
</script>

<template>
  <div class="bg-white dark:bg-slate-950">
    <!-- Clean Fintech Hero -->
    <section class="relative overflow-hidden border-b border-slate-200/80 bg-slate-950 py-20 sm:py-28">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style="background: radial-gradient(circle, #f97316, transparent)"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style="background: radial-gradient(circle, #10b981, transparent)"
      />

      <div class="relative mx-auto max-w-4xl px-6 text-center">
        <span class="badge-pill border border-white/15 bg-white/10 text-white/90">
          <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          ZekoraPay &amp; ZekoraPay Pro
        </span>
        <h1 class="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {{ t("about.title") }}
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl">
          {{ t("about.subtitle") }}
        </p>
      </div>
    </section>

    <!-- Mission + Stats -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span class="badge-pill border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
            <Target class="h-3.5 w-3.5" />
            {{ t("about.missionTitle") }}
          </span>
          <h2 class="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {{ t("about.missionTitle") }}
          </h2>
          <p class="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {{ t("about.missionText") }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <component :is="stat.icon" class="h-5 w-5" />
            </div>
            <p class="mt-4 text-3xl font-black text-slate-900 dark:text-white">{{ stat.value }}</p>
            <p class="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {{ t(`stats.${stat.key}`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dual-App Ecosystem -->
    <section class="border-y border-slate-200/80 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:py-20">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Une identité unique, deux applications dédiées
          </h2>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Séparez votre quotidien personnel de la gestion complète de vos entreprises, sans jamais dupliquer votre compte ni votre KYC.
          </p>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <div class="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Smartphone class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">ZekoraPay Particuliers</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Portefeuilles multi-devises, transferts, cartes virtuelles, tontines, achats en boutique, locations, événements et suivi centralisé de vos abonnements &amp; factures d'entreprises.
            </p>
            <a
              :href="config.public.webAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:underline dark:text-orange-400"
            >
              <span>Ouvrir app.zekorapay.com</span>
              <ArrowRight class="h-4 w-4" />
            </a>
          </div>

          <div class="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Building2 class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">ZekoraPay Pro</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Pilotage multi-entreprises, paie &amp; RH, portefeuilles dédiés, encaissements POS, facturation clients &amp; abonnés, approbations multi-admin, achats B2B et API développeurs.
            </p>
            <a
              :href="config.public.proAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              <span>Ouvrir pro.zekorapay.com</span>
              <ArrowRight class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {{ t("about.valuesTitle") }}
          </h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="val in values"
            :key="val.key"
            class="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              :class="`bg-gradient-to-br ${val.gradient}`"
              class="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm"
            >
              <component :is="val.icon" class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
              {{ t(`about.values.${val.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t(`about.values.${val.key}.desc`) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
