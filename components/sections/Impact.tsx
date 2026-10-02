'use client';
import { useRef, useState } from 'react';
import { LAYERS, STATS } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_OFF } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';

/** Résumé-only counters, and the layers I own as a 3D stack that separates as you scroll. */
export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(0); // how many layers are lit, bottom-up

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(n => {
        const target = Number(n.dataset.count), pre = n.dataset.pre || '', o = { v: 0 };
        n.textContent = pre + '0';
        ScrollTrigger.create({ trigger: n, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: target, duration: 1.8, ease: 'expo.out', onUpdate: () => { n.textContent = pre + Math.round(o.v); } }) });
      });
      gsap.from(el.querySelectorAll('.stat'), { opacity: 0, y: 30, duration: 1, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: el.querySelector('.stats'), start: 'top 85%' } });
    });
    mm.add({ ok: MOTION_OK, small: '(max-width: 900px)' }, ctx => {
      if (!ctx.conditions?.ok) return;
      const own = el.querySelector('.own');
      const o = { g: 6 };
      gsap.to(o, {
        g: ctx.conditions.small ? 30 : 44, ease: 'none',
        onUpdate: () => stack.current!.style.setProperty('--gap', o.g + 'px'),
        scrollTrigger: { trigger: own, start: 'top 80%', end: 'center 40%', scrub: .6, onUpdate: s => setOn(Math.floor(s.progress * (LAYERS.length + .999))) },
      });
      gsap.fromTo(stack.current, { '--rz': -46 }, { '--rz': -30, ease: 'none', scrollTrigger: { trigger: own, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    mm.add(MOTION_OFF, () => { setOn(LAYERS.length); stack.current!.style.setProperty('--gap', '32px'); });
  }, { scope: ref });

  return (
    <section className="sec" id="impact" data-path="~/impact.csv" aria-labelledby="impact-t" ref={ref}>
      <div className="wrap">
        <SectionHead num="06" path="~/impact.csv" titleId="impact-t" lines={['Numbers,', <em key="e">on the record.</em>]}
          lede="Every figure here comes straight from my résumé. Nothing rounded up." />
        <div className="stats">
          {STATS.map(s => (
            <div className="stat" key={s.label}>
              <div className="stat-n"><span data-count={s.n} data-pre={s.pre}>{(s.pre || '') + s.n}</span><small>{s.suffix}</small></div>
              <p className="stat-l">{s.label}<span className="stat-src">{s.src}</span></p>
            </div>
          ))}
        </div>

        <div className="own brk">
          <div>
            <span className="eyebrow">~/impact/layers</span>
            <h3>What I own on a product</h3>
            <p>Across my roles I&apos;ve worked every layer of a feature. Scroll to explode the stack.</p>
            <ol className="own-list">
              {[...LAYERS].reverse().map((l, ri) => {
                const i = LAYERS.length - 1 - ri;
                return <li key={l.key} className={i < on ? 'on' : undefined}><i>0{i + 1}</i>{l.text}<span>✓</span></li>;
              })}
            </ol>
          </div>
          <div className="stack3d" aria-hidden="true">
            <div className="stack3d-in" ref={stack}>
              {LAYERS.map((l, i) => (
                <div key={l.key} className={`slab${i === LAYERS.length - 1 ? ' top' : ''}${i < on ? ' on' : ''}`} style={{ '--i': i } as React.CSSProperties}>
                  <span>0{i + 1} {l.key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
