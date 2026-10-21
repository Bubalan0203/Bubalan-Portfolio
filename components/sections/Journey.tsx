'use client';
import { useEffect, useRef, useState } from 'react';
import { EARLIER, STORIES, type Story } from '@/lib/content';
import { revealBatch, useGSAP } from '@/lib/motion';
import { Label } from './About';

/* ---------- HEAD: where I am now ---------- */

const INTERN = {
  title: 'Software Developer Intern', dates: 'Dec 2025 — May 2026',
  bullets: [
    'Built dashboards in AngularJS and React from reusable components, so new workflow views are assembled from shared pieces',
    'Developed REST APIs in Django and Node.js, improving the performance and reliability of the services behind the screens',
    'Implemented secure authentication and role-based access, so users only see what their role allows',
    'Shipped production releases with zero-downtime deployments',
  ],
};

/**
 * One company = one sticky card. The wrapper is taller than the screen; as you scroll through it,
 * the card steps from one role to the next. Clicking a role jumps the scroll to that step.
 */
function RoleScroller({ steps, children }: { steps: number; children: (i: number, go: (i: number) => void) => React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (steps < 2) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      setI(Math.min(steps - 1, Math.floor(p * steps)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [steps]);

  const go = (n: number) => {
    const el = wrap.current;
    if (!el || steps < 2) { setI(n); return; }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((n + .5) / steps), behavior: 'smooth' });
  };

  return (
    <div ref={wrap} className={`rs${steps > 1 ? ' multi' : ''}`} style={steps > 1 ? { height: `calc(${steps * 85}vh + 20vh)` } : undefined}>
      {/* `go` only reads the ref when a role is clicked, not during render */}
      {/* eslint-disable-next-line react-hooks/refs */}
      <div className="rs-pin">{children(i, go)}</div>
    </div>
  );
}

/** Small live illustration for each problem, so the panel shows the idea rather than describing it. */
function Scene({ kind }: { kind: Story['scene'] }) {
  if (kind === 'flow') {
    return (
      <div className="sc sc-flow" aria-hidden="true">
        {['document', 'extract', 'map to keys', 'validate', 'save'].map((s, i) => <span key={s} style={{ animationDelay: `${i * .7}s` }}>{s}</span>)}
      </div>
    );
  }
  if (kind === 'sync') {
    return (
      <div className="sc sc-sync" aria-hidden="true">
        <span className="sc-box">Doctor<small>consults · notes</small></span>
        <span className="sc-wire"><i /><i /></span>
        <span className="sc-box hot">Healthcare app<small>role-based flows</small></span>
        <span className="sc-wire"><i /><i /></span>
        <span className="sc-box">Front desk<small>visits · office</small></span>
      </div>
    );
  }
  if (kind === 'shield') {
    return (
      <div className="sc sc-access" aria-hidden="true">
        <span className="sc-box">PHI<small>patient data</small></span>
        <span className="sc-arrow">→</span>
        <span className="sc-box hot">HIPAA rules<small>access · audit · encryption</small></span>
        <span className="sc-arrow">→</span>
        <span className="sc-box">feature<small>shipped compliant</small></span>
      </div>
    );
  }
  return (
    <div className="sc sc-access" aria-hidden="true">
      <span className="sc-box">front end<small>React · Angular</small></span>
      <span className="sc-arrow">→</span>
      <span className="sc-box hot">back end<small>APIs · services</small></span>
      <span className="sc-arrow">→</span>
      <span className="sc-box">database<small>patient records</small></span>
    </div>
  );
}

/** A live "console" for the current job: version switcher for the two roles and a bento of problem modules. */
function NowConsole() {
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);

  // cycle the expanded module until the visitor takes over
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setOpen(o => (o + 1) % STORIES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const pick = (i: number) => { setOpen(i); setPaused(true); };

  return (
    <div className="nc rv">
      <div className="nc-bar">
        <span className="nc-app"><i /> predigle · production</span>
        <span className="nc-ver on"><b>now</b>Associate Product Engineer</span>
      </div>
      <p className="nc-role"><span>May 2026 — now</span>current role</p>

      <div className="nc-bento">
        {STORIES.map((s, i) => (
          <article key={s.id} className={`nc-mod${i === open ? ' open' : ''}`} onClick={() => pick(i)} onKeyDown={e => { if (e.key === 'Enter') pick(i); }} tabIndex={0}>
            <header><span>{String(i + 1).padStart(2, '0')} · {s.tag}</span>{i === open && !paused && <em className="nc-timer" key={open} />}</header>
            <h3>{i === open ? s.title : s.short}</h3>
            {i === open && (
              <div className="nc-detail">
                <Scene kind={s.scene} />
                <div className="pb-cols">
                  <div><p className="pb-h">The problem</p><p>{s.problem}</p></div>
                  <div><p className="pb-h">What I did · {s.role.toLowerCase()}</p><p className="pb-did">{s.did}</p></div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

/* ---------- History: before Predigle ---------- */

function EarlierWork() {
  const tia = EARLIER.find(e => e.company === 'TIA IT Wing')!;
  const cds = EARLIER.find(e => e.company.startsWith('Create'))!;
  const companies = [
    { org: cds.company, when: 'Dec 2024 — May 2025', sum: cds.summary, roles: [{ title: 'Full Stack Developer · Part-Time', dates: 'Dec 2024 – May 2025', bullets: cds.bullets! }] },
    ...tia.roles!.map(r => ({ org: tia.company, when: r.dates.replace('–', '—'), sum: tia.summary, roles: [{ title: r.title, dates: r.dates, bullets: r.bullets }] })),
  ];

  return (
    <div className="ew">
      <Label n="02">earlier work · Feb 2024 — May 2025</Label>
      <div className="nc-head">
        <h2 className="nc-title rv">Where the <em>foundation</em> was built.</h2>
        <p className="jh-intro rv">Two teams before Predigle, latest first: Create Digital Solution, then TIA IT Wing full-time and part-time.</p>
      </div>
      {companies.map(c => (
        <RoleScroller key={c.roles[0].title} steps={c.roles.length}>
          {(i, go) => {
            const r = c.roles[i];
            return (
              <article className="co">
                <header className="co-head">
                  <div><h3>{c.org}</h3><p className="gl-sum">{c.sum}</p></div>
                  <span className="co-when">{c.when}</span>
                </header>
                {c.roles.length > 1 && (
                  <ol className="co-steps">
                    {c.roles.map((x, j) => (
                      <li key={x.title} className={j === i ? 'on' : j < i ? 'done' : ''}>
                        <button type="button" onClick={() => go(j)}><b>{x.title}</b><span>{x.dates}</span></button>
                        {j < c.roles.length - 1 && <em aria-hidden="true">promoted →</em>}
                      </li>
                    ))}
                  </ol>
                )}
                <div className="co-role" key={i}>
                  {c.roles.length === 1 && <p className="co-rt"><b>{r.title}</b><span>{r.dates}</span></p>}
                  <ul>{r.bullets.map(x => <li key={x.did}>{x.did.charAt(0).toUpperCase() + x.did.slice(1)}.</li>)}</ul>
                </div>
              </article>
            );
          }}
        </RoleScroller>
      ))}
    </div>
  );
}

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => { revealBatch(root.current!); }, { scope: root });

  return (
    <section className="sec journey" id="journey" ref={root}>
      {/* HEAD → current */}
      <Label n="02">work.log — HEAD → predigle</Label>
      <div className="nc-head">
        <h2 className="nc-title rv">Now shipping at <em>Predigle.</em></h2>
        <p className="jh-intro rv">Healthcare applications for clinics and hospitals. The products belong to the company, so below are the problems I work on and my part in each.</p>
      </div>
      <NowConsole />

      <article className="co rv">
        <header className="co-head">
          <div><h3>Predigle · where I started</h3><p className="gl-sum">Dashboards, APIs, access and releases, then moved into the full-time Associate Product Engineer role in May 2026.</p></div>
          <span className="co-when">{INTERN.dates}</span>
        </header>
        <div className="co-role">
          <p className="co-rt"><b>{INTERN.title}</b><span>{INTERN.dates}</span></p>
          <ul>{INTERN.bullets.map(b => <li key={b}>{b}.</li>)}</ul>
        </div>
      </article>

      {/* history */}
      <EarlierWork />
    </section>
  );
}
