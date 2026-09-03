<script setup lang="ts">
// Mockup HTML/CSS autonome (pas de capture d'écran externe à maintenir) --
// reprend le contenu déjà affiché sur le hero de landing-page-laravel
// (home.blade.php : solde, actions rapides, transactions récentes), pour
// rester visuellement proche de l'app réelle sans dépendre d'une image
// figée à mettre à jour à chaque changement d'UI.
const quickActions = [
  { icon: "💸", label: "Envoyer" },
  { icon: "🤝", label: "Tontine" },
  { icon: "📷", label: "Payer QR" },
  { icon: "🛍️", label: "Shop" },
  { icon: "💳", label: "Carte" },
  { icon: "🤖", label: "IA" },
  { icon: "❤️", label: "Don" },
  { icon: "⋯", label: "Plus" },
];

const transactions = [
  { icon: "🤝", name: "Cotisation Tontine", date: "Aujourd'hui", amount: "-5 000 XAF", positive: false },
  { icon: "📲", name: "Reçu de Jean P.", date: "Hier", amount: "+25 000 XAF", positive: true },
  { icon: "🛍️", name: "ZekoraPay Shop", date: "10 mars", amount: "-12 500 XAF", positive: false },
];
</script>

<template>
  <div class="relative mx-auto w-[280px] select-none">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-brand/40 via-secondary/20 to-transparent blur-3xl"
    />

    <div class="relative overflow-hidden rounded-[2.5rem] border-[8px] border-deep bg-deep shadow-2xl shadow-deep/30">
      <div class="flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold text-white/90">
        <span>9:41</span>
        <span>⚡</span>
      </div>
      <div class="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] px-5 pb-6 pt-2">
        <p class="text-xs font-medium text-white/60">Solde total</p>
        <p class="mt-1 text-2xl font-black text-white">357 500 XAF</p>
        <p class="mt-1 text-xs font-bold text-emerald-400">+ 12 000 XAF</p>
      </div>
      <div class="grid grid-cols-4 gap-y-4 bg-white px-3 pb-5 pt-5">
        <div
          v-for="action in quickActions"
          :key="action.label"
          class="flex flex-col items-center gap-1.5"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-tint text-base">
            {{ action.icon }}
          </span>
          <span class="text-[9px] font-semibold text-deep">{{ action.label }}</span>
        </div>
      </div>
      <div class="bg-slate-50 px-4 pb-6 pt-2">
        <p class="px-1 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">Transactions récentes</p>
        <div
          v-for="tx in transactions"
          :key="tx.name"
          class="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 shadow-sm shadow-slate-200/60"
          :class="tx === transactions[transactions.length - 1] ? '' : 'mb-2'"
        >
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm">{{ tx.icon }}</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-[11px] font-bold text-deep">{{ tx.name }}</span>
            <span class="block text-[10px] text-slate-400">{{ tx.date }}</span>
          </span>
          <span
            class="shrink-0 text-[11px] font-bold"
            :class="tx.positive ? 'text-emerald-600' : 'text-slate-500'"
          >{{ tx.amount }}</span>
        </div>
      </div>
    </div>

    <div class="absolute -left-32 top-8 hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-100 xl:flex">
      <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-ok-bg text-ok">🤝</span>
      <span class="text-xs font-bold text-deep">Tontines & Associations</span>
    </div>
    <div class="absolute -right-28 top-[52%] hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-100 xl:flex">
      <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-tint text-brand">💸</span>
      <span class="text-xs font-bold text-deep">Transferts instantanés</span>
    </div>
    <div class="absolute -left-16 bottom-10 hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-100 xl:flex">
      <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-warn-bg text-warn">💳</span>
      <span class="text-xs font-bold text-deep">Cartes prépayées</span>
    </div>
  </div>
</template>
