import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

const API = 'https://portfolio-backend-production-021c.up.railway.app/api'

interface User { id: string; email: string; name: string; role: 'admin' | 'user' }
interface AuthCtx {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) { setToken(t); setUser(JSON.parse(u)) }
    setLoading(false)
  }, [])

  const save = (token: string, user: User) => {
    setToken(token); setUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    axios.post(`${API}/visits/track`, {}, { headers: { Authorization: `Bearer ${token}` } }).catch(() => {})
  }

  const login = async (email: string, password: string) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password })
    save(data.token, data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password })
    save(data.token, data.user)
  }

  const logout = () => {
    setToken(null); setUser(null)
    localStorage.removeItem('token'); localStorage.removeItem('user')
  }

  return <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export const apiWithAuth = (token: string) =>
  axios.create({ baseURL: API, headers: { Authorization: `Bearer ${token}` } })
