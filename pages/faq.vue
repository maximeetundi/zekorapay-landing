<script setup lang="ts">
const { t } = useI18n();

usePageSeo({
  title: "FAQ — ZekoraPay",
  description: "Questions fréquentes sur ZekoraPay : coûts, comptes, pays couverts, langues et sécurité.",
  path: "/faq",
});

const faqItems = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const;
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-black tracking-tight text-deep">{{ t("faq.heading") }}</h1>
      <p class="mt-3 text-slate-600">{{ t("faq.subheading") }}</p>
    </div>
    <div class="mt-10">
      <FaqAccordion :items="faqItems" />
    </div>
  </section>
</template>
