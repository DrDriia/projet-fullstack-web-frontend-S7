import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { User } from '../types'

interface UserContextValue {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextValue | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser doit etre utilise dans un UserProvider')
  }

  return context
}