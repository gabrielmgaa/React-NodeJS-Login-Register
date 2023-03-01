import { useState } from "react";
import { AuthContext } from "./AuthContext";

import api from "../lib/api";

interface AuthProviderProps {
  children: JSX.Element
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [authenticated, setAuthenticated] = useState(false)

  async function TokenLogin() {
    // const { data } = api.post('/user/auth')
  }

  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  )
}