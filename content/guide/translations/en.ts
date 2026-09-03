// English user guide content — mirrors translations/fr.ts. Every topic was
// verified live against app.zekorapay.com on 2026-09-03.
import type { LocalizedGuide } from "./fr";

export const en: Record<string, LocalizedGuide> = {
  demarrage: {
    title: "Create and secure your account",
    tagline: "Sign-up, identity verification (KYC), and PIN security.",
    sections: [
      {
        heading: "Sign-up",
        steps: [
          { title: "Phone or email", description: "Enter your phone number (international format) or email address." },
          { title: "OTP code", description: "A one-time code is sent by SMS or email. Confirm it." },
          { title: "PIN code", description: "Create your 5-digit secret PIN using an anti-keylogger virtual keypad: key positions are shuffled randomly every time it's shown.", pinRequired: true },
        ],
      },
      {
        heading: "Identity verification (KYC)",
        intro: "To unlock higher deposit and transfer limits, your identity needs to be verified. Once validated, the \"Verified\" badge appears under Settings → Identity verification.",
        steps: [
          { title: "ID document", description: "Take a photo of your national ID card or passport." },
          { title: "Verification selfie", description: "Take a short selfie or verification video." },
          { title: "Validation", description: "Once validated, your account status becomes \"Verified\" and your limits increase." },
        ],
      },
      {
        heading: "Dashboard",
        intro: "After logging in, the dashboard brings together your wallets, latest transactions and cards at a glance.",
        images: [{ src: "/guide/demarrage/dashboard.png", alt: "ZekoraPay dashboard" }],
      },
      {
        heading: "Account settings",
        intro: "The Settings page centralizes everything: profile, security (password, 2FA, sessions), identity verification, preferences, notifications, payment methods, Mobile Money deposit numbers, developer API keys, card limits and PINs, enterprise settings, agent activation, and rental management.",
        images: [{ src: "/guide/demarrage/settings.png", alt: "Settings page" }],
      },
      {
        heading: "Pending actions",
        intro: "A single approval hub gathers every decision waiting on you, across every module: enterprises, associations, invitations and rentals.",
        images: [{ src: "/guide/demarrage/pending_actions.png", alt: "Pending actions" }],
      },
      {
        heading: "Profile types",
        bullets: [
          "Individual — standard profile, for personal use.",
          "Agent — activated from Settings → Individual agent; handles cash deposits and withdrawals for other users for a commission.",
          "Enterprise — requires business documents, unlocks the enterprise module (employees, payroll, shop, events, rentals).",
        ],
      },
      {
        heading: "PIN security",
        intro: "Every sensitive financial action (payment, withdrawal, governance vote, treasury distribution…) triggers the same security sequence:",
        bullets: [
          "Anti-keylogger virtual keypad — key positions are shuffled every time it's shown, so malware can't infer what you typed from key order.",
          "Client-side RSA-OAEP encryption — your PIN is encrypted with a public key before it ever leaves your device; only the server holds the private key.",
          "Server-side validation — the action only executes after the signature is verified server-side.",
          "Full traceability — every transaction, vote or approval is timestamped and stored immutably.",
          "Never share your PIN with anyone, not even a ZekoraPay agent — everyone always confirms an operation from their own account.",
        ],
      },
    ],
  },

  portefeuilles: {
    title: "Wallets",
    tagline: "A multi-currency wallet for your local currencies and cryptocurrencies.",
    sections: [
      {
        heading: "Overview",
        intro: "The \"My Wallets\" page brings together every account: fiat currencies (XAF, EUR…) and cryptocurrencies (BTC, USDC, XRP…), each with its balance, deposit address for crypto, and quick actions.",
        bullets: [
          "Protected balance — the main wallet's balance can be hidden and requires clicking \"Unlock\" to reveal.",
          "Top up — funds the wallet (Mobile Money, card, agent, or crypto deposit depending on the wallet type).",
          "Send — opens the transfer form with this wallet pre-selected as the source.",
          "Manage — rename, view detailed history, or configure a wallet.",
          "+ New — creates an additional wallet (another currency, or a dedicated savings wallet).",
        ],
        images: [{ src: "/guide/portefeuilles/overview.png", alt: "My Wallets — multi-currency view" }],
      },
    ],
  },

  transferts: {
    title: "Transfers",
    tagline: "Send money to one or several recipients, via 5 different methods.",
    sections: [
      {
        heading: "Single transfer",
        intro: "Pick the source wallet, the amount, then the recipient's receiving method:",
        bullets: [
          "ZekoraPay — to another user, identified by email or phone.",
          "Mobile Money — to a local mobile money number.",
          "Bank transfer — to a bank account.",
          "PayPal — to a PayPal email address.",
          "Crypto — to an external wallet address.",
        ],
        images: [{ src: "/guide/transferts/transfer_form.png", alt: "Transfer form" }],
      },
      {
        heading: "Bulk transfer",
        intro: "Send money to several recipients at once, each with their own receiving method — handy for a group refund or a one-off small payroll.",
        steps: [
          { title: "Name the batch", description: "Give the send batch a name (e.g. \"Monthly supplier payments\")." },
          { title: "Choose the source wallet", description: "Select the wallet that will fund the whole batch." },
          { title: "Add recipients", description: "Each recipient has their own amount and their own method (ZekoraPay, Mobile Money, bank…)." },
          { title: "Send", description: "Confirm to execute every transfer in the batch.", pinRequired: true },
        ],
        images: [{ src: "/guide/transferts/bulk_transfer.png", alt: "Bulk transfer" }],
      },
    ],
  },

  "depots-retraits": {
    title: "Cash deposits and withdrawals",
    tagline: "Turn cash into ZekoraPay balance and back, through the agent network.",
    sections: [
      {
        heading: "Withdrawing cash from an agent",
        steps: [
          { title: "Identify the agent", description: "Scan the agent's QR code, or enter their withdrawal code and phone number." },
          { title: "Enter the amount", description: "Specify how much to withdraw." },
          { title: "Confirm", description: "The agent validates the operation from their own account; the amount is debited from yours.", pinRequired: true },
        ],
        images: [{ src: "/guide/depots-retraits/withdraw_agent.png", alt: "Withdrawing cash from an agent" }],
      },
      {
        heading: "Depositing cash with an agent",
        intro: "Go to a ZekoraPay agent and show them your personal deposit QR, or give them your phone number. The agent enters the amount and validates the operation from their own account.",
        bullets: [
          "Never give your PIN to the agent — they never need it to credit your account.",
          "The credit is instant as soon as the agent validates it.",
        ],
        images: [{ src: "/guide/depots-retraits/deposit_qr.png", alt: "Depositing cash — personal deposit QR" }],
      },
      {
        heading: "Other ways to top up",
        intro: "From \"My Wallets\" → \"Top up\", a deposit is also possible directly by Mobile Money, bank card (3D Secure), or to your wallet's dedicated crypto deposit address — without going through an agent.",
      },
    ],
  },

  conversion: {
    title: "Conversion and exchange",
    tagline: "Convert between local currencies, or buy/sell cryptocurrencies, instantly.",
    sections: [
      {
        heading: "Two paths",
        bullets: [
          "Fiat Currency Conversion — instantly converts between USD, EUR, GBP, JPY, CAD, AUD and more, at the best available rates.",
          "Buy / Sell Crypto — buy or sell cryptocurrencies instantly against your wallet balance.",
        ],
        images: [{ src: "/guide/conversion/overview.png", alt: "Convert page" }],
      },
    ],
  },

  cartes: {
    title: "Cards",
    tagline: "Prepaid virtual, physical or gift cards, personal or enterprise.",
    sections: [
      {
        heading: "Your cards",
        intro: "Balances are hidden by default (\"Show balances\" button). Each card shows its status:",
        bullets: [
          "Active — usable normally.",
          "Frozen — temporarily blocked by you, can be unfrozen at any time.",
          "Blocked — permanently blocked (lost, fraud).",
          "Expired — past its validity date, needs renewal.",
        ],
        images: [{ src: "/guide/cartes/overview.png", alt: "My Cards" }],
      },
      {
        heading: "Card types",
        bullets: [
          "Virtual card — available instantly, for online payments.",
          "Physical card — delivered by mail, for in-store and ATM payments.",
          "Gift card — a preset amount, to give away.",
        ],
      },
      {
        heading: "Managing your card",
        bullets: [
          "Top up your card from your wallet.",
          "Freeze or unfreeze your card instantly.",
          "Set spending limits and a dedicated PIN from Settings → My cards.",
        ],
      },
    ],
  },

  "paiements-marchand": {
    title: "Scan, pay and collect",
    tagline: "One scanner for payments, ticket validation and transfers — and a space to collect from your own customers.",
    sections: [
      {
        heading: "Scanning a QR code",
        intro: "A single scanner for three uses, auto-detected from the code's content: merchant payment, event ticket, or transfer. Three input modes: camera, image, or manual code.",
        images: [{ src: "/guide/paiements-marchand/scan.png", alt: "Scan a QR code" }],
      },
      {
        heading: "Merchant Space — collecting from customers",
        intro: "Create a payment request and get a QR code to show your customer.",
        bullets: [
          "Fixed price — the QR can only be used once, for a set amount.",
          "Reusable — the same QR can be used to collect from several customers in a row.",
          "The dashboard shows total received, number of payments, and requests still pending.",
        ],
        images: [{ src: "/guide/paiements-marchand/merchant_space.png", alt: "Merchant Space" }],
      },
    ],
  },

  "tontines-associations": {
    title: "Tontines and associations",
    tagline: "Full management of group contributions, votes and treasury, with total traceability.",
    sections: [
      {
        heading: "Exploring associations",
        intro: "The Associations page offers a public explorer — filterable by type (tontines, contribution groups, solidarity groups) — before you create or join a group.",
        images: [{ src: "/guide/association/explorer_live.png", alt: "Associations and tontines explorer" }],
      },
      {
        heading: "The actors",
        bullets: [
          "Member — takes part in the association, pays contributions, votes on decisions.",
          "Bureau (President / Treasurer / Secretary) — administers the association, approves memberships, manages the treasury.",
          "ZekoraPay platform — the security infrastructure: wallets are isolated per association, funds can never leak between two groups.",
        ],
      },
      {
        heading: "As a member",
        steps: [
          { title: "Explore", description: "Browse public associations and filter by type (tontine, savings, solidarity)." },
          { title: "Join", description: "Submit a membership request from the explorer or an invite link; it's then approved by the Bureau." },
          { title: "Pay your contribution", description: "Settle your periodic contribution from the association's wallet.", pinRequired: true },
          { title: "Vote", description: "Vote on governance resolutions (elections, distributions, exclusions); every vote is signed and final.", pinRequired: true },
        ],
        images: [
          { src: "/guide/association/stage1_explorer_en.png", alt: "Association explorer" },
          { src: "/guide/association/stage5_my_associations_en.png", alt: "My associations" },
          { src: "/guide/association/pin_modal_contrib_en.png", alt: "PIN modal — paying a contribution" },
          { src: "/guide/association/pin_modal_vote_en.png", alt: "PIN modal — governance vote" },
        ],
      },
      {
        heading: "As the Bureau",
        steps: [
          { title: "Create an association", description: "Configure identity, base currency, financial rules and member settings in 3 steps." },
          { title: "Approve members", description: "Validate or reject membership requests.", pinRequired: true },
          { title: "Record a cash contribution", description: "When a member pays in cash during a meeting, the treasurer records it manually to keep the audit trail complete.", pinRequired: true },
          { title: "Generate batch contributions", description: "Create the period's contributions for every active member in one click.", pinRequired: true },
          { title: "Distribute the treasury", description: "Pay out the pot to the current round's beneficiary; an irreversible action.", pinRequired: true },
          { title: "Organize a meeting", description: "Create, manage and close meetings; closing (settling contributions) requires the PIN.", pinRequired: true },
          { title: "Launch an election", description: "Propose a new bureau; every member votes with their PIN.", pinRequired: true },
        ],
        images: [
          { src: "/guide/association/stage2_create_identity_en.png", alt: "Creating an association" },
          { src: "/guide/association/stage7_tab_members_en.png", alt: "Approving members" },
          { src: "/guide/association/pin_modal_distribution_en.png", alt: "PIN modal — treasury distribution" },
          { src: "/guide/association/stage10_tab_meetings_en.png", alt: "Meetings tab" },
        ],
      },
      {
        heading: "Association workspace",
        bullets: [
          "Members tab — list and manage members.",
          "Contributions tab — track amounts due and paid.",
          "Treasury tab — balance and distribution history.",
          "Meetings tab — calendar and minutes.",
          "Governance tab — ongoing resolutions and elections.",
          "Chat tab — group messaging.",
        ],
        images: [
          { src: "/guide/association/stage6_tab_overview_en.png", alt: "Workspace overview" },
          { src: "/guide/association/stage8_tab_contrib_en.png", alt: "Contributions tab" },
          { src: "/guide/association/stage9_tab_treasury_en.png", alt: "Treasury tab" },
          { src: "/guide/association/stage11_tab_governance_en.png", alt: "Governance tab" },
          { src: "/guide/association/stage12_tab_chat_en.png", alt: "Chat tab" },
        ],
      },
      {
        heading: "On mobile",
        intro: "Every feature is available on mobile — the interface adapts automatically.",
        images: [
          { src: "/guide/association/association_mobile_explorer_en.png", alt: "Explorer (mobile)" },
          { src: "/guide/association/association_mobile_create_en.png", alt: "Creation (mobile)" },
          { src: "/guide/association/association_mobile_my_en.png", alt: "My associations (mobile)" },
          { src: "/guide/association/association_mobile_workspace_en.png", alt: "Workspace (mobile)" },
        ],
      },
    ],
  },

  "evenements-billetterie": {
    title: "Events and ticketing",
    tagline: "Create an event, sell tickets, and validate entries.",
    sections: [
      {
        heading: "Creating an event",
        intro: "Any logged-in user — individual, enterprise or association — can create an event and automatically becomes its organizer.",
        bullets: [
          "General info — title, description, location (or virtual link), cover image.",
          "Dates and currency — event start/end, sales open/close, wallet currency.",
          "Customizable buyer form — text, email, phone, dropdown, checkbox fields.",
          "Ticket tiers — name, price (0 for free), available quantity, per-buyer limit, color and icon.",
        ],
        images: [
          { src: "/guide/events/stage2_event_create_en.png", alt: "Event creation form" },
          { src: "/guide/events/stage2b_event_create_filled_en.png", alt: "Filled-in form" },
        ],
      },
      {
        heading: "Organizer actions",
        steps: [
          { title: "Track sales", description: "Dashboard: tickets sold per tier, total revenue, fill rate." },
          { title: "Withdraw funds", description: "Withdraw the collected balance to the wallet of your choice.", pinRequired: true },
          { title: "Cancel the event", description: "Buyers are automatically refunded." },
          { title: "Share the code/QR", description: "Each event has a unique code (e.g. EVT-ABC123) and a downloadable, shareable QR." },
          { title: "Scan tickets", description: "Validate entries by camera scan or manual ticket code entry." },
        ],
        images: [
          { src: "/guide/events/stage5_my_events_en.png", alt: "My events" },
          { src: "/guide/events/stage6_event_detail_en.png", alt: "Event detail" },
        ],
      },
      {
        heading: "Buying a ticket",
        steps: [
          { title: "Find the event", description: "From the catalog or via its unique code." },
          { title: "Choose a tier and quantity", description: "Within stock and per-buyer limits." },
          { title: "Confirm", description: "The amount is debited from your wallet and a unique QR is generated.", pinRequired: true },
        ],
        images: [
          { src: "/guide/events/stage1_explorer_en.png", alt: "Event catalog" },
          { src: "/guide/events/pin_modal_purchase_en.png", alt: "PIN modal — buying a ticket" },
          { src: "/guide/events/stage_qr_ticket_en.png", alt: "Ticket with QR code" },
        ],
      },
      {
        heading: "Statuses",
        bullets: [
          "Event — draft, active, ended, cancelled.",
          "Ticket — paid (valid for entry), used (entry already validated).",
        ],
      },
    ],
  },

  entreprises: {
    title: "Enterprise module",
    tagline: "Employees, payroll, billing, shop, real estate and much more for business accounts.",
    sections: [
      {
        heading: "Two spaces",
        bullets: [
          "Enterprises — public directory: discover enterprises in the community and subscribe to their services.",
          "My enterprises — manage the structures you own or work for.",
        ],
        images: [{ src: "/guide/entreprises/dashboard.png", alt: "Enterprise dashboard" }],
      },
      {
        heading: "Everything an enterprise manages",
        intro: "An enterprise's workspace brings together, in one sidebar: Employees, Followers, Enterprise wallets, Transactions, Payroll, Billing, Rental Management, Shops, Merchant Payment, Events, Campaigns, Finances, Stock Management, Services, Agent Module, Enterprise Security and permission history.",
      },
      {
        heading: "Employee management",
        intro: "The employee directory shows totals, active employees, pending invites and total payroll — with, for each employee, their position, role, status and net salary.",
        bullets: [
          "Invite collaborators and assign them a role (admin or employee) with precise permissions.",
          "Any permission granted to an admin can never exceed the permissions of the person granting it.",
          "Configure each employee's payment method (ZekoraPay wallet or Mobile Money).",
        ],
        images: [{ src: "/guide/entreprises/employees.png", alt: "Employee directory" }],
      },
      {
        heading: "Payroll",
        intro: "The Payroll page picks a period (month/year) and shows total employees, total payroll, payments already made this month, and pending ones, along with the full history of past runs.",
        steps: [
          { title: "Pick the period", description: "Select the month and year to process." },
          { title: "Check the amounts", description: "Review the payroll total computed from each active employee's net salary." },
          { title: "Run Payroll", description: "One click triggers a batch payment to each employee's wallet or Mobile Money.", pinRequired: true },
        ],
        images: [{ src: "/guide/entreprises/payroll.png", alt: "Payroll management" }],
      },
      {
        heading: "Bulk billing",
        intro: "For subscription-based service businesses: import or enter consumption data for a group of services to generate the corresponding invoices in one go.",
      },
      {
        heading: "Security and approvals — multi-signature",
        intro: "Beyond the per-admin permission ceiling (see above), an enterprise can require a sensitive action to be validated by several admins at once before it executes.",
        bullets: [
          "Roles & Permissions — create custom roles (e.g. \"Customer Service\") and assign them to several employees at once.",
          "Security rules — require validation from multiple admins for sensitive actions (payments, terminations, role changes…).",
          "Pending approvals — requests still waiting for validation.",
          "How it works — when a sensitive action is initiated, every designated admin gets a notification; the action only executes once the required number of approvals is reached (each confirmed with a PIN or password).",
        ],
        images: [{ src: "/guide/entreprises/security.png", alt: "Security & Approvals" }],
      },
      {
        heading: "Enterprise Agency — running your own agents",
        intro: "A dedicated module for enterprises managing several deposit/withdrawal agents on their own behalf: active agent count, deposit/withdrawal limits per zone, daily volume processed, success rate, and a best-agent leaderboard.",
        images: [{ src: "/guide/entreprises/agency.png", alt: "Enterprise Agency" }],
      },
      {
        heading: "Other workspace modules",
        bullets: [
          "Finances — a consolidated view of the enterprise's accounts and transactions.",
          "Stock management — quantity tracking for enterprises selling physical products.",
          "KYC verification — the enterprise's own verification status.",
          "Developer API — API keys dedicated to the enterprise (see the API documentation).",
          "Danger zone — irreversible actions (deletion, ownership transfer).",
        ],
      },
    ],
  },

  "location-immobilier": {
    title: "Rentals and real estate",
    tagline: "List and rent out housing, vehicles or equipment.",
    sections: [
      {
        heading: "Rental Space",
        intro: "Available to both individuals and enterprises (in the latter case via the \"Rental Management\" tab of the enterprise workspace). Three categories:",
        bullets: [
          "Real estate — housing, rooms, offices.",
          "Vehicles — vehicle rentals.",
          "Equipment — rentable gear.",
        ],
        images: [{ src: "/guide/location-immobilier/personal_overview.png", alt: "Rental Space — catalog" }],
      },
      {
        heading: "Two roles",
        bullets: [
          "My Rentals — what you're renting as a tenant.",
          "My Spaces — the properties you list as an owner/manager, with their availability (e.g. \"6/7 free\") and monthly price.",
        ],
      },
      {
        heading: "On the enterprise side",
        intro: "An enterprise can manage a real property portfolio from \"Rental Management\": real estate holdings, vehicle fleets and rental equipment stores, all tied to the enterprise's wallet.",
        images: [{ src: "/guide/location-immobilier/enterprise_rentals.png", alt: "Rental Management — enterprise space" }],
      },
    ],
  },

  boutique: {
    title: "ZekoraPay Shop",
    tagline: "Sell online, whether you're an individual or an enterprise.",
    sections: [
      {
        heading: "Marketplace",
        intro: "Three tabs: Shops (browse), Products, and My Shops (manage yours). Shops are organized by category (Fashion, Electronics, Food, Beauty, Home, Sports…).",
        images: [{ src: "/guide/boutique/marketplace.png", alt: "Shop marketplace" }],
      },
      {
        heading: "Setting up your shop",
        bullets: [
          "Shop info — name, description, categories.",
          "Products — name, price, stock, images, category.",
          "Customer reviews visible on each product.",
        ],
      },
      {
        heading: "Selling",
        bullets: [
          "Receive orders directly in your shop space.",
          "Track each order's status through to delivery.",
          "Payments are collected directly into your ZekoraPay wallet.",
        ],
      },
    ],
  },

  dons: {
    title: "Donations and solidarity",
    tagline: "Create and support fundraising campaigns.",
    sections: [
      {
        heading: "Discover and support",
        intro: "Search for a cause, filter by status (ongoing, ended…). Each campaign shows the amount raised, its goal (or \"No limit\") and its end date.",
        images: [{ src: "/guide/dons/overview.png", alt: "Donations & Solidarity" }],
      },
      {
        heading: "Creating a campaign",
        steps: [
          { title: "Create a campaign", description: "Title, description, goal (optional), end date." },
          { title: "Share", description: "Spread your campaign's link to receive donations." },
          { title: "Withdraw funds", description: "From \"My campaigns\", transfer received donations to your wallet.", pinRequired: true },
        ],
      },
    ],
  },

  reunions: {
    title: "Video meetings",
    tagline: "Video calls and group meetings, up to 100 participants.",
    sections: [
      {
        heading: "Start or join",
        bullets: [
          "Start a meeting — launches an instant call.",
          "Schedule a meeting — plans an upcoming meeting, shareable by link or code.",
          "Join a meeting — via a link or code you received.",
        ],
        images: [{ src: "/guide/reunions/overview.png", alt: "Video and meetings" }],
      },
      {
        heading: "Tracking",
        bullets: [
          "Meetings tab — active and upcoming meetings.",
          "Recordings tab — replays of recorded meetings.",
          "History tab — total duration and full history.",
        ],
      },
    ],
  },

  agents: {
    title: "Becoming an agent",
    tagline: "Join the ZekoraPay agent network to handle cash deposits and withdrawals — for yourself or on behalf of an enterprise.",
    sections: [
      {
        heading: "Two ways to be an agent",
        bullets: [
          "Individual agent — anyone can activate this from Settings → Individual agent. You manage your own float and your own commissions.",
          "Enterprise agent (sub-agent) — you operate on behalf of an enterprise that designated you. The interface is close to an individual agent's, but the float, limits and activity zones are controlled by the enterprise, not by you.",
        ],
      },
      {
        heading: "Individual agent portal",
        intro: "You get a unique agent code to share with your customers.",
        images: [{ src: "/guide/agents/portal.png", alt: "Individual Agent Portal" }],
      },
      {
        heading: "Enterprise agent portal",
        intro: "If you're an agent for several enterprises, you first pick which one to work with — each with its own agent code and its own agent PIN, which must be set up before you can process operations.",
        images: [
          { src: "/guide/agents/enterprise_select.png", alt: "Choosing the agent enterprise" },
          { src: "/guide/agents/enterprise_portal.png", alt: "Enterprise agent portal" },
        ],
      },
      {
        heading: "Processing an operation",
        steps: [
          { title: "Customer deposit", description: "The customer shows you their deposit QR or number; you enter the amount and validate from your own account.", pinRequired: true },
          { title: "Customer withdrawal", description: "The customer scans your QR or enters your agent code + your number; you hand over the cash after validation.", pinRequired: true },
        ],
      },
      {
        heading: "Tracking your activity",
        bullets: [
          "Available float — balance usable to process operations.",
          "Transactions and volume — cumulative processed operations.",
          "Commissions — cumulative earnings per operation.",
          "Confirmed deposits / withdrawals — breakdown by operation type.",
        ],
      },
    ],
  },
};
