import type { Incident, FormIncident } from '../types';
import { appeler, lireJson } from './client';

const enDate = (valeur?: Date | string): Date | undefined =>
    valeur ? new Date(valeur) : undefined;

export const convertirDates = (incident: Incident): Incident => ({
    ...incident,
    dateOuverture: new Date(incident.dateOuverture),
    dateAffectation: enDate(incident.dateAffectation),
    dateResolution: enDate(incident.dateResolution),
    evaluation: incident.evaluation && {
        ...incident.evaluation,
        dateEvaluation: new Date(incident.evaluation.dateEvaluation),
    },
});

export const getIncidentById = async (incidentId: number): Promise<Incident | undefined> => {
    const reponse = await appeler(`/api/incidents/${incidentId}`);
    if (reponse.status === 404) return undefined;
    return convertirDates(await lireJson<Incident>(reponse));
};

export const getIncidentByEquipement = async (equipmentId: number): Promise<Incident[]> => {
    const reponse = await appeler(`/api/equipements/${equipmentId}/incidents`);
    const incidents = await lireJson<Incident[]>(reponse);
    return incidents.map(convertirDates);
};

export const createIncident = async (formData: FormIncident): Promise<Incident> => {
    const reponse = await appeler('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            equipementId: formData.equipement.id,
            titre: formData.titre,
            description: formData.description,
            priorite: formData.priorite,
        }),
    });
    return convertirDates(await lireJson<Incident>(reponse));
};