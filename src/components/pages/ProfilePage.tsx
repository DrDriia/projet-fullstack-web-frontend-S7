import { useUser } from '../../utils/context/useUser'

export function ProfilePage() {
  const { user, setUser } = useUser()

  return (
    <section>
      <h1>Mon profil</h1>
      {user ? (
        <>
          <dl className="profile-details">
            <dt>Nom</dt><dd>{user.name}</dd>
            <dt>Email</dt><dd>{user.email}</dd>
            <dt>Rôle</dt><dd>{user.role === 'respo' ? 'Responsable' : 'Agent'}</dd>
          </dl>
          <button className="counter" type="button" onClick={() => setUser(null)}>
            Se déconnecter
          </button>
        </>
      ) : <p>Aucun utilisateur connecté.</p>}
    </section>
  )
}
