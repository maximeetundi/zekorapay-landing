<script setup lang="ts">
import { Code2, HelpCircle, Home, Mail, Menu, Newspaper, ShieldCheck, UserRound } from "lucide-vue-next";

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();
const mobileMenuOpen = ref(false);
const scrolled = ref(false);

const navIconMap: Record<string, typeof Home> = {
  home: Home,
  about: UserRound,
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
  script: [
    {
      innerHTML: `(function(){try{var t=localStorage.getItem('zekorapay_landing_theme');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`,
    },
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
  <div class="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
    <header
      class="sticky top-0 z-30 border-b transition-all duration-200"
      :class="
        scrolled
          ? 'border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90'
          : 'border-slate-100 bg-white/95 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/90'
      "
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        <NuxtLink to="/" class="flex shrink-0 items-center">
          <BrandLogo size="md" />
        </NuxtLink>

        <div class="flex min-w-0 items-center justify-center">
          <nav class="hidden items-center gap-0.5 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex">
              <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 transition hover:bg-slate-100 hover:text-deep dark:hover:bg-slate-800 dark:hover:text-white"
              :class="isActive(link.to) ? 'bg-primary-50 text-brand dark:bg-indigo-500/15 dark:text-indigo-300' : ''"
            >
              <component :is="navIconMap[link.key]" class="h-4 w-4 shrink-0" stroke-width="2.2" />
              {{ t(`nav.${link.key}`) }}
            </NuxtLink>
          </nav>
          <div class="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <LanguageSwitcher class="hidden lg:flex" />
          <ThemeToggle class="hidden lg:inline-flex" />
          <a
            :href="config.public.proAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-500/20 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300 lg:inline-flex"
          >
            <img src="/logo-pro.png" alt="" class="h-4 w-4 shrink-0 rounded object-cover">
            <span>ZekoraPay Pro</span>
          </a>
          <a
            :href="config.public.webAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden shrink-0 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand to-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow-sm lg:inline-flex"
          >
            {{ t("nav.cta") }}
          </a>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-deep transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
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

    <footer class="border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <!-- Brand -->
          <div class="lg:col-span-5">
            <NuxtLink to="/" class="inline-flex items-center">
              <BrandLogo size="md" />
            </NuxtLink>
            <p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {{ t("footer.tagline") }}
            </p>
            <div class="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <ShieldCheck class="h-4 w-4" />
              {{ t("footer.securityBadge") }}
            </div>
            <div class="mt-5 flex flex-wrap gap-2.5">
              <StoreButton store="apple" :url="config.public.appStoreUrl" theme="light" />
              <StoreButton store="google" :url="config.public.playStoreUrl" theme="light" />
            </div>
          </div>

          <!-- Platform -->
          <div class="lg:col-span-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {{ t("footer.colPlatform") }}
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><NuxtLink to="/features/portefeuilles-multi-devises" class="transition hover:text-brand dark:hover:text-white">{{ t("features.wallet.title") }}</NuxtLink></li>
              <li><NuxtLink to="/features/tontines-associations" class="transition hover:text-brand dark:hover:text-white">{{ t("features.tontines.title") }}</NuxtLink></li>
              <li><NuxtLink to="/features/entreprises-b2b" class="transition hover:text-brand dark:hover:text-white">{{ t("features.enterprise.title") }}</NuxtLink></li>
              <li><NuxtLink to="/features/zekorapay-shop" class="transition hover:text-brand dark:hover:text-white">{{ t("features.shop.title") }}</NuxtLink></li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="lg:col-span-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {{ t("footer.colResources") }}
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><NuxtLink to="/features/assistant-ia" class="transition hover:text-brand dark:hover:text-white">{{ t("features.ai.title") }}</NuxtLink></li>
              <li><NuxtLink to="/docs" class="transition hover:text-brand dark:hover:text-white">{{ t("nav.docs") }}</NuxtLink></li>
              <li><NuxtLink to="/blog" class="transition hover:text-brand dark:hover:text-white">{{ t("nav.blog") }}</NuxtLink></li>
              <li><NuxtLink to="/faq" class="transition hover:text-brand dark:hover:text-white">{{ t("nav.faq") }}</NuxtLink></li>
            </ul>
          </div>

          <!-- Legal & Contact -->
          <div class="lg:col-span-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {{ t("footer.colCompany") }}
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><NuxtLink to="/about" class="transition hover:text-brand dark:hover:text-white">{{ t("nav.about") }}</NuxtLink></li>
              <li><NuxtLink to="/contact" class="transition hover:text-brand dark:hover:text-white">{{ t("footer.contact") }}</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="transition hover:text-brand dark:hover:text-white">{{ t("footer.privacy") }}</NuxtLink></li>
              <li><NuxtLink to="/terms" class="transition hover:text-brand dark:hover:text-white">{{ t("footer.terms") }}</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 sm:flex-row">
          <p>{{ t("footer.rights", { year: new Date().getFullYear() }) }}</p>
          <div class="flex items-center gap-4">
            <a
              :href="config.public.webAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-brand transition hover:underline dark:text-indigo-400"
            >
              app.zekorapay.com
            </a>
            <span aria-hidden="true" class="text-slate-300 dark:text-slate-700">·</span>
            <a
              :href="config.public.proAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-emerald-600 transition hover:underline dark:text-emerald-400"
            >
              pro.zekorapay.com
            </a>
          </div>
        </div>
      </div>
    </footer>

    <BackToTopButton />
  </div>
</template>
