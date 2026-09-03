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
  <section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-black tracking-tight text-deep">{{ t("blog.heading") }}</h1>
      <p class="mt-3 text-slate-600">{{ t("blog.subtitle") }}</p>
    </div>

    <div class="mt-12 flex flex-col gap-6">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="group overflow-hidden rounded-2xl border border-slate-100 transition hover:border-brand-tint hover:bg-brand-tint/30"
      >
        <img
          :src="post.image"
          :alt="post.title"
          class="h-40 w-full object-cover sm:h-48"
          loading="lazy"
        >
        <div class="p-6 sm:p-8">
          <span class="inline-flex items-center rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
            {{ t(`blogCategories.${post.categorySlug}`) }}
          </span>
          <h2 class="mt-3 text-xl font-extrabold text-deep group-hover:text-brand sm:text-2xl">
            {{ post.title }}
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
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
