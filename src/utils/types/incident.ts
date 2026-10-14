import type { Prestataire } from "./user";
import type { Equipement } from "./equipement";

export interface Incident {
    id: number;
    equipement: Equipement;
    titre: string;
    description: string;
    priorite: string;
    statut: string;
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
