import { useEffect, useState } from 'react'
import { useApi } from '../../utils/hooks/useApi'
import type { Equipement, Station } from '../../utils/types/equipement'
import { EquipmentTable } from '../tables/EquipmentTable'
import { IncidentHistoryTable } from '../tables/IncidentHistoryTable';

export function HomePage() {
  const { getAllStations, getEquipementByStation } = useApi()
  const [stations, setStations] = useState<Station[]>([])
  const [stationId, setStationId] = useState<string>()
  const [equipements, setEquipements] = useState<Equipement[]>([])

  useEffect(() => {
    const fetchStations = async () => {
      const stationsApi = await getAllStations();
      setStations(stationsApi);
    }
    fetchStations();
  }, [getAllStations])

  useEffect(() => {
    if (stationId) {
      const fetchEquipements = async () => {
        const equipementsApi = await getEquipementByStation(Number(stationId));
        setEquipements(equipementsApi);
      }
      fetchEquipements();
    }
  }, [stationId, getEquipementByStation])

  return (
    <section className="station-equipment">
      <div className="station-picker">
        <label htmlFor="station">Station</label>
        <select
          id="station"
          value={stationId}
          onChange={(event) => {
            const selectedId = event.target.value
            setStationId(selectedId)
            setEquipements([])
          }}
        >
          <option value="">{'Choisir une station'}</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.nom} - {station.ville}
            </option>
          ))}
        </select>
      </div>

      {stationId && (
        <div className="details-page">
          <h2>Equipements</h2>
          {equipements.length === 0 ? <p>Aucun équipement dans cette station.</p>
            : (
              <EquipmentTable equipements={equipements} />
            )}
          <IncidentHistoryTable stationId={Number(stationId)} />
        </div>
      )}
      
    </section>
  )
}