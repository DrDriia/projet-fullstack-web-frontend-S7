import { convertIncidentDate } from '../duration';
import type { Incident, FormIncident } from '../types';
import { appeler, lireJson } from './client';

export const getIncidentById = async (incidentId: number): Promise<Incident | undefined> => {
    const reponse = await appeler(`/api/incidents/${incidentId}`);
    if (reponse.status === 404) return undefined;
    return convertIncidentDate(await lireJson<Incident>(reponse));
};

export const getIncidentByEquipement = async (equipmentId: number): Promise<Incident[]> => {
    const reponse = await appeler(`/api/equipements/${equipmentId}/incidents`);
    const incidents = await lireJson<Incident[]>(reponse);
    return incidents.map(convertIncidentDate);
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
    return convertIncidentDate(await lireJson<Incident>(reponse));
};

export const resolveIncident = async (incidentId: number): Promise<Incident> => {
    // TODO : implement
    /*const incident = incidents.find(current => current.id === incidentId);

    if (!incident) throw new Error('Incident introuvable.');
    if (incident.statut !== 'AFFECTE') throw new Error("L'incident doit être affecté pour pouvoir être résolu.");

    incident.statut = 'RESOLU';
    incident.dateResolution = new Date();

    return { ...incident };*/
};

export const getHistoryIncidentsByEquipment = async (equipmentId: number): Promise<Incident[]> => {
    return (await lireJson<Incident[]>(await appeler(`/api/equipements/${equipmentId}/history`))).map(convertIncidentDate);
};
