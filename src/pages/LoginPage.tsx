import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

type Props = { dark: boolean; onClose: () => void }

export default function LoginPage({ dark, onClose }: Props) {
  const { login, register } = useAuth()
  const t = (a: string, b: string) => dark ? a : b
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    try {
      if (mode === 'login') await login(email, password)
      else await register(name, email, password)
      onClose()
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Something went wrong')
    } finally { setLoading(false) }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 13,
    background: t('#1e1e1e', '#f5f5f3'),
    border: t('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'),
    color: t('#fff', '#111'), outline: 'none', marginBottom: 12,
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
      <div style={{ width: 360, borderRadius: 16, padding: 32, background: t('#161616', '#ffffff'), border: t('1px solid rgba(255,255,255,0.07)', '1px solid rgba(0,0,0,0.07)'), boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: t('#fff', '#111') }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: t('#555', '#aaa') }}>×</button>
        </div>

        {mode === 'register' && (
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        )}
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />

        {error && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '11px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', background: t('#fff', '#111'), color: t('#000', '#fff'), marginBottom: 16, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
        </button>

        <p style={{ fontSize: 13, textAlign: 'center', color: t('#555', '#aaa') }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ color: '#3b82f6', cursor: 'pointer' }}>
            {mode === 'login' ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}
