import type { Dashboard } from '../types';
import { appeler, lireJson } from './client';

export const getDashboard = async (): Promise<Dashboard> => {
    const reponse = await appeler('dashboard');
    return lireJson<Dashboard>(reponse);
};