<script setup lang="ts">
// Le produit réel de ZekoraPay aujourd'hui est l'app web (app.zekorapay.com)
// -- pas une app mobile publiée sur les stores (mobile_app est en Flutter,
// pas encore live). Contrairement à StoreButton (qui affiche "Bientôt
// disponible" à raison pour les stores), ce CTA principal pointe toujours
// vers un produit réellement accessible dès maintenant.
import { ArrowUpRight } from "lucide-vue-next";

withDefaults(
  defineProps<{
    variant?: "solid" | "outline";
  }>(),
  { variant: "solid" },
);

const config = useRuntimeConfig();
const { t } = useI18n();
</script>

<template>
  <a
    :href="config.public.webAppUrl"
    target="_blank"
    rel="noopener noreferrer"
    :class="variant === 'solid' ? 'btn-primary text-base px-6 py-3.5' : 'btn-outline text-base px-6 py-3.5'"
  >
    {{ t("hero.ctaPrimary") }}
    <ArrowUpRight class="h-5 w-5" stroke-width="2.5" />
  </a>
</template>
