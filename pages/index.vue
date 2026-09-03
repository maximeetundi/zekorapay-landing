<script setup lang="ts">
import {
  Building2,
  Code2,
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
    <section class="hero-section dot-grid relative isolate overflow-hidden bg-white">
      <div class="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700">
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {{ t("hero.badge") }}
            </span>
            <h1 class="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-deep sm:text-5xl lg:text-[3.25rem]">
              {{ t("hero.title") }}
              <span class="gradient-text block">{{ t("hero.titleAccent") }}</span>
            </h1>
            <p class="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              {{ t("hero.subtitle") }}
            </p>
            <div id="open-app" class="mt-8 flex flex-col gap-3 sm:flex-row">
              <OpenAppButton />
              <a href="#features" class="btn-outline-dark text-base px-6 py-3.5">
                {{ t("hero.ctaSecondary") }}
              </a>
            </div>
            <p class="mt-3 text-sm font-semibold text-slate-400">
              {{ priceLine }}
            </p>
          </div>
          <PhoneMockup />
        </div>

        <div class="glass-card-light mt-16 grid grid-cols-2 gap-4 rounded-3xl p-6 sm:mt-20 sm:grid-cols-4 sm:p-8">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-brand">
              <component :is="stat.icon" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            <span class="text-2xl font-black tracking-tight text-deep sm:text-3xl"><CountUp :value="stat.value" /></span>
            <span class="text-xs font-semibold leading-tight text-slate-500">{{ t(`stats.${stat.key}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="bg-gray-50 py-16 sm:py-20">
      <div class="mx-auto max-w-6xl px-6">
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

    <section class="py-20" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="text-white">
            <span class="badge-pill border border-white/20 bg-white/10 text-white/80">{{ t("apiCta.badge") }}</span>
            <h2 class="mt-4 text-3xl font-extrabold sm:text-4xl">
              {{ t("apiCta.title") }}
              <span class="text-primary-300">{{ t("apiCta.titleAccent") }}</span>
            </h2>
            <p class="mt-4 leading-relaxed text-white/70">{{ t("apiCta.description") }}</p>
            <NuxtLink to="/docs" class="btn-primary mt-8 text-base px-8 py-4">
              <Code2 class="h-5 w-5" stroke-width="2.25" />
              {{ t("apiCta.link") }}
            </NuxtLink>
          </div>
          <div class="glass-card overflow-hidden rounded-2xl">
            <div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div class="h-3 w-3 rounded-full bg-red-400" />
              <div class="h-3 w-3 rounded-full bg-yellow-400" />
              <div class="h-3 w-3 rounded-full bg-green-400" />
              <span class="ml-2 text-xs text-white/40">API Example</span>
            </div>
            <pre class="overflow-x-auto p-6 text-sm leading-relaxed"><code class="text-emerald-300">POST</code><code class="text-white/70"> /v1/payments/requests</code>
<code class="text-white/40">{</code>
  <code class="text-sky-300">"amount"</code><code class="text-white/70">: </code><code class="text-orange-300">50000</code><code class="text-white/40">,</code>
  <code class="text-sky-300">"currency"</code><code class="text-white/70">: </code><code class="text-yellow-300">"XAF"</code>
<code class="text-white/40">}</code>
<code class="text-white/30">// Response</code>
<code class="text-white/40">{</code>
  <code class="text-sky-300">"status"</code><code class="text-white/70">: </code><code class="text-yellow-300">"success"</code><code class="text-white/40">,</code>
  <code class="text-sky-300">"payment_id"</code><code class="text-white/70">: </code><code class="text-yellow-300">"pay_..."</code>
<code class="text-white/40">}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-br from-gray-50 to-primary-50 py-20 sm:py-24">
      <div class="mx-auto max-w-2xl px-6 text-center">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl" style="background: linear-gradient(135deg,#6366f1,#a855f7)">
          <Rocket class="h-6 w-6 text-white" stroke-width="2.25" />
        </span>
        <h2 class="mt-6 text-3xl font-black text-deep sm:text-4xl">{{ t("cta.title") }}</h2>
        <p class="mt-3 text-lg text-slate-500">{{ t("cta.subtitle") }}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <OpenAppButton />
          <NuxtLink to="/docs" class="btn-outline-dark text-base px-8 py-4">
            {{ t("apiCta.link") }}
          </NuxtLink>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-400">{{ priceLine }}</p>
      </div>
    </section>
  </div>
</template>
