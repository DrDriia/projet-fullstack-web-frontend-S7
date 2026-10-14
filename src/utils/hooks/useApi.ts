import { login as apiLogin, logout as apiLogout } from '../api/login';
import { useUser } from '../context/useUser';
import type { User, Equipement } from '../types';
import { getEquipementByStation as apiGetEquipementByStation } from '../api/equipement';

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

  async function getEquipementsByStation(stationId: number): Promise<Equipement[]> {
    return await apiGetEquipementByStation(stationId);
  }

  return { login, logout, getEquipementsByStation };
}