// Contenu du guide utilisateur, en français. Porté et condensé depuis
// l'ancien guide Laravel (resources/views/guide/*.blade.php et
// resources/docs — voir DocumentSeeder.php) et vérifié contre les vraies
// routes/permissions backend auditées cette session (association-service,
// enterprise-service/rental_module_handler.go, shop-service, card-service) —
// pas de fonctionnalité inventée.

export interface GuideStep {
  title: string;
  description: string;
  pinRequired?: boolean;
}

export interface GuideImage {
  src: string;
  alt: string;
}

export interface GuideSection {
  heading: string;
  intro?: string;
  steps?: GuideStep[];
  bullets?: string[];
  images?: GuideImage[];
}

export interface LocalizedGuide {
  title: string;
  tagline: string;
  sections: GuideSection[];
}

export const fr: Record<string, LocalizedGuide> = {
  demarrage: {
    title: "Créer et sécuriser son compte",
    tagline: "Inscription, vérification d'identité (KYC) et sécurité du code PIN.",
    sections: [
      {
        heading: "Inscription",
        steps: [
          { title: "Numéro ou email", description: "Saisissez votre numéro de téléphone (format international) ou votre adresse email." },
          { title: "Code OTP", description: "Un code à usage unique vous est envoyé par SMS ou email. Validez-le." },
          { title: "Code PIN", description: "Créez votre code PIN secret à 5 chiffres via un clavier virtuel anti-keylogger : l'ordre des touches est mélangé aléatoirement à chaque affichage.", pinRequired: true },
        ],
      },
      {
        heading: "Vérification d'identité (KYC)",
        intro: "Pour débloquer les limites de dépôt et de transfert, votre identité doit être vérifiée.",
        steps: [
          { title: "Pièce d'identité", description: "Photographiez votre carte d'identité ou votre passeport." },
          { title: "Selfie de vérification", description: "Prenez un court selfie ou une vidéo de vérification." },
          { title: "Validation", description: "Une fois validé, votre compte passe au statut « Vérifié » et vos limites augmentent." },
        ],
      },
      {
        heading: "Types de profils",
        bullets: [
          "Particulier — profil standard, pour un usage personnel.",
          "Agent — partenaire ZekoraPay qui traite les dépôts et retraits en espèces pour d'autres utilisateurs.",
          "Entreprise — nécessite des documents d'entreprise, débloque le module entreprise (employés, paie, boutique, événements, gestion locative).",
        ],
      },
      {
        heading: "Sécurité du code PIN",
        intro: "Chaque action financière sensible (paiement, retrait, vote de gouvernance, distribution de trésorerie…) déclenche la même séquence de sécurité :",
        bullets: [
          "Clavier virtuel anti-keylogger — les touches sont mélangées à chaque affichage, un logiciel malveillant ne peut pas déduire l'ordre de saisie.",
          "Chiffrement RSA-OAEP côté client — le PIN est chiffré avec une clé publique avant de quitter votre appareil ; seul le serveur possède la clé privée.",
          "Validation serveur — l'action n'est exécutée qu'après vérification de la signature côté serveur.",
          "Traçabilité totale — chaque transaction, vote ou approbation est horodaté et conservé de façon immuable.",
        ],
      },
    ],
  },

  "depots-retraits": {
    title: "Dépôts et retraits",
    tagline: "Alimenter son portefeuille et récupérer ses fonds, par mobile money, carte, agent ou crypto.",
    sections: [
      {
        heading: "Alimenter son portefeuille (dépôt)",
        steps: [
          { title: "Mobile Money", description: "Indiquez le montant, choisissez votre opérateur, saisissez votre numéro et validez via le prompt USSD reçu sur votre téléphone." },
          { title: "Carte bancaire", description: "Renseignez les informations de votre carte (Visa/Mastercard) dans une interface chiffrée avec vérification 3D Secure." },
          { title: "Agent ZekoraPay (espèces)", description: "Trouvez l'agent le plus proche dans l'app, scannez son QR code, remettez vos espèces en échange de monnaie électronique." },
          { title: "Dépôt en cryptomonnaie", description: "Chaque portefeuille dispose d'une adresse de dépôt dédiée par blockchain supportée. Les dépôts sont détectés automatiquement par un scanner de blocs et crédités après confirmation sur le réseau." },
        ],
      },
      {
        heading: "Retirer des fonds",
        steps: [
          { title: "Vers Mobile Money", description: "Transférez le solde de votre portefeuille vers n'importe quel numéro compatible.", pinRequired: true },
          { title: "Vers un compte bancaire", description: "Retrait par virement classique, traité sous quelques jours ouvrables.", pinRequired: true },
          { title: "Chez un agent", description: "Initiez le retrait dans l'app puis récupérez l'argent physique auprès d'un agent ZekoraPay.", pinRequired: true },
        ],
      },
    ],
  },

  "tontines-associations": {
    title: "Tontines et associations",
    tagline: "Gestion complète des cotisations, votes et trésorerie de groupe, avec traçabilité totale.",
    sections: [
      {
        heading: "Les acteurs",
        bullets: [
          "Membre — participe à l'association, paie ses cotisations, vote sur les décisions.",
          "Bureau (Président / Trésorier / Secrétaire) — administre l'association, valide les adhésions, gère la trésorerie.",
          "Plateforme ZekoraPay — infrastructure de sécurité : isolation des portefeuilles par association, aucune fuite de fonds possible entre deux groupes.",
        ],
      },
      {
        heading: "En tant que membre",
        steps: [
          { title: "Explorer", description: "Parcourez les associations publiques et filtrez par type (tontine, épargne, solidarité)." },
          { title: "Rejoindre", description: "Soumettez une demande d'adhésion depuis l'explorateur ou un lien d'invitation ; elle est ensuite approuvée par le Bureau." },
          { title: "Payer sa cotisation", description: "Réglez votre cotisation périodique depuis le portefeuille de l'association.", pinRequired: true },
          { title: "Voter", description: "Votez sur les résolutions de gouvernance (élections, distributions, exclusions) ; chaque vote est signé et définitif.", pinRequired: true },
        ],
        images: [
          { src: "/guide/association/stage1_explorer_fr.png", alt: "Explorateur d'associations" },
          { src: "/guide/association/stage5_my_associations_fr.png", alt: "Mes associations" },
          { src: "/guide/association/pin_modal_contrib_fr.png", alt: "Modal PIN — paiement de cotisation" },
          { src: "/guide/association/pin_modal_vote_fr.png", alt: "Modal PIN — vote de gouvernance" },
        ],
      },
      {
        heading: "En tant que Bureau",
        steps: [
          { title: "Créer une association", description: "Configurez l'identité, la monnaie de base, les règles financières et les paramètres membres en 3 étapes." },
          { title: "Approuver les membres", description: "Validez ou refusez les demandes d'adhésion.", pinRequired: true },
          { title: "Enregistrer une cotisation en espèces", description: "Quand un membre paie en réunion, le trésorier l'enregistre manuellement pour garantir la traçabilité.", pinRequired: true },
          { title: "Générer les cotisations groupées", description: "Créez en un clic les cotisations de la période pour tous les membres actifs.", pinRequired: true },
          { title: "Distribuer la trésorerie", description: "Versez la cagnotte au bénéficiaire du tour ; action irréversible.", pinRequired: true },
          { title: "Organiser une réunion", description: "Créez, gérez et clôturez les réunions ; la clôture (règlement des cotisations) nécessite le PIN.", pinRequired: true },
          { title: "Lancer une élection", description: "Proposez un nouveau bureau ; tous les membres votent avec leur PIN.", pinRequired: true },
        ],
        images: [
          { src: "/guide/association/stage2_create_identity_fr.png", alt: "Création d'une association" },
          { src: "/guide/association/stage7_tab_members_fr.png", alt: "Approbation des membres" },
          { src: "/guide/association/pin_modal_distribution_fr.png", alt: "Modal PIN — distribution de trésorerie" },
          { src: "/guide/association/stage10_tab_meetings_fr.png", alt: "Onglet réunions" },
        ],
      },
      {
        heading: "Workspace de l'association",
        bullets: [
          "Onglet Membres — liste et gestion des adhérents.",
          "Onglet Cotisations — suivi des paiements dus et effectués.",
          "Onglet Trésorerie — solde, historique des distributions.",
          "Onglet Réunions — calendrier et comptes-rendus.",
          "Onglet Gouvernance — résolutions et élections en cours.",
          "Onglet Discussion — messagerie du groupe.",
        ],
        images: [
          { src: "/guide/association/stage6_tab_overview_fr.png", alt: "Vue d'ensemble du workspace" },
          { src: "/guide/association/stage8_tab_contrib_fr.png", alt: "Onglet cotisations" },
          { src: "/guide/association/stage9_tab_treasury_fr.png", alt: "Onglet trésorerie" },
          { src: "/guide/association/stage11_tab_governance_fr.png", alt: "Onglet gouvernance" },
          { src: "/guide/association/stage12_tab_chat_fr.png", alt: "Onglet discussion" },
        ],
      },
      {
        heading: "Sur mobile",
        intro: "Toutes les fonctionnalités sont disponibles sur mobile, l'interface s'adapte automatiquement.",
        images: [
          { src: "/guide/association/association_mobile_explorer_fr.png", alt: "Explorateur (mobile)" },
          { src: "/guide/association/association_mobile_create_fr.png", alt: "Création (mobile)" },
          { src: "/guide/association/association_mobile_my_fr.png", alt: "Mes associations (mobile)" },
          { src: "/guide/association/association_mobile_workspace_fr.png", alt: "Workspace (mobile)" },
        ],
      },
    ],
  },

  "evenements-billetterie": {
    title: "Événements et billetterie",
    tagline: "Créer un événement, vendre des billets et valider les entrées.",
    sections: [
      {
        heading: "Créer un événement",
        intro: "Tout utilisateur connecté — particulier, entreprise ou association — peut créer un événement et en devient automatiquement l'organisateur.",
        bullets: [
          "Informations générales — titre, description, lieu (ou lien virtuel), image de couverture.",
          "Dates et devise — début/fin de l'événement, ouverture/clôture des ventes, devise du portefeuille.",
          "Formulaire acheteur personnalisable — champs texte, email, téléphone, liste déroulante, case à cocher.",
          "Catégories de billets (tiers) — nom, prix (0 pour gratuit), quantité disponible, limite par acheteur, couleur et icône.",
        ],
        images: [
          { src: "/guide/events/stage2_event_create_fr.png", alt: "Formulaire de création d'événement" },
          { src: "/guide/events/stage2b_event_create_filled_fr.png", alt: "Formulaire rempli" },
        ],
      },
      {
        heading: "Actions de l'organisateur",
        steps: [
          { title: "Suivre les ventes", description: "Tableau de bord : billets vendus par catégorie, revenus totaux, taux de remplissage." },
          { title: "Retirer les fonds", description: "Retirez le solde collecté vers le portefeuille de votre choix.", pinRequired: true },
          { title: "Annuler l'événement", description: "Les acheteurs sont automatiquement remboursés." },
          { title: "Partager le code/QR", description: "Chaque événement a un code unique (ex. EVT-ABC123) et un QR téléchargeable ou partageable." },
          { title: "Scanner les billets", description: "Validez les entrées par scan caméra ou saisie manuelle du code billet." },
        ],
        images: [
          { src: "/guide/events/stage5_my_events_fr.png", alt: "Mes événements" },
          { src: "/guide/events/stage6_event_detail_fr.png", alt: "Détail d'un événement" },
        ],
      },
      {
        heading: "Acheter un billet",
        steps: [
          { title: "Trouver l'événement", description: "Depuis le catalogue ou via son code unique." },
          { title: "Choisir une catégorie et la quantité", description: "Dans la limite du stock et du maximum par acheteur." },
          { title: "Confirmer", description: "Le montant est débité du portefeuille et un QR unique est généré.", pinRequired: true },
        ],
        images: [
          { src: "/guide/events/stage1_explorer_fr.png", alt: "Catalogue des événements" },
          { src: "/guide/events/pin_modal_purchase_fr.png", alt: "Modal PIN — achat de billet" },
          { src: "/guide/events/stage_qr_ticket_fr.png", alt: "Billet avec QR code" },
        ],
      },
      {
        heading: "Statuts",
        bullets: [
          "Événement — brouillon, actif, terminé, annulé.",
          "Billet — payé (valide à l'entrée), utilisé (entrée déjà validée).",
        ],
      },
    ],
  },

  entreprises: {
    title: "Module Entreprise",
    tagline: "Employés, paie, facturation et modules additionnels pour les comptes professionnels.",
    sections: [
      {
        heading: "Gestion des employés",
        bullets: [
          "Invitez des collaborateurs et attribuez-leur un rôle (administrateur ou employé) avec des permissions précises.",
          "Chaque permission accordée à un administrateur ne peut jamais dépasser celles de la personne qui l'accorde.",
          "Configurez le mode de paiement de chaque employé (portefeuille ZekoraPay ou Mobile Money).",
        ],
      },
      {
        heading: "Paie et finances",
        bullets: [
          "Paiement groupé des salaires en un clic.",
          "Suivi des comptes et soldes de l'entreprise.",
          "Gestion des services et de la facturation de l'entreprise.",
        ],
      },
      {
        heading: "Modules additionnels",
        bullets: [
          "Boutique en ligne rattachée à l'entreprise.",
          "Campagnes de dons pour l'entreprise.",
          "Gestion locative (biens, baux, paiements de loyers).",
          "Événements organisés au nom de l'entreprise.",
        ],
      },
    ],
  },

  boutique: {
    title: "Boutique ZekoraPay",
    tagline: "Vendre en ligne, que vous soyez un particulier ou une entreprise.",
    sections: [
      {
        heading: "Une boutique, deux profils possibles",
        intro: "Une boutique peut être créée et gérée par un particulier ou par une entreprise — les fonctionnalités de vente sont identiques des deux côtés.",
      },
      {
        heading: "Créer sa boutique",
        bullets: [
          "Informations de la boutique — nom, description, catégories.",
          "Produits — nom, prix, stock, images, catégorie.",
          "Avis clients visibles sur chaque produit.",
        ],
      },
      {
        heading: "Vendre",
        bullets: [
          "Recevez les commandes directement dans votre espace boutique.",
          "Suivez le statut de chaque commande jusqu'à sa livraison.",
          "Les paiements sont encaissés directement dans votre portefeuille ZekoraPay.",
        ],
      },
      {
        heading: "Pour les clients",
        bullets: [
          "Parcourez les produits par boutique ou par catégorie.",
          "Laissez un avis après achat.",
          "Suivez vos commandes en cours.",
        ],
      },
    ],
  },

  cartes: {
    title: "Cartes ZekoraPay",
    tagline: "Cartes prépayées virtuelles ou physiques, personnelles ou d'entreprise.",
    sections: [
      {
        heading: "Types de cartes",
        bullets: [
          "Carte virtuelle — disponible immédiatement, pour les paiements en ligne.",
          "Carte physique — livrée par courrier, pour les paiements en boutique et aux distributeurs.",
          "Carte cadeau — montant prédéfini, à offrir.",
        ],
      },
      {
        heading: "Gestion de la carte",
        bullets: [
          "Rechargez votre carte depuis votre portefeuille, manuellement ou via une recharge automatique configurable.",
          "Gelez ou débloquez votre carte instantanément en cas de perte ou de doute.",
          "Définissez des limites de dépense personnalisées.",
          "Consultez l'historique détaillé des transactions de la carte.",
        ],
      },
    ],
  },
};
