'use client';
import { useRef, useState } from 'react';
import { PROFILE } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion';
import { useClock } from '@/components/chrome/Header';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const clock = useClock();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from('.cta-line > span', {
        yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: .1,
        scrollTrigger: { trigger: '.cta', start: 'top 75%' },
      });
    });
  }, { scope: root });

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  return (
    <section className="contact" id="contact" ref={root}>
      <p className="label"><span>08</span>Contact</p>
      <h2 className="cta">
        <span className="cta-line"><span>Let&rsquo;s build</span></span>
        <span className="cta-line"><span><em>what&rsquo;s next.</em></span></span>
      </h2>
      <div className="contact-row">
        <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}<span aria-hidden="true">↗</span></a>
        <button type="button" className="btn btn-line" onClick={copy} aria-live="polite">{copied ? 'Copied ✓' : 'Copy email'}</button>
      </div>
      <footer className="foot">
        <ul>{PROFILE.links.map(l => <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}</ul>
        <p>{PROFILE.location} · {clock || '--:--:--'} IST</p>
        <p>© 2026 {PROFILE.name}</p>
        <a href="#top" className="totop">Back to top ↑</a>
      </footer>
    </section>
  );
}
