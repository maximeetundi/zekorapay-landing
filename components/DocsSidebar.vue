<script setup lang="ts">
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

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return props.items;
  return props.items.filter(
    (item) => item.title.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q),
  );
});
</script>

<template>
  <aside class="lg:w-64 lg:shrink-0">
    <div class="lg:sticky lg:top-24">
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
