import type { FormEvaluation, Incident } from '../types';
import { prestataires } from './fakePrestataire';
import { incidents } from './fakeIncident';

export const getAllPrestataires = async () => {
    // TODO : Call à l'api
    return prestataires.filter(prestataire => prestataire.actif);
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

// TODO : Create prestataire
