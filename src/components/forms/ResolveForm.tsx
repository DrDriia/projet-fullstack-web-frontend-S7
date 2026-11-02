import { useApi } from '../../utils/hooks/useApi'
import type { Incident } from '../../utils/types'

export function ResolveForm({ incident, setIncident }: { incident: Incident, setIncident: (incident: Incident) => void }) {
    const { resolveIncident } = useApi()

    async function handleResolving(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        const updatedIncident = await resolveIncident(incident.id)
        setIncident(updatedIncident)
    }

    return (
        <form className="incident-resolve" onSubmit={handleResolving}>
            <button className="incident-submit" type="submit">
                {"Résoudre l'incident"}
            </button>
        </form>
    )
}
