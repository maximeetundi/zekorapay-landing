// English API documentation — mirrors translations/fr.ts.
import type { LocalizedDoc } from "./fr";

export const en: Record<string, LocalizedDoc> = {
  introduction: {
    title: "Introduction",
    tagline: "Integrate ZekoraPay directly into your own systems.",
    sections: [
      {
        heading: "Overview",
        intro: "The ZekoraPay public API lets partners (e-commerce sites, ERPs, management applications) integrate our services: wallets, QR-code merchant payments, exchange, shop, donations, events and more. It's distinct from the user guide, which covers using the application itself.",
        code: [
          { label: "Base URL", lang: "text", content: "https://api.app.zekorapay.com/public-api-gateway/v1" },
        ],
      },
      {
        heading: "Response format",
        bullets: [
          "All requests and responses are JSON (Content-Type: application/json).",
          "Every call must go through API key authentication — see the Authentication page.",
          "A sandbox environment is available to test your integration without moving real funds.",
        ],
      },
    ],
  },

  authentification: {
    title: "Authentication",
    tagline: "API keys, environments, scopes and rate limits.",
    sections: [
      {
        heading: "Getting an API key",
        intro: "Keys are created self-service from your own user session (JWT) — no key is needed to create your first one.",
        endpoints: [
          { method: "POST", path: "/developer/keys", description: "Creates a new API key for your account." },
          { method: "GET", path: "/developer/keys", description: "Lists your API keys." },
          { method: "DELETE", path: "/developer/keys/:id", description: "Revokes one of your keys." },
          { method: "GET", path: "/developer/logs", description: "Views request logs for one of your keys." },
          { method: "GET", path: "/developer/sandbox/token", description: "Gets a temporary token to test in the sandbox environment." },
        ],
        code: [
          {
            label: "Create a key — request",
            lang: "json",
            content:
              "POST /developer/keys\nAuthorization: Bearer <your_session_token>\n\n{\n  \"name\": \"Shop integration\",\n  \"environment\": \"live\",\n  \"permissions\": [\"payments:read\", \"payments:write\", \"wallets:read\"],\n  \"rate_limit\": \"basic\",\n  \"webhook_url\": \"https://your-domain.com/webhooks/zekorapay\"\n}",
          },
        ],
      },
      {
        heading: "Using your key",
        intro: "Pass your key via the X-Api-Key header (recommended) or via Authorization: Bearer.",
        code: [
          { label: "Recommended header", lang: "http", content: "X-Api-Key: cb_live_xxxxxxxxxxxxxxxx" },
          { label: "Alternative", lang: "http", content: "Authorization: Bearer cb_live_xxxxxxxxxxxxxxxx" },
        ],
      },
      {
        heading: "Environments",
        bullets: [
          "live — keys prefixed cb_ or sk_, real fund movements.",
          "sandbox — to test your integration without real money; get a token via GET /developer/sandbox/token.",
        ],
      },
      {
        heading: "Permissions (scopes)",
        intro: "Each key only has access to the domains it has an explicit permission for. A read (GET) requires the :read scope, a write (POST/PUT/DELETE) requires :write. The * scope grants access to everything.",
        bullets: [
          "payments:read / payments:write — merchant QR-code payments.",
          "wallets:read / wallets:write — wallets.",
          "exchange:read / exchange:write — exchange rates, conversion, trading.",
          "shop:read / shop:write — shop, products, orders.",
          "donations:read / donations:write — donation campaigns.",
          "events:read / events:write — events and ticketing.",
          "cards:read / cards:write — cards.",
          "users:read / users:write — profiles and relationships.",
          "developer:read / developer:write — managing your own API keys.",
          "enterprise:* scopes require an account that owns or manages an enterprise.",
        ],
      },
      {
        heading: "Rate limits",
        intro: "Each key has a requests-per-minute cap based on its tier. X-RateLimit-Limit / X-RateLimit-Remaining / X-RateLimit-Window headers are returned on every response.",
        bullets: [
          "free — 60 req/min",
          "basic — 300 req/min",
          "standard — 1,000 req/min",
          "premium — 5,000 req/min",
          "enterprise — 50,000 req/min",
        ],
      },
      {
        heading: "Errors",
        code: [
          {
            label: "Error format",
            lang: "json",
            content:
              '{\n  "error": {\n    "type": "authentication_error",\n    "code": "invalid_api_key",\n    "message": "..."\n  }\n}',
          },
        ],
        bullets: [
          "401 — missing or invalid API key.",
          "403 — insufficient permission, or this key's IP allowlist doesn't include the caller.",
          "429 — rate limit exceeded (by IP or by key).",
        ],
      },
    ],
  },

  portefeuilles: {
    title: "Wallets",
    tagline: "Check balances and manage your account's wallets.",
    sections: [
      {
        heading: "Endpoints",
        endpoints: [
          { method: "POST", path: "/wallets", scope: "wallets:write", description: "Creates a new wallet." },
          { method: "GET", path: "/wallets", scope: "wallets:read", description: "Lists your wallets." },
          { method: "GET", path: "/wallets/:id", scope: "wallets:read", description: "Wallet details." },
          { method: "GET", path: "/wallets/:id/balance", scope: "wallets:read", description: "Wallet balance." },
          { method: "POST", path: "/wallets/:id/deposit", scope: "wallets:write", description: "Credits the wallet (internal to your own account)." },
          { method: "POST", path: "/wallets/:id/withdraw", scope: "wallets:write", description: "Debits the wallet (internal to your own account)." },
        ],
      },
    ],
  },

  paiements: {
    title: "Merchant payments",
    tagline: "Collect payments from your customers via QR code, without ever handling their PIN.",
    sections: [
      {
        heading: "How it works",
        intro: "You create a payment request and get back an ID plus a QR code. Your customer scans or types that code inside the ZekoraPay app and pays with their own PIN. The fund movement and PIN check happen entirely inside our app — so there's no endpoint to \"pay\" or \"submit a PIN\" from a third-party API, on purpose: the only alternative design would require your own app to collect the customer's PIN and forward it, which we don't want any integrator to have to do.",
        endpoints: [
          { method: "POST", path: "/payments/requests", scope: "payments:write", description: "Creates a payment request." },
          { method: "GET", path: "/payments/requests", scope: "payments:read", description: "Lists your payment requests." },
          { method: "GET", path: "/payments/requests/history", scope: "payments:read", description: "Payment history." },
          { method: "GET", path: "/payments/requests/:id", scope: "payments:read", description: "Request details." },
          { method: "GET", path: "/payments/requests/:id/qr", scope: "payments:read", description: "The request's QR code." },
          { method: "DELETE", path: "/payments/requests/:id", scope: "payments:write", description: "Cancels a request." },
          { method: "POST", path: "/payments/quick", scope: "payments:write", description: "Creates a quick payment request (simplified flow)." },
        ],
      },
      {
        heading: "Getting notified of a payment",
        intro: "Set a webhook_url when creating your API key to receive the payment.received event as soon as a customer pays — see the Webhooks page — instead of polling GET /payments/requests/:id.",
      },
    ],
  },

  change: {
    title: "Exchange and crypto trading",
    tagline: "Exchange rates, conversion, and buy/sell operations.",
    sections: [
      {
        heading: "Market data",
        endpoints: [
          { method: "GET", path: "/exchange/rates", scope: "exchange:read", description: "Lists available exchange rates." },
          { method: "GET", path: "/exchange/rates/:from/:to", scope: "exchange:read", description: "Rate between two currencies/assets." },
          { method: "GET", path: "/exchange/markets", scope: "exchange:read", description: "Available markets." },
          { method: "POST", path: "/exchange/convert", scope: "exchange:write", description: "Simulates a conversion." },
        ],
      },
      {
        heading: "Exchange operations",
        endpoints: [
          { method: "POST", path: "/exchange/quotes", scope: "exchange:write", description: "Requests a quote for an exchange operation." },
          { method: "POST", path: "/exchange/exchanges", scope: "exchange:write", description: "Executes an exchange from a quote." },
          { method: "GET", path: "/exchange/exchanges/:id", scope: "exchange:read", description: "Looks up a completed exchange." },
        ],
      },
      {
        heading: "Quick buy / sell",
        intro: "Instant crypto ↔ fiat conversion against the caller's own wallet.",
        endpoints: [
          { method: "POST", path: "/exchange/buy", scope: "exchange:write", description: "Buys an asset." },
          { method: "POST", path: "/exchange/sell", scope: "exchange:write", description: "Sells an asset." },
        ],
      },
    ],
  },

  boutique: {
    title: "Shop",
    tagline: "Manage your shops, products, orders and reviews.",
    sections: [
      {
        heading: "Shops",
        endpoints: [
          { method: "GET", path: "/shop", scope: "shop:read", description: "Lists your shops." },
          { method: "POST", path: "/shop", scope: "shop:write", description: "Creates a shop." },
          { method: "GET", path: "/shop/:id", scope: "shop:read", description: "Shop details." },
          { method: "PUT", path: "/shop/:id", scope: "shop:write", description: "Updates a shop." },
          { method: "DELETE", path: "/shop/:id", scope: "shop:write", description: "Deletes a shop." },
        ],
      },
      {
        heading: "Products, orders, categories, reviews",
        endpoints: [
          { method: "GET", path: "/shop/:id/products", scope: "shop:read", description: "Lists products." },
          { method: "POST", path: "/shop/:id/products", scope: "shop:write", description: "Adds a product." },
          { method: "GET", path: "/shop/:id/orders", scope: "shop:read", description: "Lists orders." },
          { method: "POST", path: "/shop/:id/orders", scope: "shop:write", description: "Creates an order." },
          { method: "GET", path: "/shop/:id/categories", scope: "shop:read", description: "Lists categories." },
          { method: "GET", path: "/shop/:id/reviews", scope: "shop:read", description: "Lists reviews." },
        ],
      },
    ],
  },

  dons: {
    title: "Donations and campaigns",
    tagline: "Create and manage fundraising campaigns.",
    sections: [
      {
        heading: "Campaigns",
        endpoints: [
          { method: "POST", path: "/donations/campaigns", scope: "donations:write", description: "Creates a campaign." },
          { method: "GET", path: "/donations/campaigns", scope: "donations:read", description: "Lists campaigns." },
          { method: "GET", path: "/donations/campaigns/:id", scope: "donations:read", description: "Campaign details." },
          { method: "PUT", path: "/donations/campaigns/:id", scope: "donations:write", description: "Updates a campaign." },
          { method: "GET", path: "/donations/campaigns/enterprise/:enterpriseId", scope: "donations:read", description: "An enterprise's campaigns." },
          { method: "POST", path: "/donations/campaigns/:id/cancel", scope: "donations:write", description: "Cancels a campaign." },
          { method: "GET", path: "/donations/campaigns/:id/wallet", scope: "donations:read", description: "The campaign's wallet." },
          { method: "POST", path: "/donations/campaigns/:id/payout", scope: "donations:write", description: "Withdraws collected funds." },
        ],
      },
      {
        heading: "Donations",
        endpoints: [
          { method: "POST", path: "/donations", scope: "donations:write", description: "Records a donation." },
          { method: "GET", path: "/donations", scope: "donations:read", description: "Lists donations." },
          { method: "POST", path: "/donations/:id/refund", scope: "donations:write", description: "Refunds a donation." },
        ],
      },
    ],
  },

  evenements: {
    title: "Events and ticketing",
    tagline: "Create events and manage ticket sales.",
    sections: [
      {
        heading: "Events",
        endpoints: [
          { method: "GET", path: "/events", scope: "events:read", description: "Lists your events." },
          { method: "POST", path: "/events", scope: "events:write", description: "Creates an event." },
          { method: "GET", path: "/events/active", scope: "events:read", description: "Active events." },
          { method: "GET", path: "/events/code/:code", scope: "events:read", description: "Looks up an event by its unique code." },
          { method: "GET", path: "/events/:id", scope: "events:read", description: "Event details." },
          { method: "PUT", path: "/events/:id", scope: "events:write", description: "Updates an event." },
          { method: "DELETE", path: "/events/:id", scope: "events:write", description: "Deletes an event." },
          { method: "POST", path: "/events/:id/publish", scope: "events:write", description: "Publishes the event." },
          { method: "POST", path: "/events/:id/cancel", scope: "events:write", description: "Cancels the event (automatic refunds)." },
          { method: "GET", path: "/events/:id/stats", scope: "events:read", description: "Sales statistics." },
          { method: "POST", path: "/events/:id/payout", scope: "events:write", description: "Withdraws collected funds." },
        ],
      },
      {
        heading: "Tickets",
        endpoints: [
          { method: "POST", path: "/events/tickets/purchase", scope: "events:write", description: "Purchases a ticket." },
          { method: "GET", path: "/events/tickets", scope: "events:read", description: "Lists tickets." },
          { method: "GET", path: "/events/tickets/:id", scope: "events:read", description: "Ticket details." },
          { method: "POST", path: "/events/tickets/verify", scope: "events:write", description: "Verifies a ticket (entry check)." },
          { method: "POST", path: "/events/tickets/:id/use", scope: "events:write", description: "Marks a ticket as used." },
          { method: "POST", path: "/events/tickets/:id/refund", scope: "events:write", description: "Refunds a ticket." },
        ],
      },
    ],
  },

  cartes: {
    title: "Cards",
    tagline: "Managing prepaid virtual and physical cards.",
    sections: [
      {
        heading: "Endpoints",
        intro: "The cards domain is exposed under /cards with a single cards:read (GET) / cards:write (other methods) scope, rather than one endpoint per sub-feature — this part of the API is still stabilizing, so always check the exact response shape before building a critical integration on top of it.",
        endpoints: [
          { method: "GET", path: "/cards", scope: "cards:read", description: "Lists your cards." },
          { method: "POST", path: "/cards/*", scope: "cards:write", description: "Creation, activation, freezing, loading, limits, and a card's sub-resources." },
        ],
      },
    ],
  },

  utilisateurs: {
    title: "Users",
    tagline: "Profile, search and relationships (contacts, blocking).",
    sections: [
      {
        heading: "Profile",
        endpoints: [
          { method: "GET", path: "/users/profile", scope: "users:write", description: "Your profile." },
          { method: "PUT", path: "/users/profile", scope: "users:write", description: "Updates your profile." },
        ],
      },
      {
        heading: "Search and public profiles",
        endpoints: [
          { method: "GET", path: "/users/search", scope: "users:read", description: "Searches for users." },
          { method: "GET", path: "/users/:id", scope: "users:read", description: "A user's public profile." },
        ],
      },
      {
        heading: "Relationships",
        endpoints: [
          { method: "GET", path: "/users/relationships/contacts", scope: "users:write", description: "Lists your contacts." },
          { method: "POST", path: "/users/relationships/contacts", scope: "users:write", description: "Adds a contact." },
          { method: "POST", path: "/users/relationships/contacts/sync", scope: "users:write", description: "Syncs your contact list." },
          { method: "GET", path: "/users/relationships/blocked", scope: "users:write", description: "Lists blocked users." },
          { method: "POST", path: "/users/relationships/blocked", scope: "users:write", description: "Blocks a user." },
        ],
      },
    ],
  },

  webhooks: {
    title: "Webhooks",
    tagline: "Get notified in real time instead of polling the API.",
    sections: [
      {
        heading: "Setup",
        intro: "Set a webhook_url (HTTPS required) when creating your API key. There's no update endpoint: revoke the key and create a new one to change the URL.",
      },
      {
        heading: "Available event",
        bullets: [
          "payment.received — a merchant payment request created via the API was paid by the customer.",
        ],
      },
      {
        heading: "Verifying the signature",
        intro: "Every webhook request is signed with HMAC SHA256 using your webhook secret, in the X-Zekorapay-Signature header.",
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
        heading: "Reliability",
        bullets: [
          "3 delivery attempts with backoff on failure.",
          "Your server must respond with a 2xx status to confirm receipt.",
          "The URL must be HTTPS; any internal, private or local address is rejected.",
        ],
      },
    ],
  },
};
