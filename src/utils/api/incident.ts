import { convertIncidentDate } from '../duration';
import type { Incident, FormIncident, FormEvaluation } from '../types';
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

export const affecterPrestataire = async (
    incidentId: number,
    prestataireId: number,
): Promise<Incident> => {
    const response = await appeler(`/api/incidents/${incidentId}/prestataire`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prestataireId }),
    });
    return convertIncidentDate(await lireJson<Incident>(response));
};

export const resolveIncident = async (
    incidentId: number,
): Promise<Incident> => {
    const response = await appeler(`/api/incidents/${incidentId}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    return convertIncidentDate(await lireJson<Incident>(response));
};

export const createEvaluation = async (formData: FormEvaluation, incidentId: number): Promise<Incident> => {
    const response = await appeler(`/api/incidents/${incidentId}/evaluation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return convertIncidentDate(await lireJson<Incident>(response));
};

export const getHistoryIncidentsByEquipment = async (equipmentId: number): Promise<Incident[]> => {
    return (await lireJson<Incident[]>(await appeler(`/api/equipements/${equipmentId}/history`))).map(convertIncidentDate);
};
