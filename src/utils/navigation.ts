import {
  HomePage,
  LoginPage,
  ProfilePage,
  EquipementDetailsPage,
  IncidentDetailsPage,
  PrestatairePage,
  PrestataireDetailsPage,
  DashboardPage,
} from "../components/pages";

export const navigationItems = [
  { to: '/', label: 'Accueil', page: HomePage },
  { to: '/prestataire', label: 'Prestataires', page: PrestatairePage},
  { to: '/profil', label: 'Mon profil', page: ProfilePage },

  { to: '/login', label: 'Login', page: LoginPage, hidden: true },
  { to: '/equipement/:id', label: 'Détails de l\'équipement', page: EquipementDetailsPage, hidden: true },
  { to: '/incident/:id', label: 'Détails de l\'incident', page: IncidentDetailsPage, hidden: true },
  { to: '/prestataire/:id', label: 'Détails du prestataire', page: PrestataireDetailsPage, hidden: true },
  {to: '/dashboard', label: 'Tableau de bord', page: DashboardPage, role: 'RESPONSABLE_EXPLOITATION' },
]
