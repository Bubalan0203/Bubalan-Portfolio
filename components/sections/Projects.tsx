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
      <span className="node"><Ico d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />Customer</span>
      <span className="wire" />
      <span className="node core"><Ico d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-2.5 9h5v4h-5v-4Zm1-0v-1.5a1.5 1.5 0 0 1 3 0V12" />Gateway</span>
      <span className="wire" />
      <span className="node"><Ico d="M3 10h18L12 4 3 10Zm2 0v8m4.7-8v8m4.6-8v8M19 10v8M3 20h18" />Bank</span>
    </div>
  );
}

/** Stroke icon for the gateway diagram. */
function Ico({ d }: { d: string }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
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
          <Label n="05">Selected projects</Label>
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
