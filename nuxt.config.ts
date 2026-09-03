// Site vitrine statique, sans backend ni base de données — projet
// indépendant à terme (destiné à Cloudflare Pages), pour l'instant hébergé
// dans le monorepo à côté de landing-page-laravel/ (qui garde le guide
// utilisateur et la doc API pour l'instant — non touchés ici).
//
// La liste des slugs vient directement de content/blog/meta.ts et
// content/features/meta.ts (source unique) plutôt que d'être dupliquée ici —
// un nouvel article ajouté là-bas est automatiquement pré-rendu et inclus
// dans le sitemap sans oublier ce fichier.
import { blogPostsMeta } from "./content/blog/meta";
import { featuresMeta } from "./content/features/meta";

const blogSlugs = blogPostsMeta.map((post) => post.slug);
const featureSlugs = featuresMeta.map((feature) => feature.slug);

const staticRoutes = [
  "/",
  "/about",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...featureSlugs.map((slug) => `/features/${slug}`),
];

export default defineNuxtConfig({
  compatibilityDate: "2026-07-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/sitemap"],
  css: ["~/assets/css/main.css"],
  vite: {
    server: {
      allowedHosts: ["zekorapay.com", ".zekorapay.com"],
    },
  },
  // Généré en site 100% statique (pas d'admin, pas de serveur) : `npm run
  // generate` produit .output/public, qui est le seul dossier à déployer.
  nitro: {
    preset: "static",
    prerender: {
      routes: staticRoutes,
    },
  },
  site: {
    url: "https://zekorapay.com",
  },
  sitemap: {
    urls: staticRoutes.map((loc) => ({
      loc,
      changefreq: loc === "/" ? "daily" : loc.startsWith("/blog") ? "monthly" : "monthly",
      priority: loc === "/" ? 1.0 : loc.startsWith("/blog/") ? 0.7 : 0.8,
    })),
  },
  // fr/en seulement, comme le site actuel (landing-page-laravel) -- pas de
  // préfixe d'URL par langue, la langue du visiteur est détectée au premier
  // chargement puis mémorisée par cookie si changée explicitement.
  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "fr", language: "fr-FR", name: "Français", file: "fr.json" },
    ],
    defaultLocale: "fr",
    strategy: "no_prefix",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "zekorapay_landing_locale",
      redirectOn: "root",
      alwaysRedirect: false,
    },
  },
  app: {
    head: {
      titleTemplate: (title) => (title ? `${title}` : "ZekoraPay — La plateforme financière globale"),
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#1e1b4b" },
        { property: "og:site_name", content: "ZekoraPay" },
        { property: "og:locale", content: "fr_FR" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      appStoreUrl: "",
      playStoreUrl: "",
      contactEmail: "support@zekorapay.com",
      webAppUrl: "https://app.zekorapay.com",
      apiDocsUrl: "https://zekorapay.com/en/docs",
      userGuideUrl: "https://zekorapay.com/en/guide",
      siteUrl: "https://zekorapay.com",
    },
  },
});
