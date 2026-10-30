import type { Equipement } from '../../utils/types/equipement'
import Field from '../common/Field'

export function EquipmentFields({ equipment }: { equipment: Equipement }) {
  return (
        <div className="details-fields">
            <Field title="Identifiant">{equipment.id}</Field>
            <Field title="Type">{equipment.type.libelle}</Field>
            <Field title="Station">{equipment.station.nom} ({equipment.station.ville})</Field>
            <Field title="Mise en service">
                {new Date(equipment.dateMiseService).toLocaleDateString('fr-FR')}
            </Field>
            <Field title="Création">
                {new Date(equipment.dateCreation).toLocaleDateString('fr-FR')}
            </Field>
            <Field title="Description" wide>{equipment.description}</Field>
        </div>
  )
}
