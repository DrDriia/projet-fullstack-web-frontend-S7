import { useUser } from '../../utils/context/useUser'

export function ProfilePage() {
  const { user } = useUser()

  return (
    <section>
      {user ? (
        <>
          <div className="profile-details">
            <div>Prénom</div><div>{user.prenom}</div>
            <div>Nom</div><div>{user.nom}</div>
            <div>Email</div><div>{user.email}</div>
            <div>Rôle</div><div>{user.role === 'RESPONSABLE_EXPLOITATION' ? 'Responsable exp' : 'Agent'}</div>
          </div>
        </>
      ) : <div>Aucun utilisateur connecté.</div>}
    </section>
  )
}
