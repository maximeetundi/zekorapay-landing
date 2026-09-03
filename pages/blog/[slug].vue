<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import { getBlogPost } from "~/content/blog/posts";

const route = useRoute();
const { t, locale } = useI18n();
const config = useRuntimeConfig();

const post = computed(() => getBlogPost(String(route.params.slug), locale.value));
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
}

usePageSeo({
  title: `${post.value.title} — Blog ZekoraPay`,
  description: post.value.excerpt,
  path: `/blog/${post.value.slug}`,
  image: post.value.image,
});

useHead(() => ({
  script: post.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.value!.title,
            description: post.value!.excerpt,
            datePublished: post.value!.date,
            dateModified: post.value!.date,
            image: `${config.public.siteUrl}${post.value!.image}`,
            author: { "@id": `${config.public.siteUrl}/#organization` },
            publisher: { "@id": `${config.public.siteUrl}/#organization` },
            mainEntityOfPage: `${config.public.siteUrl}/blog/${post.value!.slug}`,
            articleSection: t(`blogCategories.${post.value!.categorySlug}`),
          }),
        },
      ]
    : [],
}));

function formatDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString(locale.value, { year: "numeric", month: "long", day: "numeric" });
}
</script>

<template>
  <article v-if="post" class="mx-auto max-w-2xl px-6 py-16 sm:py-24">
    <NuxtLink to="/blog" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
      <ArrowLeft class="h-4 w-4" />
      {{ t("blog.backToBlog") }}
    </NuxtLink>

    <img
      :src="post.image"
      :alt="post.title"
      class="mt-6 h-56 w-full rounded-2xl object-cover sm:h-72"
    >

    <span class="mt-6 inline-flex items-center rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
      {{ t(`blogCategories.${post.categorySlug}`) }}
    </span>
    <h1 class="mt-3 text-3xl font-black leading-tight text-deep sm:text-4xl">
      {{ post.title }}
    </h1>
    <div class="mt-3 flex items-center gap-3 text-xs font-semibold text-slate-400">
      <span>{{ formatDate(post.date) }}</span>
      <span>·</span>
      <span>{{ t("blog.minRead", { min: post.minutesToRead }) }}</span>
    </div>

    <div class="prose-legal mt-10 space-y-5 text-base leading-relaxed text-slate-600">
      <p v-for="(paragraph, index) in post.body" :key="index">{{ paragraph }}</p>
    </div>
  </article>
</template>
