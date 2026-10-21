'use client';
import { useEffect, useRef } from 'react';
import { gsap, fireIntro, getLenis, reducedMotion } from '@/lib/motion';
import { useClock } from './Header';

// Read once per page load, so React's double-run of effects in dev doesn't count as a second visit.
let seenCache: boolean | null = null;
function repeatVisit() {
  if (seenCache === null) {
    seenCache = false;
    try { seenCache = localStorage.getItem('booted') === '1'; localStorage.setItem('booted', '1'); } catch {}
  }
  return seenCache;
}

// Circuit traces from the chip out to the screen edge (drawn chip-out, the direction the power flows).
const TRACES = (() => {
  const out: string[] = [];
  const cx = 720, cy = 432, hw = 124, hh = 84;
  for (let i = 0; i < 7; i++) {
    const o = -hh + 12 + i * ((2 * hh - 24) / 6);
    [-1, 1].forEach(dir => {
      const sx = cx + dir * hw, sy = cy + o, run = 60 + ((i * 37) % 90), jog = 40 + ((i * 53) % 120);
      const bend = Math.sign(o) || 1;
      out.push(`M${sx} ${Math.round(sy)} L${sx + dir * run} ${Math.round(sy)} L${sx + dir * (run + jog)} ${Math.round(sy + bend * jog)} L${dir < 0 ? -700 : 2140} ${Math.round(sy + bend * jog)}`);
    });
  }
  for (let i = 0; i < 6; i++) {
    const o = -hw + 24 + i * ((2 * hw - 48) / 5);
    [-1, 1].forEach(dir => {
      const sx = cx + o, sy = cy + dir * hh, run = 40 + ((i * 41) % 70), jog = 30 + ((i * 29) % 90);
      const bend = Math.sign(o) || 1;
      out.push(`M${Math.round(sx)} ${sy} L${Math.round(sx)} ${sy + dir * run} L${Math.round(sx + bend * jog)} ${sy + dir * (run + jog)} L${Math.round(sx + bend * jog)} ${dir < 0 ? -500 : 1400}`);
    });
  }
  return out;
})();

const B_PATH = 'M14 8H58C78 8 88 20 88 34C88 44 82 52 74 56C86 60 92 70 92 82C92 100 80 112 60 112H14ZM34 26V50H56C64 50 68 45 68 38C68 31 64 26 56 26ZM34 68V94H60C68 94 72 88 72 81C72 74 68 68 60 68Z';

/** A solid glass B: dark extruded body, a translucent cyan face, a bright rim and a diagonal sheen. */
function GlassB() {
  return (
    <svg viewBox="0 0 106 132" className="gb" aria-hidden="true">
      <defs>
        <linearGradient id="gb-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9f7ff" stopOpacity=".85" />
          <stop offset=".45" stopColor="#5fd3f5" stopOpacity=".55" />
          <stop offset="1" stopColor="#1b7fb0" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="gb-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="gb-clip"><path d={B_PATH} clipRule="evenodd" /></clipPath>
      </defs>
      {/* extruded body */}
      {[9, 7.5, 6, 4.5, 3, 1.5].map((d, i) => (
        <path key={d} d={B_PATH} fillRule="evenodd" transform={`translate(${d * .5} ${d})`} fill={['#06222f', '#0a3344', '#0e4459', '#13566f', '#196a87', '#20809f'][i]} />
      ))}
      {/* glass face */}
      <path d={B_PATH} fillRule="evenodd" fill="url(#gb-face)" stroke="#e8fbff" strokeOpacity=".9" strokeWidth="1.4" strokeLinejoin="round" />
      <g clipPath="url(#gb-clip)"><rect className="gb-sheen" x="-60" y="-10" width="40" height="160" fill="url(#gb-sheen)" transform="rotate(20)" /></g>
    </svg>
  );
}

/**
 * Opening "fab": three glass layers stack onto a chip, a glass B rises out of it and lights up, the circuits
 * fire outward, the layers dissolve and the circuits pull back in, then the B goes up into the header while the chip opens and the page comes in.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const ms = useRef<HTMLElement>(null);
  const clock = useClock();

  useEffect(() => {
    const done = () => {
      document.documentElement.classList.remove('loading');
      getLenis()?.start();
      fireIntro();
    };
    if (reducedMotion()) { if (root.current) root.current.style.display = 'none'; done(); return; }

    const clock = { t: 0 };
    const tl = gsap.timeline();
    if (repeatVisit()) tl.timeScale(1.3);
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __intro: gsap.core.Timeline }).__intro = tl;
    const layers = gsap.utils.toArray<HTMLElement>('.ichip-layer');

    gsap.set('.ichip-iso', { rotateX: 50, rotateZ: 0 });
    gsap.set('.intro-mark', { filter: 'brightness(.7) drop-shadow(0 0 0px rgba(76,216,255,0))' });
    tl.set('.gb-sheen', { x: 0 }, 0)
      .fromTo('.ic', { opacity: 0 }, { opacity: 1, duration: .6, ease: 'power2.out', stagger: .08 }, .1)
      .to(clock, { t: 1, duration: 3.55, ease: 'none', onUpdate: () => { if (ms.current) ms.current.textContent = `${Math.round(clock.t * 1840)} ms`; } }, 0)
      // 1 · the bare chip appears, three glass layers drop in and stack on it
      .fromTo('.ichip-base', { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .55, ease: 'power3.out' }, 0)
      .fromTo(layers, { z: i => 320 - i * 70, opacity: 0 }, { z: i => 14 + i * 12, opacity: 1, duration: .45, ease: 'power3.out', stagger: .1 }, .1)
      .to(layers, { z: i => 4 + i * 3, duration: .18, ease: 'power2.in' }, .75)
      // 2 · once stacked, the glass B rises out of the die
      .fromTo('.intro-mark', { opacity: 0, y: 14, scale: .8 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: 'power3.out' }, .9)
      // 3 · the B lights up
      .fromTo('.ichip-core', { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .35, ease: 'power2.out' }, 1.3)
      .to('.intro-mark', { filter: 'brightness(1.1) drop-shadow(0 0 16px rgba(76,216,255,.9))', duration: .3, ease: 'power2.out' }, 1.3)
      .to('.gb-sheen', { x: 200, duration: .7, ease: 'power2.inOut' }, 1.3)
      // 4 · only then the circuits activate: traces draw out from the chip with a pulse on each
      .fromTo('.itr-pad', { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false, stagger: { each: .01, from: 'random' } }, 1.55)
      .fromTo('.itr-base', { strokeDashoffset: 1000, opacity: 1 }, { strokeDashoffset: 0, duration: .7, ease: 'power2.out', immediateRender: false, stagger: { each: .012, from: 'random' } }, 1.6)
      .fromTo('.itr-flow', { strokeDashoffset: 0, opacity: 1 }, { strokeDashoffset: -1000, duration: .8, ease: 'power1.in', immediateRender: false, stagger: { each: .012, from: 'random' } }, 1.6)
      .to('.itr-flow', { opacity: 0, duration: .15 }, 2.5)
      // 5 · the glass layers dissolve, then the circuits pull back into the chip
      .to(layers, { opacity: 0, duration: .4, ease: 'power1.out', stagger: { each: .1, from: 'end' } }, 2.5)
      .to('.itr-base', { strokeDashoffset: 1000, duration: .5, ease: 'power2.in', stagger: { each: .006, from: 'random' } }, 2.9)
      .to('.itr-pad', { opacity: 0, duration: .2 }, 3.4)
      // 6 · the B goes up into the header logo while the chip opens and the page comes in
      .add(() => {
        const target = document.querySelector('.hdr-logo .logo')?.getBoundingClientRect();
        const from = mark.current!.getBoundingClientRect();
        if (!target) return;
        gsap.to(mark.current, {
          x: target.left + target.width / 2 - (from.left + from.width / 2),
          y: target.top + target.height / 2 - (from.top + from.height / 2),
          scale: target.width / from.width, duration: .9, ease: 'expo.inOut',
        });
      }, 3.5)
      .to('.ichip-core', { opacity: 0, scale: 1.6, duration: .5 }, 3.5)
      .to('.ichip-base', { opacity: 0, scale: .92, duration: .5, ease: 'power2.in' }, 3.55)
      .to('.ic', { opacity: 0, y: -8, duration: .35, stagger: .04 }, 3.5)
      .to('.intro-bg', { opacity: 0, duration: .7, ease: 'power2.inOut', onStart: done }, 3.8)
      .to(mark.current, { opacity: 0, duration: .25 }, 4.3)
      .set(root.current, { display: 'none' }, 4.55);
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro-bg" />
      <div className="intro-corners">
        <span className="ic tl">Bubalan S<br /><em>product engineer</em></span>
        <span className="ic tr">Coimbatore, IN<br /><em>{clock || '--:--'} IST</em></span>
        <span className="ic bl">status<br /><em>open to projects</em></span>
        <span className="ic br">build<br /><em ref={ms}>0 ms</em></span>
      </div>
      <svg className="itr" viewBox="0 0 1440 900" width="1440" height="900">
        {TRACES.map((d, i) => <path key={`b${i}`} d={d} className="itr-base" pathLength={1000} />)}
        {TRACES.map((d, i) => <path key={`f${i}`} d={d} className="itr-flow" pathLength={1000} />)}
        {TRACES.map((d, i) => { const [x, y] = d.slice(1).split(' L')[0].split(' '); return <circle key={`p${i}`} cx={x} cy={y} r="2.6" className="itr-pad" />; })}
      </svg>
      <div className="intro-stack">
        <div className="ichip">
          <div className="ichip-iso">
            <div className="ichip-base"><i className="ichip-die" /></div>
            <div className="ichip-layer l1" />
            <div className="ichip-layer l2" />
            <div className="ichip-layer l3" />
          </div>
          <div className="ichip-core" />
          <div className="intro-mark" ref={mark}><GlassB /></div>
        </div>
      </div>
    </div>
  );
}
