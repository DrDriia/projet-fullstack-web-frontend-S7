import { useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { UserContext } from './useUser'

function UserProvider({ children, initialUser = null }: {
  children: ReactNode
  initialUser?: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider