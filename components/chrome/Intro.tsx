'use client';
import { useEffect, useRef } from 'react';
import { gsap, fireIntro, getLenis, reducedMotion } from '@/lib/motion';
import Logo from '@/components/brand/Logo';

// The "loader": short lines of code type in, then collapse into the B.
const LINES = [
  "import { craft } from '@bubalan/core'",
  'const ui = render(<Profile />)',
  'await api.connect()',
  'db.sync({ schema: true })',
  "ship('production')",
];

// Read once per page load, so React's double-run of effects in dev doesn't count as a second visit.
let seenCache: boolean | null = null;
function repeatVisit() {
  if (seenCache === null) {
    seenCache = false;
    try { seenCache = sessionStorage.getItem('booted') === '1'; sessionStorage.setItem('booted', '1'); } catch {}
  }
  return seenCache;
}

/**
 * Opening "build": the Chevron B assembles itself and its cursor blinks, the site compiles step by step,
 * then the mark docks into the header while the page fades in behind it.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const code = useRef<HTMLUListElement>(null);
  const ms = useRef<HTMLElement>(null);

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
    const rows = Array.from(code.current?.querySelectorAll('li') ?? []);
    // assemble the B (spine snaps up, chevrons slide in like typed ">")
    tl.set('.intro .lg-stroke', { strokeDashoffset: 0 })
      .fromTo('.intro .lg-spine', { scaleY: 0, transformOrigin: '50% 50%' }, { scaleY: 1, duration: .4, ease: 'expo.out' }, 0)
      .fromTo('.intro .lg-top', { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: .45, ease: 'back.out(2)' }, .2)
      .fromTo('.intro .lg-bottom', { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: .45, ease: 'back.out(2)' }, .35)
      .fromTo('.ic', { opacity: 0 }, { opacity: 1, duration: .6, ease: 'power2.out', stagger: .08 }, .1)
      .to(clock, { t: 1, duration: 2, ease: 'none', onUpdate: () => { if (ms.current) ms.current.textContent = `${Math.round(clock.t * 1840)} ms`; } }, 0);

    // each line types in, then gets its check mark
    rows.forEach((li, i) => {
      const txt = li.querySelector('code')!, chars = { n: 0 }, at = .3 + i * .28;
      tl.set(li, { opacity: 1 }, at)
        .to(chars, { n: LINES[i].length, duration: .24, ease: 'none', onUpdate: () => { txt.textContent = LINES[i].slice(0, Math.round(chars.n)); } }, at)
        .to(li.querySelector('b'), { opacity: 1, scale: 1, duration: .15, ease: 'back.out(3)' }, at + .24);
    });

    // the lines collapse upward into the B, which flashes as it "compiles"
    const collapse = .3 + LINES.length * .28 + .2;
    tl.add(() => {
      const m = mark.current!.getBoundingClientRect();
      const cy = m.top + m.height / 2, cx = m.left + m.width / 2;
      rows.slice().reverse().forEach((li, i) => {
        const r = li.getBoundingClientRect();
        gsap.to(li, { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2), scaleX: .05, scaleY: .3, opacity: 0, duration: .45, delay: i * .04, ease: 'power3.in' });
      });
    }, collapse)
      .fromTo('.intro-mark', { scale: 1, filter: 'brightness(1)' }, { scale: 1.14, filter: 'brightness(2)', duration: .15, ease: 'power2.out', yoyo: true, repeat: 1 }, collapse + .5)
      .to('.intro .lg-cursor', { opacity: 1, duration: .01 }, collapse + .55)
      .to('.intro .lg-cursor', { opacity: 0, duration: .01, repeat: 3, yoyo: true, repeatDelay: .14 }, collapse + .7)
      .add(() => {
        // glide the mark onto the header logo (same size, same spot) for a seamless hand-off
        const target = document.querySelector('.hdr-logo .logo')?.getBoundingClientRect();
        const from = mark.current!.getBoundingClientRect();
        if (!target) return;
        gsap.to(mark.current, {
          x: target.left + target.width / 2 - (from.left + from.width / 2),
          y: target.top + target.height / 2 - (from.top + from.height / 2),
          scale: target.width / from.width, duration: .9, ease: 'expo.inOut',
        });
      }, collapse + 1.05)
      .to('.ic', { opacity: 0, y: -8, duration: .35, stagger: .04 }, collapse + 1.05)
      .to('.intro-bg', { opacity: 0, duration: .7, ease: 'power2.inOut', onStart: done }, collapse + 1.3)
      .set(root.current, { display: 'none' }, collapse + 2);
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro-bg" />
      <div className="intro-corners">
        <span className="ic tl">bubalan.dev<br /><em>portfolio · v3</em></span>
        <span className="ic tr">Coimbatore, IN<br /><em>UTC +05:30</em></span>
        <span className="ic bl">stack<br /><em>react · node · django</em></span>
        <span className="ic br">build<br /><em ref={ms}>0 ms</em></span>
      </div>
      <div className="intro-stack">
        <div className="intro-mark" ref={mark}><Logo /></div>
        <ul className="intro-code" ref={code}>
          {LINES.map(l => <li key={l}><span className="ic-p">›</span><code /><b>✓</b></li>)}
        </ul>
      </div>
    </div>
  );
}
