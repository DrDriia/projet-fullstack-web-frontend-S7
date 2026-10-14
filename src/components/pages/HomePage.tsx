import { Link } from 'react-router-dom'
import { useUser } from '../../utils/context/useUser'

export function HomePage() {
  const { user } = useUser()

  return (
    <section>
      <div>{user ? `Bonjour ${user.name}` : 'Accueil'}</div>
      <Link to="/programmeurs">Voir les programmeurs</Link>
    </section>
  )
}