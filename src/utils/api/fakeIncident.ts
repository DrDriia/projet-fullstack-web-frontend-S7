// incidents.mock.ts

import type { Incident } from "../types/incident";
import { equipements } from "./fakeEquipement";

export const incidents: Incident[] = [
  {
    id: 1,
    equipement: equipements[0],
    titre: "Écran ne s'allume plus",
    description:
      "L'écran reste noir malgré plusieurs tentatives de redémarrage. Le voyant d'alimentation est allumé.",
    priorite: "Haute",
    statut: "En cours",
    dateOuverture: new Date("2026-10-02"),
    dateAffectation: new Date("2026-10-03"),
    declareParId: 12,
  },
  {
    id: 2,
    equipement: equipements[1],
    titre: "Connexion réseau instable",
    description:
      "Déconnexions fréquentes du réseau pendant les heures de forte utilisation.",
    priorite: "Moyenne",
    statut: "Ouvert",
    dateOuverture: new Date("2026-10-05"),
    declareParId: 8,
  },
  {
    id: 3,
    equipement: equipements[2],
    titre: "Batterie défectueuse",
    description:
      "L'ordinateur s'éteint brusquement dès qu'il est débranché du secteur.",
    priorite: "Haute",
    statut: "Affecté",
    dateOuverture: new Date("2026-09-28"),
    dateAffectation: new Date("2026-09-29"),
    declareParId: 15,
  },
  {
    id: 4,
    equipement: equipements[3],
    titre: "Impression avec des bandes",
    description:
      "Des bandes noires apparaissent sur tous les documents imprimés.",
    priorite: "Basse",
    statut: "Résolu",
    dateOuverture: new Date("2026-09-20"),
    dateAffectation: new Date("2026-09-21"),
    dateResolution: new Date("2026-09-22"),
    commentaireResolution:
      "Nettoyage des têtes d'impression et remplacement de la cartouche.",
    declareParId: 6,
  },
  {
    id: 5,
    equipement: equipements[4],
    titre: "Surchauffe du serveur",
    description:
      "La température du serveur dépasse régulièrement le seuil recommandé.",
    priorite: "Critique",
    statut: "En cours",
    dateOuverture: new Date("2026-10-10"),
    dateAffectation: new Date("2026-10-10"),
    declareParId: 3,
  },
  {
    id: 6,
    equipement: equipements[5],
    titre: "Clavier partiellement inutilisable",
    description:
      "Plusieurs touches ne répondent plus, notamment les touches Entrée et Espace.",
    priorite: "Basse",
    statut: "Ouvert",
    dateOuverture: new Date("2026-10-08"),
    declareParId: 21,
  },
  {
    id: 7,
    equipement: equipements[6],
    titre: "Disque dur presque plein",
    description:
      "L'espace disque disponible est inférieur à 5 % et ralentit le fonctionnement de la machine.",
    priorite: "Moyenne",
    statut: "Affecté",
    dateOuverture: new Date("2026-10-06"),
    dateAffectation: new Date("2026-10-07"),
    declareParId: 12,
  },
  {
    id: 8,
    equipement: equipements[7],
    titre: "Projecteur sans signal vidéo",
    description:
      "Le projecteur ne détecte aucun signal HDMI malgré le branchement d'un ordinateur fonctionnel.",
    priorite: "Moyenne",
    statut: "Résolu",
    dateOuverture: new Date("2026-09-15"),
    dateAffectation: new Date("2026-09-16"),
    dateResolution: new Date("2026-09-16"),
    commentaireResolution:
      "Remplacement du câble HDMI défectueux.",
    declareParId: 9,
  },
  {
    id: 9,
    equipement: equipements[0],
    titre: "Ventilateur bruyant",
    description:
      "Un bruit inhabituel provient du ventilateur lors des tâches sollicitant fortement le processeur.",
    priorite: "Basse",
    statut: "Ouvert",
    dateOuverture: new Date("2026-10-12"),
    declareParId: 18,
  },
  {
    id: 10,
    equipement: equipements[2],
    titre: "Impossible d'installer les mises à jour",
    description:
      "Les mises à jour du système échouent systématiquement avec un message d'erreur.",
    priorite: "Haute",
    statut: "Résolu",
    dateOuverture: new Date("2026-09-25"),
    dateAffectation: new Date("2026-09-26"),
    dateResolution: new Date("2026-09-27"),
    commentaireResolution:
      "Réparation des composants Windows Update et relance de l'installation.",
    declareParId: 15,
  },
];
