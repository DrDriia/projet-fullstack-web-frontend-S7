import { useUser } from '../../utils/context/useUser'

export function LoginPage() {
  const { user } = useUser()

  return (
    <section>
      <div>{user?.id}</div>
    </section>
  )
}