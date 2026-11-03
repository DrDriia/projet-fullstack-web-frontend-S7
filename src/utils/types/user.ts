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

export interface FormPrestataire {
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    specialite: string;
    actif: boolean;
}

export interface Prestataire extends FormPrestataire {
    id: number;
    dateCreation: Date;
}
