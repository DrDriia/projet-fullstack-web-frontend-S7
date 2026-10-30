import { HomePage, LoginPage, ProfilePage, EquipementDetailsPage, IncidentDetailsPage } from "../components/pages";

export const navigationItems = [
  { to: '/', label: 'Accueil', page: HomePage },
  { to: '/login', label: 'Login', page: LoginPage, hidden: true },
  { to: '/profil', label: 'Mon profil', page: ProfilePage },
  { to: '/equipement/:id', label: 'Détails de l\'équipement', page: EquipementDetailsPage, hidden: true },
  { to: '/incident/:id', label: 'Détails de l\'incident', page: IncidentDetailsPage, hidden: true },
]
