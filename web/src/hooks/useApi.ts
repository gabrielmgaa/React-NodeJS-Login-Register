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
      .then( res => res.data)
      .catch( err => err.response.data)
      
      return response
    },
    // signout: async () => {
    //   // ainda não tenho
    // }
  })
}