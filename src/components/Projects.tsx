import React, { useState } from 'react'

const projects = [
  {
    title: "Tuugii's Shop",
    desc: 'E-commerce platform with cart, filter, product modal',
    tags: ['React', 'TypeScript', 'Vite'],
    github: 'https://github.com/TuguldurICODE/Port-Shop',
    demo: 'https://tuguldurportfolio--shop-ko9jpm3u.web.app',
  },
  {
    title: 'Portfolio site',
    desc: 'This website — with auth, admin dashboard, dark mode',
    tags: ['React', 'Node.js', 'Firebase'],
    github: 'https://github.com/TuguldurICODE/Portfolio',
    demo: 'https://tuguldurportfolio.web.app',
  },
  {
    title: 'Task manager app',
    desc: 'Full-stack app with real-time sync',
    tags: ['React', 'Node.js', 'Firebase'],
    github: '',
    demo: '',
  },
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
          <div key={p.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ borderRadius: 14, overflow: 'hidden', border: t('1px solid rgba(255,255,255,0.07)', '1px solid rgba(0,0,0,0.07)'), background: t('#1a1a1a', '#ffffff'), boxShadow: hovered === i ? t('0 8px 32px rgba(0,0,0,0.5)', '0 8px 32px rgba(0,0,0,0.1)') : t('0 2px 12px rgba(0,0,0,0.3)', '0 2px 12px rgba(0,0,0,0.04)'), transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
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
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 4, background: t('#222', '#ebebea'), color: t('#666', '#888'), border: t('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)') }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 11, padding: '5px 12px', borderRadius: 6, border: t('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), color: t('#777', '#888'), textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    GitHub
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 11, padding: '5px 12px', borderRadius: 6, background: t('#fff', '#111'), color: t('#000', '#fff'), textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
