<script setup lang="ts">
import { CheckCircle2, Smartphone } from "lucide-vue-next";

const config = useRuntimeConfig();
const { t } = useI18n();
</script>

<template>
  <section class="border-y border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid items-center gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Smartphone class="h-3.5 w-3.5" />
            {{ t("mobileSection.kicker") }}
          </span>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {{ t("mobileSection.heading") }}
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {{ t("mobileSection.subheading") }}
          </p>

          <ul class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li
              v-for="idx in [1, 2, 3, 4]"
              :key="idx"
              class="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              {{ t(`mobileSection.p${idx}`) }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <OpenAppButton />
            <StoreButton store="apple" :url="config.public.appStoreUrl" theme="light" />
            <StoreButton store="google" :url="config.public.playStoreUrl" theme="light" />
          </div>
        </div>

        <!-- Real Mobile App Screenshot in Phone Frame -->
        <div class="flex justify-center lg:col-span-5">
          <div class="w-[260px] overflow-hidden rounded-[2.4rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl shadow-slate-300/60 dark:border-slate-700 dark:shadow-black/60">
            <img
              src="/guide/demarrage/app_mobile_preview.png"
              alt="ZekoraPay Mobile App"
              class="w-full object-cover"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
