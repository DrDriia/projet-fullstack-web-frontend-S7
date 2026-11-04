import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApi } from '../../utils/hooks/useApi'
import type { Prestataire } from '../../utils/types'
import { PrestataireFields } from '../fields/PrestataireFields'
import { EvaluationHistoryTable } from '../tables/EvaluationHistoryTable'

export function PrestataireDetailsPage() {
    const { id } = useParams()
    const { getPrestataireById } = useApi()
    const [prestataire, setPrestataire] = useState<Prestataire>()

    useEffect(() => {
        async function fetchPrestataire() {
            const prestataire = await getPrestataireById(Number(id))
            setPrestataire(prestataire)
        }
        fetchPrestataire()
    }, [id, getPrestataireById])

    return (
        <section className="details-page">
            <Link className="details-back" to="/prestataire">← Retour aux prestataires</Link>
            {!prestataire ? (
                <p>Prestataire introuvable</p>
            ) : (
                <>
                    <div className="details-header">
                        <div>
                            <div className="details-reference">{prestataire.specialite}</div>
                            <h2>{prestataire.nom}</h2>
                        </div>
                        <div className="details-badge">{prestataire.actif ? 'Actif' : 'Inactif'}</div>
                    </div>

                    <PrestataireFields prestataire={prestataire} />
                    <EvaluationHistoryTable prestataireId={prestataire.id} />
                </>
            )}
        </section>
    )
}
