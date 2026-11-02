import type { Incident, Role } from './types'

export function canAffectIncident(incident?: Incident, role?: Role): boolean {
  return role === 'respo' && incident?.statut !== 'RESOLU'
}

export function canResolveIncident(incident?: Incident, role?: Role): boolean {
  return role === 'respo' && incident?.statut === 'AFFECTE'
}

export function canEvaluateIncident(incident?: Incident, role?: Role): boolean {
  return role === 'respo' && incident?.statut === 'RESOLU'
}
