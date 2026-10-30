export type Role = 'respo' | 'agent';

export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: Role;
    actif: boolean;
    dateCreation: Date;
    derniereConnexion: Date;
}

export interface Prestataire {
    id: number;
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    specialite: string;
    actif: boolean;
    dateCreation: Date;
}
