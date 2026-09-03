import type { LocalizedFeature } from "./en";

export const fr: Record<string, LocalizedFeature> = {
  wallet: {
    body: [
      "Votre portefeuille ZekoraPay centralise vos soldes en devises locales (FCFA et bien d'autres) et en crypto-monnaies (Bitcoin, Ethereum, USDT, et plus) dans une seule application, avec un historique complet de chaque mouvement.",
      "Chaque dépôt, retrait ou transaction est protégé par votre code PIN personnel, avec un chiffrement de bout en bout sur vos données sensibles. Vous pouvez ouvrir plusieurs portefeuilles selon vos devises d'usage et suivre votre solde en temps réel.",
    ],
    highlights: [
      "Devises locales et crypto-monnaies",
      "Historique complet des transactions",
      "Protection par code PIN",
      "Suivi du solde en temps réel",
    ],
  },
  transfer: {
    body: [
      "Envoyez et recevez de l'argent en temps réel, entre utilisateurs ZekoraPay ou vers des comptes mobile money et bancaires, partout où nos partenaires opèrent.",
      "Chaque transfert affiche les frais avant confirmation — aucune surprise. Les transferts internationaux passent par une infrastructure de paiement moderne pour rester rapides et abordables, avec un suivi de statut à chaque étape.",
    ],
    highlights: [
      "Transferts en temps réel",
      "Frais transparents avant envoi",
      "Mobile money et virements bancaires",
      "Suivi de statut à chaque étape",
    ],
  },
  cards: {
    body: [
      "Émettez des cartes virtuelles instantanément ou commandez une carte physique, liées à votre portefeuille personnel ou à un compte d'entreprise, pour payer partout où les cartes sont acceptées.",
      "Chargez et retirez vers votre portefeuille à tout moment, avec des plafonds personnalisables et une vérification par code PIN sur chaque opération sensible pour une sécurité renforcée.",
    ],
    highlights: [
      "Cartes virtuelles instantanées",
      "Cartes physiques sur demande",
      "Plafonds personnalisables",
      "Chargement et retrait sécurisés par PIN",
    ],
  },
  exchange: {
    body: [
      "Convertissez entre devises locales et crypto-monnaies directement dans l'application, avec un taux affiché avant confirmation et une exécution immédiate.",
      "Que vous échangiez du FCFA contre du Bitcoin ou entre deux devises locales, chaque conversion passe par un moteur de cotation en temps réel pour vous garantir un taux juste au moment de la transaction.",
    ],
    highlights: [
      "Change devises locales ↔ crypto",
      "Taux affiché avant confirmation",
      "Exécution immédiate",
      "Historique de vos conversions",
    ],
  },
  qr: {
    body: [
      "Acceptez des paiements instantanés via QR code dans votre commerce, sur un marché ou lors d'un événement associatif, sans terminal de paiement physique.",
      "Le client scanne le code, confirme le montant avec son propre code PIN, et le paiement est crédité immédiatement sur votre portefeuille marchand — idéal pour les commerçants comme pour les associations qui collectent des cotisations en personne.",
    ],
    highlights: [
      "Aucun terminal physique requis",
      "Paiement confirmé par le client",
      "Crédit immédiat au portefeuille marchand",
      "Adapté aux commerces et associations",
    ],
  },
  tontines: {
    body: [
      "Créez et gérez numériquement vos tontines et associations d'épargne : cotisations automatiques, tour de rôle transparent pour les décaissements, gestion de trésorerie collective, prêts entre membres et fonds d'urgence.",
      "La gouvernance de votre association est intégrée : élection des rôles (président, trésorier, secrétaire), votes d'approbation à la majorité pour les décisions financières importantes, et réunions vidéo directement dans l'app pour vos assemblées.",
    ],
    highlights: [
      "Cotisations automatiques et suivi transparent",
      "Prêts entre membres et fonds d'urgence",
      "Gouvernance : élections et votes intégrés",
      "Réunions vidéo pour vos assemblées",
    ],
  },
  enterprise: {
    body: [
      "Ouvrez un compte professionnel pour votre entreprise, gérez vos employés avec des rôles et permissions personnalisés, et centralisez votre trésorerie d'entreprise.",
      "Automatisez la gestion de la paie de vos employés, suivez votre facturation et vos abonnements, gérez votre parc de cartes professionnelles, et pilotez même un module de gestion locative (biens, baux, locataires) pour les entreprises immobilières — le tout depuis un seul tableau de bord.",
    ],
    highlights: [
      "Comptes professionnels multi-employés",
      "Paie automatisée",
      "Facturation et abonnements",
      "Module de gestion locative",
    ],
  },
  shop: {
    body: [
      "Ouvrez votre boutique en ligne, qu'elle soit gérée à titre personnel ou par votre entreprise, gérez votre catalogue produits, votre stock et vos commandes, et acceptez les paiements directement intégrés.",
      "Chaque boutique dispose de son propre portefeuille dédié pour isoler ses revenus, d'une équipe de gestionnaires avec permissions dédiées, et d'un système d'avis clients pour construire votre réputation.",
    ],
    highlights: [
      "Boutique individuelle ou d'entreprise",
      "Gestion catalogue, stock et commandes",
      "Portefeuille dédié par boutique",
      "Avis clients et équipe de gestionnaires",
    ],
  },
  donations: {
    body: [
      "Créez des campagnes de collecte de fonds pour une cause personnelle ou pour votre entreprise, partagez-les avec votre communauté, et suivez les dons reçus en temps réel.",
      "Chaque campagne dispose de son propre portefeuille de collecte, avec des reversements transparents vers l'organisateur une fois les objectifs atteints ou selon vos besoins.",
    ],
    highlights: [
      "Campagnes personnelles ou d'entreprise",
      "Suivi des dons en temps réel",
      "Portefeuille dédié par campagne",
      "Reversements transparents",
    ],
  },
  events: {
    body: [
      "Créez et gérez vos événements, vendez des billets en ligne directement dans l'app, et contrôlez les entrées le jour J en scannant les billets de vos participants.",
      "Suivez vos ventes et vos revenus en temps réel, gérez les remboursements si nécessaire, et donnez à vos organisateurs un accès dédié pour piloter l'événement de bout en bout.",
    ],
    highlights: [
      "Vente de billets en ligne",
      "Scan et contrôle des entrées",
      "Suivi des ventes en temps réel",
      "Gestion des remboursements",
    ],
  },
  cash: {
    body: [
      "Notre réseau d'agents de proximité permet à toute personne, même sans compte bancaire, de déposer ou retirer des espèces localement pour alimenter ou vider son portefeuille ZekoraPay.",
      "Chaque opération d'agent est doublement sécurisée par code PIN, avec des plafonds quotidiens et une vérification d'identité, pour rendre les services financiers accessibles partout, y compris là où les banques traditionnelles ne sont pas présentes.",
    ],
    highlights: [
      "Dépôts et retraits d'espèces locaux",
      "Accessible sans compte bancaire",
      "Double vérification par code PIN",
      "Réseau d'agents de proximité",
    ],
  },
  video: {
    body: [
      "Discutez en messagerie directe ou en groupe avec vos contacts, vos équipes d'entreprise ou les membres de votre association, avec partage de fichiers et notifications en temps réel.",
      "Tenez vos réunions et assemblées en visioconférence directement dans l'application — particulièrement utile pour les décisions de tontine, les conseils d'administration d'entreprise, ou simplement rester connecté avec vos proches.",
    ],
    highlights: [
      "Messagerie individuelle et de groupe",
      "Réunions vidéo intégrées",
      "Partage de fichiers",
      "Notifications en temps réel",
    ],
  },
  ai: {
    body: [
      "Un assistant intelligent intégré pour vous accompagner dans l'application : réponses à vos questions, alertes automatiques de cotisations et d'échéances, et génération de rapports pour vos tontines ou votre entreprise.",
      "L'assistant s'appuie sur les données réelles de votre compte pour vous donner des réponses pertinentes, sans jamais avoir accès à vos identifiants ou codes de sécurité.",
    ],
    highlights: [
      "Assistant conversationnel intégré",
      "Alertes automatiques de cotisations",
      "Rapports générés automatiquement",
      "Jamais d'accès à vos identifiants",
    ],
  },
};
