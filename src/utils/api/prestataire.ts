import { convertIncidentDate } from './../duration';
import type { FormEvaluation, FormPrestataire, Incident, Prestataire } from '../types';
import { appeler, lireJson } from './client';

export const getAllActivePrestataires = async () => {
    const response = await appeler('/api/prestataires/active');
    return await lireJson<Prestataire[]>(response);
};

export const getAllPrestataires = async () => {
    const response = await appeler('/api/prestataires');
    return await lireJson<Prestataire[]>(response);
};

export const getPrestataireById = async (prestataireId: number) => {
    const response = await appeler(`/api/prestataires/${prestataireId}`);
    if (response.status === 404) return undefined;
    return await lireJson<Prestataire>(response);
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

export const createEvaluation = async (formData: FormEvaluation, incidentId: number): Promise<Incident> => {
    // TODO : Api path on back
    /*const incident = incidents.find(i => i.id === incidentId);

    if (!incident) throw new Error("Incident introuvable.");
    if (incident.statut !== 'RESOLU') throw new Error("Impossible d'évaluer si l'incident n'est pas résolu.");

    incident.evaluation = {
        id: incident.id,
        dateEvaluation: new Date(),
        note: formData.note,
        commentaire: formData.commentaire,
        evalueParId: formData.evalueParId 
    };

    return incident;*/
};

export const createPrestataire = async (formData: FormPrestataire): Promise<Prestataire> => {
    const response = await appeler('/api/prestataires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return await lireJson<Prestataire>(response);
};

export const getIncidentsWithEvaluationByPrestataire = async (prestataireId: number): Promise<Incident[]> => {
    const response = await appeler(`/api/prestataires/${prestataireId}/incidents-evalues`);
    const incidents = await lireJson<Incident[]>(response);
    return incidents.map(convertIncidentDate);
};
