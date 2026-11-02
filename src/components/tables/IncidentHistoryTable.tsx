import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Incident } from '../../utils/types'
import { formatDate, formatDuration } from '../../utils/duration';

export function IncidentHistoryTable({ equipmentId, stationId }: { equipmentId?: number, stationId?: number }) {
    const navigate = useNavigate()
    const { getHistoryIncidentsByEquipment, getHistoryIncidentsByStation } = useApi()
    const [incidents, setIncidents] = useState<Incident[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchHistory() {
            if (equipmentId && stationId) {
                throw new Error("Le composant historique ne peut pas être pour un équipement et une station en même temps.")
            } else if (!equipmentId && !stationId) {
                throw new Error("Le composant historique doit être pour un équipement ou une station.")
            } else {
                const history = equipmentId
                    ? await getHistoryIncidentsByEquipment(equipmentId)
                    : await getHistoryIncidentsByStation(stationId!)
                setIncidents(history);
            }
        }
        fetchHistory()
    }, [equipmentId, stationId, getHistoryIncidentsByEquipment, getHistoryIncidentsByStation])

    return (
        <div className={`history-accordion${open ? ' is-open' : ''}`}>
            <button
                type="button"
                className="history-accordion-trigger"
                aria-expanded={open}
                aria-controls={'incident-historical'}
                onClick={() => setOpen(o => !o)}
            >
                <span className="history-accordion-title">
                    Historique des incidents résolus
                    <span className="history-accordion-count">{incidents.length}</span>
                </span>
                <span className="history-accordion-chevron" aria-hidden="true" />
            </button>

            <div id={'incident-historical'} className="history-accordion-panel" role="region">
                <div className="history-accordion-inner">
                {incidents.length === 0 ? (
                    <p className="history-accordion-empty">
                    Aucun incident résolu pour cet équipement.
                    </p>
                ) : (
                    <div
                    className="data-table-scroll"
                    role="region"
                    aria-label="Historique des incidents résolus"
                    tabIndex={open ? 0 : -1}
                    >
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Priorité</th>
                            <th scope="col">Prestataire</th>
                            <th scope="col">Résolu le</th>
                            <th scope="col">Durée</th>
                            <th scope="col">Note</th>
                        </tr>
                        </thead>
                        <tbody>
                        {incidents.map(incident => (
                            <tr
                            key={incident.id}
                            onClick={() => navigate(`/incident/${incident.id}`)}
                            >
                            <td>{incident.titre}</td>
                            <td>{incident.priorite}</td>
                            <td>{incident.prestataire?.nom ?? '—'}</td>
                            <td>{formatDate(incident.dateResolution)}</td>
                            <td>{formatDuration(incident.dateOuverture, incident.dateResolution)}</td>
                            <td>
                                {incident.evaluation ? `★ ${incident.evaluation.note}/5` : '—'}
                            </td>
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
