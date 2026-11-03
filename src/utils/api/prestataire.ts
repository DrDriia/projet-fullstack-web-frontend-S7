import type { FormEvaluation, FormPrestataire, Incident, Prestataire } from '../types';
import { prestataires } from './fakePrestataire';
import { incidents } from './fakeIncident';

export const getAllActivePrestataires = async () => {
    // TODO : Call à l'api
    return prestataires.filter(prestataire => prestataire.actif);
}

export const getAllPrestataires = async () => {
    // TODO : Call à l'api
    return prestataires;
};

export const getPrestataireById = async (prestataireId: number) => {
    // TODO : Call à l'api
    return prestataires.find(p => p.id === prestataireId);
};

export const affecterPrestataire = async (
    incidentId: number,
    prestataireId: number,
): Promise<Incident> => {
    // TODO : Call à l'api
    const incident = incidents.find(current => current.id === incidentId);
    const prestataire = prestataires.find(current => current.id === prestataireId && current.actif);

    if (!incident) throw new Error('Incident introuvable.');
    if (incident.statut === 'RESOLU') throw new Error('Un incident résolu ne peut plus être affecté.');
    if (!prestataire) throw new Error('Prestataire introuvable ou inactif.');

    incident.prestataire = prestataire;
    incident.dateAffectation = new Date();
    if (incident.statut === 'OUVERT') incident.statut = 'AFFECTE';

    return { ...incident };
};

export const createEvaluation = async (formData: FormEvaluation, incidentId: number): Promise<Incident> => {
    // TODO : Call à l'api
    const incident = incidents.find(i => i.id === incidentId);

    if (!incident) throw new Error("Incident introuvable.");
    if (incident.statut !== 'RESOLU') throw new Error("Impossible d'évaluer si l'incident n'est pas résolu.");

    incident.evaluation = {
        id: incident.id,
        dateEvaluation: new Date(),
        note: formData.note,
        commentaire: formData.commentaire,
        evalueParId: formData.evalueParId 
    };

    return incident;
};

export const createPrestataire = async (formData: FormPrestataire): Promise<Prestataire> => {
    // TODO : Call à l'api
    const prestataire: Prestataire = {
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
    return prestataire;
};

export const getIncidentsWithEvaluationByPrestataire = async (prestataireId: number) => {
    // TODO : Call à l'api
    return incidents.filter(i => i.prestataire?.id === prestataireId && i.evaluation)
};
