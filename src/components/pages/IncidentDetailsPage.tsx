import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import { useUser } from '../../utils/context/useUser'
import type { Incident } from '../../utils/types'
import { formatDuration } from '../../utils/duration'
import { canAffectIncident } from '../../utils/permissions'
import Field from '../common/Field'
import { AffectationForm } from '../forms/AffectationForm';

export function IncidentDetailsPage() {
    const { id } = useParams()
    const { getIncidentById } = useApi()
    const { user } = useUser()
    const navigate = useNavigate()
    const [incident, setIncident] = useState<Incident>()

    useEffect(() => {
    async function fetchIncident() {
        const incidentId = Number(id)
        const currentIncident = await getIncidentById(incidentId)
        setIncident(currentIncident);
    }
    fetchIncident();

    }, [id, getIncidentById])

    return (
        <section className="details-page">
            <button className="details-back" onClick={() => navigate(-1)}>← Retour à l'équipement</button>
            {!incident ? <p>Incident introuvable</p>
            : <>
                <div className="details-header">
                    <div>
                        <div className="details-reference">Incident #{incident.id}</div>
                        <h2>{incident.titre}</h2>
                    </div>
                    <div className="details-badge">{incident.statut}</div>
                </div>
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
                {canAffectIncident(incident, user?.role) && (
                    <Field title={incident.prestataire ? 'Réaffecter' : 'Affecter'} wide>
                        <AffectationForm incident={incident} setIncident={setIncident} />
                    </Field>
                )}
                <h2>Évaluation</h2>
                {incident.evaluation ? (
                    <div className="details-fields">
                        <Field title="Note">{incident.evaluation.note}</Field>
                        <Field title="Date">
                            {incident.evaluation.dateEvaluation.toLocaleDateString('fr-FR')}
                        </Field>
                        {incident.evaluation.commentaire && (
                            <Field title="Commentaire" wide>{incident.evaluation.commentaire}</Field>
                        )}
                    </div>
                ) : (
                    <Field title="Évaluation">Aucune évaluation enregistrée.</Field>
                )}
            </>}
        </section>
    )
}
