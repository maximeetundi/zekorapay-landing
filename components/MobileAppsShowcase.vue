<script setup lang="ts">
import { CheckCircle2, Download, Smartphone } from "lucide-vue-next";

const config = useRuntimeConfig();
const { t, locale } = useI18n();
const isEn = computed(() => locale.value === "en");
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

          <!-- Direct Android APK Downloads (User & Pro) -->
          <div class="mt-4 flex flex-wrap items-center gap-2.5">
            <a
              :href="config.public.apkUserUrl"
              download
              class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-brand/40 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <img src="/logo-dark.png" alt="" class="h-4 w-4 rounded object-cover">
              <Download class="h-3.5 w-3.5 text-brand dark:text-indigo-400" />
              {{ isEn ? "Android APK — ZekoraPay" : "APK Android — ZekoraPay" }}
            </a>
            <a
              :href="config.public.apkProUrl"
              download
              class="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25"
            >
              <img src="/logo-pro.png" alt="" class="h-4 w-4 rounded object-cover">
              <Download class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              {{ isEn ? "Android APK — ZekoraPay Pro" : "APK Android — ZekoraPay Pro" }}
            </a>
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
