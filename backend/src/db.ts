// In-memory database (production-д MongoDB эсвэл PostgreSQL ашиглана)

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface Visit {
  id: string
  userId: string
  email: string
  role: string
  visitedAt: string
  userAgent: string
  ip: string
}

export const users: User[] = []
export const visits: Visit[] = []
