// Config ESLint minimale (pas de dépendance sur @nuxt/eslint) : les globals
// auto-importés par Nuxt/Vue (composables + defineNuxtConfig) sont déclarés
// explicitement ci-dessous plutôt que résolus dynamiquement.
module.exports = {
  root: true,
  env: { browser: true, node: true, es2022: true },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  globals: {
    defineNuxtConfig: "readonly",
    defineNuxtPlugin: "readonly",
    useRuntimeConfig: "readonly",
    useHead: "readonly",
    useI18n: "readonly",
    useNuxtApp: "readonly",
    navigateTo: "readonly",
    computed: "readonly",
    ref: "readonly",
    reactive: "readonly",
    watch: "readonly",
    watchEffect: "readonly",
    onMounted: "readonly",
    onUnmounted: "readonly",
  },
  overrides: [
    {
      files: ["**/*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: { parser: "@typescript-eslint/parser" },
    },
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
    },
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
