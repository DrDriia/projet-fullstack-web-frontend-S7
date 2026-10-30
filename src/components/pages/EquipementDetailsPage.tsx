import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Equipement } from '../../utils/types/equipement'
import type { Incident } from '../../utils/types';
import { IncidentForm } from '../common/IncidentForm';

export function EquipementDetailsPage() {
  const { id } = useParams()
  const { getEquipementById, getIncidentByEquipement } = useApi()
  const [equipement, setEquipement] = useState<Equipement>()
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [showPopover, setShowPopover] = useState(false)
  const [refreshIncidents, setRefreshIncidents] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEquipement() {
        const equipmentId = Number(id)
        const equipement = await getEquipementById(equipmentId)
        setEquipement(equipement);

        if (equipement) {
            const incidents = await getIncidentByEquipement(equipement.id)
            setIncidents(incidents)
        }
    }
    fetchEquipement();

    }, [id, getEquipementById, getIncidentByEquipement, refreshIncidents])

  return (
        <section className="details-page">
            <Link className="details-back" to="/">← Retour aux stations</Link>
      {!equipement ? <p>Equipement introuvable</p>
        : (
            <>
                <div className="details-header">
                    <div>
                        <div className="details-reference">{equipement.reference}</div>
                        <h2>{equipement.libelle}</h2>
                    </div>
                    <div className="details-badge">{equipement.etat}</div>
                </div>
                <div className="details-fields">
                    <div className="details-field">
                        <div className="details-field-label">Identifiant</div>
                        <div className="details-field-value">{equipement.id}</div>
                    </div>
                    <div className="details-field">
                        <div className="details-field-label">Type</div>
                        <div className="details-field-value">{equipement.type.libelle}</div>
                    </div>
                    <div className="details-field">
                        <div className="details-field-label">Station</div>
                        <div className="details-field-value">{equipement.station.nom} ({equipement.station.ville})</div>
                    </div>
                    <div className="details-field">
                        <div className="details-field-label">Mise en service</div>
                        <div className="details-field-value">{new Date(equipement.dateMiseService).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div className="details-field">
                        <div className="details-field-label">Création</div>
                        <div className="details-field-value">{new Date(equipement.dateCreation).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div className="details-field details-field--wide">
                        <div className="details-field-label">Description</div>
                        <div className="details-field-value">{equipement.description}</div>
                    </div>
                </div>
                <div className="incidents-header">
                    <h2>Incidents liés à l'équipement</h2>
                    <button
                        type="button"
                        className="button-primary"
                        aria-haspopup="dialog"
                        aria-expanded={showPopover}
                        aria-controls="nouvel-incident-popover"
                        onClick={() => setShowPopover(true)}
                    >
                        Déclarer un incident
                    </button>
                </div>
                {
                    showPopover &&
                        <div className="incident-popover-backdrop" onClick={() => setShowPopover(false)}>
                            <div
                                id="nouvel-incident-popover"
                                className="incident-popover"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="incident-popover-title"
                                onClick={(event) => event.stopPropagation()}
                            >
                            <div className="incident-popover-header">
                                <div id="incident-popover-title" className="incident-popover-title">Nouvel incident</div>
                                <button
                                    type="button"
                                    className="incident-popover-close"
                                    onClick={() => setShowPopover(false)}
                                    aria-label="Fermer"
                                >
                                    x
                                </button>
                            </div>
                            <IncidentForm
                                equipement={equipement}
                                onCreated={() => {
                                    setRefreshIncidents(v => !v)
                                    setShowPopover(false)
                                }}
                            />
                            </div>
                        </div>
                }
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
                    </div>}
            </>
        )}
    </section>
  )
}