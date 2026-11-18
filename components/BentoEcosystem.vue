<script setup lang="ts">
import { ArrowRight, Building2, CreditCard, MessageSquare, ShoppingBag, Sparkles, Users, Wallet } from "lucide-vue-next";

const { t } = useI18n();
</script>

<template>
  <section class="bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700">
          <Sparkles class="h-3.5 w-3.5" />
          {{ t("bento.kicker") }}
        </span>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-deep sm:text-4xl">
          {{ t("bento.heading") }}
        </h2>
        <p class="mt-3 text-slate-600">
          {{ t("bento.subheading") }}
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
        <!-- Card 1: Multi-currency & Crypto (Large) -->
        <NuxtLink
          to="/features/portefeuilles-multi-devises"
          class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-950 via-[#1b174b] to-indigo-950 p-7 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-3"
        >
          <div>
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-indigo-300 ring-1 ring-white/15">
              <Wallet class="h-5 w-5" />
            </span>
            <h3 class="mt-5 text-xl font-black">{{ t("bento.c1.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-300">{{ t("bento.c1.desc") }}</p>
          </div>
          <div class="mt-6 flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">XAF / XOF</span>
            <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">EUR / USD</span>
            <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">USDT / BTC / ETH</span>
          </div>
        </NuxtLink>

        <!-- Card 2: Tontines & Associations (Large) -->
        <NuxtLink
          to="/features/tontines-associations"
          class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl md:col-span-3"
        >
          <div>
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-glow-sm">
              <Users class="h-5 w-5" />
            </span>
            <h3 class="mt-5 text-xl font-black text-deep">{{ t("bento.c2.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ t("bento.c2.desc") }}</p>
          </div>
          <span class="mt-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-brand">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>

        <!-- Card 3: Shop & POS Pro -->
        <NuxtLink
          to="/features/zekorapay-shop"
          class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg md:col-span-2"
        >
          <div>
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ShoppingBag class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-extrabold text-deep">{{ t("bento.c3.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ t("bento.c3.desc") }}</p>
          </div>
          <span class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>

        <!-- Card 4: Prepaid Cards -->
        <NuxtLink
          to="/features/cartes-prepayees"
          class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg md:col-span-2"
        >
          <div>
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <CreditCard class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-extrabold text-deep">{{ t("bento.c4.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ t("bento.c4.desc") }}</p>
          </div>
          <span class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>

        <!-- Card 5: Enterprise B2B & Messaging -->
        <NuxtLink
          to="/features/entreprises-b2b"
          class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg md:col-span-2"
        >
          <div>
            <div class="flex items-center gap-2">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Building2 class="h-5 w-5" />
              </span>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <MessageSquare class="h-5 w-5" />
              </span>
            </div>
            <h3 class="mt-4 text-lg font-extrabold text-deep">{{ t("bento.c5.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ t("bento.c5.desc") }}</p>
          </div>
          <span class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
