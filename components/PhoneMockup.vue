<script setup lang="ts">
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  CreditCard,
  Heart,
  QrCode,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Wallet,
  Wifi,
} from "lucide-vue-next";
import { ref } from "vue";

const { t } = useI18n();

type PhoneTab = "wallet" | "tontine" | "shop";
type CurrencyCode = "XAF" | "EUR" | "USDT";

const activeTab = ref<PhoneTab>("wallet");
const activeCurrency = ref<CurrencyCode>("XAF");

const balances: Record<CurrencyCode, { amount: string; delta: string }> = {
  XAF: { amount: "357 500 XAF", delta: "+ 12 000 XAF" },
  EUR: { amount: "545,00 EUR", delta: "+ 18,30 EUR" },
  USDT: { amount: "592.40 USDT", delta: "+ 20.00 USDT" },
};

const quickActions = [
  { icon: Send, key: "send", color: "bg-indigo-50 text-indigo-600" },
  { icon: Users, key: "tontine", color: "bg-emerald-50 text-emerald-600" },
  { icon: QrCode, key: "qr", color: "bg-violet-50 text-violet-600" },
  { icon: ShoppingBag, key: "shop", color: "bg-amber-50 text-amber-600" },
  { icon: CreditCard, key: "card", color: "bg-sky-50 text-sky-600" },
  { icon: Sparkles, key: "ai", color: "bg-fuchsia-50 text-fuchsia-600" },
  { icon: Heart, key: "donate", color: "bg-rose-50 text-rose-600" },
  { icon: Building2, key: "business", color: "bg-slate-100 text-slate-700" },
] as const;

const transactions = [
  { icon: Users, nameKey: "tx1", dateKey: "today", amount: "-5 000 XAF", positive: false },
  { icon: ArrowDownLeft, nameKey: "tx2", dateKey: "yesterday", amount: "+25 000 XAF", positive: true },
  { icon: ShoppingBag, nameKey: "tx3", dateKey: "mar10", amount: "-12 500 XAF", positive: false },
] as const;
</script>

<template>
  <div class="relative mx-auto w-[300px] select-none sm:w-[316px]">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-brand/35 via-secondary/20 to-cyan-400/15 blur-3xl"
    />

    <div class="relative overflow-hidden rounded-[2.6rem] border-[7px] border-slate-900 bg-slate-900 shadow-2xl shadow-indigo-950/30 ring-1 ring-white/20">
      <!-- Status bar -->
      <div class="flex items-center justify-between bg-[#1e1b4b] px-6 pb-2 pt-3 text-[11px] font-semibold text-white/90">
        <span>9:41</span>
        <span class="h-3.5 w-16 rounded-full bg-black/40" />
        <span class="flex items-center gap-1">
          <Wifi class="h-3 w-3" />
          <ShieldCheck class="h-3 w-3 text-emerald-400" />
        </span>
      </div>

      <!-- Screen header -->
      <div class="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] px-5 pb-4 pt-1">
        <div class="flex items-center justify-between gap-2">
          <div class="flex gap-1 rounded-full bg-white/10 p-0.5 text-[10px] font-semibold text-white/80">
            <button
              v-for="tab in (['wallet', 'tontine', 'shop'] as const)"
              :key="tab"
              type="button"
              class="rounded-full px-2.5 py-1 transition"
              :class="activeTab === tab ? 'bg-white text-deep shadow-sm' : 'hover:text-white'"
              @click="activeTab = tab"
            >
              {{ t(`mockup.tabs.${tab}`) }}
            </button>
          </div>
          <div class="flex gap-1 text-[9px] font-bold">
            <button
              v-for="cur in (['XAF', 'EUR', 'USDT'] as const)"
              :key="cur"
              type="button"
              class="rounded px-1.5 py-0.5 transition"
              :class="activeCurrency === cur ? 'bg-white/25 text-white' : 'text-white/50 hover:text-white/80'"
              @click="activeCurrency = cur"
            >
              {{ cur }}
            </button>
          </div>
        </div>

        <div v-if="activeTab === 'wallet'" class="mt-4">
          <p class="text-[11px] font-medium text-white/65">{{ t("mockup.balanceLabel") }}</p>
          <p class="mt-0.5 text-2xl font-black tracking-tight text-white">
            {{ balances[activeCurrency].amount }}
          </p>
          <div class="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
            <TrendingUp class="h-3 w-3" />
            {{ balances[activeCurrency].delta }}
          </div>
        </div>

        <div v-else-if="activeTab === 'tontine'" class="mt-4">
          <p class="text-[11px] font-medium text-white/65">{{ t("mockup.tontineTitle") }}</p>
          <p class="mt-0.5 text-xl font-black tracking-tight text-white">120 000 XAF</p>
          <div class="mt-2">
            <div class="flex justify-between text-[10px] text-white/75">
              <span>{{ t("mockup.tontineProgress") }}</span>
              <span class="font-bold text-emerald-300">10 / 12</span>
            </div>
            <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div class="h-full w-5/6 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>

        <div v-else class="mt-4">
          <p class="text-[11px] font-medium text-white/65">{{ t("mockup.shopTitle") }}</p>
          <p class="mt-0.5 text-xl font-black tracking-tight text-white">485 000 XAF</p>
          <div class="mt-1.5 flex items-center gap-2 text-[10px] font-semibold text-indigo-200">
            <span class="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
              <Store class="h-3 w-3" />
              24 {{ t("mockup.shopOrders") }}
            </span>
            <span class="text-emerald-300">POS Active</span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div v-if="activeTab === 'wallet'" class="bg-white">
        <div class="grid grid-cols-4 gap-y-3 px-3 pb-4 pt-4">
          <div
            v-for="action in quickActions"
            :key="action.key"
            class="flex flex-col items-center gap-1"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-xl transition-transform hover:scale-105" :class="action.color">
              <component :is="action.icon" class="h-4 w-4" stroke-width="2.2" />
            </span>
            <span class="text-[9px] font-semibold text-slate-700">{{ t(`mockup.actions.${action.key}`) }}</span>
          </div>
        </div>
        <div class="bg-slate-50 px-3.5 pb-5 pt-2.5">
          <p class="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {{ t("mockup.recentTitle") }}
          </p>
          <div
            v-for="(tx, idx) in transactions"
            :key="tx.nameKey"
            class="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 shadow-sm shadow-slate-200/60"
            :class="idx === transactions.length - 1 ? '' : 'mb-2'"
          >
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-brand">
              <component :is="tx.icon" class="h-4 w-4" stroke-width="2.2" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-[11px] font-bold text-deep">{{ t(`mockup.tx.${tx.nameKey}`) }}</span>
              <span class="block text-[9px] text-slate-400">{{ t(`mockup.tx.${tx.dateKey}`) }}</span>
            </span>
            <span
              class="shrink-0 text-[11px] font-bold"
              :class="tx.positive ? 'text-emerald-600' : 'text-slate-600'"
            >{{ tx.amount }}</span>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'tontine'" class="bg-slate-50 p-4 pb-6">
        <div class="rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-slate-100">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-deep">{{ t("mockup.tontineCardTitle") }}</span>
            <span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Active</span>
          </div>
          <p class="mt-1 text-[11px] text-slate-500">{{ t("mockup.tontineNextPayout") }}</p>
          <div class="mt-3 flex items-center justify-between rounded-xl bg-indigo-50 px-3 py-2 text-[11px] font-semibold text-indigo-800">
            <span>{{ t("mockup.tontineContribution") }}</span>
            <span class="font-bold">10 000 XAF</span>
          </div>
        </div>
        <div class="mt-3 space-y-2">
          <div class="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-[11px] shadow-sm">
            <span class="font-semibold text-deep">Amina K.</span>
            <span class="font-bold text-emerald-600">Payé</span>
          </div>
          <div class="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-[11px] shadow-sm">
            <span class="font-semibold text-deep">Jean-Paul M.</span>
            <span class="font-bold text-emerald-600">Payé</span>
          </div>
          <div class="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-[11px] shadow-sm">
            <span class="font-semibold text-deep">Cédric T.</span>
            <span class="font-bold text-amber-600">Auto-débit</span>
          </div>
        </div>
      </div>

      <div v-else class="bg-slate-50 p-4 pb-6">
        <div class="grid grid-cols-2 gap-2.5">
          <div class="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <p class="text-[10px] font-semibold text-slate-400">{{ t("mockup.shopKpi1") }}</p>
            <p class="mt-1 text-sm font-black text-deep">142 000 XAF</p>
            <p class="mt-0.5 text-[10px] font-bold text-emerald-600">+18%</p>
          </div>
          <div class="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <p class="text-[10px] font-semibold text-slate-400">{{ t("mockup.shopKpi2") }}</p>
            <p class="mt-1 text-sm font-black text-deep">38 produits</p>
            <p class="mt-0.5 text-[10px] font-bold text-indigo-600">2 entrepôts</p>
          </div>
        </div>
        <div class="mt-3 space-y-2">
          <div class="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <span class="flex items-center gap-2 text-[11px] font-bold text-deep">
              <QrCode class="h-4 w-4 text-brand" />
              {{ t("mockup.shopAction1") }}
            </span>
            <ArrowUpRight class="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div class="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <span class="flex items-center gap-2 text-[11px] font-bold text-deep">
              <Wallet class="h-4 w-4 text-emerald-600" />
              {{ t("mockup.shopAction2") }}
            </span>
            <ArrowUpRight class="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Floating trust cards -->
    <div class="animate-float absolute -left-24 top-10 hidden items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-100 backdrop-blur xl:flex">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <Users class="h-4 w-4" stroke-width="2.25" />
      </span>
      <span class="text-xs font-bold text-deep">{{ t("mockup.float1") }}</span>
    </div>
    <div class="absolute -right-24 top-[50%] hidden items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-100 backdrop-blur xl:flex">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-brand">
        <Send class="h-4 w-4" stroke-width="2.25" />
      </span>
      <span class="text-xs font-bold text-deep">{{ t("mockup.float2") }}</span>
    </div>
    <div class="absolute -left-16 bottom-8 hidden items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-100 backdrop-blur xl:flex">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
        <CreditCard class="h-4 w-4" stroke-width="2.25" />
      </span>
      <span class="text-xs font-bold text-deep">{{ t("mockup.float3") }}</span>
    </div>
  </div>
</template>
