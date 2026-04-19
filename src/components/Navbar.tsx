import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

type Props = { dark: boolean; toggle: () => void; onLoginClick: () => void; onAdminClick: () => void }

export default function Navbar({ dark, toggle, onLoginClick, onAdminClick }: Props) {
  const { user, logout } = useAuth()
  const t = (a: string, b: string) => dark ? a : b
  const [hoverBtn, setHoverBtn] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: '64px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 48px',
      borderBottom: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'),
      backdropFilter: 'blur(12px)',
      background: t('rgba(17,17,17,0.85)', 'rgba(245,245,243,0.85)'),
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: t('2px solid rgba(255,255,255,0.12)', '2px solid rgba(0,0,0,0.08)'), flexShrink: 0 }}>
          <img src="/src/assets/profile.jpg" alt="Tuguldur" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </div>
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.5px', color: t('#fff', '#111') }}>
          Tuguldur.
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['about', 'projects', 'skills', 'contact'].map(s => (
          <a key={s} href={'#' + s}
            onMouseEnter={() => setHoveredLink(s)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{ fontSize: 13, color: hoveredLink === s ? t('#fff', '#111') : t('#555', '#aaa'), textDecoration: 'none', transition: 'color 0.2s' }}>
            {s}
          </a>
        ))}

        <button onClick={toggle}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          style={{ background: hoverBtn ? t('#2a2a2a', '#e8e8e6') : 'transparent', fontSize: 12, cursor: 'pointer', padding: '6px 14px', borderRadius: 20, border: t('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), color: t('#666', '#aaa'), transition: 'background 0.2s' }}>
          {dark ? 'light' : 'dark'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {user.role === 'admin' && (
              <button onClick={onAdminClick} style={{ fontSize: 12, cursor: 'pointer', padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(59,130,246,0.4)', color: '#3b82f6', background: 'rgba(59,130,246,0.08)', transition: 'all 0.2s' }}>
                Admin
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: t('#2a2a2a', '#e8e8e6'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: t('#fff', '#111') }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button onClick={logout} style={{ fontSize: 12, cursor: 'pointer', padding: '6px 14px', borderRadius: 20, border: t('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), color: t('#666', '#aaa'), background: 'transparent' }}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button onClick={onLoginClick} style={{ fontSize: 12, cursor: 'pointer', padding: '6px 16px', borderRadius: 20, border: 'none', background: t('#fff', '#111'), color: t('#000', '#fff'), fontWeight: 500 }}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}
