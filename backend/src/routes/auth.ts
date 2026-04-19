import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { users } from '../db'

const router = Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const signToken = (user: { id: string; email: string; role: 'admin' | 'user' }) =>
  jwt.sign(user, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })

// Register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) return res.status(400).json({ error: 'All fields required' })
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already exists' })
  const hashed = await bcrypt.hash(password, 10)
  const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user'
  const user = { id: Date.now().toString(), email, password: hashed, name, role: role as 'admin' | 'user', createdAt: new Date().toISOString() }
  users.push(user)
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(400).json({ error: 'User not found' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ error: 'Wrong password' })
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})

// Google login
router.post('/google', async (req: Request, res: Response) => {
  const { credential } = req.body
  try {
    const ticket = await client.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID })
    const payload = ticket.getPayload()
    if (!payload?.email) return res.status(400).json({ error: 'Invalid token' })
    let user = users.find(u => u.email === payload.email)
    if (!user) {
      const role = payload.email === process.env.ADMIN_EMAIL ? 'admin' : 'user'
      user = { id: Date.now().toString(), email: payload.email, password: '', name: payload.name || '', role, createdAt: new Date().toISOString() }
      users.push(user)
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch {
    res.status(400).json({ error: 'Google auth failed' })
  }
})

export default router
