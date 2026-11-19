<script setup lang="ts">
import { HelpCircle, Search } from "lucide-vue-next";

const { t } = useI18n();

usePageSeo({
  title: "FAQ — ZekoraPay",
  description: "Questions fréquentes sur ZekoraPay : coûts, comptes, pays couverts, langues et sécurité.",
  path: "/faq",
});

type FaqCategory = "all" | "general" | "security" | "business";
const activeCategory = ref<FaqCategory>("all");
const query = ref("");

const faqMeta = [
  { id: "q1", cat: "general" },
  { id: "q2", cat: "general" },
  { id: "q3", cat: "general" },
  { id: "q4", cat: "security" },
  { id: "q5", cat: "business" },
  { id: "q6", cat: "general" },
  { id: "q7", cat: "business" },
] as const;

const filteredItems = computed(() => {
  const q = query.value.trim().toLowerCase();
  return faqMeta
    .filter((item) => {
      if (activeCategory.value !== "all" && item.cat !== activeCategory.value) return false;
      if (!q) return true;
      const question = t(`faq.${item.id}.question`).toLowerCase();
      const answer = t(`faq.${item.id}.answer`).toLowerCase();
      return question.includes(q) || answer.includes(q);
    })
    .map((item) => item.id);
});
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <span class="badge-pill border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
        <HelpCircle class="h-3.5 w-3.5" />
        {{ t("nav.faq") }}
      </span>
      <h1 class="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{{ t("faq.heading") }}</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">{{ t("faq.subheading") }}</p>
    </div>

    <!-- Dual-app quick summary -->
    <div class="mt-8 grid gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:grid-cols-2">
      <div class="rounded-xl bg-white p-3.5 dark:bg-slate-900">
        <p class="text-xs font-extrabold uppercase tracking-wider text-orange-600 dark:text-orange-400">ZekoraPay &amp; ZekoraPay Pro</p>
        <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          Un seul identifiant vous donne accès à <strong class="text-slate-900 dark:text-white">app.zekorapay.com</strong> (personnel, abonnements &amp; factures) et <strong class="text-slate-900 dark:text-white">pro.zekorapay.com</strong> (entreprises &amp; POS).
        </p>
      </div>
      <div class="rounded-xl bg-white p-3.5 dark:bg-slate-900">
        <p class="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">KYC &amp; Sécurité</p>
        <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          La vérification KYC personnelle et la validation KYC entreprise sont accessibles directement depuis <strong class="text-slate-900 dark:text-white">ZekoraPay Pro</strong> sans changer d'application.
        </p>
      </div>
    </div>

    <!-- Search & Category Filters -->
    <div class="mt-8 space-y-4">
      <div class="relative">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="query"
          type="search"
          :placeholder="t('docsNav.search')"
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
        >
      </div>

      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="cat in (['all', 'general', 'security', 'business'] as const)"
          :key="cat"
          type="button"
          class="rounded-full border px-3.5 py-1.5 text-xs font-bold transition"
          :class="
            activeCategory === cat
              ? 'border-brand bg-brand text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-deep'
          "
          @click="activeCategory = cat"
        >
          {{ t(`faq.categories.${cat}`) }}
        </button>
      </div>
    </div>

    <div class="mt-8">
      <FaqAccordion v-if="filteredItems.length > 0" :items="filteredItems" />
      <div
        v-else
        class="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500"
      >
        {{ t("docsNav.noResults") }}
      </div>
    </div>
  </section>
</template>
