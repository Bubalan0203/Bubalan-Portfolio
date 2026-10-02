'use client';
import { useEffect, useRef } from 'react';
import { gsap, finePointer, reducedMotion, scramble } from '@/lib/motion';

/** Custom cursor, magnetic buttons (.magnetic) and scrambling links (.scramble / .scramble-in), all delegated. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const html = document.documentElement;
    const offs: (() => void)[] = [];
    const on = <K extends keyof DocumentEventMap>(t: K, fn: (e: DocumentEventMap[K]) => void) => {
      document.addEventListener(t, fn as EventListener); offs.push(() => document.removeEventListener(t, fn as EventListener));
    };

    // scramble on hover/focus
    on('pointerover', e => {
      const el = (e.target as Element).closest?.('.scramble,.scramble-in') as HTMLElement | null;
      if (el && !el.contains(e.relatedTarget as Node)) scramble(el);
    });
    on('focusin', e => { const el = (e.target as Element).closest?.('.scramble,.scramble-in') as HTMLElement | null; if (el) scramble(el); });

    if (finePointer()) {
      const dx = gsap.quickTo(dot.current, 'x', { duration: .08 }), dy = gsap.quickTo(dot.current, 'y', { duration: .08 });
      const rx = gsap.quickTo(ring.current, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring.current, 'y', { duration: .45, ease: 'power3' });
      let mag: HTMLElement | null = null;
      on('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        html.classList.add('has-cursor');
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        const m = (e.target as Element).closest?.('.magnetic') as HTMLElement | null;
        if (mag && mag !== m) gsap.to(mag, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1,.4)' });
        mag = m;
        if (m) {
          const r = m.getBoundingClientRect();
          const cx = r.left + r.width / 2 - (gsap.getProperty(m, 'x') as number), cy = r.top + r.height / 2 - (gsap.getProperty(m, 'y') as number);
          gsap.to(m, { x: (e.clientX - cx) * .32, y: (e.clientY - cy) * .38, duration: .5, ease: 'power3.out' });
        }
      });
      on('pointerleave', () => html.classList.remove('has-cursor'));
      on('pointerover', e => {
        const t = (e.target as Element).closest?.('a,button,[data-cursor],.sk,input') as HTMLElement | null;
        ring.current!.classList.toggle('is-hover', !!t);
        const l = t?.dataset.cursor;
        ring.current!.classList.toggle('is-label', !!l);
        label.current!.textContent = l || '';
      });
    }
    return () => { offs.forEach(f => f()); html.classList.remove('has-cursor'); };
  }, []);

  return (
    <>
      <div className="cursor" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true"><span ref={label} /></div>
    </>
  );
}
