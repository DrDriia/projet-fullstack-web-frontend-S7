import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Equipement, Station } from '../../utils/types/equipement'

export function HomePage() {
  const { getAllStations, getEquipementByStation } = useApi()
  const [stations, setStations] = useState<Station[]>([])
  const [stationId, setStationId] = useState<string>()
  const [equipements, setEquipements] = useState<Equipement[]>([])
  const navigate = useNavigate()

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
        <div>
          <h2>Equipements</h2>
          {equipements.length === 0 ? <p>Aucun équipement dans cette station.</p>
            : (
              <div className="data-table-scroll" role="region" aria-label="Equipements de la station" tabIndex={0}>
                <table className="data-table">
                  <caption>{equipements.length} équipement(s)</caption>
                  <thead>
                    <tr>
                      <th scope="col">Référence</th>
                      <th scope="col">Libellé</th>
                      <th scope="col">Type</th>
                      <th scope="col">Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipements.map((equipement) => (
                      <tr key={equipement.id} onClick={() => navigate(`/equipement/${equipement.id}`)}>
                        <th scope="row">
                            {equipement.reference}
                        </th>
                        <td>{equipement.libelle}</td>
                        <td>{equipement.type.libelle}</td>
                        <td>{equipement.etat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      )}
    </section>
  )
}