import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import { useUser } from '../../utils/context/useUser'
import type { Incident } from '../../utils/types'
import { canAffectIncident } from '../../utils/permissions'
import { IncidentFields } from '../fields/IncidentFields'
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
                <IncidentFields incident={incident} />
                {canAffectIncident(incident, user?.role) && (
                    <Field title={incident.prestataire ? 'Réaffecter' : 'Affecter'} wide>
                        <AffectationForm incident={incident} setIncident={setIncident} />
                    </Field>
                )}
            </>}
        </section>
    )
}
