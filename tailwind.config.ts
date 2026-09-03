import type { Config } from "tailwindcss";

// Tokens repris À L'IDENTIQUE de landing-page-laravel/resources/css/app.css
// (--color-primary-*, --color-secondary-*, --color-accent-*, --gradient-*,
// --shadow-*, Inter) — le site vitrine doit reprendre le vrai système visuel
// du site PHP (glassmorphism, ombres "glow" colorées, dot-grid, texte en
// dégradé), pas juste ses 3 couleurs de base sur un habillage plat façon
// template de référence.
export default {
  content: ["./app.vue", "./components/**/*.vue", "./pages/**/*.vue", "./layouts/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        secondary: {
          DEFAULT: "#a855f7",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        accent: {
          DEFAULT: "#06b6d4",
          50: "#ecfeff",
          100: "#cffafe",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        // Alias courts utilisés dans les composants/pages déjà écrits.
        deep: "#1e1b4b",
        brand: "#6366f1",
        "brand-tint": "#eef2ff",
        "deep-tint": "#e0e7ff",
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
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.35)",
        "glow-sm": "0 4px 15px rgba(99,102,241,0.4)",
        "glow-lg": "0 8px 40px rgba(99,102,241,0.15)",
        card: "0 4px 24px rgba(99,102,241,0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(99,102,241,0.6)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
