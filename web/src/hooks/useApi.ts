import { api } from "../lib/api"

export function useApi() {
  return ({
    validateToken: async (accessToken: string) => {
      const response = await api.get('/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      return response.data
    },
    signin: async (email: string, password: string) => {
      const response = await api.post('/auth/user/', { email, password })
      return response.data
    },
    // signout: async () => {
    //   // ainda não tenho
    // }
  })
}