import { login as apiLogin, logout as apiLogout } from '../api/login';
import { useUser } from '../context/useUser';
import type { User } from '../types';
import { getAllStations, getEquipementByStation } from '../api/equipement';

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
  };
}