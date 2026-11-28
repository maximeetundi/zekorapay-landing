// English API documentation — mirrors translations/fr.ts and matches
// services/public-api-gateway v2.1 (https://api.zekorapay.com).
import type { LocalizedDoc } from "./fr";
export type { LocalizedDoc };

export const en: Record<string, LocalizedDoc> = {
  introduction: {
    title: "Introduction",
    tagline: "Integrate the ZekoraPay REST API v2.1 (Personal & Enterprise Pro) into your apps, shops, and ERPs.",
    sections: [
      {
        heading: "Overview and entry points",
        intro: "The ZekoraPay Public API v2.1 allows partners, e-commerce stores, ERPs, and SaaS platforms to collect QR/link merchant payments, inspect wallets, manage shops, automate B2B billing, create delivery shipments, check in event tickets, and manage donation campaigns.",
        endpoints: [
          { method: "GET", path: "/health", description: "Checks public gateway health (https://api.zekorapay.com/health)." },
          { method: "GET", path: "/v1", description: "Public API v2.1 metadata, supported resources, and webhook signature format." },
          { method: "GET", path: "/openapi.json", description: "Full OpenAPI 3.1 specification served directly from the gateway." },
          { method: "GET", path: "/docs", description: "Interactive Scalar API reference to test endpoints from your browser." },
        ],
        code: [
          { label: "Base URL", lang: "text", content: "https://api.zekorapay.com/v1" },
          { label: "Interactive Reference (OpenAPI 3.1)", lang: "text", content: "https://api.zekorapay.com/docs\nhttps://api.zekorapay.com/openapi.json" },
        ],
      },
      {
        heading: "Personal vs Enterprise Pro accounts",
        intro: "Every API key belongs either to a personal account (owner_type: user) or to a ZekoraPay Pro enterprise workspace (owner_type: enterprise). The environment (live or sandbox) is determined directly by the key.",
        bullets: [
          "Live keys (zk_live_...): require verified KYC for personal accounts, or approved KYB for enterprise accounts.",
          "Sandbox keys (zk_test_...): active immediately with zero real money movement to test payment requests and webhooks end-to-end.",
          "PIN-only security boundary: outbound transfers, withdrawals, card top-ups, and payouts are intentionally never exposed over API keys — moving funds out always happens inside the ZekoraPay app with the holder's personal PIN.",
        ],
      },
      {
        heading: "Response format, idempotency & headers",
        bullets: [
          "All requests and responses use JSON (Content-Type: application/json).",
          "Send an Idempotency-Key (or X-Idempotency-Key) header on POST requests: identical retries are deduplicated for 24 hours.",
          "Every response includes X-Request-Id, X-Zekorapay-Environment (live or sandbox), and X-RateLimit-Limit / X-RateLimit-Remaining headers.",
          "Errors return a consistent structure: { \"error\": { \"type\", \"code\", \"message\" } }.",
        ],
        code: [
          {
            label: "Standard error payload",
            lang: "json",
            content:
              '{\n  "error": {\n    "type": "authentication_error",\n    "code": "invalid_api_key",\n    "message": "Missing API key. Send it in the X-Api-Key header."\n  }\n}',
          },
        ],
      },
    ],
  },

  authentification: {
    title: "Authentication",
    tagline: "Self-service zk_live_ / zk_test_ API keys, granular scopes, enterprise RBAC, and rate tiers.",
    sections: [
      {
        heading: "Developer portal (user JWT session)",
        intro: "Manage keys visually from the Developer Portal in ZekoraPay App or ZekoraPay Pro, or programmatically via /v1/developer/* using your Bearer session JWT.",
        endpoints: [
          { method: "GET", path: "/v1/developer/overview", description: "Account KYC/KYB verification status, plan tier, req/min limit, and available scopes." },
          { method: "GET", path: "/v1/developer/keys", description: "Lists personal or enterprise API keys." },
          { method: "POST", path: "/v1/developer/keys", description: "Creates a new key (zk_live_ or zk_test_); returns the full secret once." },
          { method: "PATCH", path: "/v1/developer/keys/:id", description: "Updates name, permissions, allowed_ips, webhook_url, webhook_events, or rotates webhook secret." },
          { method: "POST", path: "/v1/developer/keys/:id/rotate", description: "Rotates the API key secret while preserving settings." },
          { method: "DELETE", path: "/v1/developer/keys/:id", description: "Immediately revokes an API key." },
          { method: "GET", path: "/v1/developer/keys/:id/logs", description: "Paginated API request logs for the key." },
          { method: "GET", path: "/v1/developer/keys/:id/usage", description: "Daily usage volume and error breakdown (days=1..90)." },
          { method: "GET", path: "/v1/developer/keys/:id/deliveries", description: "Webhook delivery history and status for the key." },
          { method: "POST", path: "/v1/developer/keys/:id/webhook/test", description: "Queues a signed test.ping event to the configured webhook URL." },
          { method: "POST", path: "/v1/developer/deliveries/:id/redeliver", description: "Manually replays a recorded webhook delivery." },
        ],
        code: [
          {
            label: "Create a key — request",
            lang: "json",
            content:
              "POST https://api.zekorapay.com/v1/developer/keys\nAuthorization: Bearer <your_session_jwt>\n\n{\n  \"name\": \"Pro Checkout Integration\",\n  \"owner_type\": \"enterprise\",\n  \"enterprise_id\": \"ent_...\",\n  \"environment\": \"live\",\n  \"permissions\": [\"payments:read\", \"payments:write\", \"wallets:read\"],\n  \"allowed_ips\": [\"203.0.113.10/32\"],\n  \"webhook_url\": \"https://your-domain.com/webhooks/zekorapay\",\n  \"webhook_events\": [\"payment.received\", \"payment.request.cancelled\"]\n}",
          },
        ],
      },
      {
        heading: "Using your key on /v1/*",
        intro: "Pass your key via X-Api-Key (recommended) or Authorization: Bearer. Never place your key in the query string (?api_key=...), as such calls are rejected with HTTP 400. Legacy cb_live_ and cb_test_ prefixes remain supported for backward compatibility.",
        code: [
          { label: "Recommended header", lang: "http", content: "X-Api-Key: zk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
          { label: "Bearer alternative", lang: "http", content: "Authorization: Bearer zk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
        ],
      },
      {
        heading: "Environments, quotas & security",
        bullets: [
          "zk_live_... (Production): acts on live funds and data; requires KYC verification (personal) or KYB verification (enterprise).",
          "zk_test_... (Sandbox): isolated testing environment with zero impact on real balances.",
          "Up to 20 active keys per owner, up to 50 IPv4/IPv6/CIDR entries in allowed_ips, and optional key expiration timestamp.",
          "Enterprise RBAC enforcement: enterprise employees can only grant API scopes allowed by their own enterprise role permissions (can_manage_admins unlocks all enterprise scopes).",
        ],
      },
      {
        heading: "Permissions (scopes)",
        intro: "There is no wildcard (*) scope: each key must explicitly declare its scopes. Any :write scope automatically grants the matching :read scope on the same resource.",
        bullets: [
          "payments:read / payments:write — merchant QR/link payment requests and sandbox simulation (personal & enterprise).",
          "wallets:read — read-only access to wallets, balances, and transaction history (personal & enterprise).",
          "exchange:read — live FX/crypto rates, markets, and conversion quotes (personal & enterprise, live & sandbox).",
          "shop:read / shop:write — shops, products, categories, and order status (personal & enterprise).",
          "events:read / events:write — events, sales stats, and ticket verification/check-in (personal & enterprise).",
          "donations:read / donations:write — donation campaigns and donor lists (personal & enterprise).",
          "delivery:read / delivery:write — delivery corridors, shipments, public tracking, and enterprise fleet (personal & enterprise).",
          "billing:read / billing:write — B2B invoices and recurring subscriptions (enterprise only).",
          "enterprise:read — enterprise metadata and plan details (enterprise only).",
          "users:read — personal account profile (personal only).",
        ],
      },
      {
        heading: "Rate limits",
        intro: "Authenticated keys follow the requests-per-minute tier of the key owner's plan (or admin override). Unauthenticated or invalid-key calls are capped at 120 req/min per IP.",
        bullets: [
          "free — 60 req/min",
          "basic — 300 req/min",
          "standard — 1,000 req/min",
          "premium — 5,000 req/min",
          "enterprise — 20,000 req/min",
        ],
      },
      {
        heading: "Common error codes",
        bullets: [
          "400 key_in_url / invalid_request_error — API key passed in URL query or malformed JSON payload.",
          "401 missing_api_key / invalid_api_key / revoked_api_key / expired_api_key — missing, invalid, revoked, or expired key.",
          "403 insufficient_permissions / ip_not_allowed / kyc_required / kyb_required / insufficient_member_permissions — missing scope, blocked IP, unverified KYC/KYB, or reduced employee role.",
          "429 rate_limit_exceeded / ip_rate_limit_exceeded — per-minute quota exceeded.",
        ],
      },
    ],
  },

  paiements: {
    title: "Merchant payments",
    tagline: "Create, update, pause, and collect QR or link payments with a full Sandbox flow — without touching customer PINs.",
    sections: [
      {
        heading: "How payment collection works",
        intro: "Your backend creates a payment request (fixed or variable amount) via POST /v1/payments/requests and receives an ID, payment URL, and QR code. Customers authorize payment inside ZekoraPay with their own PIN, and your server is notified in real time via the payment.received webhook.",
        endpoints: [
          { method: "POST", path: "/v1/payments/requests", scope: "payments:write", description: "Creates a fixed or variable payment request; supports Idempotency-Key." },
          { method: "GET", path: "/v1/payments/requests", scope: "payments:read", description: "Lists your payment requests." },
          { method: "GET", path: "/v1/payments/requests/overview", scope: "payments:read", description: "Aggregated merchant payment metrics." },
          { method: "GET", path: "/v1/payments/requests/history", scope: "payments:read", description: "History of received merchant payments." },
          { method: "GET", path: "/v1/payments/requests/:id", scope: "payments:read", description: "Gets details and status of a payment request." },
          { method: "PATCH", path: "/v1/payments/requests/:id", scope: "payments:write", description: "Updates allowed attributes of a payment request." },
          { method: "POST", path: "/v1/payments/requests/:id/pause", scope: "payments:write", description: "Temporarily pauses a payment request." },
          { method: "POST", path: "/v1/payments/requests/:id/resume", scope: "payments:write", description: "Resumes a paused payment request." },
          { method: "GET", path: "/v1/payments/requests/:id/qr", scope: "payments:read", description: "Returns the PNG QR code and payment link." },
          { method: "GET", path: "/v1/payments/requests/:id/payments", scope: "payments:read", description: "Lists completed payments for a specific request." },
          { method: "DELETE", path: "/v1/payments/requests/:id", scope: "payments:write", description: "Cancels a payment request (emits payment.request.cancelled)." },
        ],
        code: [
          {
            label: "Create a payment request — cURL",
            lang: "bash",
            content:
              "curl -X POST https://api.zekorapay.com/v1/payments/requests \\\n  -H \"X-Api-Key: zk_live_xxxxxxxxxxxxxxxx\" \\\n  -H \"Idempotency-Key: cmd_2026_0042\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"type\": \"fixed\",\n    \"amount\": 50000,\n    \"currency\": \"XAF\",\n    \"title\": \"Order #2026-0042\",\n    \"reference\": \"INV-2026-0042\"\n  }'",
          },
        ],
      },
      {
        heading: "Simulating payments in Sandbox (zk_test_)",
        intro: "Requests created with a zk_test_ key receive a pr_test_... ID and a hosted checkout URL at https://app.zekorapay.com/pay/pr_test_... without touching real wallets. Trigger a simulated payment and fire payment.received (livemode: false) via the hosted page or the simulate endpoint below.",
        endpoints: [
          { method: "POST", path: "/v1/sandbox/payments/requests/:id/pay", scope: "payments:write", description: "Simulates a customer paying a sandbox payment request (zk_test_ keys only)." },
        ],
        code: [
          {
            label: "Simulate a sandbox payment — cURL",
            lang: "bash",
            content:
              "curl -X POST https://api.zekorapay.com/v1/sandbox/payments/requests/pr_test_123456/pay \\\n  -H \"X-Api-Key: zk_test_xxxxxxxxxxxxxxxx\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"customer_id\": \"usr_sandbox_demo\"}'",
          },
        ],
      },
    ],
  },

  portefeuilles: {
    title: "Wallets",
    tagline: "Read-only access to account wallets, balances, and transaction ledgers.",
    sections: [
      {
        heading: "Available endpoints",
        intro: "API keys only carry read access (wallets:read) to the key owner's wallets. Strict tenant isolation prevents personal keys from accessing enterprise wallets. Outbound transfers, deposits, and withdrawals require the user's PIN directly inside ZekoraPay.",
        endpoints: [
          { method: "GET", path: "/v1/wallets", scope: "wallets:read", description: "Lists wallets for the personal or enterprise account." },
          { method: "GET", path: "/v1/wallets/:id", scope: "wallets:read", description: "Personal wallet details (personal keys only)." },
          { method: "GET", path: "/v1/wallets/:id/balance", scope: "wallets:read", description: "Current personal wallet balance (personal keys only)." },
          { method: "GET", path: "/v1/wallets/:id/transactions", scope: "wallets:read", description: "Transaction ledger for a wallet (personal & enterprise)." },
          { method: "GET", path: "/v1/transactions", scope: "wallets:read", description: "Lists all transactions across personal wallets (personal keys only)." },
        ],
      },
    ],
  },

  facturation: {
    title: "Enterprise Billing",
    tagline: "Automate B2B invoices, payment reminders, and recurring subscriptions with ZekoraPay Pro.",
    sections: [
      {
        heading: "Invoices & subscriptions (Enterprise only)",
        intro: "These endpoints require an enterprise API key (owner_type: enterprise) with billing:read / billing:write scopes. Personal keys are rejected with 403 enterprise_key_only.",
        endpoints: [
          { method: "GET", path: "/v1/invoices", scope: "billing:read", description: "Lists your enterprise's invoices." },
          { method: "POST", path: "/v1/invoices", scope: "billing:write", description: "Creates a new invoice for your enterprise." },
          { method: "POST", path: "/v1/invoices/:id/send", scope: "billing:write", description: "Sends an invoice to the client." },
          { method: "POST", path: "/v1/invoices/:id/cancel", scope: "billing:write", description: "Cancels an invoice." },
          { method: "POST", path: "/v1/invoices/:id/remind", scope: "billing:write", description: "Sends a payment reminder for an invoice." },
          { method: "GET", path: "/v1/subscriptions", scope: "billing:read", description: "Lists your enterprise's subscriptions." },
          { method: "POST", path: "/v1/subscriptions", scope: "billing:write", description: "Creates a recurring subscription." },
          { method: "GET", path: "/v1/subscriptions/:id", scope: "billing:read", description: "Gets subscription details." },
          { method: "DELETE", path: "/v1/subscriptions/:id", scope: "billing:write", description: "Cancels a subscription." },
        ],
        code: [
          {
            label: "Create an enterprise invoice — cURL",
            lang: "bash",
            content:
              "curl -X POST https://api.zekorapay.com/v1/invoices \\\n  -H \"X-Api-Key: zk_live_enterprise_xxxxxxxx\" \\\n  -H \"Idempotency-Key: inv_2026_091\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"client_name\": \"Acme SARL\",\n    \"client_email\": \"billing@acme.cm\",\n    \"currency\": \"XAF\",\n    \"items\": [{\"description\": \"Annual SaaS Plan\", \"quantity\": 1, \"unit_price\": 150000}]\n  }'",
          },
        ],
      },
    ],
  },

  livraison: {
    title: "Delivery & Logistics",
    tagline: "Discover logistics corridors, create shipments, track parcels, and query enterprise delivery fleets.",
    sections: [
      {
        heading: "Corridors, shipments & tracking",
        intro: "Provider discovery and tracking-number lookup endpoints work in both live and sandbox modes.",
        endpoints: [
          { method: "GET", path: "/v1/delivery/providers", scope: "delivery:read", description: "Lists available delivery providers and transport corridors (live & sandbox)." },
          { method: "GET", path: "/v1/delivery/track/:tracking_number", scope: "delivery:read", description: "Tracks a shipment by tracking number (live & sandbox)." },
          { method: "GET", path: "/v1/delivery/shipments", scope: "delivery:read", description: "Lists shipments created by the account or enterprise." },
          { method: "POST", path: "/v1/delivery/shipments", scope: "delivery:write", description: "Creates a new shipment." },
          { method: "GET", path: "/v1/delivery/fleet", scope: "delivery:read", description: "Gets the enterprise's couriers and active logistics fleet (enterprise only)." },
        ],
        code: [
          {
            label: "Track a parcel — cURL",
            lang: "bash",
            content:
              "curl -X GET https://api.zekorapay.com/v1/delivery/track/ZK-TRK-2026001 \\\n  -H \"X-Api-Key: zk_live_xxxxxxxxxxxxxxxx\"",
          },
        ],
      },
    ],
  },

  boutique: {
    title: "Shop",
    tagline: "Synchronize your e-commerce storefronts, product catalog, categories, and customer orders.",
    sections: [
      {
        heading: "Shops & catalog",
        endpoints: [
          { method: "GET", path: "/v1/shop", scope: "shop:read", description: "Lists shops owned by your account or enterprise." },
          { method: "GET", path: "/v1/shop/:id", scope: "shop:read", description: "Gets shop details." },
          { method: "GET", path: "/v1/shop/:id/products", scope: "shop:read", description: "Lists products in a shop." },
          { method: "POST", path: "/v1/shop/:id/products", scope: "shop:write", description: "Creates a product in the shop." },
          { method: "GET", path: "/v1/shop/:id/products/:pid", scope: "shop:read", description: "Gets product details." },
          { method: "PUT", path: "/v1/shop/:id/products/:pid", scope: "shop:write", description: "Updates a product." },
          { method: "DELETE", path: "/v1/shop/:id/products/:pid", scope: "shop:write", description: "Deletes a product." },
          { method: "GET", path: "/v1/shop/:id/categories", scope: "shop:read", description: "Lists shop categories." },
        ],
      },
      {
        heading: "Orders",
        endpoints: [
          { method: "GET", path: "/v1/shop/:id/orders", scope: "shop:read", description: "Lists orders for a shop." },
          { method: "GET", path: "/v1/shop/:id/orders/:oid", scope: "shop:read", description: "Gets details of a specific order." },
          { method: "PUT", path: "/v1/shop/:id/orders/:oid/status", scope: "shop:write", description: "Updates order fulfillment status." },
        ],
      },
    ],
  },

  evenements: {
    title: "Events & Ticketing",
    tagline: "Read events, sales stats, and perform tenant-isolated ticket verification and check-in.",
    sections: [
      {
        heading: "Events & analytics",
        endpoints: [
          { method: "GET", path: "/v1/events", scope: "events:read", description: "Lists your personal or enterprise events." },
          { method: "GET", path: "/v1/events/:id", scope: "events:read", description: "Gets event details." },
          { method: "GET", path: "/v1/events/:id/tickets", scope: "events:read", description: "Lists tickets issued for this event." },
          { method: "GET", path: "/v1/events/:id/stats", scope: "events:read", description: "Sales and check-in statistics for the event." },
        ],
      },
      {
        heading: "Ticket check-in",
        intro: "Prefer the event-scoped check-in endpoints (/v1/events/:id/tickets/*): the gateway verifies ticket and event ownership against the API key holder on every call.",
        endpoints: [
          { method: "POST", path: "/v1/events/:id/tickets/verify", scope: "events:write", description: "Verifies a ticket scoped to a specific event." },
          { method: "POST", path: "/v1/events/:id/tickets/:tid/use", scope: "events:write", description: "Checks in a ticket and marks it as used." },
          { method: "POST", path: "/v1/events/tickets/verify", scope: "events:write", description: "Verifies a ticket (enforcing organizer ownership)." },
          { method: "POST", path: "/v1/events/tickets/:id/use", scope: "events:write", description: "Marks a ticket as used (enforcing organizer ownership)." },
        ],
      },
    ],
  },

  dons: {
    title: "Donations & Campaigns",
    tagline: "Create, update, and monitor fundraising campaigns and received donations.",
    sections: [
      {
        heading: "Campaigns & donations",
        endpoints: [
          { method: "GET", path: "/v1/donations/campaigns", scope: "donations:read", description: "Lists donation campaigns for your account or enterprise." },
          { method: "POST", path: "/v1/donations/campaigns", scope: "donations:write", description: "Creates a new fundraising campaign." },
          { method: "GET", path: "/v1/donations/campaigns/:id", scope: "donations:read", description: "Gets campaign details." },
          { method: "PUT", path: "/v1/donations/campaigns/:id", scope: "donations:write", description: "Updates a campaign." },
          { method: "POST", path: "/v1/donations/campaigns/:id/cancel", scope: "donations:write", description: "Cancels a campaign." },
          { method: "GET", path: "/v1/donations/campaigns/:id/donations", scope: "donations:read", description: "Lists donations made to this campaign." },
        ],
      },
    ],
  },

  change: {
    title: "Exchange & Markets",
    tagline: "Real-time FX & crypto rates, supported markets, and multi-currency conversion quotes.",
    sections: [
      {
        heading: "Market data & conversion",
        intro: "All /v1/exchange/* endpoints require the exchange:read scope and work in both live (zk_live_) and sandbox (zk_test_) modes. Executing real currency trades remains exclusive to the ZekoraPay app.",
        endpoints: [
          { method: "GET", path: "/v1/exchange/rates", scope: "exchange:read", description: "Lists all available exchange rates." },
          { method: "GET", path: "/v1/exchange/rates/:from/:to", scope: "exchange:read", description: "Gets the rate between two currencies/assets (e.g. EUR/XAF, USDT/XOF)." },
          { method: "GET", path: "/v1/exchange/markets", scope: "exchange:read", description: "Lists available currency and crypto markets." },
          { method: "POST", path: "/v1/exchange/convert", scope: "exchange:read", description: "Computes a conversion quote between two currencies." },
        ],
      },
    ],
  },

  utilisateurs: {
    title: "Identity & Account",
    tagline: "Inspect the personal user or enterprise profile linked to the active API key.",
    sections: [
      {
        heading: "Key owner profile",
        intro: "Identity endpoints strictly enforce personal vs enterprise key ownership.",
        endpoints: [
          { method: "GET", path: "/v1/me", scope: "users:read", description: "Returns the personal account profile linked to the key (personal keys only)." },
          { method: "GET", path: "/v1/users/profile", scope: "users:read", description: "Alias for /v1/me (personal keys only)." },
          { method: "GET", path: "/v1/enterprise", scope: "enterprise:read", description: "Returns the enterprise profile, KYB status, and plan (enterprise keys only)." },
        ],
      },
    ],
  },

  webhooks: {
    title: "Webhooks",
    tagline: "Receive real-time payment notifications verified with timestamped Zekorapay-Signature HMAC-SHA256 headers.",
    sections: [
      {
        heading: "Setup, testing & replay",
        intro: "You can configure or update your webhook_url (public HTTPS required) and subscribed events at any time without revoking your API key.",
        bullets: [
          "PATCH /v1/developer/keys/:id — update webhook_url, webhook_events, or rotate the secret (rotate_webhook_secret: true).",
          "POST /v1/developer/keys/:id/webhook/test — sends a signed test.ping event immediately.",
          "GET /v1/developer/keys/:id/deliveries — inspects past deliveries, HTTP status codes, and next retry time.",
          "POST /v1/developer/deliveries/:id/redeliver — replays a previous delivery on demand.",
        ],
      },
      {
        heading: "Available events",
        bullets: [
          "payment.received — a merchant payment request (live or sandbox) has been paid.",
          "payment.request.cancelled — a payment request was cancelled (DELETE /v1/payments/requests/:id).",
          "test.ping — verification event triggered from the Developer Portal or /webhook/test.",
        ],
      },
      {
        heading: "Verifying the HMAC-SHA256 signature",
        intro: "Every POST includes Zekorapay-Signature (t=<unix>,v1=<hex>), Zekorapay-Event, Zekorapay-Delivery, and User-Agent: Zekorapay-Webhooks/2.0. Compute the HMAC over \"<t>.<raw JSON body>\" and reject timestamps older than 5 minutes to prevent replay attacks.",
        code: [
          {
            label: "Incoming headers",
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
            label: "Sample payload",
            lang: "json",
            content:
              '{\n  "id": "evt_019372a8bc1f",\n  "type": "payment.received",\n  "created": 1764291200,\n  "livemode": true,\n  "data": {\n    "payment_id": "pr_live_8a9f21",\n    "merchant_id": "ent_6b04500c",\n    "customer_id": "usr_9120ab",\n    "amount": 50000,\n    "currency": "XAF",\n    "title": "Order #2026-0042"\n  }\n}',
          },
        ],
      },
      {
        heading: "Retry schedule & SSRF protection",
        bullets: [
          "6 automatic retries after a failed or non-2xx attempt: 1 min, 5 min, 30 min, 2 h, 6 h, and 12 h.",
          "5 s dial timeout and 10 s response header timeout; HTTP redirects are never followed.",
          "SSRF-safe delivery: only public https:// endpoints are accepted; localhost, private networks, and internal IPs are blocked at connection time.",
        ],
      },
    ],
  },
};
