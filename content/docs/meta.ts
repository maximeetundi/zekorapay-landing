// Métadonnées de la documentation API, indépendantes de la langue — même
// pattern que content/blog et content/features. Contenu vérifié directement
// contre le code réel de services/public-api-gateway v2.1 (internal/gateway/
// routes.go, internal/devapi/models.go, internal/devapi/keys.go, internal/
// devapi/webhooks.go, internal/portal/portal.go) — chaque endpoint listé ici
// existe réellement et est monté sur https://api.zekorapay.com/v1.
export interface DocMeta {
  slug: string;
}

export const docsMeta: DocMeta[] = [
  { slug: "introduction" },
  { slug: "authentification" },
  { slug: "paiements" },
  { slug: "portefeuilles" },
  { slug: "facturation" },
  { slug: "livraison" },
  { slug: "boutique" },
  { slug: "evenements" },
  { slug: "dons" },
  { slug: "change" },
  { slug: "utilisateurs" },
  { slug: "webhooks" },
];
