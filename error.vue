<script setup lang="ts">
import { Home, SearchX, TriangleAlert } from "lucide-vue-next";

// Convention Nuxt : ce fichier à la racine remplace la page pour toute
// erreur (route inconnue -> 404, ou erreur runtime) — `nuxt generate`
// (nitro.preset "static", voir nuxt.config.ts) en fait un 404.html servi
// automatiquement par Cloudflare Pages pour toute URL non reconnue.
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>();
const { t } = useI18n();

const isNotFound = computed(() => (props.error?.statusCode ?? 404) === 404);

// noindex explicite (avenant) : jamais de canonical/OG ici, contrairement à
// usePageSeo() utilisé par les vraies pages — cette page ne doit jamais être
// indexée ni partagée comme un contenu réel.
useHead({
  title: isNotFound.value ? t("errorPage.title404") : t("errorPage.titleGeneric"),
  meta: [{ name: "robots", content: "noindex" }],
});

function goHome() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <header class="border-b border-slate-100">
      <div class="mx-auto flex max-w-6xl items-center px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo.png" alt="ZekoraPay" class="h-9 w-auto">
        </NuxtLink>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-6 py-16">
      <div class="flex flex-col items-center gap-4 text-center">
        <span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint text-brand">
          <SearchX v-if="isNotFound" class="h-6 w-6" stroke-width="2.25" />
          <TriangleAlert v-else class="h-6 w-6" stroke-width="2.25" />
        </span>
        <p class="text-sm font-bold uppercase tracking-wide text-brand">{{ isNotFound ? '404' : t('errorPage.genericCode') }}</p>
        <h1 class="text-3xl font-black text-deep sm:text-4xl">
          {{ isNotFound ? t('errorPage.title404') : t('errorPage.titleGeneric') }}
        </h1>
        <p class="max-w-md text-slate-600">
          {{ isNotFound ? t('errorPage.body404') : t('errorPage.bodyGeneric') }}
        </p>
        <button
          type="button"
          class="mt-2 flex items-center gap-2 rounded-[10px] bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#21568c]"
          @click="goHome"
        >
          <Home class="h-4 w-4" stroke-width="2.25" />
          {{ t("errorPage.backHome") }}
        </button>
      </div>
    </main>

    <footer class="border-t border-slate-100">
      <div class="mx-auto flex max-w-6xl items-center justify-center px-6 py-8 text-sm text-slate-500">
        <img src="/logo.png" alt="ZekoraPay" class="h-8 w-auto opacity-75">
      </div>
    </footer>
  </div>
</template>
