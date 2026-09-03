// Documentation API, en français. Chaque endpoint, en-tête, scope et code
// d'erreur listé ici correspond au code réel de public-api-gateway (voir la
// note dans meta.ts) — vérifié le 2026-09-03, pas de contenu spéculatif.

export interface DocEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  scope?: string;
  description: string;
}

export interface CodeBlock {
  label?: string;
  lang: string;
  content: string;
}

export interface DocSection {
  heading: string;
  intro?: string;
  bullets?: string[];
  endpoints?: DocEndpoint[];
  code?: CodeBlock[];
}

export interface LocalizedDoc {
  title: string;
  tagline: string;
  sections: DocSection[];
}

export const fr: Record<string, LocalizedDoc> = {
  introduction: {
    title: "Introduction",
    tagline: "Intégrez ZekoraPay directement dans vos propres systèmes.",
    sections: [
      {
        heading: "Vue d'ensemble",
        intro: "L'API publique ZekoraPay permet à des partenaires (sites e-commerce, ERP, applications de gestion) d'intégrer nos services : portefeuilles, paiements marchands par QR code, change, boutique, dons, événements et plus. Elle est distincte du guide utilisateur, qui couvre l'usage de l'application elle-même.",
        code: [
          { label: "URL de base", lang: "text", content: "https://api.app.zekorapay.com/public-api-gateway/v1" },
        ],
      },
      {
        heading: "Format des réponses",
        bullets: [
          "Toutes les requêtes et réponses sont en JSON (Content-Type: application/json).",
          "Chaque appel doit passer par l'authentification par clé API — voir la page Authentification.",
          "Un identifiant sandbox est disponible pour tester votre intégration sans mouvement de fonds réel.",
        ],
      },
    ],
  },

  authentification: {
    title: "Authentification",
    tagline: "Clés API, environnements, scopes et limites de débit.",
    sections: [
      {
        heading: "Obtenir une clé API",
        intro: "Les clés sont créées en libre-service depuis votre propre session utilisateur (JWT) — aucune clé n'est nécessaire pour créer votre première clé.",
        endpoints: [
          { method: "POST", path: "/developer/keys", description: "Crée une nouvelle clé API pour votre compte." },
          { method: "GET", path: "/developer/keys", description: "Liste vos clés API." },
          { method: "DELETE", path: "/developer/keys/:id", description: "Révoque une de vos clés." },
          { method: "GET", path: "/developer/logs", description: "Consulte les logs de requêtes d'une de vos clés." },
          { method: "GET", path: "/developer/sandbox/token", description: "Obtient un jeton temporaire pour tester en environnement sandbox." },
        ],
        code: [
          {
            label: "Créer une clé — requête",
            lang: "json",
            content:
              "POST /developer/keys\nAuthorization: Bearer <votre_jeton_de_session>\n\n{\n  \"name\": \"Intégration boutique\",\n  \"environment\": \"live\",\n  \"permissions\": [\"payments:read\", \"payments:write\", \"wallets:read\"],\n  \"rate_limit\": \"basic\",\n  \"webhook_url\": \"https://votre-domaine.com/webhooks/zekorapay\"\n}",
          },
        ],
      },
      {
        heading: "Utiliser votre clé",
        intro: "Passez votre clé via l'en-tête X-Api-Key (recommandé) ou via Authorization: Bearer.",
        code: [
          { label: "En-tête recommandé", lang: "http", content: "X-Api-Key: cb_live_xxxxxxxxxxxxxxxx" },
          { label: "Alternative", lang: "http", content: "Authorization: Bearer cb_live_xxxxxxxxxxxxxxxx" },
        ],
      },
      {
        heading: "Environnements",
        bullets: [
          "live — clés préfixées cb_ ou sk_, mouvements de fonds réels.",
          "sandbox — pour tester votre intégration sans argent réel ; obtenez un jeton via GET /developer/sandbox/token.",
        ],
      },
      {
        heading: "Permissions (scopes)",
        intro: "Chaque clé n'a accès qu'aux domaines pour lesquels elle a une permission explicite. Une lecture (GET) nécessite le scope :read, une écriture (POST/PUT/DELETE) nécessite :write. Le scope * donne accès à tout.",
        bullets: [
          "payments:read / payments:write — paiements marchands par QR code.",
          "wallets:read / wallets:write — portefeuilles.",
          "exchange:read / exchange:write — taux de change, conversion, trading.",
          "shop:read / shop:write — boutique, produits, commandes.",
          "donations:read / donations:write — campagnes de dons.",
          "events:read / events:write — événements et billetterie.",
          "cards:read / cards:write — cartes.",
          "users:read / users:write — profils et relations.",
          "developer:read / developer:write — gestion de vos propres clés API.",
          "Les scopes enterprise:* nécessitent un compte qui possède ou gère une entreprise.",
        ],
      },
      {
        heading: "Limites de débit",
        intro: "Chaque clé a un plafond de requêtes par minute selon son tier. Les en-têtes X-RateLimit-Limit / X-RateLimit-Remaining / X-RateLimit-Window sont renvoyés sur chaque réponse.",
        bullets: [
          "free — 60 req/min",
          "basic — 300 req/min",
          "standard — 1 000 req/min",
          "premium — 5 000 req/min",
          "enterprise — 50 000 req/min",
        ],
      },
      {
        heading: "Erreurs",
        code: [
          {
            label: "Format d'erreur",
            lang: "json",
            content:
              '{\n  "error": {\n    "type": "authentication_error",\n    "code": "invalid_api_key",\n    "message": "..."\n  }\n}',
          },
        ],
        bullets: [
          "401 — clé API manquante ou invalide.",
          "403 — permission insuffisante ou IP non autorisée pour cette clé.",
          "429 — limite de débit dépassée (par IP ou par clé).",
        ],
      },
    ],
  },

  portefeuilles: {
    title: "Portefeuilles",
    tagline: "Consulter le solde et gérer les portefeuilles de votre compte.",
    sections: [
      {
        heading: "Endpoints",
        endpoints: [
          { method: "POST", path: "/wallets", scope: "wallets:write", description: "Crée un nouveau portefeuille." },
          { method: "GET", path: "/wallets", scope: "wallets:read", description: "Liste vos portefeuilles." },
          { method: "GET", path: "/wallets/:id", scope: "wallets:read", description: "Détails d'un portefeuille." },
          { method: "GET", path: "/wallets/:id/balance", scope: "wallets:read", description: "Solde d'un portefeuille." },
          { method: "POST", path: "/wallets/:id/deposit", scope: "wallets:write", description: "Crédite le portefeuille (mouvement interne à votre propre compte)." },
          { method: "POST", path: "/wallets/:id/withdraw", scope: "wallets:write", description: "Débite le portefeuille (mouvement interne à votre propre compte)." },
        ],
      },
    ],
  },

  paiements: {
    title: "Paiements marchands",
    tagline: "Encaissez vos clients par QR code, sans jamais manipuler leur code PIN.",
    sections: [
      {
        heading: "Comment ça marche",
        intro: "Vous créez une demande de paiement et recevez un identifiant + un QR code. Votre client scanne ou saisit ce code dans l'application ZekoraPay et paie avec son propre PIN. Le mouvement d'argent et la vérification du PIN se font entièrement dans notre app — il n'existe donc pas d'endpoint pour « payer » ou « saisir un PIN » côté API tierce : cela évitait le seul autre design possible, où votre propre application devrait collecter le PIN du client et le transmettre, ce que nous ne voulons faire faire à aucun intégrateur.",
        endpoints: [
          { method: "POST", path: "/payments/requests", scope: "payments:write", description: "Crée une demande de paiement." },
          { method: "GET", path: "/payments/requests", scope: "payments:read", description: "Liste vos demandes de paiement." },
          { method: "GET", path: "/payments/requests/history", scope: "payments:read", description: "Historique des paiements." },
          { method: "GET", path: "/payments/requests/:id", scope: "payments:read", description: "Détails d'une demande." },
          { method: "GET", path: "/payments/requests/:id/qr", scope: "payments:read", description: "QR code de la demande." },
          { method: "DELETE", path: "/payments/requests/:id", scope: "payments:write", description: "Annule une demande." },
          { method: "POST", path: "/payments/quick", scope: "payments:write", description: "Crée une demande de paiement rapide (flux simplifié)." },
        ],
      },
      {
        heading: "Être notifié d'un paiement",
        intro: "Configurez un webhook_url à la création de votre clé API pour recevoir l'événement payment.received dès qu'un client paie — voir la page Webhooks — plutôt que d'interroger GET /payments/requests/:id en boucle.",
      },
    ],
  },

  change: {
    title: "Change et trading crypto",
    tagline: "Taux de change, conversion et opérations d'achat/vente.",
    sections: [
      {
        heading: "Données de marché",
        endpoints: [
          { method: "GET", path: "/exchange/rates", scope: "exchange:read", description: "Liste des taux de change disponibles." },
          { method: "GET", path: "/exchange/rates/:from/:to", scope: "exchange:read", description: "Taux entre deux devises/actifs." },
          { method: "GET", path: "/exchange/markets", scope: "exchange:read", description: "Marchés disponibles." },
          { method: "POST", path: "/exchange/convert", scope: "exchange:write", description: "Simule une conversion." },
        ],
      },
      {
        heading: "Opérations de change",
        endpoints: [
          { method: "POST", path: "/exchange/quotes", scope: "exchange:write", description: "Demande un devis pour une opération de change." },
          { method: "POST", path: "/exchange/exchanges", scope: "exchange:write", description: "Exécute une opération de change à partir d'un devis." },
          { method: "GET", path: "/exchange/exchanges/:id", scope: "exchange:read", description: "Consulte une opération de change terminée." },
        ],
      },
      {
        heading: "Achat / vente rapide",
        intro: "Conversion instantanée crypto ↔ monnaie fiduciaire, contre le portefeuille de l'appelant.",
        endpoints: [
          { method: "POST", path: "/exchange/buy", scope: "exchange:write", description: "Achète un actif." },
          { method: "POST", path: "/exchange/sell", scope: "exchange:write", description: "Vend un actif." },
        ],
      },
    ],
  },

  boutique: {
    title: "Boutique",
    tagline: "Gérez vos boutiques, produits, commandes et avis.",
    sections: [
      {
        heading: "Boutiques",
        endpoints: [
          { method: "GET", path: "/shop", scope: "shop:read", description: "Liste vos boutiques." },
          { method: "POST", path: "/shop", scope: "shop:write", description: "Crée une boutique." },
          { method: "GET", path: "/shop/:id", scope: "shop:read", description: "Détails d'une boutique." },
          { method: "PUT", path: "/shop/:id", scope: "shop:write", description: "Met à jour une boutique." },
          { method: "DELETE", path: "/shop/:id", scope: "shop:write", description: "Supprime une boutique." },
        ],
      },
      {
        heading: "Produits, commandes, catégories, avis",
        endpoints: [
          { method: "GET", path: "/shop/:id/products", scope: "shop:read", description: "Liste les produits." },
          { method: "POST", path: "/shop/:id/products", scope: "shop:write", description: "Ajoute un produit." },
          { method: "GET", path: "/shop/:id/orders", scope: "shop:read", description: "Liste les commandes." },
          { method: "POST", path: "/shop/:id/orders", scope: "shop:write", description: "Crée une commande." },
          { method: "GET", path: "/shop/:id/categories", scope: "shop:read", description: "Liste les catégories." },
          { method: "GET", path: "/shop/:id/reviews", scope: "shop:read", description: "Liste les avis." },
        ],
      },
    ],
  },

  dons: {
    title: "Dons et campagnes",
    tagline: "Créer et gérer des campagnes de collecte.",
    sections: [
      {
        heading: "Campagnes",
        endpoints: [
          { method: "POST", path: "/donations/campaigns", scope: "donations:write", description: "Crée une campagne." },
          { method: "GET", path: "/donations/campaigns", scope: "donations:read", description: "Liste les campagnes." },
          { method: "GET", path: "/donations/campaigns/:id", scope: "donations:read", description: "Détails d'une campagne." },
          { method: "PUT", path: "/donations/campaigns/:id", scope: "donations:write", description: "Met à jour une campagne." },
          { method: "GET", path: "/donations/campaigns/enterprise/:enterpriseId", scope: "donations:read", description: "Campagnes d'une entreprise." },
          { method: "POST", path: "/donations/campaigns/:id/cancel", scope: "donations:write", description: "Annule une campagne." },
          { method: "GET", path: "/donations/campaigns/:id/wallet", scope: "donations:read", description: "Portefeuille de la campagne." },
          { method: "POST", path: "/donations/campaigns/:id/payout", scope: "donations:write", description: "Retire les fonds collectés." },
        ],
      },
      {
        heading: "Dons",
        endpoints: [
          { method: "POST", path: "/donations", scope: "donations:write", description: "Enregistre un don." },
          { method: "GET", path: "/donations", scope: "donations:read", description: "Liste les dons." },
          { method: "POST", path: "/donations/:id/refund", scope: "donations:write", description: "Rembourse un don." },
        ],
      },
    ],
  },

  evenements: {
    title: "Événements et billetterie",
    tagline: "Créer des événements et gérer la vente de billets.",
    sections: [
      {
        heading: "Événements",
        endpoints: [
          { method: "GET", path: "/events", scope: "events:read", description: "Liste vos événements." },
          { method: "POST", path: "/events", scope: "events:write", description: "Crée un événement." },
          { method: "GET", path: "/events/active", scope: "events:read", description: "Événements actifs." },
          { method: "GET", path: "/events/code/:code", scope: "events:read", description: "Retrouve un événement par son code unique." },
          { method: "GET", path: "/events/:id", scope: "events:read", description: "Détails d'un événement." },
          { method: "PUT", path: "/events/:id", scope: "events:write", description: "Met à jour un événement." },
          { method: "DELETE", path: "/events/:id", scope: "events:write", description: "Supprime un événement." },
          { method: "POST", path: "/events/:id/publish", scope: "events:write", description: "Publie l'événement." },
          { method: "POST", path: "/events/:id/cancel", scope: "events:write", description: "Annule l'événement (remboursement automatique)." },
          { method: "GET", path: "/events/:id/stats", scope: "events:read", description: "Statistiques de vente." },
          { method: "POST", path: "/events/:id/payout", scope: "events:write", description: "Retire les fonds collectés." },
        ],
      },
      {
        heading: "Billets",
        endpoints: [
          { method: "POST", path: "/events/tickets/purchase", scope: "events:write", description: "Achète un billet." },
          { method: "GET", path: "/events/tickets", scope: "events:read", description: "Liste les billets." },
          { method: "GET", path: "/events/tickets/:id", scope: "events:read", description: "Détails d'un billet." },
          { method: "POST", path: "/events/tickets/verify", scope: "events:write", description: "Vérifie un billet (contrôle d'entrée)." },
          { method: "POST", path: "/events/tickets/:id/use", scope: "events:write", description: "Marque un billet comme utilisé." },
          { method: "POST", path: "/events/tickets/:id/refund", scope: "events:write", description: "Rembourse un billet." },
        ],
      },
    ],
  },

  cartes: {
    title: "Cartes",
    tagline: "Gestion des cartes prépayées virtuelles et physiques.",
    sections: [
      {
        heading: "Endpoints",
        intro: "Le domaine cartes est exposé sous /cards avec un scope unique cards:read (GET) / cards:write (autres méthodes), plutôt qu'un endpoint par sous-fonctionnalité — cette partie de l'API est encore en cours de stabilisation, vérifiez toujours la forme exacte des réponses avant de construire une intégration critique dessus.",
        endpoints: [
          { method: "GET", path: "/cards", scope: "cards:read", description: "Liste vos cartes." },
          { method: "POST", path: "/cards/*", scope: "cards:write", description: "Création, activation, gel, rechargement, limites et gestion des sous-ressources d'une carte." },
        ],
      },
    ],
  },

  utilisateurs: {
    title: "Utilisateurs",
    tagline: "Profil, recherche et relations (contacts, blocages).",
    sections: [
      {
        heading: "Profil",
        endpoints: [
          { method: "GET", path: "/users/profile", scope: "users:write", description: "Votre profil." },
          { method: "PUT", path: "/users/profile", scope: "users:write", description: "Met à jour votre profil." },
        ],
      },
      {
        heading: "Recherche et profils publics",
        endpoints: [
          { method: "GET", path: "/users/search", scope: "users:read", description: "Recherche des utilisateurs." },
          { method: "GET", path: "/users/:id", scope: "users:read", description: "Profil public d'un utilisateur." },
        ],
      },
      {
        heading: "Relations",
        endpoints: [
          { method: "GET", path: "/users/relationships/contacts", scope: "users:write", description: "Liste vos contacts." },
          { method: "POST", path: "/users/relationships/contacts", scope: "users:write", description: "Ajoute un contact." },
          { method: "POST", path: "/users/relationships/contacts/sync", scope: "users:write", description: "Synchronise votre carnet de contacts." },
          { method: "GET", path: "/users/relationships/blocked", scope: "users:write", description: "Liste les utilisateurs bloqués." },
          { method: "POST", path: "/users/relationships/blocked", scope: "users:write", description: "Bloque un utilisateur." },
        ],
      },
    ],
  },

  webhooks: {
    title: "Webhooks",
    tagline: "Soyez notifié en temps réel plutôt que d'interroger l'API en boucle.",
    sections: [
      {
        heading: "Configuration",
        intro: "Renseignez un webhook_url (HTTPS obligatoire) à la création de votre clé API. Il n'y a pas d'endpoint de mise à jour : révoquez la clé et créez-en une nouvelle pour changer d'URL.",
      },
      {
        heading: "Événement disponible",
        bullets: [
          "payment.received — une demande de paiement marchand créée via l'API a été payée par le client.",
        ],
      },
      {
        heading: "Vérifier la signature",
        intro: "Chaque requête webhook est signée en HMAC SHA256 avec votre secret de webhook, dans l'en-tête X-Zekorapay-Signature.",
        code: [
          {
            label: "Node.js",
            lang: "javascript",
            content:
              "const crypto = require('crypto');\n\nfunction verify(payload, signatureHeader, secret) {\n  const expected = 'sha256=' + crypto\n    .createHmac('sha256', secret)\n    .update(payload)\n    .digest('hex');\n  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));\n}",
          },
          {
            label: "Payload",
            lang: "json",
            content: '{\n  "event": "payment.received",\n  "event_id": "...",\n  "created_at": "...",\n  "data": { "...": "..." }\n}',
          },
        ],
      },
      {
        heading: "Fiabilité",
        bullets: [
          "3 tentatives de livraison avec backoff en cas d'échec.",
          "Votre serveur doit répondre par un code 2xx pour confirmer la réception.",
          "L'URL doit être en HTTPS ; toute adresse interne, privée ou locale est refusée.",
        ],
      },
    ],
  },
};
