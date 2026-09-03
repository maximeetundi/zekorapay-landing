// Métadonnées du guide utilisateur, indépendantes de la langue — même pattern
// que content/blog et content/features (voir posts.ts / features.ts). Le
// contenu long vit dans translations/<locale>.ts, indexé par slug.
//
// 7 sujets réels, ancrés sur les fonctionnalités effectivement disponibles
// dans l'app (onboarding/KYC, wallet, tontines, événements, entreprise,
// boutique, cartes) — pas de sujet "bientôt disponible" comme dans l'ancien
// guide Laravel (resources/views/guide/*.blade.php), qui marquait "compte" et
// "entreprises" comme non prêts alors qu'ils le sont côté backend.
export interface GuideMeta {
  slug: string;
  icon: "onboarding" | "wallet" | "tontines" | "events" | "enterprise" | "shop" | "cards";
}

export const guideMeta: GuideMeta[] = [
  { slug: "demarrage", icon: "onboarding" },
  { slug: "depots-retraits", icon: "wallet" },
  { slug: "tontines-associations", icon: "tontines" },
  { slug: "evenements-billetterie", icon: "events" },
  { slug: "entreprises", icon: "enterprise" },
  { slug: "boutique", icon: "shop" },
  { slug: "cartes", icon: "cards" },
];
