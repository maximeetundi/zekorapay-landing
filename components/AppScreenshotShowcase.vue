<script setup lang="ts">
import { Building2, CreditCard, LayoutDashboard, Maximize2, ShoppingBag, Users, Wallet, X } from "lucide-vue-next";
import { ref } from "vue";

const { t } = useI18n();

const tabs = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    imgDesktop: "/guide/demarrage/dashboard.png",
    imgMobile: "/guide/association/association_mobile_explorer_fr.png",
  },
  {
    key: "wallets",
    icon: Wallet,
    imgDesktop: "/guide/portefeuilles/overview.png",
    imgMobile: "/guide/association/association_mobile_my_fr.png",
  },
  {
    key: "cards",
    icon: CreditCard,
    imgDesktop: "/guide/cartes/overview.png",
    imgMobile: "/guide/association/association_mobile_workspace_fr.png",
  },
  {
    key: "tontines",
    icon: Users,
    imgDesktop: "/guide/association/association_desktop_workspace_detail.png",
    imgMobile: "/guide/association/association_mobile_workspace_fr.png",
  },
  {
    key: "shop",
    icon: ShoppingBag,
    imgDesktop: "/guide/boutique/marketplace.png",
    imgMobile: "/guide/association/association_mobile_explorer_fr.png",
  },
  {
    key: "enterprise",
    icon: Building2,
    imgDesktop: "/guide/entreprises/dashboard.png",
    imgMobile: "/guide/association/association_mobile_create_fr.png",
  },
] as const;

type TabKey = (typeof tabs)[number]["key"];
const activeTab = ref<TabKey>("dashboard");
const lightboxOpen = ref(false);

const currentTab = computed(() => tabs.find((tab) => tab.key === activeTab.value) || tabs[0]);
</script>

<template>
  <div class="relative mx-auto w-full max-w-xl select-none">
    <!-- Interactive App Screen Switcher -->
    <div class="mb-3 flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all"
        :class="
          activeTab === tab.key
            ? 'border-brand bg-brand text-white shadow-sm'
            : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:text-deep dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-white'
        "
        @click="activeTab = tab.key"
      >
        <component :is="tab.icon" class="h-3.5 w-3.5" />
        {{ t(`screenshotTabs.${tab.key}`) }}
      </button>
    </div>

    <!-- Desktop App Frame (shown on md+ screens) -->
    <div class="group relative hidden overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-200/70 dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-black/50 md:block">
      <div class="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950/70">
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span class="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span class="ml-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500">app.zekorapay.com</span>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-200/70 hover:text-deep dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          @click="lightboxOpen = true"
        >
          <Maximize2 class="h-3 w-3" />
          {{ t("screenshotTabs.zoom") }}
        </button>
      </div>

      <button
        type="button"
        class="block w-full cursor-zoom-in overflow-hidden bg-slate-100 dark:bg-slate-950"
        @click="lightboxOpen = true"
      >
        <img
          :src="currentTab.imgDesktop"
          :alt="t(`screenshotTabs.${currentTab.key}`)"
          class="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-[1.01]"
        >
      </button>
    </div>

    <!-- Mobile App Frame (shown on small mobile screens < md) -->
    <div class="mx-auto block w-[260px] overflow-hidden rounded-[2.2rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl shadow-slate-300/60 dark:border-slate-700 dark:shadow-black/60 md:hidden">
      <img
        :src="currentTab.imgMobile"
        :alt="t(`screenshotTabs.${currentTab.key}`)"
        class="w-full object-cover"
      >
    </div>

    <!-- Caption -->
    <p class="mt-2.5 text-center text-xs font-medium text-slate-500 dark:text-slate-400 lg:text-left">
      {{ t(`screenshotTabs.captions.${currentTab.key}`) }}
    </p>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
        @click.self="lightboxOpen = false"
      >
        <div class="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
          <button
            type="button"
            class="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
            @click="lightboxOpen = false"
          >
            <X class="h-5 w-5" />
          </button>
          <img
            :src="currentTab.imgDesktop"
            :alt="t(`screenshotTabs.${currentTab.key}`)"
            class="max-h-[85vh] w-full object-contain"
          >
        </div>
      </div>
    </Teleport>
  </div>
</template>
