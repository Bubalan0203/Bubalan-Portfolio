'use client';
import { useEffect, useRef, useState } from 'react';
import { EARLIER, STORIES, type Story } from '@/lib/content';
import { revealBatch, useGSAP } from '@/lib/motion';
import { Label } from './About';

/* ---------- HEAD: where I am now ---------- */

const VERSIONS = [
  { v: 'v1', title: 'Software Developer Intern', when: 'Dec 2025 — May 2026' },
  { v: 'v2', title: 'Associate Product Engineer', when: 'May 2026 — now', now: true },
];

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
        {['request', 'validate', 'review', 'approve', 'done'].map((s, i) => <span key={s} style={{ animationDelay: `${i * .7}s` }}>{s}</span>)}
      </div>
    );
  }
  if (kind === 'sync') {
    return (
      <div className="sc sc-sync" aria-hidden="true">
        <span className="sc-box">Dashboard<small>interface</small></span>
        <span className="sc-wire"><i /><i /></span>
        <span className="sc-box hot">REST API<small>Django · Node</small></span>
        <span className="sc-wire"><i /><i /></span>
        <span className="sc-box">Database<small>source of truth</small></span>
      </div>
    );
  }
  return (
    <div className="sc sc-access" aria-hidden="true">
      <span className="sc-box">sign in<small>••••••••</small></span>
      <span className="sc-arrow">→</span>
      <span className="sc-box hot">role check<small>admin · staff · viewer</small></span>
      <span className="sc-arrow">→</span>
      <span className="sc-box">release<small>v2 live · 0 downtime</small></span>
    </div>
  );
}

/** A live "console" for the current job: version switcher for the two roles and a bento of problem modules. */
function NowConsole({ ver, setVer }: { ver: number; setVer: (i: number) => void }) {
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);

  // cycle the expanded module until the visitor takes over
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setOpen(o => (o + 1) % STORIES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const pick = (i: number) => { setOpen(i); setPaused(true); };
  const cur = VERSIONS[ver];

  return (
    <div className="nc rv">
      <div className="nc-bar">
        <span className="nc-app"><i /> predigle · production</span>
        <div className="nc-vers" role="tablist" aria-label="My roles at Predigle">
          {VERSIONS.map((r, i) => (
            <button key={r.v} type="button" role="tab" aria-selected={i === ver} className={`nc-ver${i === ver ? ' on' : ''}`} onClick={() => setVer(i)}>
              <b>{r.v}</b>{r.title}
            </button>
          ))}
        </div>
      </div>
      <p className="nc-role"><span>{cur.when}</span>{cur.now ? 'current role' : 'where I started at Predigle'}</p>

      {cur.now ? (
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
      ) : (
        <p className="jcard-pending">Details for my intern period are on the way.</p>
      )}
    </div>
  );
}

/* ---------- History: before Predigle ---------- */

function EarlierWork() {
  const tia = EARLIER.find(e => e.company === 'TIA IT Wing')!;
  const cds = EARLIER.find(e => e.company.startsWith('Create'))!;
  const companies = [
    { org: tia.company, when: 'Feb 2024 — Nov 2024', sum: tia.summary, roles: [...tia.roles!].reverse().map(r => ({ title: r.title, dates: r.dates, bullets: r.bullets })) },
    { org: cds.company, when: 'Dec 2024 — May 2025', sum: cds.summary, roles: [{ title: 'Full Stack Developer · Part-Time', dates: 'Dec 2024 – May 2025', bullets: cds.bullets! }] },
  ];

  return (
    <div className="ew">
      <Label n="02">earlier work · Feb 2024 — May 2025</Label>
      <div className="nc-head">
        <h2 className="nc-title rv">Where the <em>foundation</em> was built.</h2>
        <p className="jh-intro rv">Two teams before Predigle. Where I held more than one role, keep scrolling — the card moves through them in order.</p>
      </div>
      {companies.map(c => (
        <RoleScroller key={c.org} steps={c.roles.length}>
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
        <p className="jh-intro rv">Software for enterprise teams. The products belong to the company, so below are the problems I work on and my part in each.</p>
      </div>
      <RoleScroller steps={VERSIONS.length}>{(i, go) => <NowConsole ver={i} setVer={go} />}</RoleScroller>

      {/* history */}
      <EarlierWork />
    </section>
  );
}
