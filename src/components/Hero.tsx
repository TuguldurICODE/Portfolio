import React, { useState } from 'react'
import profileImg from '../assets/profile.jpg'

type Props = { dark: boolean }

export default function Hero({ dark }: Props) {
  const t = (a: string, b: string) => dark ? a : b
  const [hoverPrimary, setHoverPrimary] = useState(false)
  const [hoverSecondary, setHoverSecondary] = useState(false)

  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 80, maxWidth: 860, width: '100%' }}>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, color: t('#555', '#aaa') }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
            full-stack developer · tokyo
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 14, color: t('#fff', '#111') }}>
            Tuguldur<br />
            <span style={{ color: t('rgba(255,255,255,0.2)', 'rgba(0,0,0,0.18)') }}>Erendoo</span>
          </h1>
          <p style={{ fontSize: 15, marginBottom: 18, color: t('#666', '#999') }}>React · Node.js · TypeScript · Java</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 400, marginBottom: 36, color: t('#555', '#aaa') }}>
            Building clean, modern web apps. Open to remote opportunities worldwide.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#projects"
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              style={{ padding: '11px 24px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: 'none', background: hoverPrimary ? (dark ? '#e0e0e0' : '#333') : (dark ? '#fff' : '#111'), color: dark ? '#000' : '#fff', transition: 'background 0.2s' }}>
              View projects
            </a>
            <a href="/cv.pdf"
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
              style={{ padding: '11px 24px', borderRadius: 8, fontSize: 13, cursor: 'pointer', textDecoration: 'none', border: t('1px solid rgba(255,255,255,0.12)', '1px solid rgba(0,0,0,0.12)'), color: hoverSecondary ? (dark ? '#fff' : '#111') : (dark ? '#666' : '#aaa'), background: 'transparent', transition: 'color 0.2s' }}>
              Download CV
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', width: 260, height: 280, flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 28, transform: 'rotate(4deg)', background: t('#1e1e1e', '#e8e8e6'), border: t('1px solid rgba(255,255,255,0.04)', '1px solid rgba(0,0,0,0.06)') }}></div>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 28, transform: 'rotate(-2deg)', background: t('#191919', '#eeeeec'), border: t('1px solid rgba(255,255,255,0.04)', '1px solid rgba(0,0,0,0.06)') }}></div>
          <div style={{ position: 'relative', width: 260, height: 280, borderRadius: 24, overflow: 'hidden', border: t('1px solid rgba(255,255,255,0.06)', '1px solid rgba(0,0,0,0.06)') }}>
            <img src={profileImg} alt="Tuguldur Erendoo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        </div>

      </div>
    </section>
  )
}
