import { Router, Response } from 'express'
import { authMiddleware, adminMiddleware, AuthRequest } from '../middleware/auth'
import { visits, users } from '../db'

const router = Router()

// Бүх зочдын жагсаалт
router.get('/visitors', authMiddleware, adminMiddleware, (_req: AuthRequest, res: Response) => {
  const list = visits.map(v => {
    const user = users.find(u => u.id === v.userId)
    return { ...v, name: user?.name || 'Unknown' }
  }).sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime())
  res.json(list)
})

// Статистик
router.get('/stats', authMiddleware, adminMiddleware, (_req: AuthRequest, res: Response) => {
  const totalVisits = visits.length
  const uniqueUsers = new Set(visits.map(v => v.userId)).size
  const totalUsers = users.filter(u => u.role === 'user').length

  const visitsByDay: Record<string, number> = {}
  visits.forEach(v => {
    const day = v.visitedAt.split('T')[0]
    visitsByDay[day] = (visitsByDay[day] || 0) + 1
  })

  const recentVisits = visits
    .sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime())
    .slice(0, 5)
    .map(v => {
      const user = users.find(u => u.id === v.userId)
      return { ...v, name: user?.name || 'Unknown' }
    })

  res.json({ totalVisits, uniqueUsers, totalUsers, visitsByDay, recentVisits })
})

// Бүх хэрэглэгчдийн жагсаалт
router.get('/users', authMiddleware, adminMiddleware, (_req: AuthRequest, res: Response) => {
  const list = users
    .filter(u => u.role === 'user')
    .map(u => ({ id: u.id, email: u.email, name: u.name, createdAt: u.createdAt }))
  res.json(list)
})

export default router
