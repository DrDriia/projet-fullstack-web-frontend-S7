import type { Equipement, Incident, Station } from '../types';
import { equipements, stations } from './fakeEquipement';
import { incidents } from './fakeIncident';

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

export const getHistoryIncidentsByStation = async (stationId: number): Promise<Incident[]> => {
    // TODO : implement
    return incidents.filter(i => i.statut === 'RESOLU' && i.equipement.station.id === stationId);
};
