import { Link } from 'react-router-dom'
import type { Incident } from '../../utils/types'
import { formatDuration } from '../../utils/duration'
import Field from '../common/Field'

export function IncidentFields({ incident }: { incident: Incident }) {
  return (
    <>
      <div className="details-fields">
        <Field title="Priorité">{incident.priorite}</Field>
        <Field title="Durée d'ouverture">
          {formatDuration(incident.dateOuverture, incident.dateResolution)}
        </Field>
        <Field title="Prestataire">
          {incident.prestataire?.nom ?? 'Aucun prestataire affecté'}
        </Field>
        <Field title="Équipement">
          <Link className="details-field-value" to={`/equipement/${incident.equipement.id}`}>
            {incident.equipement.libelle} ({incident.equipement.reference})
          </Link>
        </Field>
        <Field title="Station">
          {incident.equipement.station.nom} ({incident.equipement.station.ville})
        </Field>
        <Field title="Description" wide>{incident.description}</Field>
      </div>
    </>
  )
}