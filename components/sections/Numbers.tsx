'use client';
import { useRef } from 'react';
import { STATS } from '@/lib/content';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, revealBatch } from '@/lib/motion';
import { Label } from './About';

export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    revealBatch(root.current!);
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>('.num-v').forEach(el => {
        const end = Number(el.dataset.n);
        const o = { v: 0 };
        el.textContent = '0';
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'expo.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); } }),
        });
      });
    });
  }, { scope: root });

  return (
    <section className="sec numbers" id="impact" ref={root}>
      <Label n="05">By the numbers</Label>
      <div className="num-grid">
        {STATS.map(s => (
          <div key={s.label} className="num rv">
            <p className="num-big">{s.pre}<span className="num-v" data-n={s.n}>{s.n}</span><em>{s.suffix}</em></p>
            <p className="num-label">{s.label}</p>
            <p className="num-src">{s.src}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
