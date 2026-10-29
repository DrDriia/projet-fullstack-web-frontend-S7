import type { Prestataire } from "./user";
import type { Equipement } from "./equipement";

export type Priority = 'HAUTE' | 'MOYENNE' | 'BASSE';
export type Status = 'OUVERT' | 'AFFECTE' | 'RESOLU';

export interface FormIncident {
    equipement: Equipement;
    titre: string;
    description: string;
    priorite: Priority;
}

export interface Incident extends FormIncident {
    id: number;
    statut: Status;
    dateOuverture: Date;
    prestataire?: Prestataire;
    dateAffectation?: Date;
    dateResolution?: Date;
    commentaireResolution?: string;
    declareParId?: number;
}

export interface Evaluation {
    id: number;
    incident: Incident;
    note: number;
    commentaire?: string;
    dateEvaluation: Date;
    evalueParId?: number;
}
