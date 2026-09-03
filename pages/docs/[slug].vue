<script setup lang="ts">
import { getDocPage, getDocPages } from "~/content/docs/docs";

const route = useRoute();
const { t, locale } = useI18n();
const config = useRuntimeConfig();

const page = computed(() => getDocPage(String(route.params.slug), locale.value));
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Doc page not found" });
}

const pages = computed(() => getDocPages(locale.value));
const sidebarItems = computed(() => pages.value.map((item) => ({ slug: item.slug, title: item.title, tagline: item.tagline })));

usePageSeo({
  title: `${page.value.title} — Documentation API ZekoraPay`,
  description: page.value.tagline,
  path: `/docs/${page.value.slug}`,
});

useHead(() => ({
  script: page.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: page.value!.title,
            description: page.value!.tagline,
            author: { "@id": `${config.public.siteUrl}/#organization` },
            publisher: { "@id": `${config.public.siteUrl}/#organization` },
            mainEntityOfPage: `${config.public.siteUrl}/docs/${page.value!.slug}`,
            inLanguage: locale.value,
          }),
        },
      ]
    : [],
}));

const methodClass: Record<string, string> = {
  GET: "bg-ok-bg text-ok",
  POST: "bg-brand-tint text-brand",
  PUT: "bg-warn-bg text-warn",
  DELETE: "bg-danger-bg text-danger",
};
</script>

<template>
  <section v-if="page" class="mx-auto max-w-6xl px-6 py-12 sm:py-16">
    <div class="flex flex-col gap-10 lg:flex-row">
      <DocsSidebar :items="sidebarItems" base-path="/docs" :active-slug="page.slug" />

      <div class="min-w-0 flex-1">
        <NuxtLink to="/docs" class="text-sm font-semibold text-brand hover:underline">
          ← {{ t("docsNav.apiBadge") }}
        </NuxtLink>
        <h1 class="mt-3 text-3xl font-black text-deep sm:text-4xl">{{ page.title }}</h1>
        <p class="mt-2 text-base text-slate-600">{{ page.tagline }}</p>

        <div class="mt-10 space-y-12">
          <section v-for="(section, index) in page.sections" :key="index">
            <h2 class="text-lg font-extrabold text-deep">{{ section.heading }}</h2>
            <p v-if="section.intro" class="mt-2 text-sm leading-relaxed text-slate-600">{{ section.intro }}</p>

            <div v-if="section.endpoints" class="mt-4 overflow-x-auto rounded-xl border border-slate-100">
              <table class="w-full text-sm">
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="(endpoint, epIndex) in section.endpoints" :key="epIndex">
                    <td class="whitespace-nowrap px-4 py-3 align-top">
                      <span class="inline-flex rounded-md px-2 py-0.5 text-[11px] font-black" :class="methodClass[endpoint.method]">
                        {{ endpoint.method }}
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-2 py-3 align-top font-mono text-xs text-deep">{{ endpoint.path }}</td>
                    <td class="px-4 py-3 align-top text-slate-600">
                      {{ endpoint.description }}
                      <span v-if="endpoint.scope" class="ml-1.5 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                        {{ endpoint.scope }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul v-if="section.bullets" class="mt-4 space-y-2">
              <li v-for="(bullet, bulletIndex) in section.bullets" :key="bulletIndex" class="flex gap-2.5 text-sm text-slate-600">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {{ bullet }}
              </li>
            </ul>

            <div v-if="section.code" class="mt-4 space-y-3">
              <div v-for="(block, codeIndex) in section.code" :key="codeIndex">
                <p v-if="block.label" class="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">{{ block.label }}</p>
                <pre class="overflow-x-auto rounded-xl bg-deep p-4 text-xs leading-relaxed text-deep-tint"><code>{{ block.content }}</code></pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
