'use client';
import { useRef } from 'react';
import { SKILLS, type Layer } from '@/lib/skills';
import { LAYERS } from '@/lib/content';
import { useGSAP, revealBatch } from '@/lib/motion';
import { Label } from './About';

const GROUPS: { layer: Layer; title: string; blurb: string }[] = [
  { layer: 'interfaces', title: 'Interfaces', blurb: 'Screens people use all day, built from parts that last.' },
  { layer: 'services', title: 'Services & data', blurb: 'APIs and data models that stay fast when traffic is real.' },
  { layer: 'platform', title: 'Platform', blurb: 'Hosting, auth and version control that keep shipping calm.' },
  { layer: 'ai', title: 'AI', blurb: 'LLM features inside products, and agents in my own workflow.' },
];

/** Bento grid of skills, with a spotlight that follows the pointer across each tile. */
export default function Toolkit() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => revealBatch(root.current!), { scope: root });

  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };

  return (
    <section className="sec toolkit" id="toolkit" ref={root}>
      <Label n="03">Toolkit</Label>
      <h2 className="h2">The <em>whole stack,</em> schema to ship.</h2>
      <div className="bento">
        {GROUPS.map((g, i) => (
          <article key={g.layer} className={`tile tile-${i} rv`} onPointerMove={spot}>
            <div className="tile-top">
              <h3>{g.title}</h3>
              <span className="tile-count">{SKILLS.filter(s => s.layer === g.layer).length} installed</span>
            </div>
            <p>{g.blurb}</p>
            <ul className="pills">
              {SKILLS.filter(s => s.layer === g.layer).map(s => (
                <li key={s.id} title={s.note}>
                  <svg viewBox="0 0 48 48" aria-hidden="true" style={{ color: s.color }} dangerouslySetInnerHTML={{ __html: s.svg }} />
                  {s.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article className="tile tile-ladder rv" onPointerMove={spot}>
          <div className="tile-top"><h3>How a feature travels</h3></div>
          <ol className="ladder">
            {LAYERS.map((l, i) => {
              const [head, rest] = l.text.split(' — ');
              return <li key={l.key}><span>{String(i + 1).padStart(2, '0')}</span><b>{head}</b><small>{rest}</small></li>;
            })}
          </ol>
        </article>
      </div>
    </section>
  );
}
