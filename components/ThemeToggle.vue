<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const isDark = ref(false);

function applyTheme(dark: boolean) {
  isDark.value = dark;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", dark);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("zekorapay_landing_theme", dark ? "dark" : "light");
  }
}

function toggle() {
  applyTheme(!isDark.value);
}

onMounted(() => {
  const saved = typeof localStorage !== "undefined" ? localStorage.getItem("zekorapay_landing_theme") : null;
  if (saved === "dark") {
    applyTheme(true);
  } else if (saved === "light") {
    applyTheme(false);
  } else {
    applyTheme(false);
  }
});
</script>

<template>
  <button
    type="button"
    :aria-label="isDark ? 'Mode clair' : 'Mode sombre'"
    :title="isDark ? 'Mode clair' : 'Mode sombre'"
    class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    @click="toggle"
  >
    <Sun v-if="isDark" class="h-4 w-4 text-amber-400" />
    <Moon v-else class="h-4 w-4 text-slate-600" />
  </button>
</template>
