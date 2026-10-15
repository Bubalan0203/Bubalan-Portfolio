'use client';
import { useEffect, useRef } from 'react';
import { PROFILE } from '@/lib/content';
import { gsap, useGSAP, onIntro, MOTION_OK } from '@/lib/motion';
import SystemMap from '@/components/fx/SystemMap';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  // the name reacts to the cursor: letters near the pointer get heavier, lift and glow
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches || !window.matchMedia(MOTION_OK).matches) return;
    const letters = Array.from(nameRef.current?.querySelectorAll<HTMLElement>('.nl') ?? []);
    const setters = letters.map(el => ({
      el,
      w: gsap.quickTo(el, '--w', { duration: .5, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: .6, ease: 'power3.out' }),
      g: gsap.quickTo(el, '--g', { duration: .5, ease: 'power3.out' }),
    }));
    const move = (e: PointerEvent) => {
      setters.forEach(({ el, w, y, g }) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), (e.clientY - (r.top + r.height / 2)) * 1.4);
        const k = Math.max(0, 1 - d / 260);
        w(600 + k * 200); y(-k * 10); g(k);
      });
    };
    const leave = () => setters.forEach(({ w, y, g }) => { w(600); y(0); g(0); });
    const sec = root.current!;
    sec.addEventListener('pointermove', move);
    sec.addEventListener('pointerleave', leave);
    return () => { sec.removeEventListener('pointermove', move); sec.removeEventListener('pointerleave', leave); };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.set('.hero-line > span', { yPercent: 110 });
      gsap.set('.hero-fade', { opacity: 0, y: 20 });
      gsap.set('.sysmap', { opacity: 0, y: 30, rotateX: 8, transformPerspective: 1200 });
      gsap.set('.sm-node, .sm-link, .sm-loop-t, .sm-fix-t', { opacity: 0 });
      const off = onIntro(() => {
        gsap.timeline({ delay: .05 })
          .to('.hero-line > span', { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .1 }, 0)
          .to('.hero-fade', { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .07 }, .3)
          .to('.sysmap', { opacity: 1, y: 0, rotateX: 0, duration: 1.4, ease: 'expo.out' }, .25)
          .to('.sm-node', { opacity: 1, duration: .5, stagger: .12 }, .7)
          .to('.sm-link, .sm-loop-t, .sm-fix-t', { opacity: 1, duration: .6, stagger: .05 }, 1);
      });
      return off;
    });
  }, { scope: root });

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-copy">
        <p className="hero-hint hero-fade"><small className="assoc">Associate</small>{PROFILE.title} <i>@</i> {PROFILE.company}</p>
        <h1 className="hero-title">
          <span className="hero-line hero-name" aria-label="Bubalan"><span ref={nameRef}>{'Bubalan'.split('').map((c, i) => <span key={i} className="nl" aria-hidden="true">{c}</span>)}<b className="hero-dot">.</b></span></span>
        </h1>
        <p className="hero-lede hero-fade">Turning complex problems into products people rely on.</p>
        <p className="hero-sub hero-fade">
          From the first requirement to a live release in the cloud, I design the data, the systems and the experience —
          working alongside <b>AI agents</b> for speed, with <b>a human eye on every change</b>.
        </p>
      </div>
      <div className="hero-side">
        <SystemMap />
      </div>
    </section>
  );
}
