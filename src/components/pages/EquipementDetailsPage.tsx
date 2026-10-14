import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Equipement } from '../../utils/types/equipement'
import type { Incident } from '../../utils/types';

export function EquipementDetailsPage() {
  const { id } = useParams()
  const { getEquipementById, getIncidentByEquipement } = useApi()
  const [equipement, setEquipement] = useState<Equipement>()
  const [incidents, setIncidents] = useState<Incident[]>([])
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

  }, [id, getEquipementById, navigate, getIncidentByEquipement])

  return (
    <section className="equipment-details">
      <Link to="/">Retour aux stations</Link>
      {!equipement ? <p>Equipement introuvable</p>
        : (
            <>
                <h2>{equipement.libelle}</h2>
                <div className="equipment-attributes">
                    <div>Identifiant</div><div>{equipement.id}</div>
                    <div>Référence</div><div>{equipement.reference}</div>
                    <div>Station</div><div>{equipement.station.nom} ({equipement.station.ville})</div>
                    <div>Description</div><div>{equipement.description}</div>
                    <div>Type</div><div>{equipement.type.libelle}</div>
                    <div>Etat</div><div>{equipement.etat}</div>
                    <div>Mise en service</div><div>{new Date(equipement.dateMiseService).toLocaleDateString('fr-FR')}</div>
                    <div>Création</div><div>{new Date(equipement.dateCreation).toLocaleDateString('fr-FR')}</div>
                </div>
                <h2>Incidents liés à l'équipement</h2>
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