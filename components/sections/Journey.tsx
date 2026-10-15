'use client';
import { useRef } from 'react';
import { EARLIER, STORIES } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK, revealBatch } from '@/lib/motion';
import { Label } from './About';

type Card = { org: string; when: string; role: string; summary: string; items: { k: string; v: string }[]; stamp?: string };

const tia = EARLIER.find(e => e.company === 'TIA IT Wing')!;
const cds = EARLIER.find(e => e.company.startsWith('Create'))!;
const cit = EARLIER.find(e => e.company === 'CIT')!;

const CARDS: Card[] = [
  {
    org: 'Predigle', when: 'Dec 2025 — Present', role: 'Product Engineer', stamp: 'Now',
    summary: 'Building across interface, services and deployment for enterprise workflow teams.',
    items: STORIES.map(s => ({ k: s.short, v: s.did })),
  },
  {
    org: 'Create Digital Solution', when: 'Dec 2024 — May 2025', role: 'Full Stack Developer · Part-Time',
    summary: cds.summary,
    items: cds.bullets!.map(b => ({ k: b.problem, v: b.did })),
  },
  {
    org: 'TIA IT Wing', when: 'Feb 2024 — Nov 2024', role: 'Part-time → promoted to Full-Time Intern', stamp: 'Promoted',
    summary: tia.summary,
    items: tia.roles!.flatMap(r => r.bullets).slice(0, 5).map(b => ({ k: b.problem, v: b.did })),
  },
  {
    org: 'Coimbatore Institute of Technology', when: '2021 — Present', role: 'Integrated M.Sc. Software Systems', stamp: `CGPA ${cit.big!.value}`,
    summary: cit.summary,
    items: [],
  },
];

/** Experience as a deck of cards that stack on top of each other while you scroll. */
export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    revealBatch(root.current!);
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const cards = gsap.utils.toArray<HTMLElement>('.jcard');
      cards.slice(0, -1).forEach((c, i) => {
        gsap.to(c.querySelector('.jcard-in'), {
          scale: .9 + i * .015, opacity: .35, ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
        });
      });
    });
  }, { scope: root });

  return (
    <section className="sec journey" id="journey" ref={root}>
      <Label n="02">Journey</Label>
      <h2 className="h2">Where I&rsquo;ve <em>shipped.</em></h2>
      <div className="jstack">
        {CARDS.map((c, i) => (
          <article key={c.org} className="jcard" style={{ top: `calc(var(--hdr) + ${i * 22}px)` }}>
            <div className="jcard-in">
              <header className="jcard-head">
                <span className={`pr-state${i === 0 ? ' open' : ''}`}>
                  <svg viewBox="0 0 16 16" aria-hidden="true">{i === 0
                    ? <path d="M4 3v10M12 6v7M4 3a1.5 1.5 0 1 0 0 .01M12 6a1.5 1.5 0 1 0 0 .01M12 6c0-2-1-3-3-3H7" />
                    : <path d="M4 3v10M4 6c0 3 3 4 8 4M4 3a1.5 1.5 0 1 0 0 .01M12 10a1.5 1.5 0 1 0 0 .01M4 13a1.5 1.5 0 1 0 0 .01" />}</svg>
                  {i === 0 ? 'Open' : 'Merged'}
                </span>
                <span className="jcard-idx">#{CARDS.length - i}</span>
                <span className="jcard-when">{c.when}</span>
                {c.stamp && <span className="jcard-stamp">{c.stamp}</span>}
              </header>
              <div className="jcard-body">
                <div>
                  <h3>{c.org}</h3>
                  <p className="jcard-role">{c.org === 'Predigle' && <small className="assoc">Associate</small>}{c.role}</p>
                  <p className="jcard-sum">{c.summary}</p>
                </div>
                {c.items.length > 0 && (
                  <ul className="jcard-list">
                    {c.items.map(it => <li key={it.k}><b>{it.k}</b><span>{it.v}</span></li>)}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
