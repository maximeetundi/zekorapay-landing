// Site vitrine statique, sans backend ni base de données — projet
// indépendant à terme (destiné à Cloudflare Pages). Le guide utilisateur statique
// a été remplacé par l'Assistant IA interactif intégré à l'application ; seule la
// documentation API vit ici (content/docs).
//
// La liste des slugs vient directement de chaque content/*/meta.ts (source
// unique) plutôt que d'être dupliquée ici — un nouvel article/sujet ajouté
// là-bas est automatiquement pré-rendu et inclus dans le sitemap sans
// oublier ce fichier.
import { blogPostsMeta } from "./content/blog/meta";
import { featuresMeta } from "./content/features/meta";
import { docsMeta } from "./content/docs/meta";

const blogSlugs = blogPostsMeta.map((post) => post.slug);
const featureSlugs = featuresMeta.map((feature) => feature.slug);
const docSlugs = docsMeta.map((page) => page.slug);

const staticRoutes = [
  "/",
  "/about",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
  "/docs",
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...featureSlugs.map((slug) => `/features/${slug}`),
  ...docSlugs.map((slug) => `/docs/${slug}`),
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
        { name: "theme-color", content: "#091A30" },
        { property: "og:site_name", content: "ZekoraPay" },
        { property: "og:locale", content: "fr_FR" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
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
      apkUserUrl: "https://cdn.zekorapay.com/releases/zekorapay.apk",
      apkProUrl: "https://cdn.zekorapay.com/releases/zekorapay-pro.apk",
      contactEmail: "support@zekorapay.com",
      webAppUrl: "https://app.zekorapay.com",
      proAppUrl: "https://pro.zekorapay.com",
      apiDocsUrl: "https://zekorapay.com/docs",
      siteUrl: "https://zekorapay.com",
    },
  },
});
