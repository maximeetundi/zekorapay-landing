<script setup lang="ts">
import { Code2, HelpCircle, Home, Mail, Newspaper, UserRound, X } from "lucide-vue-next";

const props = defineProps<{
  open: boolean;
  navLinks: ReadonlyArray<{ to: string; key: string }>;
}>();
const emit = defineEmits<{ "update:open": [value: boolean] }>();

const { t } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();

const iconMap: Record<string, typeof Home> = {
  home: Home,
  about: UserRound,
  docs: Code2,
  blog: Newspaper,
  faq: HelpCircle,
  contact: Mail,
};

function close(): void {
  emit("update:open", false);
}

function isActive(to: string): boolean {
  return to === "/" ? route.path === "/" : route.path.startsWith(to);
}

// Empêche le scroll de la page derrière le tiroir tant qu'il est ouvert.
watch(
  () => props.open,
  (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  },
);

// Ferme automatiquement le tiroir dès qu'on navigue (clic sur un lien).
watch(
  () => route.fullPath,
  () => close(),
);

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="menu-fade">
      <div
        v-if="open"
        aria-hidden="true"
        class="fixed inset-0 z-40 bg-deep/50 backdrop-blur-sm lg:hidden"
        @click="close"
      />
    </Transition>
    <Transition name="menu-slide">
      <aside
        v-if="open"
        class="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl dark:bg-slate-950 lg:hidden"
        role="dialog"
        aria-modal="true"
        :aria-label="t('nav.openMenu')"
      >
        <!-- Bandeau dégradé cohérent avec l'identité ZekoraPay -->
        <div class="relative overflow-hidden bg-gradient-to-br from-[#091A30] via-[#0C2D48] to-[#045E4C] px-5 pb-6 pt-5">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-2xl"
          />
          <div class="relative flex items-center justify-between">
            <BrandLogo surface="dark" size="sm" />
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              :aria-label="t('nav.closeMenu')"
              @click="close"
            >
              <X class="h-5 w-5" stroke-width="2.5" />
            </button>
          </div>
          <p class="relative mt-4 text-sm font-semibold text-white/80">{{ t("hero.badge") }}</p>
        </div>

        <nav class="flex-1 overflow-y-auto px-3 py-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3.5 rounded-xl px-3.5 py-3.5 text-base font-bold transition"
            :class="isActive(link.to) ? 'bg-brand-tint text-brand dark:bg-indigo-500/15 dark:text-indigo-300' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900'"
          >
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              :class="isActive(link.to) ? 'bg-white text-brand dark:bg-slate-900 dark:text-indigo-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
            >
              <component :is="iconMap[link.key]" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
        </nav>

        <div class="space-y-2.5 border-t border-slate-100 px-5 py-5 dark:border-slate-800">
          <a
            :href="config.public.webAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand to-secondary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition active:scale-[0.98]"
            @click="close"
          >
            {{ t("nav.cta") }}
          </a>
          <a
            :href="config.public.proAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-500/20 dark:border-emerald-400/30 dark:text-emerald-300"
            @click="close"
          >
            <img src="/logo-pro.png" alt="" class="h-4 w-4 rounded object-cover">
            ZekoraPay Pro
          </a>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.25s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateX(100%);
}
</style>
