<script setup lang="ts">
import {
  Building2,
  Coins,
  CreditCard,
  Globe2,
  Heart,
  KeyRound,
  Landmark,
  Lock,
  QrCode,
  Rocket,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Ticket,
  TrendingUp,
  UserPlus,
  Users,
  Video,
  Wallet,
} from "lucide-vue-next";

const config = useRuntimeConfig();
const { t, locale } = useI18n();
const isEn = computed(() => locale.value === "en");

usePageSeo({
  title:
    locale.value === "en"
      ? "ZekoraPay — Personal Finance App & B2B Enterprise Pro"
      : "ZekoraPay — Finances personnelles (App) & Gestion d'entreprise (Pro)",
  description:
    locale.value === "en"
      ? "Multi-currency & crypto wallets, Mobile Money, virtual cards, instant transfers, digital tontines, and ZekoraPay Pro (B2B treasury, multi-admin approvals, payroll, invoicing, stock & POS)."
      : "Portefeuilles multi-devises & crypto, Mobile Money, cartes virtuelles, virements instantanés, tontines digitales et ZekoraPay Pro (trésorerie B2B, approbations multi-admin, paie, facturation, stock & POS).",
  path: "/",
});

type FeatureCategory = "all" | "finance" | "community" | "business" | "platform";
const activeCategory = ref<FeatureCategory>("all");

const features = [
  { icon: Wallet, key: "wallet", slug: "portefeuilles-multi-devises", cat: "finance" },
  { icon: Send, key: "transfer", slug: "transferts-instantanes", cat: "finance" },
  { icon: CreditCard, key: "cards", slug: "cartes-prepayees", cat: "finance" },
  { icon: QrCode, key: "qr", slug: "paiement-qr-code", cat: "business" },
  { icon: Users, key: "tontines", slug: "tontines-associations", cat: "community" },
  { icon: Building2, key: "enterprise", slug: "entreprises-b2b", cat: "business" },
  { icon: ShoppingBag, key: "shop", slug: "zekorapay-shop", cat: "business" },
  { icon: Heart, key: "donations", slug: "dons-solidarite", cat: "community" },
  { icon: Ticket, key: "events", slug: "evenements-billetterie", cat: "community" },
  { icon: Landmark, key: "cash", slug: "agents-de-proximite", cat: "finance" },
  { icon: Video, key: "video", slug: "reunions-et-messagerie", cat: "platform" },
  { icon: Sparkles, key: "ai", slug: "assistant-ia", cat: "platform" },
] as const;

const filteredFeatures = computed(() =>
  activeCategory.value === "all"
    ? features
    : features.filter((f) => f.cat === activeCategory.value),
);

const rails = [
  { icon: Smartphone, key: "mobileMoney" },
  { icon: CreditCard, key: "cards" },
  { icon: Landmark, key: "bankWire" },
  { icon: Coins, key: "crypto" },
  { icon: Globe2, key: "diaspora" },
] as const;

const securityPillars = [
  { icon: KeyRound, key: "pin" },
  { icon: Lock, key: "encryption" },
  { icon: ShieldCheck, key: "kyc" },
] as const;

const steps = [
  { icon: UserPlus, key: "step1" },
  { icon: ShieldCheck, key: "step2" },
  { icon: Rocket, key: "step3" },
] as const;

const stats = [
  { icon: Users, value: "12", key: "resources" },
  { icon: TrendingUp, value: "5", key: "counties" },
  { icon: Heart, value: "24/7", key: "categories" },
  { icon: ShieldCheck, value: "100%", key: "free" },
];

const priceLine = computed(() => t("pricing.default"));

useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: "ZekoraPay App",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web, Android, iOS (PWA)",
            description:
              "Application financière pour particuliers et associations : portefeuilles multi-devises (XAF, XOF, EUR, USD...) et crypto, dépôts/retraits Mobile Money, virements instantanés, cartes prépayées virtuelles, tontines digitales, paiements QR, achats en boutique, billetterie et messagerie chiffrée.",
            featureList: [
              "Multi-currency and crypto wallets",
              "Mobile Money deposits and withdrawals",
              "Instant peer-to-peer and international transfers",
              "Virtual prepaid Visa/Mastercard cards",
              "Digital savings groups (tontines) and associations",
              "End-to-end encrypted messaging and video meetings",
              "Embedded AI financial assistant",
            ],
            publisher: { "@id": `${config.public.siteUrl}/#organization` },
            url: config.public.webAppUrl,
          },
          {
            "@type": "SoftwareApplication",
            name: "ZekoraPay Pro",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Android, iOS (PWA)",
            description:
              "Suite de gestion financière B2B pour entreprises : comptes multi-employés avec permissions granulaires, approbations PIN multi-administrateurs, paie automatisée, facturation et reçus PDF personnalisés (entête et pied de page), gestion de stock multi-entrepôts, boutiques POS QR, gestion locative immobilière et réseau d'agents/livraison.",
            featureList: [
              "Multi-employee enterprise treasury and bulk transfers",
              "Multi-admin PIN approval workflows and security limits",
              "Automated payroll and team management",
              "Custom branded PDF invoices and receipts with enterprise headers/footers",
              "Multi-warehouse stock, POS boutiques, and QR merchant payments",
              "Real-estate rental management, fleet delivery, and field agents",
            ],
            publisher: { "@id": `${config.public.siteUrl}/#organization` },
            url: config.public.proAppUrl || "https://pro.zekorapay.com",
          },
          {
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: t("faq.q1.question"),
                acceptedAnswer: { "@type": "Answer", text: t("faq.q1.answer") },
              },
              {
                "@type": "Question",
                name: t("faq.q4.question"),
                acceptedAnswer: { "@type": "Answer", text: t("faq.q4.answer") },
              },
              {
                "@type": "Question",
                name: t("faq.q5.question"),
                acceptedAnswer: { "@type": "Answer", text: t("faq.q5.answer") },
              },
              {
                "@type": "Question",
                name: t("faq.q7.question"),
                acceptedAnswer: { "@type": "Answer", text: t("faq.q7.answer") },
              },
            ],
          },
        ],
      }),
    },
  ],
}));
</script>

<template>
  <div>
    <!-- Clean White Fintech Hero (Dark mode matches app slate-950) -->
    <section class="relative isolate overflow-hidden bg-white dark:bg-slate-950">
      <div
        aria-hidden="true"
        class="dot-grid pointer-events-none absolute inset-0 opacity-40 dark:opacity-15"
      />
      <div class="relative mx-auto max-w-6xl px-6 pb-16 pt-12 sm:pb-24 sm:pt-18">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-6">
            <span class="badge-pill border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {{ t("hero.badge") }}
            </span>
            <h1 class="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.25rem]">
              {{ t("hero.title") }}
              <span class="gradient-text block">{{ t("hero.titleAccent") }}</span>
            </h1>
            <p class="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {{ t("hero.subtitle") }}
            </p>

            <!-- Primary CTAs -->
            <div id="open-app" class="mt-8 flex flex-wrap gap-3">
              <OpenAppButton />
              <a
                :href="config.public.proAppUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                <img src="/logo-pro.png" alt="" class="h-5 w-5 rounded object-cover ring-1 ring-white/25">
                <span>ZekoraPay Pro</span>
              </a>
              <a href="#features" class="btn-outline-dark px-6 py-3.5 text-base dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                {{ t("hero.ctaSecondary") }}
              </a>
            </div>

            <!-- App Store & Google Play Badges -->
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <StoreButton store="apple" :url="config.public.appStoreUrl" theme="light" />
              <StoreButton store="google" :url="config.public.playStoreUrl" theme="light" />
            </div>

            <p class="mt-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
              {{ priceLine }}
            </p>
          </div>

          <!-- Real App Screenshots Showcase -->
          <div class="lg:col-span-6">
            <AppScreenshotShowcase />
          </div>
        </div>

        <!-- Clean Stats Strip -->
        <div class="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/70 sm:mt-20 sm:grid-cols-4 sm:p-8">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
              <component :is="stat.icon" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            <span class="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl"><CountUp :value="stat.value" /></span>
            <span class="text-xs font-semibold leading-tight text-slate-500 dark:text-slate-400">{{ t(`stats.${stat.key}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Rails Trust Strip -->
    <section class="border-y border-slate-100 bg-slate-50/70 py-8 dark:border-slate-800 dark:bg-slate-900/50">
      <div class="mx-auto max-w-6xl px-6">
        <p class="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {{ t("rails.kicker") }}
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div
            v-for="rail in rails"
            :key="rail.key"
            class="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <component :is="rail.icon" class="h-4 w-4 text-brand dark:text-indigo-400" stroke-width="2.2" />
            {{ t(`rails.items.${rail.key}`) }}
          </div>
        </div>
      </div>
    </section>

    <!-- Dual App Showcase (ZekoraPay vs ZekoraPay Pro) -->
    <DualAppShowcase />

    <!-- New Platform Modules: Delivery & Trust Badges -->
    <NewModulesShowcase />

    <!-- Bento Real App Ecosystem with Real Screenshots -->
    <BentoEcosystem />

    <!-- Interactive Solution Showcase -->
    <SolutionShowcase />

    <!-- Interactive Currency & Fee Calculator -->
    <FeeCalculatorWidget />

    <!-- Web & Mobile Apps (Real Mobile Screenshot + App Store / Google Play) -->
    <MobileAppsShowcase />

    <!-- All 13 Features Grid with Category Filter -->
    <section id="features" class="bg-white py-16 dark:bg-slate-950 sm:py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="text-xs font-bold uppercase tracking-widest text-brand dark:text-indigo-400">{{ t("features.kicker") }}</span>
          <h2 class="mt-2 text-3xl font-black text-balance text-slate-900 dark:text-white sm:text-4xl">{{ t("features.heading") }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">{{ t("features.subheading") }}</p>
        </div>

        <div class="mt-8 flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in (['all', 'finance', 'community', 'business', 'platform'] as const)"
            :key="cat"
            type="button"
            class="rounded-full border px-4 py-1.5 text-xs font-bold transition"
            :class="
              activeCategory === cat
                ? 'border-brand bg-brand text-white shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary-200 hover:text-deep dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white'
            "
            @click="activeCategory = cat"
          >
            {{ t(`features.categories.${cat}`) }}
          </button>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            v-for="feature in filteredFeatures"
            :key="feature.key"
            :icon="feature.icon"
            :slug="feature.slug"
            :category="t(`features.categories.${feature.cat}`)"
            :title="t(`features.${feature.key}.title`)"
            :description="t(`features.${feature.key}.description`)"
          />
        </div>
      </div>
    </section>

    <!-- Security & Architecture Band -->
    <section class="border-y border-slate-100 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900 sm:py-20">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="badge-pill border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            <ShieldCheck class="h-3.5 w-3.5" />
            {{ t("securityBand.kicker") }}
          </span>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {{ t("securityBand.heading") }}
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            {{ t("securityBand.subheading") }}
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="pillar in securityPillars"
            :key="pillar.key"
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-brand dark:bg-indigo-500/15 dark:text-indigo-300">
              <component :is="pillar.icon" class="h-5 w-5" stroke-width="2.2" />
            </span>
            <h3 class="mt-4 text-base font-extrabold text-slate-900 dark:text-white">
              {{ t(`securityBand.items.${pillar.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {{ t(`securityBand.items.${pillar.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="bg-white py-16 dark:bg-slate-950 sm:py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">{{ t("howItWorks.heading") }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">{{ t("howItWorks.subheading") }}</p>
        </div>
        <div class="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden="true"
            class="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent sm:block"
          />
          <div v-for="(step, index) in steps" :key="step.key" class="relative text-center">
            <div class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-md shadow-slate-200 ring-4 ring-slate-50 dark:bg-slate-900 dark:text-indigo-300 dark:shadow-black/30 dark:ring-slate-800">
              <component :is="step.icon" class="h-6 w-6" stroke-width="2.25" />
              <span class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-deep text-xs font-bold text-white ring-2 ring-white dark:bg-indigo-600 dark:ring-slate-950">
                {{ index + 1 }}
              </span>
            </div>
            <h3 class="mt-4 text-base font-extrabold text-slate-900 dark:text-white">{{ t(`howItWorks.${step.key}.title`) }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ t(`howItWorks.${step.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Developer API Section -->
    <ApiShowcaseSection />

    <!-- Final CTA -->
    <section class="border-t border-slate-100 bg-white py-20 dark:border-slate-800 dark:bg-slate-950 sm:py-24">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <div class="flex justify-center">
          <BrandLogo size="lg" :show-wordmark="false" />
        </div>
        <h2 class="mt-6 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">{{ t("cta.title") }}</h2>
        <p class="mt-3 text-lg text-slate-500 dark:text-slate-400">{{ t("cta.subtitle") }}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <OpenAppButton />
          <a
            :href="config.public.proAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-500"
          >
            <img src="/logo-pro.png" alt="" class="h-5 w-5 rounded object-cover ring-1 ring-white/25">
            <span>ZekoraPay Pro</span>
          </a>
          <NuxtLink to="/docs" class="btn-outline-dark px-8 py-4 text-base dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            {{ t("apiCta.link") }}
          </NuxtLink>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <StoreButton store="apple" :url="config.public.appStoreUrl" theme="light" />
          <StoreButton store="google" :url="config.public.playStoreUrl" theme="light" />
        </div>
        <div class="mt-4 flex flex-wrap justify-center gap-2.5">
          <a
            :href="config.public.apkUserUrl"
            download
            class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <img src="/logo-dark.png" alt="" class="h-3.5 w-3.5 rounded object-cover">
            {{ isEn ? "APK ZekoraPay" : "APK ZekoraPay" }}
          </a>
          <a
            :href="config.public.apkProUrl"
            download
            class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300"
          >
            <img src="/logo-pro.png" alt="" class="h-3.5 w-3.5 rounded object-cover">
            APK ZekoraPay Pro
          </a>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-400 dark:text-slate-500">{{ priceLine }}</p>
      </div>
    </section>
  </div>
</template>
