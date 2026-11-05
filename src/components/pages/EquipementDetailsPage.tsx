import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Equipement } from '../../utils/types/equipement'
import { IncidentForm } from '../forms/IncidentForm';
import { Popover } from '../common/Popover'
import { IncidentTable } from '../tables/IncidentTable'
import { EquipmentFields } from '../fields/EquipmentFields';
import { IncidentHistoryTable } from '../tables/IncidentHistoryTable';

export function EquipementDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEquipementById } = useApi()
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

    }, [id, getEquipementById])

  return (
        <section className="details-page">
            <button className="details-back" onClick={() => navigate(-1)}>← Retour</button>
            {!equipement ? <p>Equipement introuvable</p>
            : (
                <>
                    <div className="details-header">
                        <div>
                            <div className="details-reference">{equipement.reference}</div>
                            <h2>{equipement.libelle}</h2>
                        </div>
                        <div className="details-badge">{equipement.etat.replaceAll('_', ' ')}</div>
                    </div>
                    <EquipmentFields equipment={equipement} />
                    <div className="incidents-header">
                        <h2>Incidents liés à l'équipement</h2>
                        <Popover
                            id="nouvel-incident-popover"
                            title="Nouvel incident"
                            triggerLabel="Déclarer un incident"
                            showPopover={showPopover}
                            setShowPopover={setShowPopover}
                        >
                            <IncidentForm
                                equipement={equipement}
                                onCreated={() => {
                                    setRefreshIncidents(v => !v)
                                    setShowPopover(false)
                                }}
                            />
                        </Popover>
                    </div>
                    <IncidentTable refreshIncidents={refreshIncidents} equipmentId={equipement.id} />
                    <IncidentHistoryTable equipmentId={equipement.id} />
                </>
            )}
        </section>
    )
}