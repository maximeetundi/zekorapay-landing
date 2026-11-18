<script setup lang="ts">
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Code2,
  Store,
  Users,
  Wallet,
} from "lucide-vue-next";
import { ref } from "vue";

const { t } = useI18n();
const config = useRuntimeConfig();

type PersonaKey = "personal" | "tontine" | "enterprise" | "developer";
const activePersona = ref<PersonaKey>("personal");

const personas = [
  { key: "personal", icon: Wallet },
  { key: "tontine", icon: Users },
  { key: "enterprise", icon: Building2 },
  { key: "developer", icon: Code2 },
] as const;

const personaRoutes: Record<PersonaKey, { guide: string; feature?: string; external?: string }> = {
  personal: { guide: "/guide/portefeuilles", feature: "/features/portefeuilles-multi-devises" },
  tontine: { guide: "/guide/association", feature: "/features/tontines-associations" },
  enterprise: { guide: "/guide/entreprises", feature: "/features/entreprises-b2b" },
  developer: { guide: "/docs" },
};
</script>

<template>
  <section class="border-y border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
          {{ t("solutions.kicker") }}
        </span>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-deep dark:text-white sm:text-4xl">
          {{ t("solutions.heading") }}
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          {{ t("solutions.subheading") }}
        </p>
      </div>

      <!-- Segmented Tabs -->
      <div class="mt-10 flex flex-wrap justify-center gap-2">
        <button
          v-for="p in personas"
          :key="p.key"
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all"
          :class="
            activePersona === p.key
              ? 'border-brand bg-brand text-white shadow-glow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-deep dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white'
          "
          @click="activePersona = p.key"
        >
          <component :is="p.icon" class="h-4 w-4" stroke-width="2.2" />
          {{ t(`solutions.tabs.${p.key}`) }}
        </button>
      </div>

      <!-- Content Panel -->
      <div class="mt-8 grid items-center gap-8 rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-primary-100/80 px-3 py-1 text-xs font-bold text-primary-800 dark:bg-indigo-500/20 dark:text-indigo-300">
            {{ t(`solutions.panels.${activePersona}.badge`) }}
          </span>
          <h3 class="mt-4 text-2xl font-black tracking-tight text-deep dark:text-white sm:text-3xl">
            {{ t(`solutions.panels.${activePersona}.title`) }}
          </h3>
          <p class="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {{ t(`solutions.panels.${activePersona}.description`) }}
          </p>

          <ul class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li
              v-for="idx in [1, 2, 3, 4]"
              :key="idx"
              class="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" stroke-width="2.4" />
              <span>{{ t(`solutions.panels.${activePersona}.p${idx}`) }}</span>
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              :href="config.public.webAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary px-5 py-2.5 text-sm"
            >
              {{ t("nav.cta") }}
              <ArrowRight class="h-4 w-4" />
            </a>
            <NuxtLink
              :to="personaRoutes[activePersona].guide"
              class="btn-outline-dark px-5 py-2.5 text-sm dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {{ t("solutions.readGuide") }}
            </NuxtLink>
          </div>
        </div>

        <!-- Visual summary card on the right -->
        <div class="lg:col-span-5">
          <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-950/70">
            <div class="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-brand dark:bg-indigo-500/15 dark:text-indigo-300">
                  <Store v-if="activePersona === 'enterprise'" class="h-5 w-5" />
                  <Users v-else-if="activePersona === 'tontine'" class="h-5 w-5" />
                  <Code2 v-else-if="activePersona === 'developer'" class="h-5 w-5" />
                  <Wallet v-else class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-xs font-semibold text-slate-400 dark:text-slate-500">{{ t("solutions.previewLabel") }}</p>
                  <p class="text-sm font-extrabold text-deep dark:text-white">{{ t(`solutions.tabs.${activePersona}`) }}</p>
                </div>
              </div>
              <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                {{ t("solutions.readyBadge") }}
              </span>
            </div>

            <div class="mt-4 space-y-3">
              <div
                v-for="idx in [1, 2, 3]"
                :key="idx"
                class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
              >
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {{ t(`solutions.panels.${activePersona}.m${idx}Label`) }}
                </span>
                <span class="text-sm font-extrabold text-deep dark:text-white">
                  {{ t(`solutions.panels.${activePersona}.m${idx}Value`) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
