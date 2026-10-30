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
        <section className="equipment-details">
            <button className="equipment-back" onClick={() => navigate(-1)}>← Retour à l'équipement</button>
            {!incident ? <p>Incident introuvable</p>
            : <>
                <div className="equipment-header">
                    <div>
                    <div className="equipment-reference">Incident #{incident.id}</div>
                    <h2>{incident.titre}</h2>
                    </div>
                    <div className="equipment-state">{incident.statut}</div>
                </div>
                <div className="equipment-attributes">
                    <div className="equipment-attribute">
                    <div className="equipment-attribute-label">Priorité</div>
                    <div className="equipment-attribute-value">{incident.priorite}</div>
                    </div>
                    <div className="equipment-attribute">
                    <div className="equipment-attribute-label">Durée d'ouverture</div>
                    <div className="equipment-attribute-value">{formatDuration(incident.dateOuverture, incident.dateResolution)}</div>
                    </div>
                    <div className="equipment-attribute">
                    <div className="equipment-attribute-label">Prestataire</div>
                    <div className="equipment-attribute-value">
                        {incident.prestataire?.nom ?? 'Aucun prestataire affecté'}
                    </div>
                    </div>
                    <div className="equipment-attribute">
                    <div className="equipment-attribute-label">Équipement</div>
                    <Link className="equipment-attribute-value" to={`/equipement/${incident.equipement.id}`}>
                        {incident.equipement.libelle} ({incident.equipement.reference})
                    </Link>
                    </div>
                    <div className="equipment-attribute">
                    <div className="equipment-attribute-label">Station</div>
                    <div className="equipment-attribute-value">
                        {incident.equipement.station.nom} ({incident.equipement.station.ville})
                    </div>
                    </div>
                    <div className="equipment-attribute equipment-attribute-wide">
                    <div className="equipment-attribute-label">Description</div>
                    <div className="equipment-attribute-value">{incident.description}</div>
                    </div>
                </div>
                <h2>Évaluation</h2>
                <p>TODO : implémenter les evals</p>
            </>}
        </section>
    )
}
