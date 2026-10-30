import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Incident } from '../../utils/types'
import { formatDuration } from '../../utils/duration'

export function IncidentDetailsPage() {
    const { id } = useParams()
    const { getIncidentById } = useApi()
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
                    <div className="details-field">
                    <div className="details-field-label">Priorité</div>
                    <div className="details-field-value">{incident.priorite}</div>
                    </div>
                    <div className="details-field">
                    <div className="details-field-label">Durée d'ouverture</div>
                    <div className="details-field-value">{formatDuration(incident.dateOuverture, incident.dateResolution)}</div>
                    </div>
                    <div className="details-field">
                    <div className="details-field-label">Prestataire</div>
                    <div className="details-field-value">
                        {incident.prestataire?.nom ?? 'Aucun prestataire affecté'}
                    </div>
                    </div>
                    <div className="details-field">
                    <div className="details-field-label">Équipement</div>
                    <Link className="details-field-value" to={`/equipement/${incident.equipement.id}`}>
                        {incident.equipement.libelle} ({incident.equipement.reference})
                    </Link>
                    </div>
                    <div className="details-field">
                    <div className="details-field-label">Station</div>
                    <div className="details-field-value">
                        {incident.equipement.station.nom} ({incident.equipement.station.ville})
                    </div>
                    </div>
                    <div className="details-field details-field--wide">
                    <div className="details-field-label">Description</div>
                    <div className="details-field-value">{incident.description}</div>
                    </div>
                </div>
                <h2>Évaluation</h2>
                <p>TODO : implémenter les evals</p>
            </>}
        </section>
    )
}
