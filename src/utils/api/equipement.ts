import type { Equipement } from '../types';
import { equipements } from './fakeEquipement';

export const getEquipementByStation = async (stationId: number): Promise<Equipement[]> => {
    console.log(`Fetching equipment for station with ID: ${stationId}`);
    // TODO : implement
    return equipements.filter(e => e.station.id === stationId);
};
