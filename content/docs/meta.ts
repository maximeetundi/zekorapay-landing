// Métadonnées de la documentation API, indépendantes de la langue — même
// pattern que content/guide et content/blog. Contenu vérifié directement
// contre le code réel de services/public-api-gateway (main.go, internal/
// middleware/auth.go, internal/handlers/developer/apikeys.go, internal/
// webhooks/dispatcher.go) le 2026-09-03 — chaque endpoint listé ici existe
// réellement et est monté derrière l'authentification par clé API. Contrairement
// à l'ancienne doc Laravel (DocumentSeeder.php), qui décrivait des endpoints
// jamais implémentés (POST /v1/associations, POST /v1/enterprise/batch-payout,
// GET /v1/wallets/main…), rien ici n'est inventé.
export interface DocMeta {
  slug: string;
}

export const docsMeta: DocMeta[] = [
  { slug: "introduction" },
  { slug: "authentification" },
  { slug: "portefeuilles" },
  { slug: "paiements" },
  { slug: "change" },
  { slug: "boutique" },
  { slug: "dons" },
  { slug: "evenements" },
  { slug: "cartes" },
  { slug: "utilisateurs" },
  { slug: "webhooks" },
];
