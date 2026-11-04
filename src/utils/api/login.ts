import type { User } from '../types';
import { appeler, lireJson } from './client';

type UtilisateurDto = Omit<User, 'role' | 'dateCreation' | 'derniereConnexion'> & {
    profil: 'RESPONSABLE_EXPLOITATION' | 'AGENT';
    dateCreation: string;
    derniereConnexion?: string | null;
};

export const login = async (username: string, password: string): Promise<User> => {
    await appeler('/api/me');

    const reponse = await appeler('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password }),
    });
    if (!reponse.ok) throw new Error('Identifiant ou mot de passe invalide.');

    const { profil, ...reste } = await lireJson<UtilisateurDto>(await appeler('/api/me'));
    return {
        ...reste,
        role: profil,
        dateCreation: new Date(reste.dateCreation),
        derniereConnexion: reste.derniereConnexion ? new Date(reste.derniereConnexion) : undefined,
    };
};

export const logout = async (): Promise<void> => {
    await appeler('/api/logout', { method: 'POST' });
};