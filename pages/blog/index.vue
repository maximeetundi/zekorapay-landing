<script setup lang="ts">
import { getBlogPosts } from "~/content/blog/posts";

const { t, locale } = useI18n();

usePageSeo({
  title: "Blog — ZekoraPay",
  description: "Guides et actualités pour tirer le meilleur parti de vos finances avec ZekoraPay : tontines, transferts, entreprises et plus.",
  path: "/blog",
});

const posts = computed(() => [...getBlogPosts(locale.value)].sort((a, b) => (a.date < b.date ? 1 : -1)));

function formatDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString(locale.value, { year: "numeric", month: "long", day: "numeric" });
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">{{ t("blog.heading") }}</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">{{ t("blog.subtitle") }}</p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-2">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-500/40"
      >
        <img
          :src="post.image"
          :alt="post.title"
          class="h-44 w-full object-cover"
          loading="lazy"
        >
        <div class="flex flex-1 flex-col p-6">
          <span class="inline-flex w-fit items-center rounded-full bg-orange-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            {{ t(`blogCategories.${post.categorySlug}`) }}
          </span>
          <h2 class="mt-3 text-xl font-extrabold text-slate-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
            {{ post.title }}
          </h2>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {{ post.excerpt }}
          </p>
          <div class="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-400">
            <span>{{ formatDate(post.date) }}</span>
            <span>·</span>
            <span>{{ t("blog.minRead", { min: post.minutesToRead }) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
