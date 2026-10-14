import type { User } from '../types';

export const login = async (email: string, password: string): Promise<User> => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    // TODO : implement
    return {
        id: 1,
        nom: 'Bernard',
        prenom: 'Jean',
        email,
        role: 'agent',
        actif: true,
        dateCreation: new Date(),
        derniereConnexion: new Date()
    };
 };

export const logout = async (): Promise<void> => {
    // TODO : implement
    console.log("Déconnexion avec succès");
};
