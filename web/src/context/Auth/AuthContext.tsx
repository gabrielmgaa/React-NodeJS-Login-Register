import { createContext } from "react"
import { User } from "../../types/User"


interface AuthContextProps {
  user: User | null,
  signin: (email: string, password: string) => Promise<Boolean>,
  // signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>(null!)