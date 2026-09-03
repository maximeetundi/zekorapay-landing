<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";

interface SidebarItem {
  slug: string;
  title: string;
  tagline: string;
}

const props = defineProps<{
  items: SidebarItem[];
  basePath: string;
  activeSlug?: string;
}>();

const { t } = useI18n();
const query = ref("");

// Menu secondaire du guide/de l'API, distinct et rétractable, indépendant
// du menu général du site (header) : replié par défaut sur mobile pour ne
// pas forcer un défilement à travers 15 liens avant le contenu, ouvert par
// défaut sur desktop où il reste toujours à gauche du contenu.
const open = ref(true);
onMounted(() => {
  if (import.meta.client && window.innerWidth < 1024) {
    open.value = false;
  }
});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return props.items;
  return props.items.filter(
    (item) => item.title.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q),
  );
});

function selectItem(): void {
  if (import.meta.client && window.innerWidth < 1024) {
    open.value = false;
  }
}
</script>

<template>
  <button
    type="button"
    class="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-deep transition hover:border-brand/40 hover:text-brand lg:hidden"
    :aria-expanded="open"
    @click="open = !open"
  >
    <component :is="open ? X : Menu" class="h-4 w-4" stroke-width="2.25" />
    {{ t("docsNav.menuToggle") }}
  </button>

  <button
    v-show="!open"
    type="button"
    class="mb-6 hidden items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-deep transition hover:border-brand/40 hover:text-brand lg:flex"
    @click="open = true"
  >
    <Menu class="h-4 w-4" stroke-width="2.25" />
    {{ t("docsNav.menuToggle") }}
  </button>

  <aside v-show="open" class="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
    <div>
      <button
        type="button"
        class="mb-3 hidden w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-400 transition hover:border-brand/40 hover:text-brand lg:flex"
        @click="open = false"
      >
        {{ t("docsNav.menuCollapse") }}
        <X class="h-3.5 w-3.5" stroke-width="2.5" />
      </button>
      <div class="relative mb-4">
        <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="query"
          type="search"
          :placeholder="t('docsNav.search')"
          class="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-deep placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        >
      </div>
      <nav class="flex flex-col gap-1">
        <NuxtLink
          v-for="item in filtered"
          :key="item.slug"
          :to="`${basePath}/${item.slug}`"
          class="rounded-xl px-3 py-2.5 text-sm transition"
          :class="item.slug === activeSlug ? 'bg-brand-tint font-bold text-brand' : 'font-semibold text-slate-600 hover:bg-slate-50 hover:text-deep'"
          @click="selectItem"
        >
          {{ item.title }}
        </NuxtLink>
        <p v-if="filtered.length === 0" class="px-3 py-2.5 text-sm text-slate-400">
          {{ t('docsNav.noResults') }}
        </p>
      </nav>
    </div>
  </aside>
</template>
