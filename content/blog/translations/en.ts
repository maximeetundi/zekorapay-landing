export interface LocalizedBlogPost {
  title: string;
  excerpt: string;
  body: string[];
}

// Content ported as-is from landing-page-laravel/database/seeders/PostSeeder.php
export const en: Record<string, LocalizedBlogPost> = {
  "lancement-de-zekorapay": {
    title: "ZekoraPay: The African Fintech Revolutionizing Your Finances",
    excerpt:
      "ZekoraPay is the all-in-one platform for payments, digital savings groups, transfers, and B2B financial services in Africa. Discover how we simplify financial access for millions of people.",
    body: [
      "Financial inclusion remains one of Africa's most pressing challenges. Today, more than 500 million Africans still lack access to traditional banking. That's exactly the problem ZekoraPay is tackling.",
      "ZekoraPay is a next-generation financial platform designed specifically for the needs of Africans, whether on the continent or in the diaspora. Our app brings together, in one place: instant payments via QR code and mobile money, secure digital savings groups (tontines) for your communities, international money transfers with low fees, B2B solutions for businesses and associations, integrated video meetings for savings group decisions, and a built-in e-commerce marketplace for sellers.",
      "ZekoraPay is built on three essential pillars: accessibility (works even with limited internet connectivity), security (end-to-end encryption and two-factor authentication), and trust (transparent pricing with no hidden fees).",
      "Thousands of users already trust ZekoraPay to manage their daily finances, organize family savings groups, and grow their businesses. Download the app today and join the movement!",
    ],
  },
  "tontine-digitale-epargne-communautaire": {
    title: "Digital Savings Groups: Manage Your Community Savings Securely",
    excerpt:
      "The tontine is an age-old African collective savings tradition. ZekoraPay digitalizes it to make it safer, more transparent, and accessible anywhere in the world. Complete guide.",
    body: [
      "A tontine (also called \"njangi\", \"susu\", or \"likelembé\" depending on the region) is a traditional collective savings system widespread in Africa. A group of people meets regularly and each member contributes a fixed amount. In turn, each participant receives the total pot.",
      "Despite their popularity, traditional tontines come with several risks: risk of a member defaulting on payments, no payment traceability, difficulty for diaspora members to participate, and no protection in case of disputes.",
      "On ZekoraPay, creating and managing a savings group is simple and secure: create your group (name, members, amount, contribution frequency), invite your members by phone or shared link, get automatic contributions (payments deducted at each deadline), enjoy a transparent payout order (lottery or agreed order, everything is recorded), and hold your assemblies directly in the app with integrated video meetings.",
      "With ZekoraPay, your tontine benefits from a complete history of all payments, automatic notifications of upcoming deadlines, dispute protection via our mediation service, worldwide access for diaspora members, and automatic financial reports for the group.",
      "\"Since we started using ZekoraPay for our family tontine, no more payment delays! Everything is automatic and everyone sees payments in real time.\" — Marie K., ZekoraPay tontine member since 2024",
      "Join thousands of communities that already trust ZekoraPay for their collective savings. Download the app and create your first tontine in less than 5 minutes!",
    ],
  },
  "transferts-argent-afrique-diaspora": {
    title: "Money Transfers to Africa: Cheaper, Faster with ZekoraPay",
    excerpt:
      "Money transfer fees to Africa are among the highest in the world. ZekoraPay offers transparent rates and instant transfers for the African diaspora.",
    body: [
      "Every year, the African diaspora sends more than $100 billion to the African continent. These transfers serve as an economic lifeline for millions of families. Yet the fees charged by traditional operators remain exorbitant. According to the World Bank, the average cost of a transfer to sub-Saharan Africa exceeds 8% — well above the 3% target of the UN's Sustainable Development Goals.",
      "ZekoraPay uses modern payment infrastructure to drastically reduce these costs: direct connections with local banks and mobile money operators, speed (transfer received in seconds to minutes), transparent fees (you see exactly what you pay before sending), and maximum security (all transactions are encrypted and traceable).",
      "Sending money with ZekoraPay in 4 steps: select the country and destination currency, enter the amount (you'll immediately see the received amount and fees), choose the reception method (mobile money, bank account, or cash pickup), and confirm with your PIN or biometrics — it's sent!",
      "ZekoraPay currently covers the main transfer corridors to Cameroon (MTN, Orange Money), Senegal (Wave, Orange Money), Côte d'Ivoire (MTN, Moov), DR Congo (M-Pesa, Airtel Money), Ghana (MTN MoMo, Vodafone Cash), and Nigeria (bank transfers).",
      "Calculate your potential savings with our free simulator available directly in the app. The African diaspora deserves modern, affordable financial services — that's the ZekoraPay promise.",
    ],
  },
};
