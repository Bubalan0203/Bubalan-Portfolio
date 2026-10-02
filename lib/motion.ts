'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type Lenis from 'lenis';
import type { TermLine } from './content';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** matchMedia query that gates all motion. Use inside gsap.matchMedia(). */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_OFF = '(prefers-reduced-motion: reduce)';
export const reducedMotion = () => typeof window !== 'undefined' && matchMedia(MOTION_OFF).matches;
export const finePointer = () => typeof window !== 'undefined' && matchMedia('(pointer: fine)').matches;

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const cssVar = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ---------- shared pointer ---------- */
export const pointer = { x: -9999, y: -9999 };
if (typeof window !== 'undefined') {
  addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
}

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

/* ---------- theme change signal (canvas re-reads colours) ---------- */
export const THEME_EVENT = 'site:theme';
export const ASK_EVENT = 'site:ask';
export const SECTION_EVENT = 'site:section';
export const openAsk = () => window.dispatchEvent(new Event(ASK_EVENT));

/* ---------- text scramble ---------- */
const GLYPHS = '!<>-_\\/[]{}=+*^?#01abcdefxyz';
type ScrambleEl = HTMLElement & { _scr?: boolean; _orig?: string };
export function scramble(el: ScrambleEl) {
  if (reducedMotion()) return;
  const node = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent?.trim());
  if (!node || el._scr) return;
  const orig = el._orig || (el._orig = node.textContent || '');
  el._scr = true;
  let f = 0;
  const total = 14;
  const step = () => {
    node.textContent = orig.split('').map((ch, i) => (ch === ' ' || i < (f / total) * orig.length) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
    if (++f <= total) requestAnimationFrame(() => setTimeout(step, 22));
    else { node.textContent = orig; el._scr = false; }
  };
  step();
}

/* ---------- terminal typer (imperative, cancellable) ---------- */
function staticLine(el: HTMLElement, ln: TermLine, prompt: string) {
  const d = document.createElement('div');
  if ('cmd' in ln) {
    const p = document.createElement('span'); p.className = 'p'; p.textContent = prompt;
    const c = document.createElement('span'); c.className = 'c'; c.textContent = ln.cmd;
    d.append(p, c);
  } else {
    ln.out.forEach(([t, c]) => { const s = document.createElement('span'); if (c) s.className = c; s.textContent = t; d.appendChild(s); });
  }
  el.appendChild(d);
}
export function typeTerm(el: HTMLElement, lines: TermLine[], { prompt = '~ $ ', speed = 26, gap = 260 } = {}) {
  el.textContent = '';
  const timers: number[] = [];
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
  const cur = document.createElement('span'); cur.className = 'cur';
  const finish = () => { const d = document.createElement('div'); d.innerHTML = `<span class="p">${prompt}</span>`; d.appendChild(cur); el.appendChild(d); };
  if (reducedMotion()) { lines.forEach(l => staticLine(el, l, prompt)); finish(); return () => {}; }
  let i = 0;
  const next = () => {
    if (i >= lines.length) return finish();
    const ln = lines[i++];
    if ('cmd' in ln) {
      const d = document.createElement('div');
      d.innerHTML = `<span class="p">${prompt}</span><span class="c"></span>`;
      const c = d.lastChild as HTMLElement; d.appendChild(cur); el.appendChild(d);
      let k = 0;
      const t = () => {
        c.textContent = ln.cmd.slice(0, ++k);
        if (k < ln.cmd.length) later(t, speed + Math.random() * speed);
        else { cur.remove(); later(next, gap + 200); }
      };
      later(t, 300);
    } else { staticLine(el, ln, prompt); later(next, ln.wait || gap * .45); }
  };
  next();
  return () => timers.forEach(clearTimeout);
}

/* ---------- common scroll animations ---------- */
export function revealBatch(scope: Element) {
  const items = scope.querySelectorAll('.rv');
  if (!items.length) return;
  ScrollTrigger.batch(items, { start: 'top 90%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .09 }) });
}
