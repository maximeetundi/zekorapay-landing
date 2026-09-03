import type { LocalizedLegal } from "./en";

// Contenu repris tel quel de landing-page-laravel/resources/views/pages/{privacy,terms}/fr.blade.php
// — volontairement minimal (déjà annoté "document modèle" dans le terms
// d'origine). Ce n'est PAS une politique de confidentialité/CGU rédigée par
// un juriste ; à faire réviser avant tout usage réel, surtout pour un
// service financier qui traite du KYC et des données de paiement.
export const fr: LocalizedLegal = {
  privacy: [
    {
      title: "1. Collecte des informations",
      body: "Nous recueillons des informations lorsque vous vous inscrivez sur notre site, vous vous connectez à votre compte, effectuez un achat ou une transaction. Les informations incluent votre nom, e-mail et numéro de téléphone.",
    },
    {
      title: "2. Utilisation des informations",
      body: "Toutes les informations que nous recueillons peuvent être utilisées pour personnaliser votre expérience, améliorer ZekoraPay et vous contacter par e-mail ou SMS pour des alertes de sécurité.",
    },
    {
      title: "3. Sécurité des informations",
      body: "Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles avec un cryptage à la pointe de la technologie.",
    },
  ],
  terms: [
    {
      title: "1. Acceptation des conditions",
      body: "En accédant et en utilisant les services de ZekoraPay, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
    },
    {
      title: "2. Description du service",
      body: "ZekoraPay fournit une plateforme financière permettant la gestion de tontines, les transferts d'argent, et les services de paiement pour les associations et entreprises.",
    },
    {
      title: "3. Confidentialité et protection des données",
      body: "Vos données personnelles sont traitées conformément à notre politique de confidentialité. Nous mettons en œuvre des mesures de sécurité strictes pour protéger vos informations.",
    },
    {
      title: "4. Responsabilités de l'utilisateur",
      body: "Vous vous engagez à utiliser ZekoraPay de manière légale et éthique. Toute utilisation frauduleuse entraînera la suspension immédiate de votre compte.",
    },
    {
      title: "5. Avertissement",
      body: "Ceci est un document modèle. Veuillez consulter un conseiller juridique pour des conditions adaptées à votre juridiction.",
    },
  ],
};
