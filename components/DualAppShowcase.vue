<script setup lang="ts">
import { ArrowUpRight, Building2, CheckCircle2, ShieldCheck, Smartphone, Sparkles, UserRound } from "lucide-vue-next";

const config = useRuntimeConfig();
const { locale } = useI18n();
const isEn = computed(() => locale.value === "en");

const userPoints = computed(() =>
  isEn.value
    ? [
        "Multi-currency & crypto wallets (XAF, XOF, EUR, USD, USDT)",
        "Instant transfers, virtual cards & local Cash Agents",
        "Digital tontines & association governance",
        "Browse shops, rentals, events, donations & enterprise services",
        "Personal messaging, video calls & interactive AI Copilot with custom action rules",
      ]
    : [
        "Portefeuilles multi-devises & crypto (XAF, XOF, EUR, USD, USDT)",
        "Virements instantanés, cartes virtuelles & agents Cash",
        "Tontines digitales et gestion d'associations",
        "Marketplace Boutiques, Locations, Événements, Dons & Services",
        "Messagerie dédiée, appels vidéo & Copilote IA interactif personnalisable",
      ],
);

const proPoints = computed(() =>
  isEn.value
    ? [
        "Direct launch on your Enterprise Dashboard + Custom Views to pin your main module (Rentals, POS, Treasury)",
        "Enterprise treasury, payroll, delegated spending limits & multi-admin approvals",
        "Pro Shops with POS register, cashiers, Stock Pro & direct Rental Management",
        "Ultra-fast 3G/offline SWR caching & strictly isolated Team / Customer Support messaging",
        "Enterprise AI Cockpit: per-member token audit, allowed/blocked action rules & multi-format import/export (PDF, XLSX, DOCX, ZIP)",
      ]
    : [
        "Ouverture directe sur le tableau de bord entreprise + Vues personnalisées pour épingler votre module clé",
        "Trésorerie entreprise, paie, plafonds de dépense délégués & approbations multi-admins",
        "Boutiques Pro avec caisse POS, caissiers, Stock Pro & Gestion Locative directe",
        "Cache SWR ultra-rapide même en 3G/hors-ligne & Messagerie Pro isolée (Équipe & Support Client)",
        "Cockpit IA Entreprise : audit par membre, suivi tokens, règles d'actions autorisées/bloquées & import/export PDF, XLSX, DOCX, ZIP",
      ],
);
</script>

<template>
  <section id="dual-apps" class="bg-slate-50/70 py-16 dark:bg-slate-900/40 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="badge-pill border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Sparkles class="h-3.5 w-3.5" />
          {{ isEn ? "Two specialized apps, one unified account" : "Deux applications spécialisées, un seul compte" }}
        </span>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {{ isEn ? "Choose your ZekoraPay space" : "Choisissez votre espace ZekoraPay" }}
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          {{
            isEn
              ? "Individuals and businesses now get dedicated, uncluttered experiences on web and mobile — with full cross-app account compatibility."
              : "Particuliers et entreprises disposent désormais d'interfaces dédiées sur Web et Mobile, tout en conservant un compte unique compatible entre les deux."
          }}
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Personal App Card -->
        <div class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-brand/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand dark:bg-indigo-500/15 dark:text-indigo-300">
                <UserRound class="h-3.5 w-3.5" />
                {{ isEn ? "Personal" : "Particuliers" }}
              </span>
              <span class="text-xs font-semibold text-slate-400">app.zekorapay.com</span>
            </div>
            <div class="mt-4 flex items-center gap-3.5">
              <BrandLogo variant="app" size="lg" :show-wordmark="false" />
              <div>
                <h3 class="text-2xl font-black text-slate-900 dark:text-white">
                  Zekora<span class="text-emerald-600 dark:text-emerald-400">Pay</span>
                </h3>
                <p class="text-xs font-semibold text-slate-400">Web · iOS · Android APK</p>
              </div>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{
                isEn
                  ? "Your everyday super-app to send money, save in tontines, shop, book rentals, and manage personal finances."
                  : "Votre super-app du quotidien pour envoyer de l'argent, épargner en tontine, acheter en boutique, réserver et gérer vos finances personnelles."
              }}
            </p>

            <ul class="mt-6 space-y-3">
              <li
                v-for="item in userPoints"
                :key="item"
                class="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200"
              >
                <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-brand dark:text-indigo-400" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <a
              :href="config.public.webAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary flex-1 justify-center px-5 py-3 text-sm"
            >
              {{ isEn ? "Open ZekoraPay" : "Ouvrir ZekoraPay" }}
              <ArrowUpRight class="h-4 w-4" />
            </a>
            <a
              :href="config.public.apkUserUrl"
              download
              class="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              :title="isEn ? 'Download Android APK' : 'Télécharger l\'APK Android'"
            >
              <Smartphone class="h-3.5 w-3.5" />
              {{ isEn ? 'Download APK' : 'Télécharger APK' }}
            </a>
          </div>
        </div>

        <!-- Pro App Card -->
        <div class="flex flex-col justify-between rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[#091A30] via-[#0B2239] to-[#045E4C] p-7 text-white shadow-xl sm:p-8">
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                <Building2 class="h-3.5 w-3.5" />
                {{ isEn ? "Business & Merchants" : "Entreprises & Marchands" }}
              </span>
              <span class="text-xs font-semibold text-emerald-300/80">pro.zekorapay.com</span>
            </div>
            <div class="mt-4 flex items-center gap-3.5">
              <BrandLogo variant="pro" surface="dark" size="lg" :show-wordmark="false" />
              <div>
                <h3 class="text-2xl font-black text-white">
                  ZekoraPay <span class="text-emerald-400">Pro</span>
                </h3>
                <p class="text-xs font-semibold text-emerald-200/75">Web Pro · Android APK Pro</p>
              </div>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-slate-300">
              {{
                isEn
                  ? "100% enterprise-focused cockpit: open your default company immediately, run POS registers, payroll, B2B payments, and team support."
                  : "100 % dédié aux entreprises : ouvrez directement votre entreprise par défaut, gérez caisses POS, paie, paiements B2B et service client."
              }}
            </p>

            <ul class="mt-6 space-y-3">
              <li
                v-for="item in proPoints"
                :key="item"
                class="flex items-start gap-2.5 text-sm text-slate-200"
              >
                <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
            <a
              :href="config.public.proAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
            >
              {{ isEn ? "Open ZekoraPay Pro" : "Ouvrir ZekoraPay Pro" }}
              <ArrowUpRight class="h-4 w-4" />
            </a>
            <a
              :href="config.public.apkProUrl"
              download
              class="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-emerald-200 transition hover:bg-white/20"
              :title="isEn ? 'Download Pro Android APK' : 'Télécharger l\'APK Android Pro'"
            >
              <Smartphone class="h-3.5 w-3.5" />
              {{ isEn ? 'Download APK Pro' : 'Télécharger APK Pro' }}
            </a>
          </div>
        </div>
      </div>

      <!-- Unified Account Banner -->
      <div class="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-white px-5 py-3.5 text-center text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200 sm:text-sm">
        <ShieldCheck class="h-4 w-4 shrink-0 text-emerald-500" />
        <span>
          {{
            isEn
              ? "Single ZekoraPay account: register once on either app and sign in seamlessly across both."
              : "Un seul compte ZekoraPay : inscrivez-vous sur l'une des deux applications et connectez-vous sur l'autre avec les mêmes identifiants."
          }}
        </span>
      </div>
    </div>
  </section>
</template>
