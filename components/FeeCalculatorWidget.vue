<script setup lang="ts">
import { ArrowLeftRight, ArrowRight, Calculator, Check, ShieldCheck, Smartphone, Wallet } from "lucide-vue-next";
import { computed, ref } from "vue";

const { t } = useI18n();
const config = useRuntimeConfig();

type Currency = "XAF" | "XOF" | "EUR" | "USD" | "USDT";
type Rail = "mobile_money" | "bank" | "wallet";

const currencies: { code: Currency; name: string }[] = [
  { code: "XAF", name: "FCFA BEAC" },
  { code: "XOF", name: "FCFA BCEAO" },
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "USDT", name: "Tether USDT" },
];

// Indicative rates relative to 1 EUR for transparent demonstration
const eurRates: Record<Currency, number> = {
  EUR: 1,
  XAF: 655.957,
  XOF: 655.957,
  USD: 1.08,
  USDT: 1.08,
};

const amount = ref<number>(50000);
const fromCurrency = ref<Currency>("XAF");
const toCurrency = ref<Currency>("EUR");
const selectedRail = ref<Rail>("mobile_money");

const railFeePct: Record<Rail, number> = {
  mobile_money: 0.015,
  bank: 0.01,
  wallet: 0,
};

const safeAmount = computed(() => (Number.isFinite(amount.value) && amount.value > 0 ? amount.value : 0));

const rate = computed(() => {
  const inEur = 1 / eurRates[fromCurrency.value];
  return inEur * eurRates[toCurrency.value];
});

const feeAmount = computed(() => safeAmount.value * railFeePct[selectedRail.value]);
const netAmount = computed(() => Math.max(0, safeAmount.value - feeAmount.value));
const convertedAmount = computed(() => netAmount.value * rate.value);

function swapCurrencies() {
  const prev = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = prev;
}

function formatMoney(val: number, cur: Currency): string {
  const decimals = cur === "XAF" || cur === "XOF" ? 0 : 2;
  return `${val.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} ${cur}`;
}
</script>

<template>
  <section class="bg-slate-50 py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid items-center gap-12 lg:grid-cols-12">
        <!-- Left narrative -->
        <div class="lg:col-span-5">
          <span class="badge-pill border border-primary-100 bg-primary-50 text-primary-700">
            <Calculator class="h-3.5 w-3.5" />
            {{ t("calculator.kicker") }}
          </span>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-deep sm:text-4xl">
            {{ t("calculator.heading") }}
          </h2>
          <p class="mt-4 text-base leading-relaxed text-slate-600">
            {{ t("calculator.subheading") }}
          </p>

          <ul class="mt-6 space-y-3">
            <li
              v-for="idx in [1, 2, 3]"
              :key="idx"
              class="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
            >
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check class="h-3.5 w-3.5" stroke-width="2.75" />
              </span>
              {{ t(`calculator.points.p${idx}`) }}
            </li>
          </ul>
        </div>

        <!-- Right interactive calculator -->
        <div class="lg:col-span-7">
          <div class="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div class="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  {{ t("calculator.sendLabel") }}
                </label>
                <div class="mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                  <input
                    v-model.number="amount"
                    type="number"
                    min="1"
                    step="any"
                    class="w-full bg-transparent px-3.5 py-3 text-base font-extrabold text-deep outline-none"
                  >
                  <select
                    v-model="fromCurrency"
                    class="border-l border-slate-200 bg-white px-3 py-3 text-sm font-bold text-deep outline-none"
                  >
                    <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }}</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                :aria-label="t('calculator.swap')"
                class="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand shadow-sm transition hover:border-brand hover:bg-primary-50"
                @click="swapCurrencies"
              >
                <ArrowLeftRight class="h-4 w-4" />
              </button>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  {{ t("calculator.receiveLabel") }}
                </label>
                <div class="mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 bg-emerald-50/40">
                  <div class="flex flex-1 items-center px-3.5 py-3 text-base font-black text-emerald-700">
                    {{ formatMoney(convertedAmount, toCurrency) }}
                  </div>
                  <select
                    v-model="toCurrency"
                    class="border-l border-slate-200 bg-white px-3 py-3 text-sm font-bold text-deep outline-none"
                  >
                    <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }}</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Rail selector -->
            <div class="mt-6">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
                {{ t("calculator.railLabel") }}
              </p>
              <div class="mt-2 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  class="flex flex-col items-center gap-1 rounded-xl border px-3 py-2.5 text-center transition sm:flex-row sm:justify-center sm:gap-2"
                  :class="selectedRail === 'mobile_money' ? 'border-brand bg-primary-50 text-brand' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                  @click="selectedRail = 'mobile_money'"
                >
                  <Smartphone class="h-4 w-4 shrink-0" />
                  <span class="text-xs font-bold">{{ t("calculator.rails.mobile") }}</span>
                </button>
                <button
                  type="button"
                  class="flex flex-col items-center gap-1 rounded-xl border px-3 py-2.5 text-center transition sm:flex-row sm:justify-center sm:gap-2"
                  :class="selectedRail === 'bank' ? 'border-brand bg-primary-50 text-brand' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                  @click="selectedRail = 'bank'"
                >
                  <ShieldCheck class="h-4 w-4 shrink-0" />
                  <span class="text-xs font-bold">{{ t("calculator.rails.bank") }}</span>
                </button>
                <button
                  type="button"
                  class="flex flex-col items-center gap-1 rounded-xl border px-3 py-2.5 text-center transition sm:flex-row sm:justify-center sm:gap-2"
                  :class="selectedRail === 'wallet' ? 'border-brand bg-primary-50 text-brand' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                  @click="selectedRail = 'wallet'"
                >
                  <Wallet class="h-4 w-4 shrink-0" />
                  <span class="text-xs font-bold">{{ t("calculator.rails.wallet") }}</span>
                </button>
              </div>
            </div>

            <!-- Breakdown -->
            <div class="mt-6 space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs">
              <div class="flex items-center justify-between text-slate-600">
                <span>{{ t("calculator.rateLabel") }}</span>
                <span class="font-bold text-deep">1 {{ fromCurrency }} ≈ {{ rate.toFixed(4) }} {{ toCurrency }}</span>
              </div>
              <div class="flex items-center justify-between text-slate-600">
                <span>{{ t("calculator.feeLabel") }} ({{ (railFeePct[selectedRail] * 100).toFixed(1) }}%)</span>
                <span class="font-bold text-deep">{{ formatMoney(feeAmount, fromCurrency) }}</span>
              </div>
              <div class="flex items-center justify-between border-t border-slate-200 pt-2 text-sm">
                <span class="font-bold text-deep">{{ t("calculator.estimatedArrival") }}</span>
                <span class="font-extrabold text-emerald-600">{{ t("calculator.instant") }}</span>
              </div>
            </div>

            <div class="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p class="text-[11px] text-slate-400">
                {{ t("calculator.disclaimer") }}
              </p>
              <a
                :href="config.public.webAppUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full shrink-0 px-5 py-3 text-sm sm:w-auto"
              >
                {{ t("calculator.cta") }}
                <ArrowRight class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
