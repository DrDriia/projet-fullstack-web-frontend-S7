import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import { useUser } from '../../utils/context/useUser'
import type { Incident } from '../../utils/types'
import { canAffectIncident, canEvaluateIncident, canResolveIncident } from '../../utils/permissions'
import { IncidentFields } from '../fields/IncidentFields'
import Field from '../common/Field'
import { AffectationForm } from '../forms/AffectationForm';
import { ResolveForm } from '../forms/ResolveForm';
import { FormEvaluation } from '../forms/EvaluationForm';

export function IncidentDetailsPage() {
    const { id } = useParams()
    const { getIncidentById } = useApi()
    const { user } = useUser()
    const navigate = useNavigate()
    const [incident, setIncident] = useState<Incident>()
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        async function fetchIncident() {
            const incidentId = Number(id)
            const currentIncident = await getIncidentById(incidentId)
            setIncident(currentIncident);
        }
        fetchIncident();

    }, [id, getIncidentById, refreshData])

    return (
        <section className="details-page">
            <button className="details-back" onClick={() => navigate(-1)}>← Retour</button>
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
                {canResolveIncident(incident, user?.role) && (
                    <Field title={'Incident résolu ?'} wide>
                        <ResolveForm incident={incident} setIncident={setIncident} />
                    </Field>
                )}
                {canEvaluateIncident(incident, user?.role) && (
                    <>
                        {incident.evaluation ? (<>
                                <h2>Evaluation</h2>
                                <div className="details-fields">
                                    <Field title="Note">
                                        {incident.evaluation.note}/5
                                    </Field>
                                    <Field title="Date">
                                        {incident.evaluation.dateEvaluation.toLocaleDateString('fr-FR')}
                                    </Field>
                                    {incident.evaluation.commentaire && (
                                        <Field title="Commentaire" wide>{incident.evaluation.commentaire}</Field>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Field title={`Evaluation${incident.prestataire?.nom ? ` de ${incident.prestataire.nom}` : ''}`} wide>
                                <FormEvaluation incident={incident} onCreated={() => setRefreshData(v => !v)} />
                            </Field>
                        )}
                    </>
                )}
            </>}
        </section>
    )
}
