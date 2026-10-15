'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type Lenis from 'lenis';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const reducedMotion = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- intro signal (loader → hero) ---------- */
let introReady = false;
const introSubs = new Set<() => void>();
export function onIntro(fn: () => void) {
  if (introReady) { fn(); return () => {}; }
  introSubs.add(fn);
  return () => { introSubs.delete(fn); };
}
export function fireIntro() { introReady = true; introSubs.forEach(f => f()); introSubs.clear(); }

/* ---------- Lenis instance ---------- */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };
export const getLenis = () => lenis;
export function scrollToEl(el: Element) {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(el as HTMLElement, { duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) });
  } else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
}

export const ASK_EVENT = 'site:ask';
export const openAsk = () => window.dispatchEvent(new Event(ASK_EVENT));

/** Fade-and-rise every `.rv` inside scope as it enters the viewport. */
export function revealBatch(scope: Element) {
  const items = scope.querySelectorAll('.rv');
  if (!items.length) return;
  gsap.set(items, { opacity: 0, y: 40 });
  ScrollTrigger.batch(items, { start: 'top 88%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .08 }) });
}
