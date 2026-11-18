<script setup lang="ts">
import { ArrowRight, Building2, CreditCard, ShoppingBag, Sparkles, Users, Wallet } from "lucide-vue-next";

const { t } = useI18n();
</script>

<template>
  <section class="bg-white py-16 dark:bg-slate-950 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
          <Sparkles class="h-3.5 w-3.5" />
          {{ t("bento.kicker") }}
        </span>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {{ t("bento.heading") }}
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          {{ t("bento.subheading") }}
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
        <!-- Card 1: Multi-currency & Crypto -->
        <NuxtLink
          to="/features/portefeuilles-multi-devises"
          class="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 md:col-span-3"
        >
          <div>
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-brand dark:bg-indigo-500/15 dark:text-indigo-300">
              <Wallet class="h-5 w-5" />
            </span>
            <h3 class="mt-5 text-xl font-black text-slate-900 dark:text-white">{{ t("bento.c1.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ t("bento.c1.desc") }}</p>
          </div>
          <div class="mt-6 flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap gap-1.5">
              <span class="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">XAF / XOF</span>
              <span class="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">EUR / USD</span>
              <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">USDT / BTC / ETH</span>
            </div>
            <ArrowRight class="h-4 w-4 text-brand transition-transform group-hover:translate-x-1 dark:text-indigo-400" />
          </div>
        </NuxtLink>

        <!-- Card 2: Tontines & Associations -->
        <NuxtLink
          to="/features/tontines-associations"
          class="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 md:col-span-3"
        >
          <div>
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <Users class="h-5 w-5" />
            </span>
            <h3 class="mt-5 text-xl font-black text-slate-900 dark:text-white">{{ t("bento.c2.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ t("bento.c2.desc") }}</p>
          </div>
          <span class="mt-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-brand dark:text-indigo-400">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>

        <!-- Card 3: Shop & POS Pro -->
        <NuxtLink
          to="/features/zekorapay-shop"
          class="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 md:col-span-2"
        >
          <div>
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
              <ShoppingBag class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{{ t("bento.c3.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ t("bento.c3.desc") }}</p>
          </div>
          <span class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand dark:text-indigo-400">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>

        <!-- Card 4: Prepaid Cards -->
        <NuxtLink
          to="/features/cartes-prepayees"
          class="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 md:col-span-2"
        >
          <div>
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
              <CreditCard class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{{ t("bento.c4.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ t("bento.c4.desc") }}</p>
          </div>
          <span class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand dark:text-indigo-400">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>

        <!-- Card 5: Enterprise B2B -->
        <NuxtLink
          to="/features/entreprises-b2b"
          class="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 md:col-span-2"
        >
          <div>
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-brand dark:bg-indigo-500/15 dark:text-indigo-300">
              <Building2 class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{{ t("bento.c5.title") }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ t("bento.c5.desc") }}</p>
          </div>
          <span class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand dark:text-indigo-400">
            {{ t("features.learnMore") }}
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
