<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "app" | "pro";
    surface?: "auto" | "light" | "dark";
    size?: "sm" | "md" | "lg";
    showWordmark?: boolean;
  }>(),
  {
    variant: "app",
    surface: "auto",
    size: "md",
    showWordmark: true,
  },
);

const sizeClasses = computed(() => {
  if (props.size === "sm") return "h-8 w-8 rounded-lg";
  if (props.size === "lg") return "h-12 w-12 rounded-2xl";
  return "h-9 w-9 rounded-xl";
});

const textSizeClasses = computed(() => {
  if (props.size === "sm") return "text-base";
  if (props.size === "lg") return "text-xl";
  return "text-lg";
});

const lightSrc = computed(() => (props.variant === "pro" ? "/logo-pro-light.png" : "/logo.png"));
const darkSrc = computed(() => (props.variant === "pro" ? "/logo-pro.png" : "/logo-dark.png"));
const altText = computed(() => (props.variant === "pro" ? "ZekoraPay Pro" : "ZekoraPay"));
</script>

<template>
  <span class="inline-flex items-center gap-2.5 select-none">
    <template v-if="surface === 'auto'">
      <img
        :src="lightSrc"
        :alt="altText"
        :class="[sizeClasses, 'block object-cover shadow-sm ring-1 ring-slate-900/10 dark:hidden']"
      >
      <img
        :src="darkSrc"
        :alt="altText"
        :class="[sizeClasses, 'hidden object-cover shadow-sm ring-1 ring-white/15 dark:block']"
      >
    </template>
    <img
      v-else-if="surface === 'light'"
      :src="lightSrc"
      :alt="altText"
      :class="[sizeClasses, 'object-cover shadow-sm ring-1 ring-slate-900/10']"
    >
    <img
      v-else
      :src="darkSrc"
      :alt="altText"
      :class="[sizeClasses, 'object-cover shadow-sm ring-1 ring-white/15']"
    >

    <span
      v-if="showWordmark"
      :class="[
        textSizeClasses,
        'inline-flex items-center gap-1.5 font-black tracking-tight',
        surface === 'dark'
          ? 'text-white'
          : surface === 'light'
            ? 'text-slate-900'
            : 'text-slate-900 dark:text-white',
      ]"
    >
      <span>Zekora<span
        :class="
          surface === 'dark'
            ? 'text-emerald-400'
            : surface === 'light'
              ? 'text-emerald-600'
              : 'text-emerald-600 dark:text-emerald-400'
        "
      >Pay</span></span>
      <span
        v-if="variant === 'pro'"
        class="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 ring-1 ring-emerald-500/30"
      >
        PRO
      </span>
    </span>
  </span>
</template>
