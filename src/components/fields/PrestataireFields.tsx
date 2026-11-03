import type { Prestataire } from '../../utils/types'
import Field from '../common/Field'
import { formatDate } from '../../utils/duration'

export function PrestataireFields({ prestataire }: { prestataire: Prestataire }) {
    return (
        <div className="details-fields">
            <Field title="Identifiant">{prestataire.id}</Field>
            <Field title="Spécialité">{prestataire.specialite}</Field>
            <Field title="Email">
                <a href={`mailto:${prestataire.email}`}>{prestataire.email}</a>
            </Field>
            <Field title="Téléphone">
                <a href={`tel:${prestataire.telephone.replace(/\s/g, '')}`}>{prestataire.telephone}</a>
            </Field>
            <Field title="Création">{formatDate(prestataire.dateCreation)}</Field>
            <Field title="Adresse" wide>{prestataire.adresse}</Field>
        </div>
    )
}
