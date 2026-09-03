<script setup lang="ts">
import { ArrowRight, type LucideIcon } from "lucide-vue-next";

defineProps<{
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
}>();

const { t } = useI18n();
</script>

<template>
  <NuxtLink
    :to="`/features/${slug}`"
    class="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-tint opacity-0 transition duration-300 group-hover:opacity-60"
    />
    <span class="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-deep text-white shadow-md shadow-brand/20 transition-transform duration-300 group-hover:scale-110">
      <component
        :is="icon"
        class="h-[22px] w-[22px]"
        stroke-width="2.25"
      />
    </span>
    <h3 class="relative mt-4 text-base font-extrabold text-deep">
      {{ title }}
    </h3>
    <p class="relative mt-1.5 text-sm leading-relaxed text-slate-600">
      {{ description }}
    </p>
    <span class="relative mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand opacity-0 transition duration-300 group-hover:opacity-100">
      {{ t("features.learnMore") }}
      <ArrowRight class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  </NuxtLink>
</template>
