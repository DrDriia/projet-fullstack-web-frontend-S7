import { HomePage, LoginPage, ProfilePage } from "../components/pages";

export const navigationItems = [
  { to: '/', label: 'Accueil', page: HomePage },
  { to: '/login', label: 'Login', page: LoginPage, hidden: true },
  { to: '/profil', label: 'Mon profil', page: ProfilePage },
]