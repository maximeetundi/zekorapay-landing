// Documentation API, en français. Chaque endpoint, en-tête, scope, tier et
// format d'erreur listé ici correspond exactement au code réel de
// services/public-api-gateway v2.1 (https://api.zekorapay.com) — aucun endpoint
// spéculatif n'est inclus.

export interface DocEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
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
    tagline: "Intégrez l'API REST ZekoraPay v2.1 (Particuliers & Entreprises Pro) dans vos applications et ERP.",
    sections: [
      {
        heading: "Vue d'ensemble et points d'entrée",
        intro: "L'API publique ZekoraPay v2.1 permet aux partenaires, sites e-commerce, ERP et applications SaaS d'encaisser par QR code ou lien de paiement, consulter les portefeuilles, gérer des boutiques, facturer en B2B, expédier via les corridors de livraison, vérifier des billets d'événements et piloter des campagnes de dons.",
        endpoints: [
          { method: "GET", path: "/health", description: "Vérifie la disponibilité de la passerelle publique (https://api.zekorapay.com/health)." },
          { method: "GET", path: "/v1", description: "Métadonnées publiques de l'API v2.1, ressources disponibles et format des webhooks." },
          { method: "GET", path: "/openapi.json", description: "Spécification OpenAPI 3.1 complète générée depuis la passerelle." },
          { method: "GET", path: "/docs", description: "Référence interactive Scalar pour tester les requêtes directement dans le navigateur." },
        ],
        code: [
          { label: "URL de base", lang: "text", content: "https://api.zekorapay.com/v1" },
          { label: "Référence interactive (OpenAPI 3.1)", lang: "text", content: "https://api.zekorapay.com/docs\nhttps://api.zekorapay.com/openapi.json" },
        ],
      },
      {
        heading: "Comptes Particuliers vs Entreprises Pro",
        intro: "Une clé API appartient soit à un compte particulier (owner_type: user), soit à un espace entreprise ZekoraPay Pro (owner_type: enterprise). L'environnement (live ou sandbox) est déterminé directement par la clé utilisée.",
        bullets: [
          "Clés live (zk_live_...) : nécessitent une vérification d'identité KYC validée pour un compte particulier, ou une vérification KYB approuvée pour une entreprise.",
          "Clés sandbox (zk_test_...) : disponibles immédiatement sans mouvement d'argent réel pour tester vos demandes de paiement et vos webhooks.",
          "Frontière de sécurité PIN : par conception, les virements sortants, retraits, rachats de cartes ou transferts de fonds ne sont jamais exposés par clé API — toute sortie d'argent exige le code PIN personnel du titulaire dans l'app ZekoraPay.",
        ],
      },
      {
        heading: "Format des réponses, idempotence et en-têtes",
        bullets: [
          "Toutes les requêtes et réponses utilisent JSON (Content-Type: application/json).",
          "Envoyez l'en-tête Idempotency-Key (ou X-Idempotency-Key) sur vos requêtes POST sensibles : la passerelle déduplique les tentatives identiques pendant 24 heures.",
          "Chaque réponse retourne X-Request-Id (traçabilité), X-Zekorapay-Environment (live ou sandbox) et les en-têtes X-RateLimit-Limit / X-RateLimit-Remaining.",
          "Les erreurs suivent un format uniforme : { \"error\": { \"type\", \"code\", \"message\" } }.",
        ],
        code: [
          {
            label: "Format d'erreur standard",
            lang: "json",
            content:
              '{\n  "error": {\n    "type": "authentication_error",\n    "code": "invalid_api_key",\n    "message": "Missing API key. Send it in the X-Api-Key header."\n  }\n}',
          },
        ],
      },
    ],
  },

  authentification: {
    title: "Authentification",
    tagline: "Gestion libre-service des clés zk_live_ / zk_test_, scopes granulaires, RBAC entreprise et tiers de débit.",
    sections: [
      {
        heading: "Portail développeur (session utilisateur JWT)",
        intro: "Les clés API se créent et se pilotent depuis votre espace Développeur sur ZekoraPay App ou ZekoraPay Pro (ou directement via les routes /v1/developer avec votre jeton de session Bearer JWT).",
        endpoints: [
          { method: "GET", path: "/v1/developer/overview", description: "Statut KYC/KYB, plan tarifaire, quota req/min et droits API de votre compte." },
          { method: "GET", path: "/v1/developer/keys", description: "Liste vos clés API personnelles ou de votre entreprise." },
          { method: "POST", path: "/v1/developer/keys", description: "Crée une nouvelle clé (zk_live_ ou zk_test_) ; retourne la clé complète une seule fois." },
          { method: "PATCH", path: "/v1/developer/keys/:id", description: "Modifie le nom, les scopes, la liste blanche d'IP, l'URL webhook ou effectue une rotation du secret webhook." },
          { method: "POST", path: "/v1/developer/keys/:id/rotate", description: "Génère une nouvelle valeur secrète de clé API en conservant la configuration." },
          { method: "DELETE", path: "/v1/developer/keys/:id", description: "Révoque immédiatement une clé API." },
          { method: "GET", path: "/v1/developer/keys/:id/logs", description: "Consulte l'historique paginé des appels API effectués avec cette clé." },
          { method: "GET", path: "/v1/developer/keys/:id/usage", description: "Statistiques quotidiennes d'utilisation et taux d'erreur (paramètre days=1..90)." },
          { method: "GET", path: "/v1/developer/keys/:id/deliveries", description: "Journal des livraisons et tentatives de webhooks pour cette clé." },
          { method: "POST", path: "/v1/developer/keys/:id/webhook/test", description: "Envoie un événement test.ping signé vers l'URL webhook configurée." },
          { method: "POST", path: "/v1/developer/deliveries/:id/redeliver", description: "Rejoue manuellement une livraison webhook depuis les logs." },
        ],
        code: [
          {
            label: "Créer une clé — requête",
            lang: "json",
            content:
              "POST https://api.zekorapay.com/v1/developer/keys\nAuthorization: Bearer <votre_jeton_session_jwt>\n\n{\n  \"name\": \"Intégration Checkout Pro\",\n  \"owner_type\": \"enterprise\",\n  \"enterprise_id\": \"ent_...\",\n  \"environment\": \"live\",\n  \"permissions\": [\"payments:read\", \"payments:write\", \"wallets:read\"],\n  \"allowed_ips\": [\"203.0.113.10/32\"],\n  \"webhook_url\": \"https://votre-domaine.com/webhooks/zekorapay\",\n  \"webhook_events\": [\"payment.received\", \"payment.request.cancelled\"]\n}",
          },
        ],
      },
      {
        heading: "Utiliser votre clé sur /v1/*",
        intro: "Transmettez votre clé dans l'en-tête X-Api-Key (recommandé) ou via Authorization: Bearer. N'envoyez jamais votre clé dans l'URL (?api_key=...), ces requêtes sont rejetées avec une erreur 400. Pour des raisons de rétrocompatibilité, les anciennes clés préfixées cb_live_ et cb_test_ restent acceptées.",
        code: [
          { label: "En-tête recommandé", lang: "http", content: "X-Api-Key: zk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
          { label: "Alternative Bearer", lang: "http", content: "Authorization: Bearer zk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
        ],
      },
      {
        heading: "Environnements, quotas et sécurité",
        bullets: [
          "zk_live_... (Production) : opère sur les données et règlements réels ; exige KYC validé (particulier) ou KYB vérifié (entreprise).",
          "zk_test_... (Sandbox) : simulation isolée sans impact sur les soldes ; fonctionne même avant validation KYC/KYB (sauf entreprise suspendue).",
          "Maximum 20 clés actives par propriétaire et jusqu'à 50 adresses IP ou plages CIDR autorisées par clé, avec date d'expiration optionnelle.",
          "RBAC Entreprise : un employé ne peut accorder ou conserver sur une clé entreprise que les scopes API couverts par ses permissions d'accès (can_manage_admins débloque tous les scopes entreprise).",
        ],
      },
      {
        heading: "Permissions (scopes)",
        intro: "Il n'existe aucun scope joker (*) : chaque clé doit déclarer explicitement les permissions nécessaires. Les scopes :write impliquent automatiquement la lecture (:read) sur la même ressource.",
        bullets: [
          "payments:read / payments:write — demandes de paiement marchands, QR, historique et simulation sandbox (particulier & entreprise).",
          "wallets:read — consultation des portefeuilles, soldes et transactions (particulier & entreprise).",
          "exchange:read — taux de change en direct, marchés crypto et calculateur de conversion (particulier & entreprise, live & sandbox).",
          "shop:read / shop:write — boutiques, produits, catégories et gestion des commandes (particulier & entreprise).",
          "events:read / events:write — événements, statistiques et contrôle d'entrée des billets (particulier & entreprise).",
          "donations:read / donations:write — campagnes de dons et suivi des contributions (particulier & entreprise).",
          "delivery:read / delivery:write — corridors de livraison, expéditions, suivi public et flotte entreprise (particulier & entreprise).",
          "billing:read / billing:write — factures B2B et abonnements récurrents (entreprise uniquement).",
          "enterprise:read — métadonnées et plan de l'entreprise propriétaire (entreprise uniquement).",
          "users:read — profil du compte particulier (particulier uniquement).",
        ],
      },
      {
        heading: "Limites de débit",
        intro: "Les requêtes authentifiées appliquent le quota par minute associé au plan du propriétaire (ou à l'override administrateur). Les requêtes non authentifiées ou avec clé invalide sont limitées à 120 req/min par adresse IP.",
        bullets: [
          "free — 60 req/min",
          "basic — 300 req/min",
          "standard — 1 000 req/min",
          "premium — 5 000 req/min",
          "enterprise — 20 000 req/min",
        ],
      },
      {
        heading: "Codes d'erreur courants",
        bullets: [
          "400 key_in_url / invalid_request_error — clé passée dans la query string ou corps JSON invalide.",
          "401 missing_api_key / invalid_api_key / revoked_api_key / expired_api_key — clé absente, invalide, révoquée ou expirée.",
          "403 insufficient_permissions / ip_not_allowed / kyc_required / kyb_required / insufficient_member_permissions — scope manquant, IP refusée, vérification requise ou droits employé retirés.",
          "429 rate_limit_exceeded / ip_rate_limit_exceeded — quota par minute atteint.",
        ],
      },
    ],
  },

  paiements: {
    title: "Paiements marchands",
    tagline: "Créez, modifiez, mettez en pause et encaissez des demandes de paiement par QR code ou lien, avec mode Sandbox complet.",
    sections: [
      {
        heading: "Comment fonctionne l'encaissement",
        intro: "Votre serveur crée une demande de paiement (montant fixe ou variable) via POST /v1/payments/requests et reçoit un identifiant, un lien de paiement et les données du QR code. Le client final valide le paiement depuis l'app ZekoraPay avec son code PIN, puis vous recevez la notification payment.received sur votre webhook.",
        endpoints: [
          { method: "POST", path: "/v1/payments/requests", scope: "payments:write", description: "Crée une demande de paiement (fixed ou variable) ; supporte Idempotency-Key." },
          { method: "GET", path: "/v1/payments/requests", scope: "payments:read", description: "Liste vos demandes de paiement." },
          { method: "GET", path: "/v1/payments/requests/overview", scope: "payments:read", description: "Vue agrégée et indicateurs de vos encaissements marchands." },
          { method: "GET", path: "/v1/payments/requests/history", scope: "payments:read", description: "Historique des paiements reçus sur l'ensemble de vos demandes." },
          { method: "GET", path: "/v1/payments/requests/:id", scope: "payments:read", description: "Détails et statut d'une demande de paiement." },
          { method: "PATCH", path: "/v1/payments/requests/:id", scope: "payments:write", description: "Met à jour les paramètres autorisés d'une demande de paiement." },
          { method: "POST", path: "/v1/payments/requests/:id/pause", scope: "payments:write", description: "Met temporairement en pause les encaissements sur cette demande." },
          { method: "POST", path: "/v1/payments/requests/:id/resume", scope: "payments:write", description: "Réactive une demande mise en pause." },
          { method: "GET", path: "/v1/payments/requests/:id/qr", scope: "payments:read", description: "Récupère le QR code PNG (base64) et le lien de paiement." },
          { method: "GET", path: "/v1/payments/requests/:id/payments", scope: "payments:read", description: "Liste les paiements complétés pour cette demande précise." },
          { method: "DELETE", path: "/v1/payments/requests/:id", scope: "payments:write", description: "Annule une demande (émet le webhook payment.request.cancelled)." },
        ],
        code: [
          {
            label: "Créer une demande de paiement — cURL",
            lang: "bash",
            content:
              "curl -X POST https://api.zekorapay.com/v1/payments/requests \\\n  -H \"X-Api-Key: zk_live_xxxxxxxxxxxxxxxx\" \\\n  -H \"Idempotency-Key: cmd_2026_0042\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"type\": \"fixed\",\n    \"amount\": 50000,\n    \"currency\": \"XAF\",\n    \"title\": \"Commande #2026-0042\",\n    \"reference\": \"INV-2026-0042\"\n  }'",
          },
        ],
      },
      {
        heading: "Simuler un paiement en Sandbox (zk_test_)",
        intro: "Avec une clé zk_test_, les demandes créées portent un identifiant pr_test_... et un lien hébergé https://app.zekorapay.com/pay/pr_test_... sans toucher de solde réel. Vous pouvez déclencher le règlement simulé et le webhook payment.received (livemode: false) soit depuis l'interface de paiement sandbox, soit par appel API.",
        endpoints: [
          { method: "POST", path: "/v1/sandbox/payments/requests/:id/pay", scope: "payments:write", description: "Simule le paiement client d'une demande sandbox (clé zk_test_ uniquement)." },
        ],
        code: [
          {
            label: "Simuler un paiement sandbox — cURL",
            lang: "bash",
            content:
              "curl -X POST https://api.zekorapay.com/v1/sandbox/payments/requests/pr_test_123456/pay \\\n  -H \"X-Api-Key: zk_test_xxxxxxxxxxxxxxxx\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"customer_id\": \"usr_sandbox_demo\"}'",
          },
        ],
      },
    ],
  },

  portefeuilles: {
    title: "Portefeuilles",
    tagline: "Consultation sécurisée en lecture seule des portefeuilles, soldes et journaux de transactions.",
    sections: [
      {
        heading: "Endpoints disponibles",
        intro: "Les clés API disposent d'un accès en lecture seule (wallets:read) sur les portefeuilles du propriétaire. L'isolation multi-tenant empêche une clé personnelle d'accéder aux portefeuilles d'une entreprise. Aucune opération de débit, dépôt ou virement direct n'est exposée sur l'API publique afin de garantir que toute sortie de fonds soit autorisée par le code PIN dans l'application.",
        endpoints: [
          { method: "GET", path: "/v1/wallets", scope: "wallets:read", description: "Liste les portefeuilles du compte particulier ou de l'entreprise." },
          { method: "GET", path: "/v1/wallets/:id", scope: "wallets:read", description: "Détails d'un portefeuille personnel (clé particulier uniquement)." },
          { method: "GET", path: "/v1/wallets/:id/balance", scope: "wallets:read", description: "Solde courant d'un portefeuille personnel (clé particulier uniquement)." },
          { method: "GET", path: "/v1/wallets/:id/transactions", scope: "wallets:read", description: "Historique des transactions d'un portefeuille (particulier & entreprise)." },
          { method: "GET", path: "/v1/transactions", scope: "wallets:read", description: "Liste globale des transactions du compte personnel (clé particulier uniquement)." },
        ],
      },
    ],
  },

  facturation: {
    title: "Facturation Entreprise",
    tagline: "Automatisez l'émission de factures B2B, relances clients et abonnements récurrents depuis ZekoraPay Pro.",
    sections: [
      {
        heading: "Factures et abonnements (Entreprises uniquement)",
        intro: "Ces endpoints requièrent une clé API d'entreprise (owner_type: enterprise) et les permissions billing:read / billing:write. Ils ne sont pas accessibles aux clés personnelles.",
        endpoints: [
          { method: "GET", path: "/v1/invoices", scope: "billing:read", description: "Liste les factures émises par votre entreprise." },
          { method: "POST", path: "/v1/invoices", scope: "billing:write", description: "Crée une facture client associée à votre entreprise." },
          { method: "POST", path: "/v1/invoices/:id/send", scope: "billing:write", description: "Envoie la facture au destinataire." },
          { method: "POST", path: "/v1/invoices/:id/cancel", scope: "billing:write", description: "Annule une facture existante." },
          { method: "POST", path: "/v1/invoices/:id/remind", scope: "billing:write", description: "Envoie un rappel de paiement au client." },
          { method: "GET", path: "/v1/subscriptions", scope: "billing:read", description: "Liste les abonnements actifs de votre entreprise." },
          { method: "POST", path: "/v1/subscriptions", scope: "billing:write", description: "Crée un nouvel abonnement récurrent." },
          { method: "GET", path: "/v1/subscriptions/:id", scope: "billing:read", description: "Détails d'un abonnement." },
          { method: "DELETE", path: "/v1/subscriptions/:id", scope: "billing:write", description: "Résilie un abonnement." },
        ],
        code: [
          {
            label: "Créer une facture entreprise — cURL",
            lang: "bash",
            content:
              "curl -X POST https://api.zekorapay.com/v1/invoices \\\n  -H \"X-Api-Key: zk_live_entreprise_xxxxxxxx\" \\\n  -H \"Idempotency-Key: inv_2026_091\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"client_name\": \"Client SARL\",\n    \"client_email\": \"finance@client.cm\",\n    \"currency\": \"XAF\",\n    \"items\": [{\"description\": \"Abonnement annuel SaaS\", \"quantity\": 1, \"unit_price\": 150000}]\n  }'",
          },
        ],
      },
    ],
  },

  livraison: {
    title: "Livraison & Logistique",
    tagline: "Découvrez les corridors de transport, créez des expéditions, suivez les colis et consultez votre flotte.",
    sections: [
      {
        heading: "Corridors, expéditions et suivi",
        intro: "Les endpoints de découverte des transporteurs et de suivi par numéro de tracking fonctionnent à la fois avec des clés live et sandbox.",
        endpoints: [
          { method: "GET", path: "/v1/delivery/providers", scope: "delivery:read", description: "Liste les prestataires et corridors logistiques disponibles (live & sandbox)." },
          { method: "GET", path: "/v1/delivery/track/:tracking_number", scope: "delivery:read", description: "Suit l'acheminement d'un colis via son numéro de tracking (live & sandbox)." },
          { method: "GET", path: "/v1/delivery/shipments", scope: "delivery:read", description: "Liste les expéditions créées par votre compte ou entreprise." },
          { method: "POST", path: "/v1/delivery/shipments", scope: "delivery:write", description: "Crée une nouvelle commande d'expédition." },
          { method: "GET", path: "/v1/delivery/fleet", scope: "delivery:read", description: "Consulte les livreurs et corridors de la flotte logistique (entreprise uniquement)." },
        ],
        code: [
          {
            label: "Suivre un colis — cURL",
            lang: "bash",
            content:
              "curl -X GET https://api.zekorapay.com/v1/delivery/track/ZK-TRK-2026001 \\\n  -H \"X-Api-Key: zk_live_xxxxxxxxxxxxxxxx\"",
          },
        ],
      },
    ],
  },

  boutique: {
    title: "Boutique e-commerce",
    tagline: "Synchronisez vos boutiques, produits, stocks, catégories et statuts de commandes.",
    sections: [
      {
        heading: "Boutiques et catalogue",
        endpoints: [
          { method: "GET", path: "/v1/shop", scope: "shop:read", description: "Liste les boutiques appartenant au titulaire ou à l'entreprise." },
          { method: "GET", path: "/v1/shop/:id", scope: "shop:read", description: "Détails d'une boutique." },
          { method: "GET", path: "/v1/shop/:id/products", scope: "shop:read", description: "Liste les produits d'une boutique." },
          { method: "POST", path: "/v1/shop/:id/products", scope: "shop:write", description: "Ajoute un nouveau produit dans la boutique." },
          { method: "GET", path: "/v1/shop/:id/products/:pid", scope: "shop:read", description: "Détails d'un produit." },
          { method: "PUT", path: "/v1/shop/:id/products/:pid", scope: "shop:write", description: "Met à jour un produit existant." },
          { method: "DELETE", path: "/v1/shop/:id/products/:pid", scope: "shop:write", description: "Supprime un produit." },
          { method: "GET", path: "/v1/shop/:id/categories", scope: "shop:read", description: "Liste les catégories de la boutique." },
        ],
      },
      {
        heading: "Commandes clients",
        endpoints: [
          { method: "GET", path: "/v1/shop/:id/orders", scope: "shop:read", description: "Liste les commandes d'une boutique." },
          { method: "GET", path: "/v1/shop/:id/orders/:oid", scope: "shop:read", description: "Détails d'une commande." },
          { method: "PUT", path: "/v1/shop/:id/orders/:oid/status", scope: "shop:write", description: "Met à jour le statut d'une commande (préparation, expédition, livraison…)." },
        ],
      },
    ],
  },

  evenements: {
    title: "Événements et billetterie",
    tagline: "Consultez vos événements, statistiques de vente et validez les billets à l'entrée avec isolation par organisateur.",
    sections: [
      {
        heading: "Événements et statistiques",
        endpoints: [
          { method: "GET", path: "/v1/events", scope: "events:read", description: "Liste vos événements (personnels ou de votre entreprise)." },
          { method: "GET", path: "/v1/events/:id", scope: "events:read", description: "Détails d'un événement." },
          { method: "GET", path: "/v1/events/:id/tickets", scope: "events:read", description: "Liste les billets émis pour cet événement." },
          { method: "GET", path: "/v1/events/:id/stats", scope: "events:read", description: "Statistiques de ventes et de scans de l'événement." },
        ],
      },
      {
        heading: "Contrôle d'accès et validation des billets",
        intro: "Utilisez de préférence les routes scopées sous /v1/events/:id/tickets/* : la passerelle vérifie systématiquement que le billet appartient bien à un événement du titulaire de la clé API.",
        endpoints: [
          { method: "POST", path: "/v1/events/:id/tickets/verify", scope: "events:write", description: "Vérifie la validité d'un billet pour cet événement précis." },
          { method: "POST", path: "/v1/events/:id/tickets/:tid/use", scope: "events:write", description: "Valide l'entrée et marque le billet comme utilisé." },
          { method: "POST", path: "/v1/events/tickets/verify", scope: "events:write", description: "Vérifie un billet (avec contrôle d'appartenance à l'organisateur)." },
          { method: "POST", path: "/v1/events/tickets/:id/use", scope: "events:write", description: "Marque un billet comme utilisé (avec contrôle d'appartenance)." },
        ],
      },
    ],
  },

  dons: {
    title: "Dons et campagnes",
    tagline: "Créez, mettez à jour et suivez vos campagnes de financement participatif et de solidarité.",
    sections: [
      {
        heading: "Campagnes et contributions reçues",
        endpoints: [
          { method: "GET", path: "/v1/donations/campaigns", scope: "donations:read", description: "Liste les campagnes de dons de votre compte ou entreprise." },
          { method: "POST", path: "/v1/donations/campaigns", scope: "donations:write", description: "Crée une nouvelle campagne de collecte." },
          { method: "GET", path: "/v1/donations/campaigns/:id", scope: "donations:read", description: "Détails d'une campagne." },
          { method: "PUT", path: "/v1/donations/campaigns/:id", scope: "donations:write", description: "Met à jour une campagne." },
          { method: "POST", path: "/v1/donations/campaigns/:id/cancel", scope: "donations:write", description: "Annule une campagne de dons." },
          { method: "GET", path: "/v1/donations/campaigns/:id/donations", scope: "donations:read", description: "Liste les contributions enregistrées sur la campagne." },
        ],
      },
    ],
  },

  change: {
    title: "Change et marchés",
    tagline: "Taux de change en temps réel, marchés disponibles et calculateur de conversion multi-devises & crypto.",
    sections: [
      {
        heading: "Données de marché et conversion",
        intro: "Tous les endpoints /v1/exchange/* utilisent la permission exchange:read et fonctionnent aussi bien avec des clés live (zk_live_) que sandbox (zk_test_). L'exécution d'ordres financiers réels reste réservée à l'application ZekoraPay.",
        endpoints: [
          { method: "GET", path: "/v1/exchange/rates", scope: "exchange:read", description: "Liste des taux de change disponibles." },
          { method: "GET", path: "/v1/exchange/rates/:from/:to", scope: "exchange:read", description: "Taux courant entre deux devises ou actifs (ex. EUR/XAF, USDT/XOF)." },
          { method: "GET", path: "/v1/exchange/markets", scope: "exchange:read", description: "Paires et marchés disponibles." },
          { method: "POST", path: "/v1/exchange/convert", scope: "exchange:read", description: "Calcule un devis de conversion entre deux devises." },
        ],
      },
    ],
  },

  utilisateurs: {
    title: "Identité et compte",
    tagline: "Consultez les métadonnées du compte particulier ou de l'espace entreprise associé à votre clé API.",
    sections: [
      {
        heading: "Profil du titulaire de la clé",
        intro: "Chaque endpoint d'identité applique une séparation stricte entre clés personnelles et clés d'entreprise.",
        endpoints: [
          { method: "GET", path: "/v1/me", scope: "users:read", description: "Retourne le profil du compte personnel propriétaire de la clé (clé particulier uniquement)." },
          { method: "GET", path: "/v1/users/profile", scope: "users:read", description: "Alias de /v1/me pour la lecture du profil personnel (clé particulier uniquement)." },
          { method: "GET", path: "/v1/enterprise", scope: "enterprise:read", description: "Retourne le profil, le statut KYB et le plan de l'entreprise (clé entreprise uniquement)." },
        ],
      },
    ],
  },

  webhooks: {
    title: "Webhooks",
    tagline: "Recevez les confirmations de paiement en temps réel avec signature horodatée Zekorapay-Signature et rejeu contrôlé.",
    sections: [
      {
        heading: "Configuration, test et rejeu",
        intro: "Vous pouvez définir ou modifier votre webhook_url (HTTPS public obligatoire) et la liste des événements écoutés à tout moment sans révoquer votre clé API.",
        bullets: [
          "PATCH /v1/developer/keys/:id — met à jour webhook_url, webhook_events ou déclenche la rotation du secret (rotate_webhook_secret: true).",
          "POST /v1/developer/keys/:id/webhook/test — émet immédiatement un événement test.ping.",
          "GET /v1/developer/keys/:id/deliveries — consulte l'historique, les codes HTTP retournés et la prochaine tentative.",
          "POST /v1/developer/deliveries/:id/redeliver — relance une livraison échouée.",
        ],
      },
      {
        heading: "Événements disponibles",
        bullets: [
          "payment.received — une demande de paiement marchand (live ou sandbox) a été réglée par le client.",
          "payment.request.cancelled — une demande de paiement a été annulée (DELETE /v1/payments/requests/:id).",
          "test.ping — événement de vérification déclenché depuis le portail ou l'endpoint /webhook/test.",
        ],
      },
      {
        heading: "Vérifier la signature HMAC-SHA256",
        intro: "Chaque requête POST inclut les en-têtes Zekorapay-Signature (t=<timestamp unix>,v1=<signature hex>), Zekorapay-Event, Zekorapay-Delivery et User-Agent: Zekorapay-Webhooks/2.0. Le HMAC est calculé sur la chaîne « <t>.<corps brut JSON> » afin d'empêcher les attaques par rejeu (rejetez les timestamps vieux de plus de 5 minutes).",
        code: [
          {
            label: "En-têtes reçus",
            lang: "http",
            content:
              "Zekorapay-Signature: t=1764291200,v1=8c4f1d2e9b...\nZekorapay-Event: payment.received\nZekorapay-Delivery: whd_0123456789abcdef\nUser-Agent: Zekorapay-Webhooks/2.0",
          },
          {
            label: "Node.js",
            lang: "javascript",
            content:
              "const crypto = require('crypto');\n\nfunction verifyZekoraSignature(rawBody, signatureHeader, webhookSecret, toleranceSec = 300) {\n  const parts = Object.fromEntries(\n    String(signatureHeader || '').split(',').map((kv) => kv.split('=', 2))\n  );\n  if (!parts.t || !parts.v1) return false;\n\n  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(parts.t));\n  if (Number.isNaN(age) || age > toleranceSec) return false;\n\n  const expected = crypto\n    .createHmac('sha256', webhookSecret)\n    .update(`${parts.t}.${rawBody}`)\n    .digest('hex');\n\n  const a = Buffer.from(expected, 'hex');\n  const b = Buffer.from(parts.v1, 'hex');\n  return a.length === b.length && crypto.timingSafeEqual(a, b);\n}",
          },
          {
            label: "Python",
            lang: "python",
            content:
              "import hashlib, hmac, time\n\ndef verify_zekora_signature(raw_body: bytes, signature_header: str, secret: str, tolerance: int = 300) -> bool:\n    parts = dict(item.split('=', 1) for item in signature_header.split(',') if '=' in item)\n    ts, v1 = parts.get('t'), parts.get('v1')\n    if not ts or not v1 or abs(int(time.time()) - int(ts)) > tolerance:\n        return False\n    signed_payload = f\"{ts}.\".encode() + raw_body\n    expected = hmac.new(secret.encode(), signed_payload, hashlib.sha256).hexdigest()\n    return hmac.compare_digest(expected, v1)",
          },
          {
            label: "Exemple de payload",
            lang: "json",
            content:
              '{\n  "id": "evt_019372a8bc1f",\n  "type": "payment.received",\n  "created": 1764291200,\n  "livemode": true,\n  "data": {\n    "payment_id": "pr_live_8a9f21",\n    "merchant_id": "ent_6b04500c",\n    "customer_id": "usr_9120ab",\n    "amount": 50000,\n    "currency": "XAF",\n    "title": "Commande #2026-0042"\n  }\n}',
          },
        ],
      },
      {
        heading: "Politique de retry et sécurité réseau",
        bullets: [
          "6 tentatives automatiques en cas d'échec ou de code non-2xx : 1 min, 5 min, 30 min, 2 h, 6 h puis 12 h.",
          "Timeout de connexion de 5 s et timeout de réponse de 10 s ; les redirections HTTP ne sont pas suivies.",
          "Protection anti-SSRF : seule une adresse https:// publique est acceptée ; localhost, IP privées et résolutions internes sont bloquées à la connexion.",
        ],
      },
    ],
  },
};
