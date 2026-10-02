'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, reducedMotion, fireIntro, getLenis } from '@/lib/motion';

const LINES: [string, string][] = [
  ['$ npm run build', 'hl'], ['> bubalan.dev@2026.9.0 build', ''], ['✓ résumé parsed — single source of truth', 'ok'],
  ['✓ compiled ~/about.md', ''], ['✓ compiled ~/work/predigle.md', ''], ['⚑ confidential names redacted · 0 leaked', 'am'],
  ['✓ compiled ~/work/earlier.log', ''], ['✓ drew 18 line-art icons', 'ok'], ['✓ compiled ~/ai/workflow.md', ''],
  ['✓ linked ~/contact.sh', ''], ['▲ ready in 2.1s — shipping', 'hl'],
];

/** Fake build log counting 000 → 100, then the screen splits open. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const done = () => { html.classList.remove('loading'); getLenis()?.start(); fireIntro(); };
    if (reducedMotion()) { done(); requestAnimationFrame(() => setGone(true)); return; }
    const el = root.current!;
    const log = el.querySelector<HTMLElement>('.loader-log')!;
    const num = el.querySelector<HTMLElement>('.ld-num')!;
    const bar = el.querySelector<HTMLElement>('.loader-bar i')!;
    el.querySelector<HTMLElement>('.ld-time')!.textContent = new Date().toLocaleTimeString('en-GB');
    log.textContent = '';
    let shown = 0;
    const st = { v: 0 };
    const exit = gsap.timeline({ paused: true, onComplete: () => { setGone(true); ScrollTrigger.refresh(); } });
    exit.to(el.querySelector('.loader-count'), { yPercent: 30, opacity: 0, duration: .5, ease: 'power3.in' }, .15)
      .to(el.querySelector('.loader-half.top'), { yPercent: -101, duration: 1.1, ease: 'expo.inOut' }, .35)
      .to(el.querySelector('.loader-half.bot'), { yPercent: 101, duration: 1.1, ease: 'expo.inOut' }, .35)
      .add(done, .75);
    const count = gsap.to(st, {
      v: 100, duration: 2.1, ease: 'power2.inOut',
      onUpdate() {
        num.textContent = String(Math.round(st.v)).padStart(3, '0');
        bar.style.transform = `scaleX(${st.v / 100})`;
        const want = Math.floor((st.v / 100) * LINES.length);
        while (shown < want) {
          const d = document.createElement('div');
          d.className = LINES[shown][1]; d.textContent = LINES[shown][0];
          log.appendChild(d); shown++;
        }
      },
      onComplete: () => { exit.play(); },
    });
    return () => { count.kill(); exit.kill(); };
  }, []);

  if (gone) return null;
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-half top"><div className="loader-inner">
        <div className="loader-head"><span>bubalan.dev — build</span><span className="ld-time">--:--:--</span></div>
        <div className="loader-log" />
      </div></div>
      <div className="loader-half bot"><div className="loader-inner">
        <div className="loader-count"><span className="ld-num">000</span><sup>%</sup></div>
        <div className="loader-bar"><i /></div>
      </div></div>
    </div>
  );
}
