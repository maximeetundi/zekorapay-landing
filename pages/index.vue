<script setup lang="ts">
import {
  Building2,
  CreditCard,
  Heart,
  Landmark,
  QrCode,
  Repeat,
  Rocket,
  Send,
  ShieldCheck,
  ShoppingBag,
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

const features = [
  { icon: Wallet, key: "wallet", slug: "portefeuilles-multi-devises" },
  { icon: Send, key: "transfer", slug: "transferts-instantanes" },
  { icon: CreditCard, key: "cards", slug: "cartes-prepayees" },
  { icon: Repeat, key: "exchange", slug: "change-et-crypto" },
  { icon: QrCode, key: "qr", slug: "paiement-qr-code" },
  { icon: Users, key: "tontines", slug: "tontines-associations" },
  { icon: Building2, key: "enterprise", slug: "entreprises-b2b" },
  { icon: ShoppingBag, key: "shop", slug: "zekorapay-shop" },
  { icon: Heart, key: "donations", slug: "dons-solidarite" },
  { icon: Ticket, key: "events", slug: "evenements-billetterie" },
  { icon: Landmark, key: "cash", slug: "agents-de-proximite" },
  { icon: Video, key: "video", slug: "reunions-et-messagerie" },
  { icon: Sparkles, key: "ai", slug: "assistant-ia" },
] as const;

const steps = [
  { icon: UserPlus, key: "step1" },
  { icon: ShieldCheck, key: "step2" },
  { icon: Rocket, key: "step3" },
] as const;

// Chiffres affichés côté marketing (voir home.blade.php d'origine) --
// arrondis, pas de décimales précises inventées. À remplacer par les vrais
// chiffres de production dès qu'un tableau de bord public existe pour les
// sourcer automatiquement plutôt que de les mettre à jour à la main ici.
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
    <section class="hero-section relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95]"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-24 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -left-32 top-32 -z-10 h-[26rem] w-[26rem] rounded-full bg-secondary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:28px_28px]"
      />

      <div class="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <span class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/90 backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-emerald-400" />
              {{ t("hero.badge") }}
            </span>
            <h1 class="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {{ t("hero.title") }}
            </h1>
            <p class="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              {{ t("hero.subtitle") }}
            </p>
            <div id="open-app" class="mt-8 flex flex-col gap-3 sm:flex-row">
              <OpenAppButton />
              <a
                href="#features"
                class="inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-white/30 px-6 py-3.5 text-base font-bold text-white transition hover:bg-white/10"
              >
                {{ t("hero.ctaSecondary") }}
              </a>
            </div>
            <p class="mt-3 text-sm font-semibold text-white/60">
              {{ priceLine }}
            </p>
          </div>
          <PhoneMockup />
        </div>

        <div class="glass-card mt-16 grid grid-cols-2 gap-4 rounded-3xl p-6 sm:mt-20 sm:grid-cols-4 sm:p-8">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
              <component :is="stat.icon" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            <span class="text-2xl font-black tracking-tight text-white sm:text-3xl"><CountUp :value="stat.value" /></span>
            <span class="text-xs font-semibold leading-tight text-white/60">{{ t(`stats.${stat.key}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="bg-slate-50/60">
      <div class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div class="mx-auto max-w-2xl text-center">
          <span class="text-xs font-bold uppercase tracking-widest text-brand">{{ t("features.kicker") }}</span>
          <h2 class="mt-2 text-3xl font-black text-balance text-deep">{{ t("features.heading") }}</h2>
          <p class="mt-3 text-slate-600">{{ t("features.subheading") }}</p>
        </div>
        <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            v-for="feature in features"
            :key="feature.key"
            :icon="feature.icon"
            :slug="feature.slug"
            :title="t(`features.${feature.key}.title`)"
            :description="t(`features.${feature.key}.description`)"
          />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-black text-deep">{{ t("howItWorks.heading") }}</h2>
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

    <section class="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep via-[#312e81] to-brand px-8 py-14 text-center shadow-2xl shadow-deep/30 sm:px-16">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div class="relative flex flex-col items-center gap-6">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20">
            <Rocket class="h-6 w-6" stroke-width="2.25" />
          </span>
          <h2 class="max-w-lg text-3xl font-black text-white">{{ t("cta.title") }}</h2>
          <p class="max-w-md text-white/70">{{ t("cta.subtitle") }}</p>
          <div class="mt-2 flex flex-col gap-3 sm:flex-row">
            <OpenAppButton variant="outline" />
          </div>
          <p class="text-sm font-semibold text-white/70">{{ priceLine }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
