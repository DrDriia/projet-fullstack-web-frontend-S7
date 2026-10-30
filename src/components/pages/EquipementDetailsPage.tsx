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
  const [showForm, setShowForm] = useState(false)
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

  }, [id, getEquipementById, navigate, getIncidentByEquipement, refreshIncidents])

  return (
    <section className="equipment-details">
      <Link className="equipment-back" to="/">← Retour aux stations</Link>
      {!equipement ? <p>Equipement introuvable</p>
        : (
            <>
                <div className="equipment-header">
                    <div>
                        <div className="equipment-reference">{equipement.reference}</div>
                <h2>{equipement.libelle}</h2>
                    </div>
                    <div className="equipment-state">{equipement.etat}</div>
                </div>
                <div className="equipment-attributes">
                    <div className="equipment-attribute">
                        <div className="equipment-attribute-label">Identifiant</div>
                        <div className="equipment-attribute-value">{equipement.id}</div>
                    </div>
                    <div className="equipment-attribute">
                        <div className="equipment-attribute-label">Type</div>
                        <div className="equipment-attribute-value">{equipement.type.libelle}</div>
                    </div>
                    <div className="equipment-attribute">
                        <div className="equipment-attribute-label">Station</div>
                        <div className="equipment-attribute-value">{equipement.station.nom} ({equipement.station.ville})</div>
                    </div>
                    <div className="equipment-attribute">
                        <div className="equipment-attribute-label">Mise en service</div>
                        <div className="equipment-attribute-value">{new Date(equipement.dateMiseService).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div className="equipment-attribute">
                        <div className="equipment-attribute-label">Création</div>
                        <div className="equipment-attribute-value">{new Date(equipement.dateCreation).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div className="equipment-attribute equipment-attribute-wide">
                        <div className="equipment-attribute-label">Description</div>
                        <div className="equipment-attribute-value">{equipement.description}</div>
                    </div>
                </div>
                <div className="incidents-header">
                <h2>Incidents liés à l'équipement</h2>
                    <button
                        type="button"
                        className="button-primary"
                        aria-expanded={showForm}
                        aria-controls="nouvel-incident"
                        onClick={() => setShowForm(v => !v)}
                    >
                        {showForm ? 'Fermer le formulaire' : 'Déclarer un incident'}
                    </button>
                </div>
                {showForm && (
                    <IncidentForm
                        equipement={equipement}
                        onCreated={() => setRefreshIncidents(v => !v)}
                    />
                )}
                {incidents.length === 0 ? (
                    <p>Aucun incident trouvé pour cet équipement.</p>
                ) : <div className="equipment-table-scroll" role="region" aria-label="Equipements de la station" tabIndex={0}>
                        <table className="equipment-table">
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
                                    <tr key={incident.id}>
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