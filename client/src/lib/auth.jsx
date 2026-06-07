import { createContext, useContext, useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, getToken, setToken, clearToken } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // If there's no stored token there's nothing to validate, so we're ready now.
  const [ready, setReady] = useState(() => !getToken())

  // On load, validate any stored token by fetching the current user.
  useEffect(() => {
    if (!getToken()) return
    let active = true
    apiGet('/auth/me')
      .then((u) => active && setUser(u))
      .catch(() => {
        clearToken()
      })
      .finally(() => active && setReady(true))
    return () => {
      active = false
    }
  }, [])

  const login = async (email, password) => {
    const { token, user: u } = await apiPost('/auth/login', { email, password })
    setToken(token)
    setUser(u)
    return u
  }

  const register = async (name, email, password) => {
    const { token, user: u } = await apiPost('/auth/register', { name, email, password })
    setToken(token)
    setUser(u)
    return u
  }

  // `credential` is the Google ID token from Google Identity Services.
  const loginWithGoogle = async (credential) => {
    const { token, user: u } = await apiPost('/auth/google', { credential })
    setToken(token)
    setUser(u)
    return u
  }

  const updateProfile = async (fields) => {
    const u = await apiPut('/auth/profile', fields)
    setUser(u)
    return u
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, ready, login, register, loginWithGoogle, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
