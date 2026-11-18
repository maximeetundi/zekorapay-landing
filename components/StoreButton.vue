<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    store: "apple" | "google";
    url: string;
    theme?: "dark" | "light";
  }>(),
  { theme: "dark" },
);

const { t } = useI18n();
const isReady = computed(() => props.url.trim().length > 0);
const eyebrow = computed(() => t(props.store === "apple" ? "store.appleEyebrow" : "store.googleEyebrow"));
const storeName = computed(() => t(props.store === "apple" ? "store.appleName" : "store.googleName"));
</script>

<template>
  <a
    v-if="isReady"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
    :class="
      theme === 'dark'
        ? 'border border-white/15 bg-white/10 text-white shadow-lg shadow-black/25 backdrop-blur-md hover:border-indigo-400/50 hover:bg-white/15'
        : 'border border-slate-800 bg-slate-950 text-white shadow-lg shadow-slate-900/15 hover:bg-slate-900'
    "
  >
    <AppleIcon v-if="store === 'apple'" class="h-7 w-7 shrink-0" />
    <GooglePlayIcon v-else class="h-7 w-7 shrink-0" />
    <span class="flex flex-col text-left leading-tight">
      <span class="text-[10px] font-medium text-white/70">{{ eyebrow }}</span>
      <span class="text-sm font-extrabold tracking-tight">{{ storeName }}</span>
    </span>
  </a>

  <div
    v-else
    class="inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all"
    :class="
      theme === 'dark'
        ? 'border border-white/15 bg-white/[0.06] text-white/90 backdrop-blur-md'
        : 'border border-slate-200 bg-slate-900 text-white shadow-md shadow-slate-900/10'
    "
    :title="`${storeName} — ${t('store.comingSoon')}`"
  >
    <AppleIcon v-if="store === 'apple'" class="h-6 w-6 shrink-0 text-white/90" />
    <GooglePlayIcon v-else class="h-6 w-6 shrink-0" />
    <span class="flex flex-col text-left leading-tight">
      <span class="text-[10px] font-medium text-white/60">{{ eyebrow }}</span>
      <span class="text-sm font-extrabold tracking-tight">{{ storeName }}</span>
    </span>
    <span class="ml-1 rounded-full border border-indigo-400/35 bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
      {{ t("store.comingSoon") }}
    </span>
  </div>
</template>
