import React, { useState, useEffect } from 'react'

type Props = { dark: boolean }

const MailIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
)
const GithubIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)
const LinkedinIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

export default function Contact({ dark }: Props) {
  const t = (a: string, b: string) => dark ? a : b
  const [hovered, setHovered] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => { const h = () => setIsMobile(window.innerWidth <= 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])

  const links = [
    { label: 'Email', value: 'toogii.erendoo@gmail.com', href: 'mailto:toogii.erendoo@gmail.com', Icon: MailIcon },
    { label: 'GitHub', value: 'github.com/TuguldurICODE', href: 'https://github.com/TuguldurICODE', Icon: GithubIcon },
    { label: 'LinkedIn', value: 'linkedin.com/in/tuguldur', href: 'https://linkedin.com/in/tuguldur', Icon: LinkedinIcon },
  ]

  return (
    <section id="contact" style={{ padding: isMobile ? '40px 24px 80px' : '56px 48px 100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: t('#555','#bbb') }}>Contact</span>
        <div style={{ flex: 1, height: 1, background: t('rgba(255,255,255,0.06)','rgba(0,0,0,0.08)') }}></div>
      </div>
      <div style={{ maxWidth: 520 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
          <span style={{ fontSize: 12, color: t('#555','#aaa') }}>available for work</span>
        </div>
        <h2 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 500, letterSpacing: '-1px', marginBottom: 10, color: t('#fff','#111') }}>Let's work together</h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 32, color: t('#555','#aaa') }}>Open to remote opportunities worldwide.<br />Feel free to reach out anytime.</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map(({ label, value, href, Icon }, i) => (
            <a key={label} href={href} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: t('1px solid rgba(255,255,255,0.06)','1px solid rgba(0,0,0,0.07)'), textDecoration: 'none', transition: 'color 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hovered === i ? t('#2a2a2a','#e0e0de') : t('#1e1e1e','#ebebea'), border: t('1px solid rgba(255,255,255,0.06)','1px solid rgba(0,0,0,0.06)'), transition: 'background 0.2s' }}>
                  <Icon size={14} color={hovered === i ? t('#fff','#111') : t('#666','#888')} />
                </div>
                <span style={{ fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: t('#444','#bbb') }}>{label}</span>
              </div>
              <span style={{ fontSize: isMobile ? 11 : 13, color: hovered === i ? t('#fff','#111') : t('#555','#aaa'), transition: 'color 0.2s' }}>{isMobile ? value.split('@')[0] + (value.includes('@') ? '...' : '') : value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
