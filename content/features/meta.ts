// Métadonnées des pages détaillées de fonctionnalités, indépendantes de la
// langue (slug, icône, clé i18n pour réutiliser titre/description courts déjà
// traduits dans i18n/locales/*.json sous "features.<key>"). Le contenu long
// (corps + points clés) vit dans translations/<locale>.ts — même pattern que
// content/blog (voir posts.ts).
//
// 13 fonctionnalités reflétant le périmètre réel de la plateforme (services
// backend existants : wallet-service, transfer-service, card-service,
// exchange-service, association-service, enterprise-service, shop-service,
// donation-service, ticket-service, agent-service, video-service,
// messaging-service) -- l'ancienne liste (9 items, dont certains marqués
// "Bientôt disponible" alors qu'ils sont en production depuis des mois) ne
// couvrait plus l'app réelle.
export interface FeatureMeta {
  slug: string;
  key: string;
  icon: "wallet" | "transfer" | "cards" | "exchange" | "qr" | "tontines" | "enterprise" | "shop" | "donations" | "events" | "cash" | "video" | "ai";
}

export const featuresMeta: FeatureMeta[] = [
  { slug: "portefeuilles-multi-devises", key: "wallet", icon: "wallet" },
  { slug: "transferts-instantanes", key: "transfer", icon: "transfer" },
  { slug: "cartes-prepayees", key: "cards", icon: "cards" },
  { slug: "change-et-crypto", key: "exchange", icon: "exchange" },
  { slug: "paiement-qr-code", key: "qr", icon: "qr" },
  { slug: "tontines-associations", key: "tontines", icon: "tontines" },
  { slug: "entreprises-b2b", key: "enterprise", icon: "enterprise" },
  { slug: "zekorapay-shop", key: "shop", icon: "shop" },
  { slug: "dons-solidarite", key: "donations", icon: "donations" },
  { slug: "evenements-billetterie", key: "events", icon: "events" },
  { slug: "agents-de-proximite", key: "cash", icon: "cash" },
  { slug: "reunions-et-messagerie", key: "video", icon: "video" },
  { slug: "assistant-ia", key: "ai", icon: "ai" },
];
