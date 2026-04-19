import React, { useEffect, useState } from 'react'
import { useAuth, apiWithAuth } from '../context/AuthContext'

type Props = { dark: boolean; onClose: () => void }

interface Stat { totalVisits: number; uniqueUsers: number; totalUsers: number; recentVisits: any[] }

export default function AdminDashboard({ dark, onClose }: Props) {
  const { token } = useAuth()
  const t = (a: string, b: string) => dark ? a : b
  const [stats, setStats] = useState<Stat | null>(null)
  const [visitors, setVisitors] = useState<any[]>([])
  const [tab, setTab] = useState<'stats' | 'visitors'>('stats')

  useEffect(() => {
    if (!token) return
    const api = apiWithAuth(token)
    api.get('/admin/stats').then(r => setStats(r.data)).catch(() => {})
    api.get('/admin/visitors').then(r => setVisitors(r.data)).catch(() => {})
  }, [token])

  const cardStyle: React.CSSProperties = { borderRadius: 12, padding: '20px 24px', background: t('#1a1a1a', '#f5f5f3'), border: t('1px solid rgba(255,255,255,0.07)', '1px solid rgba(0,0,0,0.07)') }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: t('#111', '#f5f5f3'), overflow: 'auto' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: t('#555', '#bbb'), marginBottom: 4 }}>Admin Panel</p>
            <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.5px', color: t('#fff', '#111') }}>Dashboard</h1>
          </div>
          <button onClick={onClose} style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', background: 'transparent', border: t('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), color: t('#666', '#aaa') }}>← Back</button>
        </div>

        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { label: 'Total visits', value: stats.totalVisits },
              { label: 'Unique users', value: stats.uniqueUsers },
              { label: 'Registered users', value: stats.totalUsers },
            ].map(s => (
              <div key={s.label} style={cardStyle}>
                <p style={{ fontSize: 11, color: t('#555', '#bbb'), marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                <p style={{ fontSize: 32, fontWeight: 500, color: t('#fff', '#111') }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['stats', 'visitors'] as const).map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 12, cursor: 'pointer', background: tab === tb ? t('#fff', '#111') : 'transparent', color: tab === tb ? t('#000', '#fff') : t('#555', '#aaa'), border: t('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), transition: 'all 0.2s' }}>
              {tb === 'stats' ? 'Recent visits' : 'All visitors'}
            </button>
          ))}
        </div>

        <div style={cardStyle}>
          {tab === 'stats' && (
            <>
              <p style={{ fontSize: 12, color: t('#555', '#bbb'), marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recent visits</p>
              {stats?.recentVisits.length === 0 && <p style={{ fontSize: 13, color: t('#444', '#ccc') }}>No visits yet</p>}
              {stats?.recentVisits.map((v: any) => (
                <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.05)') }}>
                  <div>
                    <p style={{ fontSize: 13, color: t('#e0e0e0', '#111'), marginBottom: 2 }}>{v.name}</p>
                    <p style={{ fontSize: 11, color: t('#555', '#aaa') }}>{v.email}</p>
                  </div>
                  <p style={{ fontSize: 11, color: t('#444', '#bbb') }}>{new Date(v.visitedAt).toLocaleString()}</p>
                </div>
              ))}
            </>
          )}
          {tab === 'visitors' && (
            <>
              <p style={{ fontSize: 12, color: t('#555', '#bbb'), marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>All visitors ({visitors.length})</p>
              {visitors.length === 0 && <p style={{ fontSize: 13, color: t('#444', '#ccc') }}>No visitors yet</p>}
              {visitors.map((v: any) => (
                <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.05)') }}>
                  <div>
                    <p style={{ fontSize: 13, color: t('#e0e0e0', '#111'), marginBottom: 2 }}>{v.name}</p>
                    <p style={{ fontSize: 11, color: t('#555', '#aaa') }}>{v.email}</p>
                  </div>
                  <p style={{ fontSize: 11, color: t('#444', '#bbb') }}>{new Date(v.visitedAt).toLocaleString()}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
