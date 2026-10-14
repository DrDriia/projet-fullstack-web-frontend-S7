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
