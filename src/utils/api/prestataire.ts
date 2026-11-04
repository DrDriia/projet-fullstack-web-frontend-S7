import { convertIncidentDate } from './../duration';
import type { FormPrestataire, Incident, Prestataire } from '../types';
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
