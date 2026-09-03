// Métadonnées du guide utilisateur, indépendantes de la langue — même pattern
// que content/blog et content/features. Le contenu long vit dans
// translations/<locale>.ts, indexé par slug.
//
// 15 sujets, un par module réel du menu de l'application (app.zekorapay.com),
// vérifiés en conditions réelles le 2026-09-03 via une connexion live au
// compte de test (voir memory zekorapay-frontend-test-account) : chaque
// section de ce guide correspond à un écran effectivement visité et
// photographié pendant cette session, pas à une supposition sur ce que
// l'app est censée faire.
export interface GuideMeta {
  slug: string;
  icon:
    | "onboarding"
    | "wallet"
    | "transfer"
    | "cash"
    | "exchange"
    | "cards"
    | "qr"
    | "tontines"
    | "events"
    | "enterprise"
    | "rentals"
    | "shop"
    | "donations"
    | "video"
    | "agent";
}

export const guideMeta: GuideMeta[] = [
  { slug: "demarrage", icon: "onboarding" },
  { slug: "portefeuilles", icon: "wallet" },
  { slug: "transferts", icon: "transfer" },
  { slug: "depots-retraits", icon: "cash" },
  { slug: "conversion", icon: "exchange" },
  { slug: "cartes", icon: "cards" },
  { slug: "paiements-marchand", icon: "qr" },
  { slug: "tontines-associations", icon: "tontines" },
  { slug: "evenements-billetterie", icon: "events" },
  { slug: "entreprises", icon: "enterprise" },
  { slug: "location-immobilier", icon: "rentals" },
  { slug: "boutique", icon: "shop" },
  { slug: "dons", icon: "donations" },
  { slug: "reunions", icon: "video" },
  { slug: "agents", icon: "agent" },
];
