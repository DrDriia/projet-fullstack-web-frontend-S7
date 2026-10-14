import type { Equipement, Station } from '../types';
import { equipements, stations } from './fakeEquipement';

export const getAllStations = async (): Promise<Station[]> => {
    console.log(`Fetching all stations`);
    // TODO : implement
    return stations;
};

export const getEquipementByStation = async (stationId: number): Promise<Equipement[]> => {
    console.log(`Fetching equipment for station with ID: ${stationId}`);
    // TODO : implement
    return equipements.filter(e => e.station.id === stationId);
};

export const getEquipementById = async (id: number): Promise<Equipement | undefined> => {
    console.log(`Fetching equipment with ID: ${id}`);
    // TODO : implement
    return equipements.find(e => e.id === id);
};
