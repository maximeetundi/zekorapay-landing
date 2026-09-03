<script setup lang="ts">
import { Languages } from "lucide-vue-next";

// setLocale() persiste le choix dans le cookie grc_landing_locale
// (nuxt.config.ts) : un choix explicite prime ensuite sur la détection
// automatique de la langue du navigateur, même après un rechargement.
const { locale, locales, setLocale, t } = useI18n();
</script>

<template>
  <label
    class="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-sm"
  >
    <Languages
      class="h-4 w-4 text-brand"
      stroke-width="2.25"
    />
    <span class="sr-only">{{ t("language.label") }}</span>
    <select
      :value="locale"
      class="bg-transparent text-sm outline-none"
      :aria-label="t('language.label')"
      @change="setLocale(($event.target as HTMLSelectElement).value as typeof locale)"
    >
      <option
        v-for="loc in locales"
        :key="loc.code"
        :value="loc.code"
      >
        {{ loc.name }}
      </option>
    </select>
  </label>
</template>
