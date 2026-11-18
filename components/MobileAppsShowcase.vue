<script setup lang="ts">
import { CheckCircle2, Globe, Smartphone } from "lucide-vue-next";

const config = useRuntimeConfig();
const { t } = useI18n();
</script>

<template>
  <section class="relative overflow-hidden border-y border-slate-100 bg-gradient-to-br from-slate-950 via-[#15123d] to-[#231955] py-16 text-white sm:py-24">
    <div
      aria-hidden="true"
      class="dot-grid-dark pointer-events-none absolute inset-0 opacity-50"
    />
    <div class="relative mx-auto max-w-6xl px-6">
      <div class="grid items-center gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span class="badge-pill border border-indigo-400/30 bg-indigo-500/15 text-indigo-200">
            <Smartphone class="h-3.5 w-3.5" />
            {{ t("mobileSection.kicker") }}
          </span>
          <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            {{ t("mobileSection.heading") }}
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            {{ t("mobileSection.subheading") }}
          </p>

          <ul class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li
              v-for="idx in [1, 2, 3, 4]"
              :key="idx"
              class="flex items-center gap-2.5 text-sm font-medium text-slate-200"
            >
              <CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-400" />
              {{ t(`mobileSection.p${idx}`) }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <OpenAppButton />
            <StoreButton store="apple" :url="config.public.appStoreUrl" theme="dark" />
            <StoreButton store="google" :url="config.public.playStoreUrl" theme="dark" />
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <Globe class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-xs font-semibold text-slate-400">{{ t("mobileSection.webCardLabel") }}</p>
                  <p class="text-sm font-extrabold text-white">app.zekorapay.com</p>
                </div>
              </div>
              <span class="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                Live
              </span>
            </div>

            <div class="mt-4 space-y-3 text-xs">
              <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span class="font-semibold text-slate-300">Web App (Desktop & Mobile)</span>
                <span class="font-bold text-emerald-300">{{ t("mobileSection.statusLive") }}</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span class="font-semibold text-slate-300">iOS (App Store)</span>
                <span class="font-bold text-indigo-300">{{ t("store.comingSoon") }}</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span class="font-semibold text-slate-300">Android (Google Play)</span>
                <span class="font-bold text-indigo-300">{{ t("store.comingSoon") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
