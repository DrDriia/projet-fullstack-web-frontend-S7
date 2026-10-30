import { useEffect, useState } from 'react'
import { useApi } from '../../utils/hooks/useApi'
import type { Incident } from '../../utils/types';
import { useNavigate } from 'react-router-dom'

export function IncidentTable({ refreshIncidents, equipmentId } : { refreshIncidents: boolean, equipmentId: number }) {
  const navigate = useNavigate()
  const { getIncidentByEquipement } = useApi()
  const [incidents, setIncidents] = useState<Incident[]>([])

  useEffect(() => {
    async function fetchIncidents() {
        const incidents = await getIncidentByEquipement(equipmentId)
        setIncidents(incidents)
    }
    fetchIncidents();

    }, [equipmentId, getIncidentByEquipement, refreshIncidents])

  return (<>
        {incidents.length === 0 ? (
            <p>Aucun incident trouvé pour cet équipement.</p>
        ) : <div className="data-table-scroll" role="region" aria-label="Equipements de la station" tabIndex={0}>
                <table className="data-table">
                    <caption>{incidents.length} incident(s)</caption>
                    <thead>
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Priorité</th>
                            <th scope="col">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.map((incident) => (
                            <tr
                                onClick={() => navigate(`/incident/${incident.id}`)}
                            >
                                <td>{incident.titre}</td>
                                <td>{incident.priorite}</td>
                                <td>{incident.statut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
    </>
  )
}