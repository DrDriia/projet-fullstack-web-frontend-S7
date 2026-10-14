import type { Incident } from '../types';
import { incidents } from './fakeIncident';

export const getIncidentByEquipement = async (equipmentId: number): Promise<Incident[]> => {
    console.log(`Fetching incident for equipment with ID: ${equipmentId}`);
    // TODO : implement
    return incidents.filter(i => i.equipement.id === equipmentId);
};
