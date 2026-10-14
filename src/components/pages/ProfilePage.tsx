import { useUser } from '../../utils/context/useUser'

export function ProfilePage() {
  const { user } = useUser()

  return (
    <section>
      <h1>Mon profil</h1>
      {user ? (
        <>
          <dl className="profile-details">
            <dt>Prénom</dt><dd>{user.prenom}</dd>
            <dt>Nom</dt><dd>{user.nom}</dd>
            <dt>Email</dt><dd>{user.email}</dd>
            <dt>Rôle</dt><dd>{user.role === 'respo' ? 'Responsable' : 'Agent'}</dd>
          </dl>
        </>
      ) : <p>Aucun utilisateur connecté.</p>}
    </section>
  )
}
