import type { Incident } from "./types";

export function formatDuration(startDate: Date, endDate: Date = new Date()): string {
  const start = startDate.getTime()
  const end = endDate?.getTime() ?? Date.now()
  const totalMinutes = Math.max(0, Math.floor((end - start) / 60000))
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  if (days > 0) return `${days} j ${hours} h`
  if (hours > 0) return `${hours} h ${minutes} min`
  return `${minutes} min`
}

export function formatDate(date?: Date | string) {
  const dateFormatter = new Intl.DateTimeFormat('fr-FR')
  return date ? dateFormatter.format(new Date(date)) : '—'
}

const enDate = (valeur?: Date | string): Date | undefined =>
    valeur ? new Date(valeur) : undefined;

export const convertIncidentDate = (incident: Incident): Incident => ({
    ...incident,
    dateOuverture: new Date(incident.dateOuverture),
    dateAffectation: enDate(incident.dateAffectation),
    dateResolution: enDate(incident.dateResolution),
    evaluation: incident.evaluation && {
        ...incident.evaluation,
        dateEvaluation: new Date(incident.evaluation.dateEvaluation),
    },
});

