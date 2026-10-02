'use client';
import { useEffect, useRef, useState } from 'react';
import { SKILLS, type Layer } from '@/lib/skills';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_OFF, reducedMotion } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';

type Filter = 'all' | Layer;
const FILTERS: { f: Filter; label: string }[] = [
  { f: 'all', label: 'all' }, { f: 'interfaces', label: 'interfaces' }, { f: 'services', label: 'services & data' },
  { f: 'platform', label: 'platform & delivery' }, { f: 'ai', label: 'ai & agents' },
];
const LAYER_LABEL: Record<Layer, string> = { interfaces: 'interfaces', services: 'services & data', platform: 'platform', ai: 'ai & agents' };

/** Every résumé skill as a line-art icon that draws on scroll and glows in its brand colour on hover. */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const first = useRef(true);
  const shown = SKILLS.filter(s => filter === 'all' || s.layer === filter);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      ScrollTrigger.batch(el.querySelectorAll('.sk'), { start: 'top 90%', once: true, onEnter: b => b.forEach((t, i) => setTimeout(() => t.classList.add('drawn'), i * 70)) });
    });
    mm.add(MOTION_OFF, () => { el.querySelectorAll('.sk').forEach(t => t.classList.add('drawn')); });
  }, { scope: ref });

  // re-draw + re-enter the visible tiles whenever the filter changes
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const tiles = [...ref.current!.querySelectorAll<HTMLElement>('.sk:not([hidden])')];
    tiles.forEach(t => t.classList.remove('drawn'));
    const still = reducedMotion();
    requestAnimationFrame(() => requestAnimationFrame(() => tiles.forEach((t, i) => setTimeout(() => t.classList.add('drawn'), still ? 0 : i * 45))));
    if (!still) gsap.fromTo(tiles, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6, stagger: .035, ease: 'expo.out' });
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section className="sec" id="stack" data-path="~/stack.json" aria-labelledby="stack-t" ref={ref}>
      <div className="wrap">
        <SectionHead num="04" path="~/stack.json" titleId="stack-t" lines={['One developer,', <em key="e">every layer.</em>]}
          lede="Everything on my résumé, grouped by where it sits in a product. Hover a tool to see its colour." />
        <div className="chips" role="group" aria-label="Filter skills by layer">
          {FILTERS.map(({ f, label }) => (
            <button key={f} className="chip" type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {label} <b>{f === 'all' ? SKILLS.length : SKILLS.filter(s => s.layer === f).length}</b>
            </button>
          ))}
        </div>
        <ul className="sk-grid" role="list">
          {SKILLS.map(s => (
            <li key={s.id} className="sk" hidden={!(filter === 'all' || s.layer === filter)} style={{ '--brand': s.color } as React.CSSProperties}>
              <span className="sk-layer">{LAYER_LABEL[s.layer]}</span>
              <span className="sk-ico" aria-hidden="true"><svg viewBox="0 0 48 48" dangerouslySetInnerHTML={{ __html: s.svg }} /></span>
              <span className="sk-name">{s.name}</span>
              <span className="sk-note">{s.note}</span>
            </li>
          ))}
        </ul>
        <div className="sk-foot"><span>{shown.length} of {SKILLS.length} tools · all from résumé</span><span>icons: hand-drawn line art, not official logos</span></div>
      </div>
    </section>
  );
}
