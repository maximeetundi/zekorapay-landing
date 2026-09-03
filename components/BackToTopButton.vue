<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";

const { t } = useI18n();
const visible = ref(false);

function onScroll(): void {
  visible.value = window.scrollY > 480;
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      :aria-label="t('backToTop.label')"
      :title="t('backToTop.label')"
      class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-deep text-white shadow-lg shadow-deep/30 transition hover:bg-[#0a1840]"
      @click="scrollToTop"
    >
      <ArrowUp
        class="h-5 w-5"
        stroke-width="2.5"
      />
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
