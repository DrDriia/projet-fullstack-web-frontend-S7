import { useUser } from '../../utils/context/useUser'
import Field from '../common/Field';

export function ProfilePage() {
  const { user } = useUser()

  return (
    <section>
      {user ? (
        <>
          <div className="profile-details">
            <Field title="Prénom">{user.prenom}</Field>
            <Field title="Nom">{user.nom}</Field>
            <Field title="Email">{user.email}</Field>
            <Field title="Rôle">{user.role === 'AGENT' ? 'Agent' : 'Responsable'}</Field>
            <Field title="Date de création">{new Date(user.dateCreation).toLocaleDateString('fr-FR')}</Field>
            <Field title="Dernière connexion">
              {user.derniereConnexion
                ? new Date(user.dateCreation).toLocaleDateString('fr-FR')
                : 'Jamais'
              }
              </Field>
          </div>
        </>
      ) : <div>Aucun utilisateur connecté.</div>}
    </section>
  )
}
