export type NiveauAttention =
    'VERT' | 'ORANGE' | 'ROUGE' | 'AFFECTE';

export interface DashboardIncident {
    id: number;
    titre: string | null;
    description: string;
    priorite: 'BASSE' | 'NORMALE' | 'HAUTE' | 'CRITIQUE';
    statut: 'OUVERT' | 'AFFECTE';
    dateOuverture: string;
    dureeMinutes: number;
    niveauAttention: NiveauAttention;

    equipementId: number;
    equipementReference: string;
    equipementFragile: boolean;
    equipementLibelle: string;
    typeEquipement: string;

    stationId: number;
    stationNom: string;
    stationVille: string | null;

    prestataireId: number | null;
    prestataireNom: string | null;
}

export interface Dashboard {
    incidents: DashboardIncident[];
    totalActifs: number;
    enAttenteAffectation: number;
    affectes: number;
    urgents: number;
    prioriteCritique: number;
}