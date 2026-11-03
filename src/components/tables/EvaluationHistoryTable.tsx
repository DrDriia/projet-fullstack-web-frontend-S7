import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Incident } from '../../utils/types'
import { formatDate } from '../../utils/duration'

export function EvaluationHistoryTable({ prestataireId }: { prestataireId: number }) {
    const navigate = useNavigate()
    const { getIncidentsWithEvaluationByPrestataire } = useApi()
    const [incidents, setIncidents] = useState<Incident[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchEvaluations() {
            const result = await getIncidentsWithEvaluationByPrestataire(prestataireId)
            setIncidents(result)
        }
        fetchEvaluations()
    }, [prestataireId, getIncidentsWithEvaluationByPrestataire])

    return (
        <div className={`history-accordion${open ? ' is-open' : ''}`}>
            <button
                type="button"
                className="history-accordion-trigger"
                aria-expanded={open}
                aria-controls="evaluation-historical"
                onClick={() => setOpen(o => !o)}
            >
                <span className="history-accordion-title">
                    Évaluations reçues
                    <span className="history-accordion-count">{incidents.length}</span>
                </span>
                <span className="history-accordion-chevron" aria-hidden="true" />
            </button>

            <div id="evaluation-historical" className="history-accordion-panel" role="region">
                <div className="history-accordion-inner">
                    {incidents.length === 0 ? (
                        <p className="history-accordion-empty">
                            Ce prestataire n'a pas encore été évalué.
                        </p>
                    ) : (
                        <div
                            className="data-table-scroll"
                            role="region"
                            aria-label="Évaluations du prestataire"
                            tabIndex={open ? 0 : -1}
                        >
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Incident</th>
                                        <th scope="col">Équipement</th>
                                        <th scope="col">Note</th>
                                        <th scope="col">Commentaire</th>
                                        <th scope="col">Évalué le</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidents.map(incident => (
                                        <tr
                                            key={incident.id}
                                            onClick={() => navigate(`/incident/${incident.id}`)}
                                        >
                                            <td>{incident.titre}</td>
                                            <td>{incident.equipement.libelle}</td>
                                            <td>★ {incident.evaluation?.note}/5</td>
                                            <td className="cell-truncate" title={incident.evaluation?.commentaire}>
                                                {incident.evaluation?.commentaire ?? '—'}
                                            </td>
                                            <td>{formatDate(incident.evaluation?.dateEvaluation)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}