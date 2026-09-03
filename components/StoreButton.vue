<script setup lang="ts">
// Bouton de téléchargement store (App Store / Google Play). Sans URL réelle
// (app pas encore publiée), le bouton passe en mode "Coming soon" plutôt que
// de pointer vers un lien cassé ou factice — voir nuxt.config.ts.
const props = defineProps<{
  store: "apple" | "google";
  url: string;
}>();

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
    class="flex items-center gap-3 rounded-xl bg-deep px-5 py-3 text-white shadow-lg shadow-deep/20 transition hover:bg-[#0a1840]"
  >
    <AppleIcon
      v-if="store === 'apple'"
      class="h-7 w-7 shrink-0"
    />
    <GooglePlayIcon
      v-else
      class="h-7 w-7 shrink-0"
    />
    <span class="flex flex-col leading-tight">
      <span class="text-[11px] text-white/70">{{ eyebrow }}</span>
      <span class="text-base font-bold">{{ storeName }}</span>
    </span>
  </a>
  <div
    v-else
    class="flex cursor-not-allowed items-center gap-3 rounded-xl border-[1.5px] border-dashed border-slate-300 bg-slate-50 px-5 py-3 text-slate-400"
    :title="`${storeName} — ${t('store.comingSoon')}`"
  >
    <AppleIcon
      v-if="store === 'apple'"
      class="h-7 w-7 shrink-0"
    />
    <GooglePlayIcon
      v-else
      class="h-7 w-7 shrink-0"
    />
    <span class="flex flex-col leading-tight">
      <span class="text-[11px]">{{ eyebrow }}</span>
      <span class="text-base font-bold">{{ storeName }}</span>
    </span>
    <span class="ml-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
      {{ t("store.comingSoon") }}
    </span>
  </div>
</template>
