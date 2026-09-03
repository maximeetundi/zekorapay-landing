<script setup lang="ts">
import { BookOpen, Code2, HelpCircle, Home, Mail, Newspaper, UserRound, X } from "lucide-vue-next";

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
  guide: BookOpen,
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
        class="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
        role="dialog"
        aria-modal="true"
        :aria-label="t('nav.openMenu')"
      >
        <!-- Bandeau dégradé cohérent avec le CTA final de la home, pour donner
        au tiroir une identité visuelle forte plutôt qu'un simple panneau blanc. -->
        <div class="relative overflow-hidden bg-gradient-to-br from-deep via-[#132b6b] to-brand px-5 pb-6 pt-5">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
          />
          <div class="relative flex items-center justify-between">
            <img src="/logo.png" alt="ZekoraPay" class="h-8 w-auto brightness-0 invert">
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
            :class="isActive(link.to) ? 'bg-brand-tint text-brand' : 'text-slate-700 hover:bg-slate-50'"
          >
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              :class="isActive(link.to) ? 'bg-white text-brand' : 'bg-slate-100 text-slate-500'"
            >
              <component :is="iconMap[link.key]" class="h-[18px] w-[18px]" stroke-width="2.25" />
            </span>
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
        </nav>

        <div class="border-t border-slate-100 px-5 py-5">
          <!-- Le sélecteur de langue vit maintenant dans la barre d'en-tête
          (entre logo et bouton menu), plus ici — voir layouts/default.vue. -->
          <a
            :href="config.public.webAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand to-secondary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition active:scale-[0.98]"
            @click="close"
          >
            {{ t("nav.cta") }}
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
