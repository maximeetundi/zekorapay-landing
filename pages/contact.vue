<script setup lang="ts">
import { Flag, Mail } from "lucide-vue-next";

const config = useRuntimeConfig();
const { t } = useI18n();

usePageSeo({
  title: "Contact — ZekoraPay",
  description: "Contactez l'équipe ZekoraPay pour toute question sur la plateforme, un partenariat ou votre compte.",
  path: "/contact",
});

const hasContactEmail = computed(() => config.public.contactEmail.trim().length > 0);
</script>

<template>
  <section class="mx-auto max-w-2xl px-6 py-16 sm:py-24">
    <div class="flex flex-col items-center gap-4 text-center">
      <span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Mail class="h-5 w-5" stroke-width="2.25" />
      </span>
      <h1 class="text-3xl font-black text-deep">{{ t("contactPage.heading") }}</h1>
      <p class="max-w-md text-slate-600">{{ t("contactPage.subtitle") }}</p>
      <a
        v-if="hasContactEmail"
        :href="`mailto:${config.public.contactEmail}`"
        class="mt-2 rounded-[10px] bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#21568c]"
      >
        {{ t("contactPage.emailLabel") }} — {{ config.public.contactEmail }}
      </a>
      <p v-else class="mt-2 text-sm font-semibold text-slate-400">
        {{ t("contactPage.comingSoon") }}
      </p>
    </div>

    <div class="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-8 text-center">
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand">
        <Flag class="h-5 w-5" stroke-width="2.25" />
      </span>
      <h2 class="text-base font-extrabold text-deep">{{ t("contactPage.reportTitle") }}</h2>
      <p class="max-w-sm text-sm leading-relaxed text-slate-600">{{ t("contactPage.reportText") }}</p>
    </div>
  </section>
</template>
