import type { Dashboard } from '../types';
import { appeler, lireJson } from './client';

export const getDashboard = async (): Promise<Dashboard> => {
    const reponse = await appeler('/api/dashboard');
    return lireJson<Dashboard>(reponse);
};