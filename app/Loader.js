'use client'
import { useState, useEffect } from 'react'

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0)
  // 0 → B. fades in
  // 1 → bars shoot in, corners appear
  // 2 → square SPINS fast (1 rotation), bars BLINK
  // 3 → fade out + load

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 450),   // bars + corners appear
      setTimeout(() => setPhase(2), 980),   // spin + blink start
      setTimeout(() => setPhase(3), 3600),  // fade out after 2.5s spin
    ]
    timers.push(setTimeout(() => onComplete?.(), 4100))
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#FFFFFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      opacity: phase >= 3 ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: phase >= 3 ? 'none' : 'auto',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <style>{`
        @keyframes logoIn {
          from { opacity:0; transform:translate(-50%,-50%) scale(0.7); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes scaleY-in {
          from { opacity:0; transform:scaleY(0); }
          to   { opacity:1; transform:scaleY(1); }
        }
        @keyframes scaleX-in {
          from { opacity:0; transform:scaleX(0); }
          to   { opacity:1; transform:scaleX(1); }
        }
        @keyframes corner-h {
          from { width:0; }
          to   { width:28px; }
        }
        @keyframes corner-v {
          from { height:0; }
          to   { height:28px; }
        }
        /* SPIN: 270° — stops before completing full circle */
        @keyframes spinOnce {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(270deg); }
        }
        /* BLINK: bars pulse 3× */
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0.1; }
        }
      `}</style>

      {/* ── 300×300 container ── */}
      <div style={{ position:'relative', width:300, height:300, flexShrink:0 }}>

        {/* ═══ CORNER BRACKETS wrapper — spins in phase 2 ═══ */}
        <div style={{
          position:'absolute', inset:0,
          /* slow 2.5s spin */
          animation: phase >= 2
            ? 'spinOnce 2.5s ease-in-out both'
            : 'none',
        }}>
          {phase >= 1 && (
            <>
              {/* ┌ top-left horizontal */}
              <div style={{ position:'absolute', top:18, left:18, overflow:'hidden',
                animation:'corner-h 0.28s ease 170ms both' }}>
                <div style={{ width:28, height:3, background:'#2EA88A', borderRadius:'2px 0 0 0' }}/>
              </div>
              {/* ┌ top-left vertical */}
              <div style={{ position:'absolute', top:18, left:18, overflow:'hidden',
                animation:'corner-v 0.28s ease 230ms both' }}>
                <div style={{ width:3, height:28, background:'#2EA88A', borderRadius:'2px 0 0 0' }}/>
              </div>

              {/* ┐ top-right horizontal */}
              <div style={{ position:'absolute', top:18, right:18, overflow:'hidden',
                display:'flex', justifyContent:'flex-end',
                animation:'corner-h 0.28s ease 200ms both' }}>
                <div style={{ width:28, height:3, background:'#2EA88A', borderRadius:'0 2px 0 0' }}/>
              </div>
              {/* ┐ top-right vertical */}
              <div style={{ position:'absolute', top:18, right:18, overflow:'hidden',
                display:'flex', justifyContent:'flex-end',
                animation:'corner-v 0.28s ease 255ms both' }}>
                <div style={{ width:3, height:28, background:'#2EA88A', borderRadius:'0 2px 0 0' }}/>
              </div>

              {/* └ bottom-left horizontal */}
              <div style={{ position:'absolute', bottom:18, left:18, overflow:'hidden',
                animation:'corner-h 0.28s ease 230ms both' }}>
                <div style={{ width:28, height:3, background:'#2EA88A', borderRadius:'0 0 0 2px' }}/>
              </div>
              {/* └ bottom-left vertical */}
              <div style={{ position:'absolute', bottom:18, left:18, overflow:'hidden',
                display:'flex', alignItems:'flex-end',
                animation:'corner-v 0.28s ease 280ms both' }}>
                <div style={{ width:3, height:28, background:'#2EA88A', borderRadius:'0 0 0 2px' }}/>
              </div>

              {/* ┘ bottom-right horizontal */}
              <div style={{ position:'absolute', bottom:18, right:18, overflow:'hidden',
                display:'flex', justifyContent:'flex-end',
                animation:'corner-h 0.28s ease 250ms both' }}>
                <div style={{ width:28, height:3, background:'#2EA88A', borderRadius:'0 0 2px 0' }}/>
              </div>
              {/* ┘ bottom-right vertical */}
              <div style={{ position:'absolute', bottom:18, right:18, overflow:'hidden',
                display:'flex', alignItems:'flex-end', justifyContent:'flex-end',
                animation:'corner-v 0.28s ease 295ms both' }}>
                <div style={{ width:3, height:28, background:'#2EA88A', borderRadius:'0 0 2px 0' }}/>
              </div>
            </>
          )}
        </div>

        {/* ═══ CROSS BARS wrapper — blinks in phase 2 ═══ */}
        <div style={{
          position:'absolute', inset:0, zIndex:5,
          /* 2 blinks × 1.25s = 2.5s — synced with spin */
          animation: phase >= 2
            ? 'blink 1.25s ease-in-out 2 both'
            : 'none',
        }}>
          {phase >= 1 && (
            <>
              {/* TOP */}
              <div style={{
                position:'absolute', left:145, top:22, width:10, height:73,
                background:'linear-gradient(to bottom,#2EA88A,#2B8EC9)',
                borderRadius:'4px 4px 0 0',
                transformOrigin:'top center',
                animation:'scaleY-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 0ms both',
              }}/>
              {/* BOTTOM */}
              <div style={{
                position:'absolute', left:145, top:205, width:10, height:73,
                background:'linear-gradient(to top,#2EA88A,#2B8EC9)',
                borderRadius:'0 0 4px 4px',
                transformOrigin:'bottom center',
                animation:'scaleY-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 60ms both',
              }}/>
              {/* LEFT */}
              <div style={{
                position:'absolute', top:145, left:22, width:73, height:10,
                background:'linear-gradient(to right,#2EA88A,#2B8EC9)',
                borderRadius:'4px 0 0 4px',
                transformOrigin:'left center',
                animation:'scaleX-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 30ms both',
              }}/>
              {/* RIGHT */}
              <div style={{
                position:'absolute', top:145, left:205, width:73, height:10,
                background:'linear-gradient(to left,#2EA88A,#2B8EC9)',
                borderRadius:'0 4px 4px 0',
                transformOrigin:'right center',
                animation:'scaleX-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 90ms both',
              }}/>
            </>
          )}
        </div>

        {/* ═══ CENTER "B." — always on top ═══ */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          animation:'logoIn 0.4s cubic-bezier(0.34,1.2,0.64,1) both',
          opacity:0, zIndex:30,
          fontSize:52, fontWeight:900, lineHeight:1,
          letterSpacing:'-0.02em', color:'#111827',
          background:'#FFFFFF',
          padding:'16px 20px',
        }}>
          B<span style={{ color:'#2EA88A' }}>.</span>
        </div>

      </div>

    </div>
  )
}
