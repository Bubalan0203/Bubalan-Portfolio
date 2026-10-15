'use client';
import { useEffect } from 'react';
import { gsap, reducedMotion } from '@/lib/motion';

const GLYPHS = '01<>/{}[]=+*#$%&_ABCDEFXYZ';

function scramble(el: HTMLElement & { _busy?: boolean }) {
  const node = [...el.childNodes].reverse().find(n => n.nodeType === 3 && n.textContent!.trim());
  if (!node || el._busy) return;
  const orig = node.textContent!;
  el._busy = true;
  let f = 0;
  const total = 16;
  const step = () => {
    node.textContent = orig.split('').map((ch, i) => (ch === ' ' || i < (f / total) * orig.length) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
    if (++f <= total) setTimeout(step, 28);
    else { node.textContent = orig; el._busy = false; }
  };
  step();
}

const MAGNET = '.btn,.chip,.round,.menu-toggle';
const TILT = '.pcard,.tile,.fact';
const SCRAMBLE = '.label';

/** Page-wide pointer effects: magnetic buttons, 3D card tilt and hover text scramble. */
export default function Interactions() {
  useEffect(() => {
    if (reducedMotion() || !matchMedia('(pointer: fine)').matches) return;
    const offs: (() => void)[] = [];
    const on = (el: Element, ev: string, fn: EventListener) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)); };

    document.querySelectorAll<HTMLElement>(MAGNET).forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
      on(el, 'pointermove', e => {
        const r = el.getBoundingClientRect(), pe = e as PointerEvent;
        xTo((pe.clientX - r.left - r.width / 2) * .18); yTo((pe.clientY - r.top - r.height / 2) * .18);
      });
      on(el, 'pointerleave', () => { xTo(0); yTo(0); });
    });

    document.querySelectorAll<HTMLElement>(TILT).forEach(el => {
      on(el, 'pointermove', e => {
        const r = el.getBoundingClientRect(), pe = e as PointerEvent;
        const px = (pe.clientX - r.left) / r.width - .5, py = (pe.clientY - r.top) / r.height - .5;
        gsap.to(el, { rotateY: px * 4, rotateX: -py * 4, transformPerspective: 1000, duration: .5, ease: 'power3.out', overwrite: 'auto' });
      });
      on(el, 'pointerleave', () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1,.5)', overwrite: 'auto' }));
    });

    const onEnter = (e: Event) => {
      const el = (e.target as Element).closest?.(SCRAMBLE) as HTMLElement | null;
      if (el && el === e.target) scramble(el);
    };
    document.addEventListener('pointerover', onEnter);
    offs.push(() => document.removeEventListener('pointerover', onEnter));

    return () => offs.forEach(f => f());
  }, []);
  return null;
}
