'use client';
import { useRef } from 'react';
import { PROJECTS, type Project } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK, revealBatch } from '@/lib/motion';
import { Label } from './About';

function Visual({ v }: { v: Project['vis'] }) {
  if (v === 'codecraft') return (
    <div className="vis vis-cc" aria-hidden="true">
      <div className="cc-prompt"><span>›</span> a pricing page with three tiers<i /></div>
      <div className="cc-out">
        <b /><b /><b />
      </div>
    </div>
  );
  if (v === 'roomz') return (
    <div className="vis vis-rz" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <span key={i} className={[1, 4, 6, 9, 10].includes(i) ? 'on' : ''} style={{ animationDelay: `${i * .23}s` }} />)}
    </div>
  );
  return (
    <div className="vis vis-pg" aria-hidden="true">
      <span className="node">Customer</span>
      <span className="wire" />
      <span className="node core">🔒 Gateway</span>
      <span className="wire" />
      <span className="node">Bank</span>
    </div>
  );
}

/** Pinned horizontal gallery on wide screens; a plain stack on phones. */
export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    revealBatch(root.current!);
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (min-width: 960px)`, () => {
      const dist = () => track.current!.scrollWidth - innerWidth;
      gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.proj-pin', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: .6, invalidateOnRefresh: true,
          onUpdate: s => gsap.set('.proj-progress i', { scaleX: s.progress }) },
      });
    });
  }, { scope: root });

  return (
    <section className="projects" id="projects" ref={root}>
      <div className="proj-pin">
        <div className="proj-head">
          <Label n="04">Selected projects</Label>
          <div className="proj-progress" aria-hidden="true"><i /></div>
        </div>
        <div className="proj-track" ref={track}>
          <div className="proj-intro">
            <h2 className="h2">Things I&rsquo;ve <em>built</em> on my own time.</h2>
            <p>Three side projects — an AI product, a cross-platform system and a fintech prototype. Scroll to browse →</p>
          </div>
          {PROJECTS.map((p, i) => (
            <article key={p.name} className="pcard">
              <div className="pcard-art"><Visual v={p.vis} /><span className="pcard-num">0{i + 1}</span></div>
              <div className="pcard-body">
                <p className="pcard-kind">{p.kind.split(' · ')[1]} <span>{p.badge}</span></p>
                <h3>{p.name}</h3>
                <p className="pcard-sub">{p.sub}</p>
                <ul>{p.bullets.map(b => {
                  const [why, what] = b.split(' → ');
                  return <li key={b}><span>{why}</span>{what && <b>{what}</b>}</li>;
                })}</ul>
                <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
            </article>
          ))}
          <div className="pcard pcard-next">
            <span className="core-dot" />
            <p>Next build <em>in progress.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}
