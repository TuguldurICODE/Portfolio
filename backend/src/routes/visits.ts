import { Router, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import { visits } from '../db'

const router = Router()

// Зочдыг бүртгэх — login хийсний дараа дуудна
router.post('/track', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = req.user!
  const visit = {
    id: Date.now().toString(),
    userId: user.id,
    email: user.email,
    role: user.role,
    visitedAt: new Date().toISOString(),
    userAgent: req.headers['user-agent'] || '',
    ip: req.ip || '',
  }
  visits.push(visit)
  res.json({ success: true })
})

export default router
