import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import profileImg from '../assets/profile.jpg'
import profileDarkImg from '../assets/profileDarkMode.jpg'

type Props = { dark: boolean; toggle: () => void; onLoginClick: () => void; onAdminClick: () => void }

export default function Navbar({ dark, toggle, onLoginClick, onAdminClick }: Props) {
  const { user, logout } = useAuth()
  const t = (a: string, b: string) => dark ? a : b
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: 'blur(12px)',
      background: t('rgba(17,17,17,0.92)', 'rgba(245,245,243,0.92)'),
      borderBottom: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'),
    }}>
      <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', border: t('2px solid rgba(255,255,255,0.12)', '2px solid rgba(0,0,0,0.08)'), flexShrink: 0 }}>
            <img src={profileImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: dark ? 0 : 1, transition: 'opacity 0.5s' }} />
            <img src={profileDarkImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: dark ? 1 : 0, transition: 'opacity 0.5s' }} />
          </div>
          <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.5px', color: t('#fff', '#111') }}>Tuguldur.</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hide-mobile">
          {['about','projects','skills','contact'].map(s => (
            <a key={s} href={'#'+s} style={{ fontSize: 13, color: t('#555','#aaa'), textDecoration: 'none' }}>{s}</a>
          ))}
          <button onClick={toggle} style={{ background: 'transparent', fontSize: 12, cursor: 'pointer', padding: '5px 12px', borderRadius: 20, border: t('1px solid rgba(255,255,255,0.1)','1px solid rgba(0,0,0,0.1)'), color: t('#666','#aaa') }}>
            {dark ? 'light' : 'dark'}
          </button>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {user.role === 'admin' && (
                <button onClick={onAdminClick} style={{ fontSize: 12, cursor: 'pointer', padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(59,130,246,0.4)', color: '#3b82f6', background: 'rgba(59,130,246,0.08)' }}>Admin</button>
              )}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: t('#2a2a2a','#e8e8e6'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: t('#fff','#111') }}>{user.name.charAt(0).toUpperCase()}</div>
              <button onClick={logout} style={{ fontSize: 12, cursor: 'pointer', padding: '5px 12px', borderRadius: 20, border: t('1px solid rgba(255,255,255,0.1)','1px solid rgba(0,0,0,0.1)'), color: t('#666','#aaa'), background: 'transparent' }}>Logout</button>
            </div>
          ) : (
            <button onClick={onLoginClick} style={{ fontSize: 12, cursor: 'pointer', padding: '6px 16px', borderRadius: 20, border: 'none', background: t('#fff','#111'), color: t('#000','#fff'), fontWeight: 500 }}>Login</button>
          )}
        </div>

        {/* Mobile right */}
        <div style={{ display: 'none', alignItems: 'center', gap: 10 }} className="show-mobile">
          <button onClick={toggle} style={{ background: 'transparent', fontSize: 11, cursor: 'pointer', padding: '4px 10px', borderRadius: 20, border: t('1px solid rgba(255,255,255,0.1)','1px solid rgba(0,0,0,0.1)'), color: t('#666','#aaa') }}>{dark ? '☀' : '☾'}</button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: t('#fff','#111') }}>
            {menuOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: t('#111','#fff'), borderTop: t('1px solid rgba(255,255,255,0.05)','1px solid rgba(0,0,0,0.06)'), padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['about','projects','skills','contact'].map(s => (
            <a key={s} href={'#'+s} onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: t('#ccc','#333'), textDecoration: 'none', padding: '10px 0', borderBottom: t('1px solid rgba(255,255,255,0.05)','1px solid rgba(0,0,0,0.05)') }}>{s}</a>
          ))}
          <div style={{ paddingTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {user ? (
              <>
                {user.role === 'admin' && <button onClick={() => { onAdminClick(); setMenuOpen(false) }} style={{ fontSize: 13, cursor: 'pointer', padding: '8px 16px', borderRadius: 20, border: '1px solid rgba(59,130,246,0.4)', color: '#3b82f6', background: 'rgba(59,130,246,0.08)' }}>Admin</button>}
                <button onClick={() => { logout(); setMenuOpen(false) }} style={{ fontSize: 13, cursor: 'pointer', padding: '8px 16px', borderRadius: 20, border: t('1px solid rgba(255,255,255,0.1)','1px solid rgba(0,0,0,0.1)'), color: t('#888','#666'), background: 'transparent' }}>Logout</button>
              </>
            ) : (
              <button onClick={() => { onLoginClick(); setMenuOpen(false) }} style={{ fontSize: 13, cursor: 'pointer', padding: '8px 20px', borderRadius: 20, border: 'none', background: t('#fff','#111'), color: t('#000','#fff'), fontWeight: 500 }}>Login</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
