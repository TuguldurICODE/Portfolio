import React, { useState } from 'react'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'

function BgLines({ dark }: { dark: boolean }) {
  const stroke = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 900 1200" preserveAspectRatio="xMidYMid slice">
      <path d="M-50 180 C 80 120,200 260,340 200 S 560 80,700 160 S 820 280,980 220" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d="M-50 320 C 60 250,180 380,320 310 S 520 180,680 270 S 800 380,980 300" fill="none" stroke={stroke} strokeWidth="1"/>
      <path d="M-50 80 C 100 40,250 140,400 90 S 620 -20,750 70 S 870 160,980 100" fill="none" stroke={stroke} strokeWidth="0.8"/>
      <path d="M100 -20 C 140 100,80 250,160 380 S 240 560,180 700 S 100 820,200 950" fill="none" stroke={stroke} strokeWidth="1"/>
      <path d="M300 -30 C 360 90,280 220,380 360 S 440 520,360 660 S 300 800,420 930" fill="none" stroke={stroke} strokeWidth="0.8"/>
      <path d="M600 -10 C 680 130,560 280,660 420 S 740 580,640 720 S 580 860,700 980" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d="M-30 600 C 120 540,280 660,440 590 S 660 460,820 550 S 920 660,1000 580" fill="none" stroke={stroke} strokeWidth="0.9"/>
      <path d="M-30 820 C 100 760,260 880,420 800 S 640 670,800 760 S 920 860,1000 790" fill="none" stroke={stroke} strokeWidth="1"/>
      <path d="M750 -20 C 820 120,700 260,800 400 S 880 560,760 700 S 700 830,820 960" fill="none" stroke={stroke} strokeWidth="0.9"/>
      <path d="M-50 480 C 150 420,350 520,520 450 S 720 340,880 430 S 970 530,1000 470" fill="none" stroke={stroke} strokeWidth="1.1"/>
    </svg>
  )
}

function AppContent() {
  const [dark, setDark] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: dark ? '#111111' : '#f5f5f3', color: dark ? '#fff' : '#111', transition: 'background 0.3s, color 0.3s' }}>
      <BgLines dark={dark} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar
          dark={dark}
          toggle={() => setDark(d => !d)}
          onLoginClick={() => setShowLogin(true)}
          onAdminClick={() => setShowAdmin(true)}
        />
        <Hero dark={dark} />
        <Projects dark={dark} />
        <Skills dark={dark} />
        <Contact dark={dark} />
      </div>

      {showLogin && <LoginPage dark={dark} onClose={() => setShowLogin(false)} />}
      {showAdmin && <AdminDashboard dark={dark} onClose={() => setShowAdmin(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
