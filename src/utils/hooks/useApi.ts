import { login as apiLogin, logout as apiLogout } from '../api/login';
import { useUser } from '../context/useUser';
import type { User } from '../types';
import { getAllStations, getEquipementByStation, getEquipementById, getHistoryIncidentsByStation } from '../api/equipement';
import { getIncidentByEquipement, getIncidentById, createIncident, resolveIncident, getHistoryIncidentsByEquipment } from '../api/incident';
import { getAllPrestataires, affecterPrestataire, createPrestataire, createEvaluation, getAllActivePrestataires } from '../api/prestataire';

export function useApi() {
  const { setUser } = useUser();

  async function login(email: string, password: string): Promise<User> {
    const user = await apiLogin(email, password);
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
    resolveIncident,
    getAllPrestataires,
    getAllActivePrestataires,
    affecterPrestataire,
    createPrestataire,
    createEvaluation,
    getHistoryIncidentsByStation,
    getHistoryIncidentsByEquipment
  };
}