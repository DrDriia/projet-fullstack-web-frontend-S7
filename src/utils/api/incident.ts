import type { Incident, FormIncident } from '../types';
import { incidents } from './fakeIncident';

export const getIncidentById = async (incidentId: number): Promise<Incident | undefined> => {
    // TODO : implement
    return incidents.find(incident => incident.id === incidentId);
};

export const getIncidentByEquipement = async (equipmentId: number): Promise<Incident[]> => {
    console.log(`Fetching incident for equipment with ID: ${equipmentId}`);
    // TODO : implement
    return incidents.filter(i => i.equipement.id === equipmentId);
};

export const createIncident = async (formData: FormIncident): Promise<Incident> => {
    // TODO : implement
    const incident: Incident = {
        id: Math.max(0, ...incidents.map(i => i.id)) + 1,
        equipement: formData.equipement,
        titre: formData.titre,
        description: formData.description,
        priorite: formData.priorite,
        statut: 'OUVERT',
        dateOuverture: new Date(),
        declareParId: formData.declareParId,
    };
    incidents.push(incident);
    return incident;
};
