import type { Config } from "tailwindcss";

// Tokens repris de landing-page-laravel/resources/css/app.css (--color-primary-*,
// --gradient-hero, Inter) — le site vitrine actuel a sa propre identité
// indigo/violet/cyan, distincte de l'orange de l'app principale mais cohérente
// avec les halos indigo déjà utilisés sur les 6 pages auth de l'app.
export default {
  content: ["./app.vue", "./components/**/*.vue", "./pages/**/*.vue", "./layouts/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        deep: "#1e1b4b",
        brand: "#6366f1",
        "brand-tint": "#eef2ff",
        "deep-tint": "#e0e7ff",
        secondary: "#a855f7",
        accent: "#06b6d4",
        ok: "#059669",
        "ok-bg": "#E7F4EC",
        "ok-line": "#B7E0C6",
        warn: "#B45309",
        "warn-bg": "#FEF3E2",
        "warn-line": "#F5D9A8",
        danger: "#C81E1E",
        "danger-bg": "#FDECEC",
        "danger-line": "#F3B9B9",
      },
    },
  },
  plugins: [],
} satisfies Config;
