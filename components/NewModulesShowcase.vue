<script setup lang="ts">
import {
  CheckCircle2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Zap,
} from "lucide-vue-next";

const { locale } = useI18n();
const isEn = computed(() => locale.value === "en");

const trustBadges = computed(() =>
  isEn.value
    ? [
        { label: "Certified Agent", cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30" },
        { label: "Accredited Pro Agent", cls: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30" },
        { label: "Official Shop", cls: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30" },
        { label: "Certified Enterprise", cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30" },
        { label: "Recognized Association", cls: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30" },
        { label: "Official Event", cls: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30" },
        { label: "Verified Campaign", cls: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30" },
        { label: "Approved Courier", cls: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30" },
      ]
    : [
        { label: "Agent Certifié", cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30" },
        { label: "Agent Pro Accrédité", cls: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30" },
        { label: "Boutique Officielle", cls: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30" },
        { label: "Entreprise Certifiée", cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30" },
        { label: "Association Reconnue", cls: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30" },
        { label: "Événement Officiel", cls: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30" },
        { label: "Campagne Vérifiée", cls: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30" },
        { label: "Livreur Agréé", cls: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30" },
      ],
);
</script>

<template>
  <section class="border-y border-slate-200/70 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Sparkles class="h-3.5 w-3.5" />
          {{ isEn ? "Latest Platform Releases" : "Nouveautés Plateforme" }}
        </span>
        <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {{
            isEn
              ? "Global logistics, verified trust & instant Pro cockpits"
              : "Logistique mondiale, Confiance certifiée & Vues Pro"
          }}
        </h2>
        <p class="mt-3 text-base text-slate-600 dark:text-slate-300">
          {{
            isEn
              ? "Ship worldwide with rated couriers, recognize certified partners at a glance, and customize your ZekoraPay Pro workspace for zero-friction speed."
              : "Expédiez partout avec des livreurs notés, identifiez en un coup d'œil les acteurs certifiés et adaptez votre espace ZekoraPay Pro pour une rapidité maximale."
          }}
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Card 1: Delivery & Logistics -->
        <div class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
                <Truck class="h-6 w-6" stroke-width="2.1" />
              </span>
              <span class="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                {{ isEn ? "250 countries · 150k+ cities" : "250 pays · 150 000+ villes" }}
              </span>
            </div>
            <h3 class="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
              {{
                isEn
                  ? "Intra-city, Inter-city & Global Delivery"
                  : "Livraison Intra-ville, Inter-ville & Internationale"
              }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{
                isEn
                  ? "Book a local courier in your city or ship internationally via certified road, air, and sea logistics partners."
                  : "Commandez un livreur personnel dans votre ville ou expédiez via des compagnies de logistique certifiées par voie routière, aérienne ou maritime."
              }}
            </p>
          </div>
          <ul class="mt-5 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            <li class="flex items-start gap-2">
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>{{
                isEn
                  ? "OpenStreetMap / OSRM routing with pickup & drop-off GPS pinning"
                  : "Carte d'itinéraire OpenStreetMap / OSRM avec pointage GPS départ & arrivée"
              }}</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>{{
                isEn
                  ? "Smart comparator: search, sort by rating, price & favorite couriers"
                  : "Comparateur avancé : recherche, filtres, tri par note, prix et livreurs récurrents"
              }}</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>{{
                isEn
                  ? "Dedicated courier wallet with instant transfer to main balance"
                  : "Wallet Livreur dédié avec transfert instantané vers le wallet principal"
              }}</span>
            </li>
          </ul>
        </div>

        <!-- Card 2: Trust Verification Badges -->
        <div class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                <ShieldCheck class="h-6 w-6" stroke-width="2.1" />
              </span>
              <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                {{ isEn ? "Verified by Admin" : "Validé par l'administration" }}
              </span>
            </div>
            <h3 class="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
              {{
                isEn
                  ? "Official Group Trust Badges"
                  : "Badges de Vérification & Confiance par Groupe"
              }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{
                isEn
                  ? "Every merchant, courier, company, and organization carries an administrator-verified trust seal to protect every transaction."
                  : "Chaque type d'acteur dispose d'un badge officiel adapté et contrôlé par nos administrateurs pour sécuriser vos échanges."
              }}
            </p>
          </div>
          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="badge in trustBadges"
              :key="badge.label"
              :class="badge.cls"
              class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold"
            >
              <ShieldCheck class="h-3.5 w-3.5 shrink-0" />
              {{ badge.label }}
            </span>
          </div>
        </div>

        <!-- Card 3: Custom Views & Pro Performance -->
        <div class="flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#091A30] via-[#0B2239] to-[#045E4C] p-7 text-white shadow-lg">
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
                <SlidersHorizontal class="h-6 w-6" stroke-width="2.1" />
              </span>
              <span class="inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-200">
                <Zap class="h-3.5 w-3.5" />
                {{ isEn ? "Instant 3G / SWR" : "Ultra-rapide" }}
              </span>
            </div>
            <h3 class="mt-5 text-xl font-extrabold text-white">
              {{
                isEn
                  ? "Custom Views, Delegated Limits & Rentals"
                  : "Vues Personnalisées, Plafonds & Locations"
              }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-300">
              {{
                isEn
                  ? "Pin your favorite workspace—Rentals, POS, or Treasury—right to your home view with one-tap tenant leasing and instant SWR caching."
                  : "Épinglez votre module prioritaire (Locations, POS, Trésorerie) dès l'ouverture avec création instantanée de locataire et cache SWR rapide."
              }}
            </p>
          </div>
          <ul class="mt-5 space-y-2.5 text-sm text-slate-200">
            <li class="flex items-start gap-2">
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{{
                isEn
                  ? "Custom Views accessible in Personal & Pro enterprise spaces"
                  : "Vues personnalisées accessibles en espace Perso & Entreprise Pro"
              }}</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{{
                isEn
                  ? "Delegated employee spending limits & one-click email approvals"
                  : "Plafonds de dépense délégués & validations par email en un clic"
              }}</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{{
                isEn
                  ? "Direct rental leases with inline modal tenant creation"
                  : "Baux locatifs directs avec création modale de locataire instantanée"
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
