<script setup lang="ts">
import { Check, Copy, Flag, Mail, Send } from "lucide-vue-next";

const config = useRuntimeConfig();
const { t } = useI18n();

usePageSeo({
  title: "Contact — ZekoraPay",
  description: "Contactez l'équipe ZekoraPay pour toute question sur la plateforme, un partenariat ou votre compte.",
  path: "/contact",
});

const hasContactEmail = computed(() => config.public.contactEmail.trim().length > 0);

const topic = ref("support");
const senderName = ref("");
const senderEmail = ref("");
const message = ref("");
const sent = ref(false);
const copiedEmail = ref(false);

function submitInquiry() {
  if (!senderName.value.trim() || !senderEmail.value.trim() || !message.value.trim()) return;
  if (hasContactEmail.value && typeof window !== "undefined") {
    const subject = encodeURIComponent(`[ZekoraPay - ${topic.value}] ${senderName.value.trim()}`);
    const body = encodeURIComponent(`${message.value.trim()}\n\n--\n${senderName.value.trim()} (${senderEmail.value.trim()})`);
    window.location.href = `mailto:${config.public.contactEmail}?subject=${subject}&body=${body}`;
  }
  sent.value = true;
}

async function copyEmail() {
  if (!hasContactEmail.value || typeof navigator === "undefined" || !navigator.clipboard) return;
  await navigator.clipboard.writeText(config.public.contactEmail);
  copiedEmail.value = true;
  setTimeout(() => {
    copiedEmail.value = false;
  }, 2000);
}
</script>

<template>
  <section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-tint text-brand">
        <Mail class="h-6 w-6" stroke-width="2.2" />
      </span>
      <h1 class="mt-4 text-3xl font-black tracking-tight text-deep sm:text-4xl">{{ t("contactPage.heading") }}</h1>
      <p class="mt-3 text-slate-600">{{ t("contactPage.subtitle") }}</p>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-12">
      <!-- Interactive Inquiry Form -->
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
        <div
          v-if="sent"
          class="flex flex-col items-center gap-3 py-8 text-center"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check class="h-6 w-6" stroke-width="2.5" />
          </span>
          <h2 class="text-lg font-extrabold text-deep">{{ t("contactPage.form.sentTitle") }}</h2>
          <p class="max-w-sm text-sm text-slate-600">{{ t("contactPage.form.sentDesc") }}</p>
          <button
            type="button"
            class="btn-outline-dark mt-2 px-4 py-2 text-xs"
            @click="sent = false"
          >
            {{ t("contactPage.form.newMsg") }}
          </button>
        </div>

        <form v-else class="space-y-4" @submit.prevent="submitInquiry">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {{ t("contactPage.form.topic") }}
            </label>
            <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                v-for="item in (['support', 'enterprise', 'partnership', 'api'] as const)"
                :key="item"
                type="button"
                class="rounded-xl border px-3 py-2 text-xs font-bold transition"
                :class="topic === item ? 'border-brand bg-primary-50 text-brand' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                @click="topic = item"
              >
                {{ t(`contactPage.form.topics.${item}`) }}
              </button>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
                {{ t("contactPage.form.name") }}
              </label>
              <input
                v-model="senderName"
                type="text"
                required
                class="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-deep outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
              >
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
                {{ t("contactPage.form.email") }}
              </label>
              <input
                v-model="senderEmail"
                type="email"
                required
                class="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-deep outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
              >
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {{ t("contactPage.form.message") }}
            </label>
            <textarea
              v-model="message"
              rows="4"
              required
              class="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-deep outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
            />
          </div>

          <button type="submit" class="btn-primary w-full py-3 text-sm">
            <Send class="h-4 w-4" />
            {{ t("contactPage.form.submit") }}
          </button>
        </form>
      </div>

      <!-- Direct Channels -->
      <div class="space-y-4 lg:col-span-5">
        <div class="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
          <h2 class="text-base font-extrabold text-deep">{{ t("contactPage.emailLabel") }}</h2>
          <div v-if="hasContactEmail" class="mt-3 flex flex-wrap items-center gap-2">
            <a
              :href="`mailto:${config.public.contactEmail}`"
              class="btn-primary px-4 py-2 text-xs"
            >
              <Mail class="h-4 w-4" />
              {{ config.public.contactEmail }}
            </a>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              @click="copyEmail"
            >
              <Check v-if="copiedEmail" class="h-3.5 w-3.5 text-emerald-600" />
              <Copy v-else class="h-3.5 w-3.5" />
              {{ copiedEmail ? t("apiCta.copied") : t("apiCta.copy") }}
            </button>
          </div>
          <p v-else class="mt-2 text-sm font-semibold text-slate-400">
            {{ t("contactPage.comingSoon") }}
          </p>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
            <Flag class="h-5 w-5" stroke-width="2.25" />
          </span>
          <h2 class="mt-4 text-base font-extrabold text-deep">{{ t("contactPage.reportTitle") }}</h2>
          <p class="mt-1.5 text-sm leading-relaxed text-slate-600">{{ t("contactPage.reportText") }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
