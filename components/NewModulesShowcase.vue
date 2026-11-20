<template>
  <section class="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800">
    <div class="mx-auto max-w-6xl px-6">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          ✨ Nouveautés Plateforme
        </span>
        <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Logistique mondiale &amp; Confiance certifiée
        </h2>
        <p class="mt-3 text-base text-slate-600 dark:text-slate-300">
          Expédiez partout dans le monde avec des livreurs notés et identifiez en un coup d'œil les acteurs certifiés par nos équipes.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Delivery & Logistics Card -->
        <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl dark:bg-sky-500/15">
              🚚
            </span>
            <span class="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
              250 pays · 150 000+ villes
            </span>
          </div>
          <h3 class="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
            Livraison Intra-ville, Inter-ville &amp; Internationale
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Commandez un livreur personnel dans votre ville ou expédiez via des compagnies de logistique certifiées par voie routière, aérienne ou maritime.
          </p>
          <ul class="mt-5 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">✓</span>
              <span>Carte d'itinéraire OpenStreetMap / OSRM avec pointage GPS départ &amp; arrivée</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">✓</span>
              <span>Comparateur avancé : recherche, filtres, tri par note ★, prix et livreurs récurrents</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">✓</span>
              <span>Wallet Livreur dédié avec transfert instantané vers le wallet principal</span>
            </li>
          </ul>
        </div>

        <!-- Trust Verification Badges Card -->
        <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl dark:bg-emerald-500/15">
              🛡️
            </span>
            <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Validé par l'administration
            </span>
          </div>
          <h3 class="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
            Badges de Vérification &amp; Confiance par Groupe
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Chaque type d'acteur dispose d'un badge officiel adapté et contrôlé par nos administrateurs pour sécuriser vos échanges.
          </p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30">
              🛡️ Agent Certifié
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30">
              🛡️ Agent Pro Accrédité
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30">
              🛡️ Boutique Officielle
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30">
              🛡️ Entreprise Certifiée
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30">
              🛡️ Association Reconnue
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30">
              🛡️ Événement Officiel
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30">
              🛡️ Campagne Vérifiée
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30">
              🛡️ Livreur Agréé
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
