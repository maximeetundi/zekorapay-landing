<script setup lang="ts">
import { Check, Code2, Copy } from "lucide-vue-next";
import { ref } from "vue";

const { t } = useI18n();

type LangTab = "curl" | "node" | "python";
const activeLang = ref<LangTab>("curl");
const copied = ref(false);

const snippets: Record<LangTab, string> = {
  curl: `curl -X POST https://api.zekorapay.com/v1/payments/requests \\
  -H "X-Api-Key: zk_live_..." \\
  -H "Idempotency-Key: req_2026_0042" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "fixed",
    "amount": 50000,
    "currency": "XAF",
    "title": "Facture #2026-0042",
    "reference": "INV-2026-0042"
  }'`,
  node: `const res = await fetch("https://api.zekorapay.com/v1/payments/requests", {
  method: "POST",
  headers: {
    "X-Api-Key": "zk_live_...",
    "Idempotency-Key": "req_2026_0042",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "fixed",
    amount: 50000,
    currency: "XAF",
    title: "Facture #2026-0042",
    reference: "INV-2026-0042",
  }),
});
const { payment_request, payment_url } = await res.json();`,
  python: `import requests

res = requests.post(
    "https://api.zekorapay.com/v1/payments/requests",
    headers={
        "X-Api-Key": "zk_live_...",
        "Idempotency-Key": "req_2026_0042",
    },
    json={
        "type": "fixed",
        "amount": 50000,
        "currency": "XAF",
        "title": "Facture #2026-0042",
        "reference": "INV-2026-0042",
    },
)
print(res.json()["payment_url"])`,
};

async function copyCode() {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  await navigator.clipboard.writeText(snippets[activeLang.value]);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <section class="relative overflow-hidden py-20 sm:py-24" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4c1d95 100%);">
    <div
      aria-hidden="true"
      class="dot-grid-dark pointer-events-none absolute inset-0 opacity-60"
    />
    <div class="relative mx-auto max-w-6xl px-6">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="text-white">
          <span class="badge-pill border border-white/20 bg-white/10 text-white/90">{{ t("apiCta.badge") }}</span>
          <h2 class="mt-4 text-3xl font-extrabold sm:text-4xl">
            {{ t("apiCta.title") }}
            <span class="text-primary-300">{{ t("apiCta.titleAccent") }}</span>
          </h2>
          <p class="mt-4 leading-relaxed text-white/75">{{ t("apiCta.description") }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/docs" class="btn-primary px-7 py-3.5 text-base">
              <Code2 class="h-5 w-5" stroke-width="2.25" />
              {{ t("apiCta.link") }}
            </NuxtLink>
            <a
              href="https://api.zekorapay.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-base font-bold text-white transition hover:bg-white/20"
            >
              {{ t("apiCta.reference") }} ↗
            </a>
          </div>
        </div>

        <div class="glass-card overflow-hidden rounded-2xl border border-white/15 bg-slate-950/60 shadow-2xl">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <div class="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div class="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div class="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div class="ml-2 flex gap-1 rounded-lg bg-white/5 p-0.5 text-xs font-semibold">
                <button
                  v-for="tab in (['curl', 'node', 'python'] as const)"
                  :key="tab"
                  type="button"
                  class="rounded-md px-2.5 py-1 capitalize transition"
                  :class="activeLang === tab ? 'bg-brand text-white' : 'text-white/60 hover:text-white'"
                  @click="activeLang = tab"
                >
                  {{ tab === 'node' ? 'Node.js' : tab }}
                </button>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10"
              @click="copyCode"
            >
              <Check v-if="copied" class="h-3.5 w-3.5 text-emerald-400" />
              <Copy v-else class="h-3.5 w-3.5" />
              {{ copied ? t("apiCta.copied") : t("apiCta.copy") }}
            </button>
          </div>
          <pre class="overflow-x-auto p-5 text-xs leading-relaxed text-slate-200 sm:text-sm"><code>{{ snippets[activeLang] }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
