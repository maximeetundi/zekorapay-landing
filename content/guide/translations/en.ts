// English user guide content — mirrors translations/fr.ts.
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
        intro: "To unlock higher deposit and transfer limits, your identity needs to be verified.",
        steps: [
          { title: "ID document", description: "Take a photo of your national ID card or passport." },
          { title: "Verification selfie", description: "Take a short selfie or verification video." },
          { title: "Validation", description: "Once validated, your account status becomes \"Verified\" and your limits increase." },
        ],
      },
      {
        heading: "Profile types",
        bullets: [
          "Individual — standard profile, for personal use.",
          "Agent — a ZekoraPay partner who handles cash deposits and withdrawals for other users.",
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
        ],
      },
    ],
  },

  "depots-retraits": {
    title: "Deposits and withdrawals",
    tagline: "Top up your wallet and get your funds out, via mobile money, card, agent or crypto.",
    sections: [
      {
        heading: "Topping up your wallet (deposit)",
        steps: [
          { title: "Mobile Money", description: "Enter the amount, choose your operator, enter your number and confirm via the USSD prompt on your phone." },
          { title: "Bank card", description: "Enter your card details (Visa/Mastercard) in an encrypted interface with 3D Secure verification." },
          { title: "ZekoraPay Agent (cash)", description: "Find the nearest agent in the app, scan their QR code, and hand over your cash in exchange for electronic money." },
          { title: "Crypto deposit", description: "Each wallet has a dedicated deposit address per supported blockchain. Deposits are automatically detected by a block scanner and credited after network confirmation." },
        ],
      },
      {
        heading: "Withdrawing funds",
        steps: [
          { title: "To Mobile Money", description: "Transfer your wallet balance to any compatible phone number.", pinRequired: true },
          { title: "To a bank account", description: "Withdrawal by standard bank transfer, processed within a few business days.", pinRequired: true },
          { title: "At an agent", description: "Start the withdrawal in the app, then collect physical cash from a ZekoraPay agent.", pinRequired: true },
        ],
      },
    ],
  },

  "tontines-associations": {
    title: "Tontines and associations",
    tagline: "Full management of group contributions, votes and treasury, with total traceability.",
    sections: [
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
    tagline: "Employees, payroll, billing and additional modules for business accounts.",
    sections: [
      {
        heading: "Employee management",
        bullets: [
          "Invite collaborators and assign them a role (admin or employee) with precise permissions.",
          "Any permission granted to an admin can never exceed the permissions of the person granting it.",
          "Configure each employee's payment method (ZekoraPay wallet or Mobile Money).",
        ],
      },
      {
        heading: "Payroll and finances",
        bullets: [
          "One-click batch salary payments.",
          "Track the enterprise's accounts and balances.",
          "Manage the enterprise's services and billing.",
        ],
      },
      {
        heading: "Additional modules",
        bullets: [
          "An online shop attached to the enterprise.",
          "Donation campaigns for the enterprise.",
          "Rental management (properties, leases, rent payments).",
          "Events organized under the enterprise's name.",
        ],
      },
    ],
  },

  boutique: {
    title: "ZekoraPay Shop",
    tagline: "Sell online, whether you're an individual or an enterprise.",
    sections: [
      {
        heading: "One shop, two possible profiles",
        intro: "A shop can be created and managed by an individual or by an enterprise — the selling features are identical on both sides.",
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
      {
        heading: "For customers",
        bullets: [
          "Browse products by shop or category.",
          "Leave a review after purchase.",
          "Track your ongoing orders.",
        ],
      },
    ],
  },

  cartes: {
    title: "ZekoraPay Cards",
    tagline: "Prepaid virtual or physical cards, personal or enterprise.",
    sections: [
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
          "Top up your card from your wallet, manually or via a configurable auto-load.",
          "Freeze or unfreeze your card instantly if lost or in doubt.",
          "Set custom spending limits.",
          "View your card's detailed transaction history.",
        ],
      },
    ],
  },
};
