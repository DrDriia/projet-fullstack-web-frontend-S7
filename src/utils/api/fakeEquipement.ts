
import type { Station, TypeEquipement, Equipement } from "../types/equipement";

export const stations: Station[] = [
  {
    id: 1,
    nom: "Station République",
    adresse: "12 place de la République",
    ville: "Paris",
    dateCreation: new Date("2022-03-15"),
  },
  {
    id: 2,
    nom: "Station La Défense",
    adresse: "15 parvis de la Défense",
    ville: "Puteaux",
    dateCreation: new Date("2021-06-20"),
  },
  {
    id: 3,
    nom: "Station Saint-Denis",
    adresse: "8 rue Gabriel Péri",
    ville: "Saint-Denis",
    dateCreation: new Date("2023-01-10"),
  },
  {
    id: 4,
    nom: "Station Villejuif",
    adresse: "25 avenue de Paris",
    ville: "Villejuif",
    dateCreation: new Date("2022-09-05"),
  },
  {
    id: 5,
    nom: "Station Montparnasse",
    adresse: "4 boulevard du Montparnasse",
    ville: "Paris",
    dateCreation: new Date("2020-11-12"),
  },
];

const typesEquipement: TypeEquipement[] = [
  { id: 1, libelle: "Ordinateur" },
  { id: 2, libelle: "Écran" },
  { id: 3, libelle: "Téléphone" },
  { id: 4, libelle: "Imprimante" },
  { id: 5, libelle: "Réseau" },
  { id: 6, libelle: "Périphérique" },
  { id: 7, libelle: "Serveur" },
  { id: 8, libelle: "Tablette" },
];

const donneesEquipements: Omit<
  Equipement,
  "type" | "station" | "dateMiseService" | "dateCreation"
>[] = [
  {
    id: 1,
    reference: "PC-2024-001",
    libelle: "Dell Latitude 5450",
    description: "Ordinateur portable professionnel, Intel Core Ultra 5, 16 Go RAM.",
    etat: "En service",
  },
  {
    id: 2,
    reference: "PC-2024-002",
    libelle: "HP EliteBook 840",
    description: "Ordinateur portable pour les équipes de développement.",
    etat: "En service",
  },
  {
    id: 3,
    reference: "PC-2023-003",
    libelle: "Lenovo ThinkPad T14",
    description: "Portable professionnel utilisé par l'équipe support.",
    etat: "En maintenance",
  },
  {
    id: 4,
    reference: "PC-2022-004",
    libelle: "Dell OptiPlex 7010",
    description: "Poste fixe dédié à l'accueil de la station.",
    etat: "En service",
  },
  {
    id: 5,
    reference: "PC-2024-005",
    libelle: "MacBook Pro 14",
    description: "Ordinateur portable pour les travaux de conception.",
    etat: "En service",
  },
  {
    id: 6,
    reference: "ECR-2024-001",
    libelle: "Dell UltraSharp U2723QE",
    description: "Écran 27 pouces 4K avec connectique USB-C.",
    etat: "En service",
  },
  {
    id: 7,
    reference: "ECR-2023-002",
    libelle: "Samsung ViewFinity S6",
    description: "Écran 27 pouces QHD destiné à la bureautique.",
    etat: "En service",
  },
  {
    id: 8,
    reference: "ECR-2022-003",
    libelle: "LG 24MP400",
    description: "Écran 24 pouces Full HD pour poste administratif.",
    etat: "Hors service",
  },
  {
    id: 9,
    reference: "ECR-2024-004",
    libelle: "HP E27 G5",
    description: "Écran professionnel avec réglage en hauteur.",
    etat: "En service",
  },
  {
    id: 10,
    reference: "TEL-2024-001",
    libelle: "iPhone 15",
    description: "Smartphone professionnel avec 128 Go de stockage.",
    etat: "En service",
  },
  {
    id: 11,
    reference: "TEL-2023-002",
    libelle: "Samsung Galaxy S23",
    description: "Téléphone professionnel Android avec authentification sécurisée.",
    etat: "En service",
  },
  {
    id: 12,
    reference: "TEL-2022-003",
    libelle: "iPhone 12",
    description: "Smartphone attribué à l'équipe de supervision.",
    etat: "À remplacer",
  },
  {
    id: 13,
    reference: "IMP-2023-001",
    libelle: "HP LaserJet Pro M404",
    description: "Imprimante laser monochrome pour documents administratifs.",
    etat: "En service",
  },
  {
    id: 14,
    reference: "IMP-2024-002",
    libelle: "Brother MFC-L8690CDW",
    description: "Imprimante multifonction couleur avec scanner et réseau.",
    etat: "En maintenance",
  },
  {
    id: 15,
    reference: "IMP-2021-003",
    libelle: "Canon i-SENSYS MF445dw",
    description: "Imprimante multifonction noir et blanc.",
    etat: "En service",
  },
  {
    id: 16,
    reference: "RES-2024-001",
    libelle: "Cisco Catalyst 9200",
    description: "Commutateur réseau administrable pour le réseau local.",
    etat: "En service",
  },
  {
    id: 17,
    reference: "RES-2023-002",
    libelle: "Ubiquiti UniFi U6 Pro",
    description: "Borne Wi-Fi professionnelle pour la couverture des bureaux.",
    etat: "En service",
  },
  {
    id: 18,
    reference: "RES-2022-003",
    libelle: "Cisco ISR 4331",
    description: "Routeur assurant la connectivité entre les réseaux.",
    etat: "En maintenance",
  },
  {
    id: 19,
    reference: "RES-2024-004",
    libelle: "Netgear GS728TP",
    description: "Commutateur PoE pour les équipements réseau.",
    etat: "En service",
  },
  {
    id: 20,
    reference: "PER-2024-001",
    libelle: "Logitech MX Keys",
    description: "Clavier sans fil utilisé sur les postes de travail.",
    etat: "En service",
  },
  {
    id: 21,
    reference: "PER-2024-002",
    libelle: "Logitech MX Master 3S",
    description: "Souris ergonomique sans fil.",
    etat: "En service",
  },
  {
    id: 22,
    reference: "PER-2022-003",
    libelle: "Jabra Evolve2 65",
    description: "Casque audio professionnel avec microphone intégré.",
    etat: "Hors service",
  },
  {
    id: 23,
    reference: "SRV-2024-001",
    libelle: "Dell PowerEdge R760",
    description: "Serveur rack pour les services internes de l'organisation.",
    etat: "En service",
  },
  {
    id: 24,
    reference: "SRV-2023-002",
    libelle: "HPE ProLiant DL380 Gen10",
    description: "Serveur physique hébergeant des applications internes.",
    etat: "En maintenance",
  },
  {
    id: 25,
    reference: "SRV-2024-003",
    libelle: "Dell PowerEdge R650",
    description: "Serveur de virtualisation pour les environnements de test.",
    etat: "En service",
  },
  {
    id: 26,
    reference: "TAB-2024-001",
    libelle: "iPad Air",
    description: "Tablette utilisée pour les inventaires sur site.",
    etat: "En service",
  },
  {
    id: 27,
    reference: "TAB-2023-002",
    libelle: "Samsung Galaxy Tab S9",
    description: "Tablette professionnelle pour les interventions techniques.",
    etat: "En service",
  },
  {
    id: 28,
    reference: "TAB-2022-003",
    libelle: "iPad 9e génération",
    description: "Tablette utilisée pour la consultation des procédures.",
    etat: "À remplacer",
  },
  {
    id: 29,
    reference: "PC-2021-006",
    libelle: "HP ProBook 450 G8",
    description: "Ordinateur portable de génération précédente.",
    etat: "Hors service",
  },
  {
    id: 30,
    reference: "ECR-2021-005",
    libelle: "Dell P2419H",
    description: "Écran 24 pouces Full HD utilisé en poste secondaire.",
    etat: "En service",
  },
];

export const equipements: Equipement[] = donneesEquipements.map(
  (equipement, index) => ({
    ...equipement,
    type: typesEquipement[
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 0, 1][index]
    ],
    station: stations[index % stations.length],
    dateMiseService: new Date(
      2021 + (index % 5),
      (index * 3) % 12,
      (index * 7) % 28 + 1
    ),
    dateCreation: new Date(
      2024,
      index % 12,
      (index * 5) % 28 + 1
    ),
  })
);
