'use client';
import { useRef } from 'react';
import { ABOUT_TEXT, ABOUT_FACTS, CERTS } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK, revealBatch } from '@/lib/motion';

export function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return <p className="label rv"><span>{n}</span>{children}<i aria-hidden="true" /></p>;
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // words light up one by one as the paragraph scrolls through the viewport
      gsap.fromTo('.about-text .w', { opacity: .14 }, {
        opacity: 1, stagger: .05, ease: 'none',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
      revealBatch(root.current!);
    });
  }, { scope: root });

  return (
    <section className="sec about" id="about" ref={root}>
      <Label n="01">About</Label>
      <div className="about-cols">
      <p className="about-text">
        {ABOUT_TEXT.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}
      </p>
      <div className="about-grid">
        {ABOUT_FACTS.map(f => (
          <div key={f.big} className="fact rv">
            <strong>{f.big}</strong>
            <span>{f.small}</span>
          </div>
        ))}
        <div className="fact fact-certs rv">
          <span className="mini">Certified</span>
          <ul>{CERTS.map(c => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
      </div>
    </section>
  );
}
