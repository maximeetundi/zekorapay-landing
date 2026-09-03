<script setup lang="ts">
import { getGuideTopic, getGuideTopics } from "~/content/guide/guide";

const route = useRoute();
const { t, locale } = useI18n();

const topic = computed(() => getGuideTopic(String(route.params.slug), locale.value));
if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: "Guide topic not found" });
}

const topics = computed(() => getGuideTopics(locale.value));
const sidebarItems = computed(() => topics.value.map((item) => ({ slug: item.slug, title: item.title, tagline: item.tagline })));

usePageSeo({
  title: `${topic.value.title} — Guide ZekoraPay`,
  description: topic.value.tagline,
  path: `/guide/${topic.value.slug}`,
});
</script>

<template>
  <section v-if="topic" class="mx-auto max-w-6xl px-6 py-12 sm:py-16">
    <div class="flex flex-col gap-10 lg:flex-row">
      <DocsSidebar :items="sidebarItems" base-path="/guide" :active-slug="topic.slug" />

      <div class="min-w-0 flex-1">
        <NuxtLink to="/guide" class="text-sm font-semibold text-brand hover:underline">
          ← {{ t("docsNav.guideBadge") }}
        </NuxtLink>
        <h1 class="mt-3 text-3xl font-black text-deep sm:text-4xl">{{ topic.title }}</h1>
        <p class="mt-2 text-base text-slate-600">{{ topic.tagline }}</p>

        <div class="mt-10 space-y-12">
          <section v-for="(section, index) in topic.sections" :key="index">
            <h2 class="text-lg font-extrabold text-deep">{{ section.heading }}</h2>
            <p v-if="section.intro" class="mt-2 text-sm leading-relaxed text-slate-600">{{ section.intro }}</p>

            <ol v-if="section.steps" class="mt-4 space-y-3">
              <li
                v-for="(step, stepIndex) in section.steps"
                :key="stepIndex"
                class="flex gap-3 rounded-xl border border-slate-100 p-4"
              >
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-tint text-xs font-black text-brand">
                  {{ stepIndex + 1 }}
                </span>
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-bold text-deep">{{ step.title }}</p>
                    <span
                      v-if="step.pinRequired"
                      class="inline-flex items-center rounded-full bg-danger-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-danger"
                    >
                      {{ t("docsNav.pinRequired") }}
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-slate-600">{{ step.description }}</p>
                </div>
              </li>
            </ol>

            <ul v-if="section.bullets" class="mt-4 space-y-2">
              <li v-for="(bullet, bulletIndex) in section.bullets" :key="bulletIndex" class="flex gap-2.5 text-sm text-slate-600">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {{ bullet }}
              </li>
            </ul>

            <div v-if="section.images" class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <figure v-for="(image, imgIndex) in section.images" :key="imgIndex" class="overflow-hidden rounded-xl border border-slate-100">
                <img :src="image.src" :alt="image.alt" loading="lazy" class="w-full object-cover">
                <figcaption class="px-3 py-2 text-center text-xs text-slate-400">{{ image.alt }}</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
