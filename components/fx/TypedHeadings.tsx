'use client';
import { useEffect } from 'react';
import { gsap, ScrollTrigger, reducedMotion } from '@/lib/motion';

/** Section headings "type" themselves in (stepped left-to-right reveal plus a caret) as they scroll into view. */
export default function TypedHeadings() {
  useEffect(() => {
    if (reducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>('main .h2');
    const triggers = els.map(el => {
      const steps = Math.max(12, Math.min(40, (el.textContent || '').length));
      gsap.set(el, { clipPath: 'inset(-10% 100% -10% 0)' });
      return ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          el.classList.add('typing');
          gsap.to(el, {
            clipPath: 'inset(-10% 0% -10% 0)', duration: steps * .035, ease: `steps(${steps})`,
            onComplete: () => { el.classList.remove('typing'); el.classList.add('typed'); },
          });
        },
      });
    });
    return () => triggers.forEach(t => t.kill());
  }, []);
  return null;
}
