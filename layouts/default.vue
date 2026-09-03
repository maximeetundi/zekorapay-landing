<script setup lang="ts">
import { BookOpen, Code2, HelpCircle, Home, Mail, Menu, Newspaper, UserRound } from "lucide-vue-next";

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();
const mobileMenuOpen = ref(false);

// Même correspondance que MobileMenu.vue — icônes cohérentes entre desktop
// et mobile.
const navIconMap: Record<string, typeof Home> = {
  home: Home,
  about: UserRound,
  guide: BookOpen,
  docs: Code2,
  blog: Newspaper,
  faq: HelpCircle,
  contact: Mail,
};

// L'attribut lang de <html> doit suivre la langue active (détectée ou
// choisie explicitement) — même logique déjà en place avant la bascule
// multipage. og:url/canonical restent définis par chaque page (plus
// précis qu'un lien racine unique une fois plusieurs routes réelles).
useHead(() => ({
  htmlAttrs: { lang: locale.value },
}));

// Organization + WebSite JSON-LD (référencement IA/SEO) : donne aux moteurs
// et aux assistants IA une identité structurée du site plutôt que du texte
// libre à interpréter — répété sur chaque page (pratique standard), léger
// et sans donnée inventée (pas de note/avis fabriqué, voir pages/index.vue).
useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${config.public.siteUrl}/#organization`,
            name: "ZekoraPay",
            url: config.public.siteUrl,
            logo: `${config.public.siteUrl}/logo.png`,
            ...(config.public.contactEmail ? { email: config.public.contactEmail } : {}),
          },
          {
            "@type": "WebSite",
            "@id": `${config.public.siteUrl}/#website`,
            url: config.public.siteUrl,
            name: "ZekoraPay",
            publisher: { "@id": `${config.public.siteUrl}/#organization` },
            inLanguage: ["fr", "en"],
          },
        ],
      }),
    },
  ],
}));

const navLinks = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/guide", key: "guide" },
  { to: "/docs", key: "docs" },
  { to: "/blog", key: "blog" },
  { to: "/faq", key: "faq" },
  { to: "/contact", key: "contact" },
] as const;

function isActive(to: string): boolean {
  return to === "/" ? route.path === "/" : route.path.startsWith(to);
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <header class="sticky top-0 z-20 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div class="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo.png" alt="ZekoraPay" class="h-9 w-auto">
        </NuxtLink>

        <div class="flex items-center justify-center">
          <nav class="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-1.5 transition hover:text-deep"
              :class="isActive(link.to) ? 'text-deep' : ''"
            >
              <component :is="navIconMap[link.key]" class="h-4 w-4" stroke-width="2.25" />
              {{ t(`nav.${link.key}`) }}
            </NuxtLink>
          </nav>
          <!-- Mobile : le sélecteur de langue vit ici, au centre de la barre
          entre le logo et le bouton menu (plus dans le tiroir). -->
          <LanguageSwitcher class="lg:hidden" />
        </div>

        <div class="flex items-center gap-3">
          <LanguageSwitcher class="hidden lg:flex" />
          <a
            :href="config.public.webAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden rounded-[10px] bg-gradient-to-r from-brand to-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 lg:inline-flex"
          >
            {{ t("nav.cta") }}
          </a>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-deep transition hover:bg-slate-100 lg:hidden"
            :aria-label="t('nav.openMenu')"
            @click="mobileMenuOpen = true"
          >
            <Menu class="h-6 w-6" stroke-width="2.25" />
          </button>
        </div>
      </div>
    </header>

    <MobileMenu v-model:open="mobileMenuOpen" :nav-links="navLinks" />

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-100">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <img src="/logo.png" alt="ZekoraPay" class="h-8 w-auto opacity-75">
        <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <NuxtLink to="/privacy" class="hover:text-deep">{{ t("footer.privacy") }}</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-deep">{{ t("footer.terms") }}</NuxtLink>
          <a v-if="config.public.contactEmail" :href="`mailto:${config.public.contactEmail}`" class="hover:text-deep">
            {{ t("footer.contact") }}
          </a>
        </div>
        <p>{{ t("footer.rights", { year: new Date().getFullYear() }) }}</p>
      </div>
    </footer>

    <BackToTopButton />
  </div>
</template>
