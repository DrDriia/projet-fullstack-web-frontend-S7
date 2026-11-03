import type { FormEvaluation, FormPrestataire, Incident, Prestataire } from '../types';
import { appeler, lireJson } from './client';
import { convertirDates } from './incident';

export const getAllActivePrestataires = async () => {
    // TODO : Api path on back
    const response = await appeler('/api/prestataires');
    const prestataires = await lireJson<Prestataire[]>(response);
    return prestataires.filter(prestataire => prestataire.actif);
}

export const getAllPrestataires = async () => {
    const response = await appeler('/api/prestataires');
    return await lireJson<Prestataire[]>(response);
}

export const getPrestataireById = async (prestataireId: number) => {
    // TODO : Api path on back
    const response = await appeler('/api/prestataires');
    const prestataires = await lireJson<Prestataire[]>(response);
    return prestataires.find(p => p.id === prestataireId);
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
    return convertirDates(await lireJson<Incident>(response));
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
    // TODO : Api path on back
    /*const prestataire: Prestataire = {
        id: Math.max(0, ...prestataires.map(i => i.id)) + 1,
        dateCreation: new Date(),
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        specialite: formData.specialite,
        actif: formData.actif,
    };
    prestataires.push(prestataire);
    return prestataire;*/
};

export const getIncidentsWithEvaluationByPrestataire = async (prestataireId: number) => {
    // TODO : Api path on back
    //return incidents.filter(i => i.prestataire?.id === prestataireId && i.evaluation)
};
