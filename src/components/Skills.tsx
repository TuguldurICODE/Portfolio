import React, { useState, useEffect } from 'react'

const skills = [
  { name: 'React', icon: '⚛' }, { name: 'TypeScript', icon: 'TS' }, { name: 'Node.js', icon: 'N' },
  { name: 'JavaScript', icon: 'JS' }, { name: 'Java', icon: '☕' }, { name: 'Firebase', icon: '🔥' },
  { name: 'Git', icon: '⎇' }, { name: 'REST API', icon: '⇄' }, { name: 'Express', icon: 'Ex' }, { name: 'Tailwind', icon: '🌊' },
]

type Props = { dark: boolean }

export default function Skills({ dark }: Props) {
  const t = (a: string, b: string) => dark ? a : b
  const [hovered, setHovered] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => { const h = () => setIsMobile(window.innerWidth <= 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])

  return (
    <section id="skills" style={{ padding: isMobile ? '40px 24px' : '56px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: t('#555','#bbb') }}>Skills</span>
        <div style={{ flex: 1, height: 1, background: t('rgba(255,255,255,0.06)','rgba(0,0,0,0.08)') }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
        {skills.map((s, i) => (
          <div key={s.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ borderRadius: 12, padding: isMobile ? '14px 10px' : '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: t('1px solid rgba(255,255,255,0.07)','1px solid rgba(0,0,0,0.07)'), background: hovered === i ? t('#222','#ebebea') : t('#1a1a1a','#ffffff'), boxShadow: hovered === i ? t('0 6px 24px rgba(0,0,0,0.4)','0 6px 20px rgba(0,0,0,0.08)') : t('none','0 1px 8px rgba(0,0,0,0.04)'), transform: hovered === i ? 'translateY(-3px)' : 'translateY(0)', transition: 'all 0.2s', cursor: 'default' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s.icon.length > 2 ? 12 : 18, fontWeight: 600, background: t('#252525','#f0f0ee'), color: hovered === i ? t('#fff','#111') : t('#888','#666'), border: t('1px solid rgba(255,255,255,0.06)','1px solid rgba(0,0,0,0.06)'), transition: 'all 0.2s' }}>
              {s.icon}
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color: hovered === i ? t('#fff','#111') : t('#666','#888'), transition: 'color 0.2s', textAlign: 'center' }}>{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
