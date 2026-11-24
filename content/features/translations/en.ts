export interface LocalizedFeature {
  body: string[];
  highlights: string[];
}

export const en: Record<string, LocalizedFeature> = {
  wallet: {
    body: [
      "Your ZekoraPay wallet centralizes your local-currency balances (FCFA and more) and crypto balances (Bitcoin, Ethereum, USDT, and more) in a single app, with a complete history of every movement.",
      "Every deposit, withdrawal, or transaction is protected by your personal PIN, with end-to-end encryption on your sensitive data. You can open several wallets depending on the currencies you use and track your balance in real time.",
    ],
    highlights: [
      "Local currencies and crypto",
      "Complete transaction history",
      "PIN-protected",
      "Real-time balance tracking",
    ],
  },
  transfer: {
    body: [
      "Send and receive money in real time, between ZekoraPay users or to mobile money and bank accounts, everywhere our partners operate.",
      "Every transfer shows the fees before you confirm — no surprises. International transfers run on modern payment infrastructure to stay fast and affordable, with status tracking at every step.",
    ],
    highlights: [
      "Real-time transfers",
      "Transparent fees before sending",
      "Mobile money and bank transfers",
      "Status tracking at every step",
    ],
  },
  cards: {
    body: [
      "Issue virtual cards instantly or order a physical card, linked to your personal wallet or a business account, to pay anywhere cards are accepted.",
      "Load and withdraw to your wallet anytime, with customizable limits and PIN verification on every sensitive operation for stronger security.",
    ],
    highlights: [
      "Instant virtual cards",
      "Physical cards on request",
      "Customizable limits",
      "PIN-secured loading and withdrawal",
    ],
  },
  exchange: {
    body: [
      "Convert between local currencies and crypto directly in the app, with the rate shown before you confirm and immediate execution.",
      "Whether you're exchanging FCFA for Bitcoin or between two local currencies, every conversion runs through a real-time quoting engine to guarantee a fair rate at the moment of the transaction.",
    ],
    highlights: [
      "Local currency ↔ crypto exchange",
      "Rate shown before confirming",
      "Immediate execution",
      "History of your conversions",
    ],
  },
  qr: {
    body: [
      "Accept instant payments via QR code in your shop, at a market, or during an association event, with no physical payment terminal.",
      "The customer scans the code, confirms the amount with their own PIN, and the payment is credited immediately to your merchant wallet — ideal for merchants and for associations collecting contributions in person.",
    ],
    highlights: [
      "No physical terminal needed",
      "Payment confirmed by the customer",
      "Instant credit to merchant wallet",
      "Built for shops and associations alike",
    ],
  },
  tontines: {
    body: [
      "Digitally create and manage your tontines and savings associations: automatic contributions, a transparent payout rotation, collective treasury management, member loans, and emergency funds.",
      "Your association's governance is built in: role elections (president, treasurer, secretary), majority-approval votes for major financial decisions, and video meetings directly in the app for your assemblies.",
    ],
    highlights: [
      "Automatic, transparently tracked contributions",
      "Member loans and emergency funds",
      "Built-in governance: elections and votes",
      "Video meetings for your assemblies",
    ],
  },
  enterprise: {
    body: [
      "Open a business workspace on ZekoraPay Pro, delegate tasks with strict RBAC roles and permissions, centralize multi-signature treasury, and bill subscribers through Enterprise Services (tuition fees, recurring plans, tiered utilities).",
      "Automate employee payroll, enforce quorum voting on sensitive operations, manage POS shops and rental fleets, and oversee every collaborator's AI usage from the dedicated Enterprise AI Governance Cockpit.",
    ],
    highlights: [
      "Strict RBAC roles & multi-sig voting",
      "Automated payroll, billing & Services",
      "Enterprise AI Cockpit & per-member rules",
      "Rental fleets & multi-warehouse Pro Stock",
    ],
  },
  shop: {
    body: [
      "Open your online shop, whether run personally or by your business, manage your product catalog, stock and orders, and accept payments built right in.",
      "Every shop gets its own dedicated wallet to isolate its revenue, a team of managers with dedicated permissions, and a customer review system to build your reputation.",
    ],
    highlights: [
      "Individual or business shop",
      "Catalog, stock, and order management",
      "Dedicated wallet per shop",
      "Customer reviews and manager team",
    ],
  },
  donations: {
    body: [
      "Create fundraising campaigns for a personal cause or for your business, share them with your community, and track donations received in real time.",
      "Every campaign gets its own collection wallet, with transparent payouts to the organizer once goals are reached or as needed.",
    ],
    highlights: [
      "Personal or business campaigns",
      "Real-time donation tracking",
      "Dedicated wallet per campaign",
      "Transparent payouts",
    ],
  },
  events: {
    body: [
      "Create and manage your events, sell tickets online directly in the app, and control entry on the day by scanning attendee tickets.",
      "Track sales and revenue in real time, manage refunds when needed, and give your organizers dedicated access to run the event end to end.",
    ],
    highlights: [
      "Online ticket sales",
      "Entry scanning and control",
      "Real-time sales tracking",
      "Refund management",
    ],
  },
  cash: {
    body: [
      "Our network of local agents lets anyone, even without a bank account, deposit or withdraw cash locally to fund or empty their ZekoraPay wallet.",
      "Every agent operation is double-secured by PIN, with daily limits and identity verification, to make financial services accessible everywhere, including where traditional banks aren't present.",
    ],
    highlights: [
      "Local cash deposits and withdrawals",
      "Accessible without a bank account",
      "Double PIN verification",
      "Local agent network",
    ],
  },
  video: {
    body: [
      "Communicate safely with definitive separation between Personal messaging (ZekoraPay) and Business messaging (ZekoraPay Pro), featuring encrypted file attachments and real-time alerts.",
      "Host HD video meetings for tontine assemblies or corporate boards directly inside the app, and let the AI Assistant send single or bulk messages with attachments when permitted.",
    ],
    highlights: [
      "Strict Personal vs Business Pro separation",
      "Built-in HD LiveKit video meetings",
      "AI single & bulk messaging with attachments",
      "Real-time notifications & encryption",
    ],
  },
  ai: {
    body: [
      "The ZekoraPay AI Assistant replaces static manuals: it masters every module to guide you step by step, deep-link you cleanly to sensitive screens (KYC, API keys, security), and execute daily operations including shops, rentals, single/bulk messaging, and secure PDF, Excel, Word, CSV & ZIP import/export.",
      "With the built-in AI Analytics & Governance Cockpit, individuals and enterprise admins audit every conversation, action trace, and per-member token consumption while customizing allowed or blocked actions inside immutable system security boundaries.",
    ],
    highlights: [
      "Built-in interactive guidance across modules",
      "Audit dashboard, action trace & per-member tokens",
      "Granular allowed / blocked action policies",
      "Secure PDF, XLSX, DOCX & ZIP import/export",
    ],
  },
};
