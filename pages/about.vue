<script setup lang="ts">
import { Heart, Lightbulb, SearchCheck, ShieldCheck, TrendingUp, Users } from "lucide-vue-next";

const { t } = useI18n();

usePageSeo({
  title: "À propos de ZekoraPay — Notre mission",
  description:
    "Découvrez la mission, les valeurs et l'équipe derrière ZekoraPay, la plateforme financière globale pour particuliers, associations et entreprises.",
  path: "/about",
});

// Mêmes chiffres honnêtes que la page d'accueil (voir stats.* dans les
// fichiers de langue) plutôt que les statistiques marketing non vérifiables
// (10K+ utilisateurs, 50K transactions/jour...) que l'ancien site affichait
// ici — déjà corrigées côté accueil, pas de raison de les réintroduire ici.
const stats = [
  { icon: Users, value: "13", key: "resources" },
  { icon: TrendingUp, value: "5", key: "counties" },
  { icon: Heart, value: "24/7", key: "categories" },
  { icon: ShieldCheck, value: "100%", key: "free" },
];

const values = [
  { icon: Lightbulb, gradient: "from-brand to-secondary", key: "innovation" },
  { icon: SearchCheck, gradient: "from-accent to-emerald-500", key: "transparency" },
  { icon: Users, gradient: "from-amber-400 to-red-500", key: "inclusion" },
  { icon: ShieldCheck, gradient: "from-secondary to-pink-500", key: "security" },
] as const;
</script>

<template>
  <div>
    <section class="hero-section relative overflow-hidden bg-gradient-to-br from-primary-900 via-secondary-900 to-slate-900 py-28 sm:py-36">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style="background: radial-gradient(circle, #6366f1, transparent)"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style="background: radial-gradient(circle, #a855f7, transparent)"
      />

      <div class="relative mx-auto max-w-3xl px-6 text-center">
        <span class="badge-pill border border-white/20 bg-white/10 text-white/80">
          <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          ZekoraPay
        </span>
        <h1 class="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          {{ t("about.title") }}
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          {{ t("about.subtitle") }}
        </p>
      </div>
    </section>

    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span class="badge-pill bg-primary-50 text-primary-700">🎯 {{ t("about.missionTitle") }}</span>
          <h2 class="mt-4 text-3xl font-extrabold text-deep sm:text-4xl">{{ t("about.missionTitle") }}</h2>
          <p class="mt-5 text-lg leading-relaxed text-slate-600">{{ t("about.missionText") }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="rounded-2xl border border-slate-100 bg-gradient-to-br from-gray-50 to-primary-50 p-6"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand shadow-sm">
              <component :is="stat.icon" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            <div class="mt-3 text-2xl font-extrabold text-primary-600"><CountUp :value="stat.value" /></div>
            <div class="text-xs leading-tight text-slate-500">{{ t(`stats.${stat.key}`) }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-16 sm:py-24">
      <div class="mx-auto max-w-5xl px-6">
        <h2 class="text-center text-3xl font-extrabold text-deep sm:text-4xl">{{ t("about.valuesTitle") }}</h2>
        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          <div
            v-for="value in values"
            :key="value.key"
            class="feature-card flex gap-5 p-8"
          >
            <span
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-glow-sm"
              :class="`bg-gradient-to-br ${value.gradient}`"
            >
              <component :is="value.icon" class="h-6 w-6" stroke-width="2.25" />
            </span>
            <div>
              <h3 class="text-lg font-bold text-deep">{{ t(`about.values.${value.key}.title`) }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ t(`about.values.${value.key}.text`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-2xl px-6 text-center">
        <h2 class="text-3xl font-extrabold text-deep sm:text-4xl">{{ t("about.teamTitle") }}</h2>
        <p class="mt-5 text-lg leading-relaxed text-slate-600">{{ t("about.teamText") }}</p>
        <div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <OpenAppButton />
          <NuxtLink to="/contact" class="btn-outline-dark text-base px-8 py-4">
            {{ t("about.contactCta") }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
