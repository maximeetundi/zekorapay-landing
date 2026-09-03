// Contenu du guide utilisateur, en français. Chaque sujet est vérifié en
// conditions réelles (connexion live à app.zekorapay.com, compte de test)
// le 2026-09-03 — captures d'écran et libellés d'interface pris tels quels,
// aucune fonctionnalité inventée. Les sujets tontines-associations et
// evenements-billetterie réutilisent en plus les vraies captures déjà
// produites pour l'ancien guide Laravel (resources/views/guide/*.blade.php).

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
        heading: "Inscription — 3 étapes",
        intro: "Un assistant en 3 étapes : Identité, Contact, puis Sécurité.",
        steps: [
          { title: "1. Identité", description: "Prénom, nom et date de naissance." },
          { title: "2. Contact", description: "Choisissez Email ou Téléphone comme méthode de contact, puis indiquez votre pays." },
          { title: "3. Sécurité", description: "Validez le code OTP reçu par email ou SMS, puis créez votre code PIN secret à 5 chiffres via un clavier virtuel anti-keylogger.", pinRequired: true },
        ],
        images: [
          { src: "/guide/demarrage/register_identity.png", alt: "Étape 1 — Identité" },
          { src: "/guide/demarrage/register_contact_email.png", alt: "Étape 2 — Contact par email" },
        ],
      },
      {
        heading: "Vérification d'identité (KYC)",
        intro: "Pour débloquer les limites de dépôt et de transfert, votre identité doit être vérifiée. Une fois validée, le badge « Vérifié » apparaît dans Paramètres → Vérification d'identité.",
        steps: [
          { title: "Pièce d'identité", description: "Photographiez votre carte d'identité ou votre passeport." },
          { title: "Selfie de vérification", description: "Prenez un court selfie ou une vidéo de vérification." },
          { title: "Validation", description: "Une fois validé, votre compte passe au statut « Vérifié » et vos limites augmentent." },
        ],
      },
      {
        heading: "Tableau de bord",
        intro: "Après connexion, le tableau de bord regroupe en un coup d'œil vos portefeuilles, vos dernières transactions et vos cartes.",
        images: [{ src: "/guide/demarrage/dashboard.png", alt: "Tableau de bord ZekoraPay" }],
      },
      {
        heading: "Paramètres du compte",
        intro: "La page Paramètres centralise tout : profil, sécurité (mot de passe, 2FA, sessions), vérification d'identité, préférences, notifications, méthodes de paiement, numéros de dépôt Mobile Money, clés API développeur, limites et PIN de vos cartes, paramètres entreprise, activation en tant qu'agent, et gestion locative.",
        images: [{ src: "/guide/demarrage/settings.png", alt: "Page Paramètres" }],
      },
      {
        heading: "Actions en attente",
        intro: "Un centre d'approbation unique regroupe toutes les décisions qui vous attendent, quel que soit le module concerné : entreprises, associations, invitations et locations.",
        images: [{ src: "/guide/demarrage/pending_actions.png", alt: "Actions en attente" }],
      },
      {
        heading: "Types de profils",
        bullets: [
          "Particulier — profil standard, pour un usage personnel.",
          "Agent — activable depuis Paramètres → Agent particulier ; traite les dépôts et retraits en espèces pour d'autres utilisateurs contre commission.",
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
          "Ne communiquez jamais votre code PIN à qui que ce soit, pas même à un agent ZekoraPay — chacun valide toujours une opération depuis son propre compte.",
        ],
      },
    ],
  },

  portefeuilles: {
    title: "Portefeuilles",
    tagline: "Un portefeuille multi-devises pour vos monnaies locales et vos cryptomonnaies, avec épargne rémunérée.",
    sections: [
      {
        heading: "Vue d'ensemble",
        intro: "La page « Mes Portefeuilles » regroupe tous vos comptes : devises fiduciaires (XAF, EUR…) et cryptomonnaies (BTC, USDC, XRP…), chacun avec son solde, son adresse de dépôt pour les cryptos, et ses actions rapides.",
        bullets: [
          "Solde protégé — le solde du portefeuille principal peut être masqué et nécessite de cliquer sur « Déverrouiller » pour s'afficher.",
          "Recharger — alimente le portefeuille.",
          "Envoyer — ouvre le formulaire de transfert avec ce portefeuille pré-sélectionné comme source.",
          "Gérer — renommer, voir l'historique détaillé ou configurer un portefeuille.",
          "+ Nouveau — crée un portefeuille supplémentaire (autre devise, ou compte d'épargne dédié).",
        ],
        images: [{ src: "/guide/portefeuilles/overview.png", alt: "Mes Portefeuilles — vue multi-devises" }],
      },
      {
        heading: "Recharger un portefeuille",
        intro: "Le bouton « Recharger » propose deux méthodes d'approvisionnement, selon le type de portefeuille :",
        bullets: [
          "Wallet crypto externe — dépôt on-chain via une adresse de réception dédiée (QR code fourni), pour un portefeuille crypto.",
          "Mobile Money / Carte / Virement / PayPal — achetez avec votre monnaie locale ; pour un portefeuille crypto, le crédit est automatiquement converti dans la cryptomonnaie du portefeuille.",
        ],
        images: [
          { src: "/guide/portefeuilles/recharge_options.png", alt: "Choix de la méthode de recharge" },
        ],
      },
      {
        heading: "Comptes d'épargne",
        intro: "Un compte d'épargne se crée depuis le bouton « Épargne » et génère de vrais intérêts, avec une projection affichée sur 12 mois.",
        bullets: [
          "Verrouillé — les fonds sont bloqués jusqu'à l'échéance choisie, pour sécuriser un objectif d'épargne.",
          "Déverrouillé — dépôts et retraits libres à tout moment.",
          "Taux d'intérêt — actuellement 2,50 % par an sur les comptes observés ; les intérêts gagnés et la projection à 12 mois sont recalculés en temps réel.",
        ],
        images: [{ src: "/guide/portefeuilles/savings_accounts.png", alt: "Comptes d'épargne" }],
      },
      {
        heading: "Virement entre vos propres portefeuilles",
        intro: "En cliquant « Déposer » sur un compte d'épargne (ou tout portefeuille secondaire), un menu « Source de paiement » liste vos autres portefeuilles : le virement se fait directement d'un de vos comptes vers un autre, sans passer par un transfert classique.",
        images: [{ src: "/guide/portefeuilles/internal_transfer.png", alt: "Virement entre portefeuilles" }],
      },
    ],
  },

  transferts: {
    title: "Transferts",
    tagline: "Envoyer de l'argent à un ou plusieurs destinataires, par 5 méthodes différentes.",
    sections: [
      {
        heading: "Transfert simple",
        intro: "Choisissez le portefeuille source, le montant, puis la méthode de réception du destinataire :",
        bullets: [
          "ZekoraPay — vers un autre utilisateur, identifié par email ou téléphone.",
          "Mobile Money — vers un numéro mobile money local.",
          "Virement bancaire — vers un compte bancaire.",
          "PayPal — vers une adresse email PayPal.",
          "Crypto — vers une adresse de portefeuille externe.",
        ],
        images: [{ src: "/guide/transferts/transfer_form.png", alt: "Formulaire de transfert" }],
      },
      {
        heading: "Transfert multiple",
        intro: "Envoyez de l'argent à plusieurs destinataires en une seule fois, chacun avec sa propre méthode de réception — pratique pour un remboursement de groupe ou une petite paie ponctuelle.",
        steps: [
          { title: "Nommer le lot", description: "Donnez un nom au lot d'envoi (ex : « Paie fournisseurs mensuelle »)." },
          { title: "Choisir le portefeuille source", description: "Sélectionnez le portefeuille qui financera l'ensemble du lot." },
          { title: "Ajouter les destinataires", description: "Chaque destinataire a son propre montant et sa propre méthode (ZekoraPay, Mobile Money, banque…)." },
          { title: "Envoyer", description: "Confirmez pour exécuter tous les transferts du lot.", pinRequired: true },
        ],
        images: [{ src: "/guide/transferts/bulk_transfer.png", alt: "Transfert multiple" }],
      },
    ],
  },

  "depots-retraits": {
    title: "Dépôts et retraits en espèces",
    tagline: "Convertir du cash en solde ZekoraPay et inversement, via le réseau d'agents.",
    sections: [
      {
        heading: "Retirer du cash chez un agent",
        steps: [
          { title: "Identifier l'agent", description: "Scannez le QR code de l'agent, ou saisissez son code de retrait et son numéro de téléphone." },
          { title: "Indiquer le montant", description: "Précisez la somme à retirer." },
          { title: "Confirmer", description: "L'agent valide l'opération depuis son propre compte ; le montant est débité du vôtre.", pinRequired: true },
        ],
        images: [{ src: "/guide/depots-retraits/withdraw_agent.png", alt: "Retirer du cash chez un agent" }],
      },
      {
        heading: "Déposer du cash chez un agent",
        intro: "Rendez-vous chez un agent ZekoraPay et montrez-lui votre QR de dépôt personnel, ou donnez-lui votre numéro de téléphone. L'agent saisit le montant et valide l'opération depuis son propre compte.",
        bullets: [
          "Ne donnez jamais votre code PIN à l'agent — il n'en a jamais besoin pour créditer votre compte.",
          "Le crédit est instantané dès validation par l'agent.",
        ],
        images: [{ src: "/guide/depots-retraits/deposit_qr.png", alt: "Déposer du cash — QR de dépôt personnel" }],
      },
      {
        heading: "Autres moyens de recharge",
        intro: "Depuis « Mes Portefeuilles » → « Recharger », un dépôt est aussi possible directement par Mobile Money, carte bancaire (3D Secure), ou vers l'adresse de dépôt crypto dédiée de votre portefeuille — sans passer par un agent.",
      },
    ],
  },

  conversion: {
    title: "Conversion et change",
    tagline: "Convertir entre devises locales, ou acheter/vendre des cryptomonnaies, instantanément.",
    sections: [
      {
        heading: "Deux parcours",
        bullets: [
          "Conversion Monnaies Fiduciaires — convertit instantanément entre USD, EUR, GBP, JPY, CAD, AUD et plus, aux meilleurs taux disponibles.",
          "Acheter / Vendre Crypto — achète ou vend des cryptomonnaies instantanément contre le solde de votre portefeuille.",
        ],
        images: [{ src: "/guide/conversion/overview.png", alt: "Page Convertir" }],
      },
      {
        heading: "Conversion entre devises locales",
        intro: "Choisissez la devise et le portefeuille de départ (« Depuis »), puis la devise et le portefeuille d'arrivée (« Vers ») — un bouton central (⇄) permet d'inverser le sens en un clic.",
        bullets: [
          "Montant converti — calculé en temps réel au taux affiché (ex. 1 EUR = 655,957 XAF).",
          "Frais de service — un pourcentage fixe est prélevé sur chaque conversion (0,25 % observé) et affiché avant de confirmer.",
          "Variation 24h — indique si le taux a bougé depuis la veille.",
          "Le bouton de confirmation reste désactivé et un message « Solde insuffisant » s'affiche si le portefeuille source n'a pas assez de fonds — impossible de valider une conversion non couverte.",
        ],
        images: [{ src: "/guide/conversion/fiat_form.png", alt: "Conversion entre devises fiduciaires" }],
      },
      {
        heading: "Acheter / vendre des cryptomonnaies",
        intro: "Deux onglets, Acheter et Vendre. À l'achat : choisissez la devise et le portefeuille avec lesquels payer (« Vous payez avec »), le montant, puis la cryptomonnaie et le portefeuille crypto de destination (« Vous recevez ») — le montant reçu est calculé automatiquement.",
        bullets: [
          "Un panneau « Prix du marché » affiche en direct la cotation et la variation 24h d'une large liste de cryptomonnaies (ADA, ALGO, ATOM, AVAX, BCH, BNB…), même celles que vous ne détenez pas encore.",
          "Le bouton ⇄ inverse le sens de l'opération (achat ↔ vente) sans avoir à ressaisir les devises.",
        ],
        images: [{ src: "/guide/conversion/crypto_form.png", alt: "Achat/vente de cryptomonnaies" }],
      },
    ],
  },

  cartes: {
    title: "Cartes",
    tagline: "Cartes prépayées virtuelles, physiques ou cadeaux, personnelles ou d'entreprise.",
    sections: [
      {
        heading: "Vos cartes",
        intro: "Les soldes sont masqués par défaut (bouton « Afficher les soldes »). Chaque carte affiche son statut :",
        bullets: [
          "Active — utilisable normalement.",
          "Gelée — temporairement bloquée par vous, réactivable à tout moment.",
          "Bloquée — bloquée définitivement (perte, fraude).",
          "Expirée — date de validité dépassée, à renouveler.",
        ],
        images: [{ src: "/guide/cartes/overview.png", alt: "Mes Cartes" }],
      },
      {
        heading: "Types de cartes",
        bullets: [
          "Carte virtuelle — disponible immédiatement, pour les paiements en ligne.",
          "Carte physique — livrée par courrier, pour les paiements en boutique et aux distributeurs.",
          "Carte cadeau — montant prédéfini, à offrir.",
        ],
      },
      {
        heading: "Gérer une carte",
        intro: "Cliquez sur une carte pour ouvrir son espace de gestion complet : numéro masqué (révélable), CVV masqué (révélable), solde masqué, statistiques rapides (dépenses du mois, nombre de transactions, frais du mois, statut).",
        bullets: [
          "Geler la carte — bloque instantanément les paiements, réversible en un clic.",
          "Recharger — alimente la carte depuis un portefeuille.",
          "Vers un portefeuille — sens inverse : renvoie le solde de la carte vers un de vos portefeuilles.",
          "Limites de dépense — plafond journalier et mensuel, chacun modifiable séparément avec une barre de progression du montant déjà dépensé.",
          "Interrupteurs Achats en ligne / Retraits ATM — autorisent ou bloquent ces deux types d'opérations indépendamment.",
        ],
        images: [{ src: "/guide/cartes/card_management.png", alt: "Gestion d'une carte" }],
      },
    ],
  },

  "paiements-marchand": {
    title: "Scanner, payer et encaisser",
    tagline: "Un scanner unique pour payer, valider un billet ou confirmer un transfert — et un espace pour encaisser vos propres clients.",
    sections: [
      {
        heading: "Scanner un QR code",
        intro: "Un seul scanner pour trois usages, détectés automatiquement selon le contenu du code : paiement marchand, billet d'événement, ou transfert. Trois modes de saisie : caméra, image, ou code manuel.",
        images: [{ src: "/guide/paiements-marchand/scan.png", alt: "Scanner un QR code" }],
      },
      {
        heading: "Espace Marchand — encaisser vos clients",
        intro: "Créez une demande de paiement et recevez un QR code à présenter au client.",
        bullets: [
          "Prix fixe — le QR n'est utilisable qu'une seule fois, pour un montant donné.",
          "Réutilisable (« reusable ») — le même QR peut servir à encaisser plusieurs clients successivement.",
          "Le tableau de bord affiche le total reçu, le nombre de paiements et les demandes encore en attente.",
        ],
        images: [{ src: "/guide/paiements-marchand/merchant_space.png", alt: "Espace Marchand" }],
      },
    ],
  },

  "tontines-associations": {
    title: "Tontines et associations",
    tagline: "Gestion complète des cotisations, votes et trésorerie de groupe, avec traçabilité totale.",
    sections: [
      {
        heading: "Explorer les associations",
        intro: "La page Associations propose un explorateur public — filtrable par type (tontines, groupes de cotisation, groupes de solidarité) — avant de créer ou rejoindre un groupe.",
        images: [{ src: "/guide/association/explorer_live.png", alt: "Explorateur d'associations et tontines" }],
      },
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
    tagline: "Employés, paie, facturation, boutique, immobilier et bien plus pour les comptes professionnels.",
    sections: [
      {
        heading: "Deux espaces",
        bullets: [
          "Entreprises — annuaire public : découvrez les entreprises de la communauté et abonnez-vous à leurs services.",
          "Mes entreprises — pilotez les structures dont vous êtes propriétaire ou employé.",
        ],
        images: [{ src: "/guide/entreprises/dashboard.png", alt: "Tableau de bord entreprise" }],
      },
      {
        heading: "Tout ce que gère une entreprise",
        intro: "Le workspace d'une entreprise réunit, dans une même barre latérale : Employés, Abonnés, Portefeuilles entreprise, Transactions, Paie, Facturation, Gestion Locative, Boutiques, Paiement marchand, Événements, Campagnes, Finances, Gestion de stock, Services, Module Agent, Sécurité entreprise et historique des permissions.",
      },
      {
        heading: "Gestion des employés",
        intro: "L'annuaire des employés affiche le total, les actifs, les invitations en attente et la masse salariale globale — avec, pour chacun, son poste, son rôle, son statut et son salaire net.",
        bullets: [
          "Invitez des collaborateurs et attribuez-leur un rôle (administrateur ou employé) avec des permissions précises.",
          "Chaque permission accordée à un administrateur ne peut jamais dépasser celles de la personne qui l'accorde.",
          "Configurez le mode de paiement de chaque employé (portefeuille ZekoraPay ou Mobile Money).",
        ],
        images: [{ src: "/guide/entreprises/employees.png", alt: "Annuaire des employés" }],
      },
      {
        heading: "Gestion de la paie",
        intro: "La page Paie sélectionne une période (mois/année) et affiche le total d'employés, la masse salariale, les versements déjà effectués ce mois et ceux en attente, avec l'historique complet des exécutions passées.",
        steps: [
          { title: "Choisir la période", description: "Sélectionnez le mois et l'année à traiter." },
          { title: "Vérifier les montants", description: "Contrôlez la masse salariale calculée à partir du salaire net de chaque employé actif." },
          { title: "Exécuter la Paie", description: "Un clic déclenche le versement groupé vers le portefeuille ou le Mobile Money de chaque employé.", pinRequired: true },
        ],
        images: [{ src: "/guide/entreprises/payroll.png", alt: "Gestion de la Paie" }],
      },
      {
        heading: "Facturation en masse",
        intro: "Pour les entreprises de services par abonnement : importez ou saisissez les données de consommation d'un groupe de services pour générer les factures correspondantes en une fois.",
      },
      {
        heading: "Sécurité et approbations — le multi-signatures",
        intro: "Au-delà du plafond de permissions par administrateur (voir plus haut), une entreprise peut exiger qu'une action sensible soit validée par plusieurs administrateurs à la fois avant de s'exécuter.",
        bullets: [
          "Rôles & Permissions — créez des rôles personnalisés (ex. « Service Client ») et assignez-les à plusieurs employés à la fois.",
          "Règles de sécurité — exigez la validation de plusieurs administrateurs pour les actions sensibles (paiements, licenciements, changements de rôle…).",
          "Approbations en attente — liste des demandes qui attendent encore leur validation.",
          "Fonctionnement — quand une action sensible est initiée, tous les administrateurs désignés reçoivent une notification ; l'action n'est exécutée qu'une fois le nombre requis d'approbations atteint (chacune confirmée par PIN ou mot de passe).",
        ],
        images: [{ src: "/guide/entreprises/security.png", alt: "Sécurité & Approbations" }],
      },
      {
        heading: "Agence Entreprise — piloter ses propres agents",
        intro: "Module dédié aux entreprises qui gèrent plusieurs agents de dépôt/retrait pour leur propre compte : nombre d'agents actifs, limites de dépôt/retrait par zone, volume traité par jour, taux de réussite, et classement du meilleur agent.",
        images: [{ src: "/guide/entreprises/agency.png", alt: "Agence Entreprise" }],
      },
      {
        heading: "Autres modules du workspace",
        bullets: [
          "Finances — vue consolidée des comptes et transactions de l'entreprise.",
          "Gestion de stock — suivi des quantités pour les entreprises qui vendent des produits physiques.",
          "Vérification KYC — statut de vérification de l'entreprise elle-même.",
          "API Développeur — clés API dédiées à l'entreprise (voir la documentation API).",
          "Zone de danger — actions irréversibles (suppression, transfert de propriété).",
        ],
      },
    ],
  },

  "location-immobilier": {
    title: "Location et immobilier",
    tagline: "Publier et louer des logements, véhicules ou équipements.",
    sections: [
      {
        heading: "Espace Location",
        intro: "Disponible aussi bien pour un particulier que pour une entreprise (dans ce cas via l'onglet « Gestion Locative » du workspace entreprise). Trois catégories :",
        bullets: [
          "Immobilier — logements, chambres, bureaux.",
          "Véhicules — location de véhicules.",
          "Matériels — équipement à louer.",
        ],
        images: [{ src: "/guide/location-immobilier/personal_overview.png", alt: "Espace Location — catalogue" }],
      },
      {
        heading: "Deux rôles",
        bullets: [
          "Mes Locations — ce que vous louez en tant que locataire.",
          "Mes Espaces — les biens que vous proposez en tant que propriétaire/gérant, avec leur disponibilité (ex. « 6/7 libre(s) ») et leur prix mensuel.",
        ],
      },
      {
        heading: "Côté entreprise",
        intro: "Une entreprise peut gérer un vrai parc immobilier depuis « Gestion Locative » : concessions immobilières, parcs de véhicules et magasins de matériel de location, tous rattachés au portefeuille de l'entreprise.",
        images: [{ src: "/guide/location-immobilier/enterprise_rentals.png", alt: "Gestion Locative — espace entreprise" }],
      },
    ],
  },

  boutique: {
    title: "Boutique ZekoraPay",
    tagline: "Vendre en ligne, que vous soyez un particulier ou une entreprise.",
    sections: [
      {
        heading: "Marketplace",
        intro: "Trois onglets : Boutiques (parcourir), Produits, et Mes Boutiques (gérer les vôtres). Les boutiques sont classées par catégorie (Mode, Électronique, Alimentation, Beauté, Maison, Sport…).",
        images: [{ src: "/guide/boutique/marketplace.png", alt: "Marketplace boutiques" }],
      },
      {
        heading: "Créer sa boutique",
        bullets: [
          "Informations générales — nom, description, mots-clés (tags) pour la recherche.",
          "Visibilité — case à cocher « Boutique publique » pour apparaître dans le marketplace, ou boutique privée sinon.",
          "Configuration des paiements — devise de la boutique.",
          "Produits — nom, prix, stock, images, catégorie, ajoutés ensuite depuis l'espace boutique.",
          "Avis clients visibles sur chaque produit.",
        ],
        images: [{ src: "/guide/boutique/create_shop.png", alt: "Créer une boutique" }],
      },
      {
        heading: "Vendre",
        bullets: [
          "Recevez les commandes directement dans votre espace boutique.",
          "Suivez le statut de chaque commande jusqu'à sa livraison.",
          "Les paiements sont encaissés directement dans votre portefeuille ZekoraPay.",
        ],
      },
    ],
  },

  dons: {
    title: "Dons et solidarité",
    tagline: "Créer et soutenir des cagnottes et campagnes de collecte.",
    sections: [
      {
        heading: "Découvrir et soutenir",
        intro: "Recherchez une cause, filtrez par statut (en cours, terminée…). Chaque cagnotte affiche le montant récolté, son objectif (ou « Sans limite ») et sa date de fin.",
        images: [{ src: "/guide/dons/overview.png", alt: "Dons & Solidarité" }],
      },
      {
        heading: "Créer une cagnotte",
        intro: "Le formulaire de création rassemble le titre et l'histoire de la campagne, une image de couverture, et une vidéo de présentation optionnelle.",
        steps: [
          { title: "Titre et histoire", description: "Un titre accrocheur et une description qui explique le projet." },
          { title: "Image et vidéo", description: "Une image de couverture (recommandée), une vidéo de présentation optionnelle." },
          { title: "Partager", description: "Diffusez le lien de votre cagnotte pour recevoir des dons." },
          { title: "Retirer les fonds", description: "Depuis « Mes campagnes », transférez les dons reçus vers votre portefeuille.", pinRequired: true },
        ],
        images: [{ src: "/guide/dons/create_campaign.png", alt: "Créer une campagne" }],
      },
    ],
  },

  reunions: {
    title: "Réunions vidéo",
    tagline: "Appels vidéo et réunions de groupe, jusqu'à 100 participants.",
    sections: [
      {
        heading: "Démarrer ou rejoindre",
        bullets: [
          "Démarrer une réunion — lance un appel instantané.",
          "Programmer une réunion — planifie une réunion à venir, partageable par lien ou code.",
          "Rejoindre une réunion — via un lien ou un code reçu.",
        ],
        images: [{ src: "/guide/reunions/overview.png", alt: "Vidéo et réunions" }],
      },
      {
        heading: "Suivi",
        bullets: [
          "Onglet Réunions — réunions actives et à venir.",
          "Onglet Enregistrements — replays des réunions enregistrées.",
          "Onglet Historique — durée totale et historique complet.",
        ],
      },
    ],
  },

  agents: {
    title: "Devenir agent",
    tagline: "Rejoindre le réseau d'agents ZekoraPay pour traiter des dépôts et retraits en espèces — à titre personnel ou pour une entreprise.",
    sections: [
      {
        heading: "Deux façons d'être agent",
        bullets: [
          "Agent particulier — activable par n'importe quel utilisateur depuis Paramètres → Agent particulier. Vous gérez votre propre float et vos propres commissions.",
          "Agent d'entreprise (sous-agent) — vous opérez pour le compte d'une entreprise qui vous a désigné. L'interface est proche de celle d'un agent particulier, mais le float, les limites et les zones d'activité sont contrôlés par l'entreprise, pas par vous.",
        ],
      },
      {
        heading: "Portail agent particulier",
        intro: "Un code agent unique vous est attribué, à partager avec vos clients.",
        images: [{ src: "/guide/agents/portal.png", alt: "Portail Agent particulier" }],
      },
      {
        heading: "Portail agent d'entreprise",
        intro: "Si vous êtes agent pour plusieurs entreprises, vous choisissez d'abord celle avec laquelle travailler — chacune avec son propre code agent et son propre code PIN agent, à configurer avant de pouvoir traiter des opérations.",
        images: [
          { src: "/guide/agents/enterprise_select.png", alt: "Sélection de l'entreprise agent" },
          { src: "/guide/agents/enterprise_portal.png", alt: "Portail agent d'entreprise" },
        ],
      },
      {
        heading: "Traiter une opération",
        steps: [
          { title: "Dépôt client", description: "Le client vous montre son QR de dépôt ou son numéro ; vous saisissez le montant et validez depuis votre propre compte.", pinRequired: true },
          { title: "Retrait client", description: "Le client scanne votre QR ou saisit votre code agent + votre numéro ; vous remettez les espèces après validation.", pinRequired: true },
        ],
      },
      {
        heading: "Suivi de l'activité",
        bullets: [
          "Float disponible — solde utilisable pour traiter les opérations.",
          "Transactions et volume — cumul des opérations traitées.",
          "Commissions — gains cumulés sur chaque opération.",
          "Dépôts / Retraits confirmés — détail par type d'opération.",
        ],
      },
    ],
  },
};
