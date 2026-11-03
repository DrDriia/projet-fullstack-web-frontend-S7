import { login as apiLogin, logout as apiLogout } from '../api/login';
import { useUser } from '../context/useUser';
import type { User } from '../types';
import { getAllStations, getEquipementByStation, getEquipementById } from '../api/equipement';
import { getIncidentByEquipement, getIncidentById, createIncident } from '../api/incident';
import { getAllPrestataires, affecterPrestataire } from '../api/prestataire';

export function useApi() {
  const { setUser } = useUser();

  async function login(username: string, password: string): Promise<User> {
    const user = await apiLogin(username, password);
    setUser(user);
    return user;
  }

  async function logout(): Promise<void> {
    await apiLogout();
    setUser(null);
  }

  return {
    login,
    logout,
    getAllStations,
    getEquipementByStation,
    getEquipementById,
    getIncidentByEquipement,
    getIncidentById,
    createIncident,
    getAllPrestataires,
    affecterPrestataire,
  };
}