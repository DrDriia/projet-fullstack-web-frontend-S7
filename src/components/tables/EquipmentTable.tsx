import { useNavigate } from 'react-router-dom'
import type { Equipement } from '../../utils/types/equipement'

export function EquipmentTable({ equipements }: { equipements: Equipement[] }) {
  const navigate = useNavigate()

  return (
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
            <tr
              key={equipement.id}
              tabIndex={0}
              onClick={() => navigate(`/equipement/${equipement.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/equipement/${equipement.id}`)
                }
              }}
            >
              <th scope="row">{equipement.reference}</th>
              <td>{equipement.libelle}</td>
              <td>{equipement.type.libelle}</td>
              <td>{equipement.etat.replaceAll('_', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}