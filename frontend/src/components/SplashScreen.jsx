import React, { useEffect, useRef, useState } from 'react'

const SPLASH_CSS = `
  @keyframes sp-dot-breathe {
    0%, 100% { opacity: 0.35; transform: scale(0.85); }
    50%       { opacity: 0.75; transform: scale(1.15); }
  }
  @keyframes sp-dot-ring {
    0%   { opacity: 0.18; transform: scale(1);    }
    100% { opacity: 0;    transform: scale(2.8);  }
  }
  @keyframes sp-fade-out {
    0%   { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes sp-page-reveal {
    0%   { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0px);  }
  }
`

export default function SplashScreen({ onComplete }) {
  // phase: 'show' | 'fadeout' | 'done'
  const [phase, setPhase] = useState('show')
  const styleRef = useRef(false)

  useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = true
      const el = document.createElement('style')
      el.textContent = SPLASH_CSS
      document.head.appendChild(el)
    }
  }, [])

  useEffect(() => {
    // After 1.8 s start fade-out
    const t1 = setTimeout(() => setPhase('fadeout'), 1800)
    // After fade completes (~500 ms), notify parent
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 2350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#111214',      // charcoal-black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Subtle fade-out when leaving
        animation: phase === 'fadeout'
          ? 'sp-fade-out 0.52s cubic-bezier(0.4,0,0.2,1) forwards'
          : 'none',
        pointerEvents: 'all',
      }}
    >
      {/*
        Single dot cluster — positioned slightly right-of-center,
        just like the reference video
      */}
      <div
        style={{
          position: 'absolute',
          // right-center area
          top: '50%',
          left: '58%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
        }}
      >
        {/* Expanding ring 1 */}
        <div style={{
          position: 'absolute',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'rgba(160,160,170,0.45)',
          animation: 'sp-dot-ring 1.6s ease-out 0s infinite',
        }} />
        {/* Expanding ring 2 — staggered */}
        <div style={{
          position: 'absolute',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'rgba(160,160,170,0.30)',
          animation: 'sp-dot-ring 1.6s ease-out 0.55s infinite',
        }} />
        {/* Core dot */}
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(200,200,210,0.80)',
          animation: 'sp-dot-breathe 1.4s ease-in-out infinite',
          position: 'relative',
          zIndex: 1,
        }} />
      </div>
    </div>
  )
}
