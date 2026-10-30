import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Equipement } from '../../utils/types/equipement'
import { IncidentForm } from '../forms/IncidentForm';
import Field from '../common/Field'
import { IncidentTable } from '../tables/IncidentTable'

export function EquipementDetailsPage() {
  const { id } = useParams()
  const { getEquipementById, getIncidentByEquipement } = useApi()
  const [equipement, setEquipement] = useState<Equipement>()
  const [showPopover, setShowPopover] = useState(false)
  const [refreshIncidents, setRefreshIncidents] = useState(false)

  useEffect(() => {
    async function fetchEquipement() {
        const equipmentId = Number(id)
        const equipement = await getEquipementById(equipmentId)
        setEquipement(equipement);
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
                    <Field title="Identifiant">{equipement.id}</Field>
                    <Field title="Type">{equipement.type.libelle}</Field>
                    <Field title="Station">{equipement.station.nom} ({equipement.station.ville})</Field>
                    <Field title="Mise en service">
                        {new Date(equipement.dateMiseService).toLocaleDateString('fr-FR')}
                    </Field>
                    <Field title="Création">
                        {new Date(equipement.dateCreation).toLocaleDateString('fr-FR')}
                    </Field>
                    <Field title="Description" wide>{equipement.description}</Field>
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
                <IncidentTable refreshIncidents={refreshIncidents} equipmentId={equipement.id} />
            </>
        )}
    </section>
  )
}