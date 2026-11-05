export interface Station {
    id: number;
    nom: string;
    adresse: string;
    ville: string;
    dateCreation: Date;
}

export interface TypeEquipement {
    id: number;
    libelle: string;
}

export interface Equipement {
    id: number;
    reference: string;
    libelle: string;
    description: string;
    type: TypeEquipement;
    station: Station;
    etat: string;
    dateMiseService: Date;
    dateCreation: Date;
    fragile: boolean;
}
