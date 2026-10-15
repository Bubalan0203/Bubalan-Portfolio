'use client';
import { useRef } from 'react';
import { ABOUT_FACTS, CERTS } from '@/lib/content';
import { useGSAP, revealBatch } from '@/lib/motion';
import { Label } from './About';

/** Education, achievements and certifications, kept apart from the work history. */
export default function Credentials() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => { revealBatch(root.current!); }, { scope: root });

  return (
    <section className="sec creds" id="education" ref={root}>
      <Label n="03">Education & recognition</Label>
      <div className="cr-grid">
        <article className="cr-degree rv">
          <p className="cr-k">degree · completed May 2026</p>
          <h3>M.Sc. Software Systems <small>(Integrated)</small></h3>
          <p className="cr-org">Coimbatore Institute of Technology · 2021 — 2026</p>
          <p className="cr-gpa"><b>8.22</b><span>CGPA</span></p>
        </article>

        <article className="cr-box rv">
          <p className="cr-k">achievements</p>
          <ul className="cr-ach">
            {ABOUT_FACTS.map(f => <li key={f.big}><b>{f.big}</b><span>{f.small}</span></li>)}
          </ul>
        </article>

        <article className="cr-box rv">
          <p className="cr-k">certifications</p>
          <ul className="cr-certs">
            {CERTS.map(c => {
              const [name, by] = c.split(' — ');
              return <li key={c}><b>{name}</b><span>{by}</span></li>;
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
