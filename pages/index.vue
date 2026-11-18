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
  Repeat,
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
const { t } = useI18n();

usePageSeo({
  title: "ZekoraPay — La plateforme financière globale",
  description:
    "Gérez vos tontines, entreprises et finances personnelles. Envoyez de l'argent, payez et investissez en toute sécurité avec ZekoraPay.",
  path: "/",
});

type FeatureCategory = "all" | "finance" | "community" | "business" | "platform";
const activeCategory = ref<FeatureCategory>("all");

const features = [
  { icon: Wallet, key: "wallet", slug: "portefeuilles-multi-devises", cat: "finance" },
  { icon: Send, key: "transfer", slug: "transferts-instantanes", cat: "finance" },
  { icon: CreditCard, key: "cards", slug: "cartes-prepayees", cat: "finance" },
  { icon: Repeat, key: "exchange", slug: "change-et-crypto", cat: "finance" },
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
  { icon: Users, value: "13", key: "resources" },
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
        "@type": "WebApplication",
        name: "ZekoraPay",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        description:
          "ZekoraPay is the all-in-one platform for payments, digital savings groups (tontines), transfers, and B2B financial services in Africa.",
        publisher: { "@id": `${config.public.siteUrl}/#organization` },
        url: config.public.webAppUrl,
      }),
    },
  ],
}));
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero-section dot-grid relative isolate overflow-hidden bg-white">
      <div class="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700">
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {{ t("hero.badge") }}
            </span>
            <h1 class="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-deep sm:text-5xl lg:text-[3.35rem]">
              {{ t("hero.title") }}
              <span class="gradient-text block">{{ t("hero.titleAccent") }}</span>
            </h1>
            <p class="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              {{ t("hero.subtitle") }}
            </p>
            <div id="open-app" class="mt-8 flex flex-col gap-3 sm:flex-row">
              <OpenAppButton />
              <a href="#features" class="btn-outline-dark px-6 py-3.5 text-base">
                {{ t("hero.ctaSecondary") }}
              </a>
            </div>
            <p class="mt-4 text-sm font-semibold text-slate-400">
              {{ priceLine }}
            </p>
          </div>
          <PhoneMockup />
        </div>

        <!-- Stats bar -->
        <div class="glass-card-light mt-16 grid grid-cols-2 gap-4 rounded-3xl p-6 sm:mt-20 sm:grid-cols-4 sm:p-8">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-brand">
              <component :is="stat.icon" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            <span class="text-2xl font-black tracking-tight text-deep sm:text-3xl"><CountUp :value="stat.value" /></span>
            <span class="text-xs font-semibold leading-tight text-slate-500">{{ t(`stats.${stat.key}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Rails Trust Strip -->
    <section class="border-t border-slate-100 bg-slate-50/70 py-8">
      <div class="mx-auto max-w-6xl px-6">
        <p class="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          {{ t("rails.kicker") }}
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div
            v-for="rail in rails"
            :key="rail.key"
            class="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm"
          >
            <component :is="rail.icon" class="h-4 w-4 text-brand" stroke-width="2.2" />
            {{ t(`rails.items.${rail.key}`) }}
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Solution Showcase -->
    <SolutionShowcase />

    <!-- Interactive Currency & Fee Calculator -->
    <FeeCalculatorWidget />

    <!-- Features Grid with Category Filter -->
    <section id="features" class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="text-xs font-bold uppercase tracking-widest text-brand">{{ t("features.kicker") }}</span>
          <h2 class="mt-2 text-3xl font-black text-balance text-deep sm:text-4xl">{{ t("features.heading") }}</h2>
          <p class="mt-3 text-slate-600">{{ t("features.subheading") }}</p>
        </div>

        <!-- Category Filter Pills -->
        <div class="mt-8 flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in (['all', 'finance', 'community', 'business', 'platform'] as const)"
            :key="cat"
            type="button"
            class="rounded-full border px-4 py-1.5 text-xs font-bold transition"
            :class="
              activeCategory === cat
                ? 'border-brand bg-brand text-white shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary-200 hover:text-deep'
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
    <section class="border-y border-slate-100 bg-slate-950 py-16 text-white sm:py-20">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="badge-pill border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
            <ShieldCheck class="h-3.5 w-3.5" />
            {{ t("securityBand.kicker") }}
          </span>
          <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {{ t("securityBand.heading") }}
          </h2>
          <p class="mt-3 text-slate-400">
            {{ t("securityBand.subheading") }}
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="pillar in securityPillars"
            :key="pillar.key"
            class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
              <component :is="pillar.icon" class="h-5 w-5" stroke-width="2.2" />
            </span>
            <h3 class="mt-4 text-base font-extrabold text-white">
              {{ t(`securityBand.items.${pillar.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">
              {{ t(`securityBand.items.${pillar.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-black text-deep sm:text-4xl">{{ t("howItWorks.heading") }}</h2>
        <p class="mt-3 text-slate-600">{{ t("howItWorks.subheading") }}</p>
      </div>
      <div class="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        <div
          aria-hidden="true"
          class="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent sm:block"
        />
        <div v-for="(step, index) in steps" :key="step.key" class="relative text-center">
          <div class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-md shadow-slate-200 ring-4 ring-slate-50">
            <component :is="step.icon" class="h-6 w-6" stroke-width="2.25" />
            <span class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-deep text-xs font-bold text-white ring-2 ring-white">
              {{ index + 1 }}
            </span>
          </div>
          <h3 class="mt-4 text-base font-extrabold text-deep">{{ t(`howItWorks.${step.key}.title`) }}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-slate-600">{{ t(`howItWorks.${step.key}.description`) }}</p>
        </div>
      </div>
    </section>

    <!-- Interactive Developer API Section -->
    <ApiShowcaseSection />

    <!-- Final CTA -->
    <section class="bg-gradient-to-br from-gray-50 to-primary-50 py-20 sm:py-24">
      <div class="mx-auto max-w-2xl px-6 text-center">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow-sm" style="background: linear-gradient(135deg,#6366f1,#a855f7)">
          <Rocket class="h-6 w-6 text-white" stroke-width="2.25" />
        </span>
        <h2 class="mt-6 text-3xl font-black text-deep sm:text-4xl">{{ t("cta.title") }}</h2>
        <p class="mt-3 text-lg text-slate-500">{{ t("cta.subtitle") }}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <OpenAppButton />
          <NuxtLink to="/docs" class="btn-outline-dark px-8 py-4 text-base">
            {{ t("apiCta.link") }}
          </NuxtLink>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-400">{{ priceLine }}</p>
      </div>
    </section>
  </div>
</template>
