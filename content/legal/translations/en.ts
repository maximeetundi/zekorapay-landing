export interface LegalSection {
  title: string;
  body: string;
}

export interface LocalizedLegal {
  privacy: LegalSection[];
  terms: LegalSection[];
}

// Content ported as-is from landing-page-laravel/resources/views/pages/{privacy,terms}/en.blade.php
// — deliberately minimal (the original terms doc already labeled itself a
// "template document"). This is NOT a lawyer-drafted privacy policy/ToS;
// have it properly reviewed before real use, especially for a financial
// service handling KYC and payment data.
export const en: LocalizedLegal = {
  privacy: [
    {
      title: "1. Information collection",
      body: "We collect information when you register on our site, log into your account, make a purchase or transaction. The information includes your name, email and phone number.",
    },
    {
      title: "2. Use of information",
      body: "Any of the information we collect may be used to personalize your experience, improve ZekoraPay and contact you by email or SMS for security alerts.",
    },
    {
      title: "3. Information security",
      body: "We implement a variety of security measures to maintain the safety of your personal information with state-of-the-art encryption.",
    },
  ],
  terms: [
    {
      title: "1. Acceptance of terms",
      body: "By accessing and using ZekoraPay's services, you agree to be bound by these terms of use. If you do not accept these terms, please do not use our services.",
    },
    {
      title: "2. Description of service",
      body: "ZekoraPay provides a financial platform allowing the management of savings groups (tontines), money transfers, and payment services for associations and enterprises.",
    },
    {
      title: "3. Privacy and data protection",
      body: "Your personal data is processed in accordance with our privacy policy. We implement strict security measures to protect your information.",
    },
    {
      title: "4. User responsibilities",
      body: "You agree to use ZekoraPay in a legal and ethical manner. Any fraudulent use will result in immediate suspension of your account.",
    },
    {
      title: "5. Disclaimer",
      body: "This is a template document. Please consult legal counsel for terms tailored to your jurisdiction.",
    },
  ],
};
