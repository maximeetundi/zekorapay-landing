# ZekoraPay — Site vitrine

> Site vitrine public de **ZekoraPay** — portefeuilles multi-devises, transferts internationaux, cartes, tontines/associations, comptes entreprise, boutique et plus, dans une seule application.

Site 100% statique, sans backend ni base de données, pensé pour un hébergement gratuit sur **Cloudflare Pages**.

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

---

## 📋 Sommaire

- [Présentation](#-présentation)
- [Pages](#-pages)
- [Architecture technique](#-architecture-technique)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [SEO & référencement](#-seo--référencement)
- [Blog](#-blog)
- [Internationalisation](#-internationalisation)

---

## 🎯 Présentation

Ce dépôt contient uniquement le **site vitrine** de ZekoraPay — la présentation publique de l'application. Il ne contient ni l'application web/mobile, ni les API, ni le panel d'administration : c'est un projet volontairement séparé et statique, pour rester gratuit à héberger et simple à maintenir. La documentation utilisateur et la documentation API sont gérées dans un projet séparé.

## 📄 Pages

| Page | Contenu |
|------|---------|
| `/` | Accueil — présentation de l'app, fonctionnalités, accès à l'application |
| `/about` | Notre mission, pourquoi l'app existe, nos valeurs |
| `/features/[slug]` | Détail de chaque fonctionnalité (portefeuilles, transferts, cartes, tontines, entreprise, boutique…) |
| `/faq` | Questions fréquentes |
| `/contact` | Contact |
| `/privacy` | Politique de confidentialité |
| `/terms` | Conditions d'utilisation |
| `/blog` | Liste des articles |
| `/blog/[slug]` | Article individuel |

## 🏗️ Architecture technique

```
landing-page-nuxt/
├── app.vue                  # Point d'entrée (NuxtLayout + NuxtPage)
├── layouts/default.vue      # Header, navigation, footer, back-to-top
├── pages/                   # Routes du site
├── components/              # Composants réutilisables (OpenAppButton, StoreButton, FaqAccordion, PhoneMockup…)
├── composables/usePageSeo.ts # Canonical + Open Graph/Twitter par page
├── content/blog/            # Contenu des articles de blog (en dur, pas de CMS)
├── content/features/        # Contenu des fonctionnalités (en dur, pas de CMS)
├── content/legal/           # Contenu confidentialité/conditions
├── i18n/locales/            # Traductions (en, fr)
├── assets/css/main.css      # Design system (Tailwind)
├── public/                  # Assets statiques (logo, favicons, robots.txt)
└── nuxt.config.ts
```

**Stack** : Nuxt 3 · Vue 3 · TypeScript · TailwindCSS · `@nuxtjs/i18n` · `@nuxtjs/sitemap`

## 🚀 Installation

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## ⚙️ Configuration

Variables publiques (`runtimeConfig.public` dans `nuxt.config.ts`, ou en variables d'environnement `NUXT_PUBLIC_*` au moment du build) :

| Variable | Description | Défaut |
|----------|--------------|--------|
| `NUXT_PUBLIC_APP_STORE_URL` | Lien App Store (vide = bouton "Coming soon") | `""` |
| `NUXT_PUBLIC_PLAY_STORE_URL` | Lien Google Play (vide = bouton "Coming soon") | `""` |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Email de contact affiché | `"support@zekorapay.com"` |
| `NUXT_PUBLIC_WEB_APP_URL` | URL de l'application web (bouton principal "Ouvrir l'app") | `"https://app.zekorapay.com"` |
| `NUXT_PUBLIC_API_DOCS_URL` | URL de la documentation API (site séparé) | `"https://zekorapay.com/en/docs"` |
| `NUXT_PUBLIC_USER_GUIDE_URL` | URL du guide utilisateur (site séparé) | `"https://zekorapay.com/en/guide"` |
| `NUXT_PUBLIC_SITE_URL` | URL publique du site (sitemap, canonical, Open Graph) | `"https://zekorapay.com"` |

## 📦 Déploiement

```bash
npm run generate
```

Le dossier à publier est `.output/public`.

### Cloudflare Pages

1. Créez un projet **Pages** connecté à ce dépôt Git.
2. Paramétrez la commande de build sur `npm run generate`.
3. Paramétrez le répertoire de sortie sur `.output/public`.
4. Dans **Custom domains**, ajoutez `zekorapay.com` puis suivez les enregistrements DNS indiqués par Cloudflare.

## 🔍 SEO & référencement

- Génération 100% statique (`nitro.preset: "static"`), aucune page ne dépend d'un serveur.
- Sitemap généré automatiquement sur `/sitemap.xml`.
- `robots.txt` à la racine.
- Chaque page définit son propre `<title>`, sa description, ses balises Open Graph/Twitter Card et son lien canonique via `composables/usePageSeo.ts`.

## 📝 Blog

Les articles sont définis en dur dans `content/blog/` (pas de CMS ni de base de données — volume encore faible). Pour ajouter un article :

1. Ajoutez une entrée dans `content/blog/meta.ts` avec un `slug` unique.
2. Ajoutez le contenu localisé dans `content/blog/translations/fr.ts` et `translations/en.ts`.
3. Le pré-rendu statique et le sitemap récupèrent automatiquement le nouveau slug depuis `content/blog/meta.ts` — aucune liste de routes à maintenir à la main.
4. Relancez `npm run generate`.

## 🌍 Internationalisation

2 langues : Français (par défaut), Anglais. La langue du navigateur est détectée automatiquement au premier chargement ; un choix explicite via le sélecteur de langue est ensuite mémorisé par cookie. Le site n'utilise pas de préfixe d'URL par langue (`strategy: "no_prefix"`).
