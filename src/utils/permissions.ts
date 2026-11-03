import type { Incident, Role } from './types'

export function canAffectIncident(incident?: Incident, role?: Role): boolean {
  return incident !== undefined && role === 'AGENT' && incident.statut !== 'RESOLU'
}
