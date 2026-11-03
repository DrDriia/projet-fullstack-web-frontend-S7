import type { Equipement, Incident, Station } from '../types';
import { appeler, lireJson } from './client';

export const getAllStations = async (): Promise<Station[]> => {
    const reponse = await appeler('/api/stations');
    return lireJson<Station[]>(reponse);
};

export const getEquipementByStation = async (stationId: number): Promise<Equipement[]> => {
    const reponse = await appeler(`/api/stations/${stationId}/equipements`);
    return lireJson<Equipement[]>(reponse);
};

export const getEquipementById = async (id: number): Promise<Equipement | undefined> => {
    const reponse = await appeler(`/api/equipements/${id}`);
    if (reponse.status === 404) return undefined;
    return lireJson<Equipement>(reponse);
};

export const getHistoryIncidentsByStation = async (stationId: number): Promise<Incident[]> => {
    // TODO : Api path on back
    //return incidents.filter(i => i.statut === 'RESOLU' && i.equipement.station.id === stationId);
};
