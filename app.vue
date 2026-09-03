<template>
  <div>
    <!-- Barre de progression en haut de l'écran pendant une navigation
    entre pages (site prérendu statique : après le premier chargement, les
    liens internes naviguent côté client sans rechargement complet, avec un
    court instant sans contenu visible sinon) — composant natif Nuxt, couleur
    de marque alignée sur le bouton d'action de l'en-tête (voir layouts/default.vue). -->
    <NuxtLoadingIndicator color="#2967AF" :height="3" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
