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

export interface Evaluation {
    id: number;
    incidentId: number;
    note: number;
    commentaire?: string;
    dateEvaluation: Date;
    evalueParId?: number;
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
