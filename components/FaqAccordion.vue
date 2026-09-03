<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

const props = defineProps<{
  items: readonly string[];
  // Remplace la réponse d'une clé donnée par un texte calculé côté appelant
  // (ex. le prix, qui dépend d'une variable d'environnement) plutôt que
  // d'être figé dans les fichiers de traduction.
  overrides?: Record<string, string>;
}>();

const { t } = useI18n();
const openIndex = ref<number | null>(0);

function toggle(index: number): void {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="(key, index) in props.items"
      :key="key"
      class="overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        :aria-expanded="openIndex === index"
        @click="toggle(index)"
      >
        <span class="text-[15px] font-bold text-deep">{{ t(`faq.${key}.question`) }}</span>
        <ChevronDown
          class="h-4 w-4 shrink-0 text-brand transition-transform"
          :class="{ 'rotate-180': openIndex === index }"
          stroke-width="2.5"
        />
      </button>
      <p
        v-if="openIndex === index"
        class="px-5 pb-4 text-sm leading-relaxed text-slate-600"
      >
        {{ props.overrides?.[key] ?? t(`faq.${key}.answer`) }}
      </p>
    </div>
  </div>
</template>
