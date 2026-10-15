'use client';
import { useRef } from 'react';
import { TAPE_WORDS } from '@/lib/content';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/lib/motion';

/** Endless word band whose speed and direction follow scroll velocity. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const loop = gsap.to('.mq-track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
      const st = ScrollTrigger.create({
        onUpdate: self => {
          const v = self.getVelocity() / 300;
          gsap.to(loop, { timeScale: (self.direction || 1) * Math.min(4, 1 + Math.abs(v)), duration: .3, overwrite: true });
          gsap.to(loop, { timeScale: self.direction || 1, duration: 1.2, delay: .3 });
        },
      });
      return () => { loop.kill(); st.kill(); };
    });
  }, { scope: root });

  const words = [...TAPE_WORDS, 'Shipped with care'];
  const row = words.map((w, i) => (
    <span key={i} className={i % 2 ? 'mq-w alt' : 'mq-w'}>{w}<i aria-hidden="true">◆</i></span>
  ));

  return (
    <div className="mq" ref={root} aria-label={words.join(', ')}>
      <div className="mq-track" aria-hidden="true">{row}{row}</div>
    </div>
  );
}
