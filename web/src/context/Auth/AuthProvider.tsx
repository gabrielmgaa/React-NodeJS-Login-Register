import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, SetUser] = useState<User | null>(null)
  const api = useApi()

    useEffect(() => {
      async function validateToken() {
        const storageToken = localStorage.getItem('authorization')
        if (storageToken) {
          const data = await api.validateToken(storageToken)
          SetUser(data)
        }
      }
      validateToken()
    }, [])


  async function signin(email: string, password: string) {
    const data = await api.signin(email, password)

    if (data.existingUser && data.accessToken) {
      SetUser(data.existingUser)
      setToken(data.accessToken)
      return true
    }

    return false
  }

  function setToken(token: string) {
    localStorage.setItem('authorization', token)
  }

  return (
    <AuthContext.Provider value={{ user, signin }}>
      {children}
    </AuthContext.Provider>
  )
}