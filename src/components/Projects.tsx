import React, { useState } from 'react'

const projects = [
  { title: 'Task manager app', desc: 'Full-stack app with real-time sync', tags: ['React', 'Node.js', 'Firebase'] },
  { title: 'E-commerce platform', desc: 'Online store with payment & admin', tags: ['TypeScript', 'Express'] },
  { title: 'Portfolio site', desc: 'This website — deployed on Firebase', tags: ['React', 'Firebase'] },
]

type Props = { dark: boolean }

export default function Projects({ dark }: Props) {
  const t = (a: string, b: string) => dark ? a : b
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <section id="projects" style={{ padding: '56px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: t('#555', '#bbb') }}>Projects</span>
        <div style={{ flex: 1, height: 1, background: t('rgba(255,255,255,0.06)', 'rgba(0,0,0,0.08)') }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {projects.map((p, i) => (
          <div
            key={p.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 14, overflow: 'hidden',
              border: t('1px solid rgba(255,255,255,0.07)', '1px solid rgba(0,0,0,0.07)'),
              background: t('#1a1a1a', '#ffffff'),
              boxShadow: hovered === i
                ? t('0 8px 32px rgba(0,0,0,0.5)', '0 8px 32px rgba(0,0,0,0.1)')
                : t('0 2px 12px rgba(0,0,0,0.3)', '0 2px 12px rgba(0,0,0,0.04)'),
              transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t('#141414', '#f2f2f0'), borderBottom: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.05)') }}>
              <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
                <rect x="8" y="12" width="44" height="34" rx="5" fill="none" stroke={t('#2e2e2e', '#ccc')} strokeWidth="1"/>
                <rect x="14" y="20" width="20" height="3" rx="1.5" fill={t('#2e2e2e', '#ccc')}/>
                <rect x="14" y="28" width="32" height="2" rx="1" fill={t('#252525', '#ddd')}/>
                <rect x="14" y="34" width="24" height="2" rx="1" fill={t('#252525', '#ddd')}/>
                <rect x="38" y="6" width="26" height="26" rx="4" fill="none" stroke={t('#252525', '#ddd')} strokeWidth="1" transform="rotate(6 38 6)"/>
              </svg>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: t('#e0e0e0', '#111') }}>{p.title}</p>
              <p style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.6, color: t('#666', '#999') }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 4, background: t('#222', '#ebebea'), color: t('#666', '#888'), border: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)') }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
