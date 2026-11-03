import type { Incident, Prestataire } from '../types';
import { appeler, lireJson } from './client';
import { convertirDates } from './incident';

export const getAllPrestataires = async () => {
    const reponse = await appeler('/api/prestataires');
    const prestataires = await lireJson<Prestataire[]>(reponse);
    return prestataires.filter(prestataire => prestataire.actif);
};

export const affecterPrestataire = async (
    incidentId: number,
    prestataireId: number,
): Promise<Incident> => {
    const reponse = await appeler(`/api/incidents/${incidentId}/prestataire`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prestataireId }),
    });
    return convertirDates(await lireJson<Incident>(reponse));
};