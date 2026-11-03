import type { Prestataire } from "./user";
import type { Equipement } from "./equipement";

export type Priority = 'BASSE' | 'NORMALE' | 'HAUTE' | 'CRITIQUE';
export type Status = 'OUVERT' | 'AFFECTE' | 'RESOLU';

export interface FormIncident {
    equipement: Equipement;
    titre: string;
    description: string;
    priorite: Priority;
    declareParId?: number;
}

export interface FormEvaluation {
    note: number;
    commentaire?: string;
    evalueParId?: number;
}

export interface Evaluation extends FormEvaluation {
    id: number;
    dateEvaluation: Date;
}

export interface Incident extends FormIncident {
    id: number;
    statut: Status;
    dateOuverture: Date;
    prestataire?: Prestataire;
    dateAffectation?: Date;
    dateResolution?: Date;
    commentaireResolution?: string;
    evaluation?: Evaluation;
}
