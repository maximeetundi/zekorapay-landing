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
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold shadow-lg transition hover:-translate-y-0.5',
      variant === 'solid'
        ? 'bg-gradient-to-r from-brand to-secondary text-white shadow-brand/30 hover:shadow-brand/40'
        : 'border-[1.5px] border-white/30 text-white hover:bg-white/10',
    ]"
  >
    {{ t("hero.ctaPrimary") }}
    <ArrowUpRight class="h-5 w-5" stroke-width="2.5" />
  </a>
</template>
