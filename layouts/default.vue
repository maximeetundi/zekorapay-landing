<script setup lang="ts">
import { BookOpen, Code2, HelpCircle, Home, Mail, Menu, Newspaper, ShieldCheck, UserRound } from "lucide-vue-next";

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();
const mobileMenuOpen = ref(false);
const scrolled = ref(false);

const navIconMap: Record<string, typeof Home> = {
  home: Home,
  about: UserRound,
  guide: BookOpen,
  docs: Code2,
  blog: Newspaper,
  faq: HelpCircle,
  contact: Mail,
};

function handleScroll() {
  scrolled.value = window.scrollY > 12;
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}));

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
    <header
      class="sticky top-0 z-30 border-b transition-all duration-200"
      :class="
        scrolled
          ? 'border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl'
          : 'border-slate-100 bg-white/95 backdrop-blur-sm'
      "
    >
      <div class="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-6 py-3.5">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo.png" alt="ZekoraPay" class="h-9 w-auto">
        </NuxtLink>

        <div class="flex items-center justify-center">
          <nav class="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition hover:bg-slate-100/80 hover:text-deep"
              :class="isActive(link.to) ? 'bg-primary-50/80 text-brand' : ''"
            >
              <component :is="navIconMap[link.key]" class="h-4 w-4" stroke-width="2.2" />
              {{ t(`nav.${link.key}`) }}
            </NuxtLink>
          </nav>
          <LanguageSwitcher class="lg:hidden" />
        </div>

        <div class="flex items-center gap-3">
          <LanguageSwitcher class="hidden lg:flex" />
          <a
            :href="config.public.webAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden rounded-xl bg-gradient-to-r from-brand to-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow-sm lg:inline-flex"
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

    <footer class="border-t border-slate-200/80 bg-slate-950 text-slate-300">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <!-- Brand -->
          <div class="lg:col-span-5">
            <NuxtLink to="/" class="inline-flex items-center gap-2.5">
              <img src="/logo.png" alt="ZekoraPay" class="h-9 w-auto brightness-0 invert">
            </NuxtLink>
            <p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {{ t("footer.tagline") }}
            </p>
            <div class="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <ShieldCheck class="h-4 w-4" />
              {{ t("footer.securityBadge") }}
            </div>
            <div class="mt-5 flex flex-wrap gap-2.5">
              <StoreButton store="apple" :url="config.public.appStoreUrl" theme="dark" />
              <StoreButton store="google" :url="config.public.playStoreUrl" theme="dark" />
            </div>
          </div>

          <!-- Platform -->
          <div class="lg:col-span-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-white">
              {{ t("footer.colPlatform") }}
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><NuxtLink to="/features/portefeuilles-multi-devises" class="transition hover:text-white">{{ t("features.wallet.title") }}</NuxtLink></li>
              <li><NuxtLink to="/features/tontines-associations" class="transition hover:text-white">{{ t("features.tontines.title") }}</NuxtLink></li>
              <li><NuxtLink to="/features/entreprises-b2b" class="transition hover:text-white">{{ t("features.enterprise.title") }}</NuxtLink></li>
              <li><NuxtLink to="/features/zekorapay-shop" class="transition hover:text-white">{{ t("features.shop.title") }}</NuxtLink></li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="lg:col-span-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-white">
              {{ t("footer.colResources") }}
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><NuxtLink to="/guide" class="transition hover:text-white">{{ t("nav.guide") }}</NuxtLink></li>
              <li><NuxtLink to="/docs" class="transition hover:text-white">{{ t("nav.docs") }}</NuxtLink></li>
              <li><NuxtLink to="/blog" class="transition hover:text-white">{{ t("nav.blog") }}</NuxtLink></li>
              <li><NuxtLink to="/faq" class="transition hover:text-white">{{ t("nav.faq") }}</NuxtLink></li>
            </ul>
          </div>

          <!-- Legal & Contact -->
          <div class="lg:col-span-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-white">
              {{ t("footer.colCompany") }}
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><NuxtLink to="/about" class="transition hover:text-white">{{ t("nav.about") }}</NuxtLink></li>
              <li><NuxtLink to="/contact" class="transition hover:text-white">{{ t("footer.contact") }}</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="transition hover:text-white">{{ t("footer.privacy") }}</NuxtLink></li>
              <li><NuxtLink to="/terms" class="transition hover:text-white">{{ t("footer.terms") }}</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>{{ t("footer.rights", { year: new Date().getFullYear() }) }}</p>
          <a
            :href="config.public.webAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-indigo-300 transition hover:text-white"
          >
            app.zekorapay.com
          </a>
        </div>
      </div>
    </footer>

    <BackToTopButton />
  </div>
</template>
