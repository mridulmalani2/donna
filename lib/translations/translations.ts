// Translation dictionary for Donna application
// Supports English (en) and French (fr)

export type Language = 'en' | 'fr';

export interface Translations {
  // App branding
  appName: string;
  appSubtitle: string;

  // Dashboard
  dashboardTitle: string;
  dashboardSubtitle: string;
  totalClients: string;
  totalAUM: string;
  panicIndicators: string;
  avgPriorityScore: string;

  // Client list
  searchPlaceholder: string;
  showPanicOnly: string;
  noPanicClients: string;

  // Priority scores
  priorityScore: string;
  highPriority: string;
  mediumPriority: string;
  lowPriority: string;

  // Client detail sections
  contactInformation: string;
  priorityBreakdown: string;
  assetsOverview: string;
  redFlagMovements: string;
  recentCommunications: string;
  openTopics: string;
  prospectionNetwork: string;

  // Contact info
  email: string;
  phone: string;
  address: string;
  preferredContact: string;

  // Priority breakdown
  panicSentiment: string;
  aumLevel: string;
  portfolioMovement: string;
  overdueCheckIn: string;
  daysOverdue: string;
  noOverdue: string;

  // Assets
  totalAssets: string;
  assetAllocation: string;
  equities: string;
  fixedIncome: string;
  alternatives: string;
  cash: string;
  recentChange: string;
  dominantExposure: string;
  increase: string;
  decrease: string;

  // Red flags
  severity: string;
  high: string;
  medium: string;
  low: string;
  noRedFlags: string;

  // Communications
  expandContent: string;
  collapseContent: string;
  positive: string;
  neutral: string;
  negative: string;

  // Open topics
  status: string;
  new: string;
  inProgress: string;
  pendingClient: string;
  resolved: string;
  owner: string;
  createdOn: string;
  noOpenTopics: string;

  // Chatbot
  chatbotTitle: string;
  chatbotSubtitle: string;
  askQuestion: string;
  resetChat: string;
  typeMessage: string;

  // Prospection Network
  prospectionNetworkTitle: string;
  prospectionNetworkSubtitle: string;
  networkGuardrail: string;
  connectionName: string;
  connectionRole: string;
  relationshipToClient: string;
  triggerEvent: string;
  suggestedNextStep: string;
  clickToExplore: string;

  // Common
  viewDetails: string;
  backToDashboard: string;
  loading: string;
  error: string;
  notFound: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // App branding
    appName: 'Donna',
    appSubtitle: 'Private Wealth Management',

    // Dashboard
    dashboardTitle: 'Client Prioritization Dashboard',
    dashboardSubtitle: 'Clients sorted by priority score. Focus on high-priority clients with panic indicators.',
    totalClients: 'Total Clients',
    totalAUM: 'Total AUM',
    panicIndicators: 'Panic Indicators',
    avgPriorityScore: 'Avg Priority Score',

    // Client list
    searchPlaceholder: 'Search clients by name or profession...',
    showPanicOnly: 'Show panic indicators only',
    noPanicClients: 'No clients with panic indicators found.',

    // Priority scores
    priorityScore: 'Priority Score',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',

    // Client detail sections
    contactInformation: 'Contact & Logistics',
    priorityBreakdown: 'Priority Score Breakdown',
    assetsOverview: 'Assets Under Management Overview',
    redFlagMovements: 'Red-Flag Asset Movements',
    recentCommunications: 'Recent Communications',
    openTopics: 'Open Topics & Follow-Ups',
    prospectionNetwork: 'Prospection Network',

    // Contact info
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    preferredContact: 'Preferred Contact Method',

    // Priority breakdown
    panicSentiment: 'Panic Sentiment Explanation',
    aumLevel: 'AUM Level',
    portfolioMovement: 'Portfolio Movement',
    overdueCheckIn: 'Overdue Check-In',
    daysOverdue: 'days overdue',
    noOverdue: 'No overdue check-ins',

    // Assets
    totalAssets: 'Total Assets Under Management',
    assetAllocation: 'Asset Allocation',
    equities: 'Equities',
    fixedIncome: 'Fixed Income',
    alternatives: 'Alternatives',
    cash: 'Cash',
    recentChange: 'Recent Change',
    dominantExposure: 'Dominant Exposure',
    increase: 'increase',
    decrease: 'decrease',

    // Red flags
    severity: 'Severity',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    noRedFlags: 'No red-flag movements detected.',

    // Communications
    expandContent: 'Expand full content',
    collapseContent: 'Collapse content',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',

    // Open topics
    status: 'Status',
    new: 'New',
    inProgress: 'In Progress',
    pendingClient: 'Pending Client',
    resolved: 'Resolved',
    owner: 'Owner',
    createdOn: 'Created on',
    noOpenTopics: 'No open topics.',

    // Chatbot
    chatbotTitle: 'Client Intelligence Assistant',
    chatbotSubtitle: 'Ask questions about this client',
    askQuestion: 'Ask a question',
    resetChat: 'Reset Chat',
    typeMessage: 'Type your message...',

    // Prospection Network
    prospectionNetworkTitle: 'Prospection Network',
    prospectionNetworkSubtitle: 'Explore professional connections and referral opportunities',
    networkGuardrail: 'No outreach occurs without client consent.',
    connectionName: 'Name',
    connectionRole: 'Role',
    relationshipToClient: 'Relationship to Client',
    triggerEvent: 'Trigger Event',
    suggestedNextStep: 'Suggested Next Step',
    clickToExplore: 'Click or hover on nodes to explore connections',

    // Common
    viewDetails: 'View Details',
    backToDashboard: 'Back to Dashboard',
    loading: 'Loading...',
    error: 'An error occurred',
    notFound: 'Not found',
  },

  fr: {
    // App branding
    appName: 'Donna',
    appSubtitle: 'Gestion de Patrimoine Privé',

    // Dashboard
    dashboardTitle: 'Tableau de Priorisation des Clients',
    dashboardSubtitle: 'Clients triés par score de priorité. Concentrez-vous sur les clients hautement prioritaires avec indicateurs de vigilance.',
    totalClients: 'Total Clients',
    totalAUM: 'Total Actifs',
    panicIndicators: 'Indicateurs de Vigilance',
    avgPriorityScore: 'Score Priorité Moyen',

    // Client list
    searchPlaceholder: 'Rechercher par nom ou profession...',
    showPanicOnly: 'Afficher uniquement les indicateurs de vigilance',
    noPanicClients: 'Aucun client avec indicateurs de vigilance trouvé.',

    // Priority scores
    priorityScore: 'Score de Priorité',
    highPriority: 'Priorité Élevée',
    mediumPriority: 'Priorité Moyenne',
    lowPriority: 'Priorité Basse',

    // Client detail sections
    contactInformation: 'Contact & Logistique',
    priorityBreakdown: 'Décomposition du Score de Priorité',
    assetsOverview: 'Vue d\'Ensemble des Actifs Sous Gestion',
    redFlagMovements: 'Mouvements d\'Actifs Critiques',
    recentCommunications: 'Communications Récentes',
    openTopics: 'Sujets Ouverts & Suivis',
    prospectionNetwork: 'Réseau de Prospection',

    // Contact info
    email: 'Courriel',
    phone: 'Téléphone',
    address: 'Adresse',
    preferredContact: 'Méthode de Contact Préférée',

    // Priority breakdown
    panicSentiment: 'Explication du Sentiment de Vigilance',
    aumLevel: 'Niveau d\'Actifs',
    portfolioMovement: 'Mouvement du Portefeuille',
    overdueCheckIn: 'Suivi en Retard',
    daysOverdue: 'jours de retard',
    noOverdue: 'Aucun suivi en retard',

    // Assets
    totalAssets: 'Total des Actifs Sous Gestion',
    assetAllocation: 'Allocation d\'Actifs',
    equities: 'Actions',
    fixedIncome: 'Revenu Fixe',
    alternatives: 'Alternatifs',
    cash: 'Liquidités',
    recentChange: 'Changement Récent',
    dominantExposure: 'Exposition Dominante',
    increase: 'augmentation',
    decrease: 'diminution',

    // Red flags
    severity: 'Gravité',
    high: 'Élevée',
    medium: 'Moyenne',
    low: 'Faible',
    noRedFlags: 'Aucun mouvement critique détecté.',

    // Communications
    expandContent: 'Développer le contenu',
    collapseContent: 'Réduire le contenu',
    positive: 'Positif',
    neutral: 'Neutre',
    negative: 'Négatif',

    // Open topics
    status: 'Statut',
    new: 'Nouveau',
    inProgress: 'En Cours',
    pendingClient: 'En Attente Client',
    resolved: 'Résolu',
    owner: 'Responsable',
    createdOn: 'Créé le',
    noOpenTopics: 'Aucun sujet ouvert.',

    // Chatbot
    chatbotTitle: 'Assistant d\'Intelligence Client',
    chatbotSubtitle: 'Posez des questions sur ce client',
    askQuestion: 'Poser une question',
    resetChat: 'Réinitialiser',
    typeMessage: 'Tapez votre message...',

    // Prospection Network
    prospectionNetworkTitle: 'Réseau de Prospection',
    prospectionNetworkSubtitle: 'Explorez les connexions professionnelles et opportunités de référence',
    networkGuardrail: 'Aucune démarche n\'est effectuée sans le consentement du client.',
    connectionName: 'Nom',
    connectionRole: 'Rôle',
    relationshipToClient: 'Relation avec le Client',
    triggerEvent: 'Événement Déclencheur',
    suggestedNextStep: 'Prochaine Étape Suggérée',
    clickToExplore: 'Cliquez ou survolez les nœuds pour explorer les connexions',

    // Common
    viewDetails: 'Voir Détails',
    backToDashboard: 'Retour au Tableau de Bord',
    loading: 'Chargement...',
    error: 'Une erreur s\'est produite',
    notFound: 'Non trouvé',
  },
};
