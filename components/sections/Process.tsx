'use client';
import { useRef, useState } from 'react';
import { HOW } from '@/lib/content';
import { useGSAP, revealBatch } from '@/lib/motion';
import { Label } from './About';

/** How I work with AI agents, as an accordion — one principle open at a time. */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  useGSAP(() => revealBatch(root.current!), { scope: root });

  return (
    <section className="sec process" id="process" ref={root}>
      <div className="process-side">
        <Label n="06">Process</Label>
        <h2 className="h2">AI, used like a <em>team.</em></h2>
        <p className="process-note rv">Agents speed me up; standards keep the output mine. Six rules I don&rsquo;t skip.</p>
      </div>
      <ol className="acc">
        {HOW.map((h, i) => (
          <li key={h.title} className={`acc-item rv${open === i ? ' open' : ''}`}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="acc-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="acc-t">{h.title}</span>
              <span className="acc-x" aria-hidden="true" />
            </button>
            <div className="acc-body"><div><p>{h.body}{'code' in h && <><code>{h.code}</code>{h.tail}</>}</p></div></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
