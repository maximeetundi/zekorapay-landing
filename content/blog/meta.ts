// Métadonnées des articles, indépendantes de la langue (slug, date, image de
// couverture, catégorie). Le contenu localisé (titre, extrait, corps) vit
// dans translations/<locale>.ts — voir posts.ts pour la fonction qui
// recombine les deux au moment de l'affichage.
//
// Les 3 articles ci-dessous sont repris tels quels de
// landing-page-laravel/database/seeders/PostSeeder.php (contenu déjà rédigé,
// bilingue) -- pas de nouveau contenu inventé ici.
export interface BlogPostMeta {
  slug: string;
  date: string;
  minutesToRead: number;
  categorySlug: string;
  image: string;
}

export const blogPostsMeta: BlogPostMeta[] = [
  { slug: "lancement-de-zekorapay", date: "2026-08-24", minutesToRead: 4, categorySlug: "news", image: "/blog-covers/lancement-de-zekorapay.png" },
  { slug: "tontine-digitale-epargne-communautaire", date: "2026-08-19", minutesToRead: 5, categorySlug: "education", image: "/blog-covers/tontine-digitale-epargne-communautaire.png" },
  { slug: "transferts-argent-afrique-diaspora", date: "2026-08-14", minutesToRead: 5, categorySlug: "finance", image: "/blog-covers/transferts-argent-afrique-diaspora.png" },
];
