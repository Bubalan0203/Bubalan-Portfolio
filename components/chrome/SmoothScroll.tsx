'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion, setLenis, scrollToEl } from '@/lib/motion';

/** Lenis smooth scroll driven by the GSAP ticker, plus in-page anchor handling. */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!reducedMotion()) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      if (document.documentElement.classList.contains('loading')) lenis.stop();
      lenis.on('scroll', ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')!;
      const el = document.querySelector(id === '#' ? '#top' : id);
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
      if (id !== '#main') { el.setAttribute('tabindex', '-1'); (el as HTMLElement).focus({ preventScroll: true }); }
    };
    document.addEventListener('click', onClick);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    addEventListener('load', refresh);

    return () => {
      document.removeEventListener('click', onClick);
      removeEventListener('load', refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
