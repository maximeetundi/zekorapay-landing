<script setup lang="ts">
import { ArrowRight, type LucideIcon } from "lucide-vue-next";

defineProps<{
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
  category?: string;
}>();

const { t } = useI18n();
</script>

<template>
  <NuxtLink
    :to="`/features/${slug}`"
    class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 opacity-0 transition duration-300 group-hover:opacity-70 dark:from-indigo-500/20 dark:to-purple-500/20"
    />
    <div>
      <div class="relative flex items-center justify-between gap-2">
        <span
          class="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-glow-sm transition-transform duration-300 group-hover:scale-105"
          style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);"
        >
          <component :is="icon" class="h-5 w-5" stroke-width="2.2" />
        </span>
        <span
          v-if="category"
          class="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 transition-colors group-hover:bg-primary-50 group-hover:text-primary-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300"
        >
          {{ category }}
        </span>
      </div>
      <h3 class="relative mt-5 text-base font-extrabold text-slate-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-indigo-300">
        {{ title }}
      </h3>
      <p class="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {{ description }}
      </p>
    </div>

    <span class="relative mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand dark:text-indigo-400">
      {{ t("features.learnMore") }}
      <ArrowRight class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </NuxtLink>
</template>
