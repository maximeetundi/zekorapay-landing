<script setup lang="ts">
import { X } from "lucide-vue-next";

const props = defineProps<{
  src: string | null;
  alt?: string;
}>();

const emit = defineEmits<{ close: [] }>();

watch(
  () => props.src,
  (value) => {
    if (import.meta.client) {
      document.body.style.overflow = value ? "hidden" : "";
    }
  },
);

function onKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") emit("close");
}

onMounted(() => {
  if (import.meta.client) window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="src"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-deep/90 p-4 backdrop-blur-sm sm:p-10"
        role="dialog"
        aria-modal="true"
        @click.self="emit('close')"
      >
        <button
          type="button"
          class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-8"
          aria-label="Close"
          @click="emit('close')"
        >
          <X class="h-6 w-6" stroke-width="2.25" />
        </button>
        <img :src="src ?? undefined" :alt="alt" class="max-h-full max-w-full rounded-xl object-contain shadow-2xl">
        <p v-if="alt" class="absolute bottom-4 left-1/2 max-w-lg -translate-x-1/2 text-center text-sm font-semibold text-white/70 sm:bottom-8">
          {{ alt }}
        </p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
