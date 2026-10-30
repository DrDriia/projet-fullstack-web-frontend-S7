import { useEffect, useState } from 'react'
import { useApi } from '../../utils/hooks/useApi'
import { useUser } from '../../utils/context/useUser'
import type { Incident, Prestataire } from '../../utils/types'

export function AffectationForm({ incident, setIncident }: { incident: Incident, setIncident: (incident: Incident) => void }) {
    const { getAllPrestataires, affecterPrestataire } = useApi()
    const { user } = useUser()
    const [prestataires, setPrestataires] = useState<Prestataire[]>([])
    const [selectedPrestataireId, setSelectedPrestataireId] = useState('')

    useEffect(() => {
        async function fetchPrestataires() {
            setPrestataires(await getAllPrestataires())
        }
        fetchPrestataires()
    }, [incident, getAllPrestataires, user?.role])

    async function handleAssignment(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        const updatedIncident = await affecterPrestataire(incident.id, Number(selectedPrestataireId))
        setIncident(updatedIncident)
        setSelectedPrestataireId('')
    }

    return (
        <form className="incident-assignment" onSubmit={handleAssignment}>
            <div className="incident-field">
                <label htmlFor="incident-prestataire">Prestataire actif</label>
                <select
                    id="incident-prestataire"
                    value={selectedPrestataireId}
                    onChange={(event) => setSelectedPrestataireId(event.target.value)}
                    required
                >
                    <option value="">Choisir un prestataire</option>
                    {prestataires.map(prestataire => (
                        <option key={prestataire.id} value={prestataire.id}>
                            {prestataire.nom} - {prestataire.specialite}
                        </option>
                    ))}
                </select>
            </div>
            <button className="incident-submit" type="submit">
                {incident.prestataire ? 'Réaffecter' : 'Affecter'}
            </button>
        </form>
    )
}
