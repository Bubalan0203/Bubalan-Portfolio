'use client';
import { useRef, useState } from 'react';
import { useGSAP, revealBatch } from '@/lib/motion';
import { Label } from './About';

// lessons from the work itself; each one is a rule I now follow, with the checklist behind it
const NOTES = [
  {
    tag: 'release', from: 'Predigle', title: 'Releases nobody notices',
    gist: 'A deploy is done when users never felt it, not when the build is green.',
    steps: ['Migrations stay backward compatible for one release', 'New version warms up behind a health check', 'Traffic switches over, the old one stays ready', 'Rollback is one command, rehearsed before it is needed'],
  },
  {
    tag: 'access', from: 'Predigle · TIA', title: 'Permissions live on the server',
    gist: 'Hiding a button is a UX choice. Blocking the request is the security.',
    steps: ['Deny by default, allow by role', 'One permissions map shared by API and UI', 'Every endpoint checks the token, not the screen', 'Tests cover the role that should be refused'],
  },
  {
    tag: 'ui', from: 'TIA IT Wing', title: 'Build the second screen, then the library',
    gist: 'Components earn their place by repeating, not by being imagined up front.',
    steps: ['Ship the first screen plainly', 'Extract on the second, when the pattern is real', 'Props over variants, composition over flags', 'Document with the screen it came from'],
  },
  {
    tag: 'ai', from: 'CodeCraft', title: 'AI features people pay for',
    gist: 'Generation is cheap to demo and expensive to run. Design for the bill.',
    steps: ['Meter usage with credits from day one', 'Preview before you commit a generation', 'Keep prompts versioned like code', 'Fall back gracefully when the model is slow'],
  },
] as const;

// LeetCode profile snapshot (Oct 2026)
const LC = { user: 'Bubalan_Shanmuga_sundaram', url: 'https://leetcode.com/u/Bubalan_Shanmuga_sundaram/', solved: 292, levels: [
  { k: 'Easy', n: 118, of: 971, c: '#3fd18a' }, { k: 'Medium', n: 148, of: 2128, c: '#f5b544' }, { k: 'Hard', n: 26, of: 983, c: '#f0596b' },
] };

// how I take a problem apart, whether it's a LeetCode medium or a production bug
const PLAN = [
  { t: 'Understand', d: 'Restate the problem in one line, list inputs, outputs and limits before touching code.', c: '// n ≤ 10⁵ → O(n log n) or better' },
  { t: 'Examples', d: 'Work two small cases by hand, then the edge cases: empty, one item, duplicates, huge.', c: '[] · [x] · [x, x] · 10⁵ items' },
  { t: 'Brute force', d: 'Get a correct answer first, however slow. It becomes the test oracle.', c: 'for i … for j … → O(n²)' },
  { t: 'Optimise', d: 'Find the repeated work and remove it: hash map, two pointers, sorting, DP, or a heap.', c: 'seen = new Map() → O(n)' },
  { t: 'Prove & test', d: 'Check it against the brute force and every edge case, then read it once more for off-by-ones.', c: 'assert fast(x) === slow(x)' },
  { t: 'Explain', d: 'Say the time and space cost and the trade-off out loud, the way I would in a review.', c: 'O(n) time · O(n) space' },
] as const;

// the ring splits the solved count by difficulty, with a small gap between segments
const R = 46, C = 2 * Math.PI * R;
const SEGS = LC.levels.map((l, i) => {
  const before = LC.levels.slice(0, i).reduce((n, x) => n + x.n, 0);
  return { ...l, len: (l.n / LC.solved) * C - 4, off: -(before / LC.solved) * C };
});

function LeetCard() {
  return (
    <a className="lc" href={LC.url} target="_blank" rel="noopener noreferrer">
      <header><b>LeetCode</b><span>{LC.user}</span><em>↗</em></header>
      <div className="lc-main">
        <svg viewBox="0 0 110 110" className="lc-ring" aria-hidden="true">
          <circle cx="55" cy="55" r={R} className="lc-ring-bg" />
          {SEGS.map(l => <circle key={l.k} cx="55" cy="55" r={R} stroke={l.c} strokeDasharray={`${l.len.toFixed(2)} ${C.toFixed(2)}`} strokeDashoffset={l.off.toFixed(2)} />)}
        </svg>
        <p className="lc-total"><b>{LC.solved}</b><span>solved</span></p>
        <ul>
          {LC.levels.map(l => (
            <li key={l.k}><span style={{ color: l.c }}>{l.k}</span><em>{l.n}<small> / {l.of}</small></em>
              <i><b style={{ width: `${((l.n / l.of) * 100).toFixed(1)}%`, background: l.c }} /></i></li>
          ))}
        </ul>
      </div>
    </a>
  );
}

/** Beyond the job: a LeetCode snapshot, the plan I solve problems with, and field notes: four rules learned on real releases. One opens at a time; the rest stay as spines you can pull out. */
export default function Notes() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const [step, setStep] = useState(0);
  useGSAP(() => revealBatch(root.current!), { scope: root });

  return (
    <section className="sec notes" id="notes" ref={root}>
      <Label n="07">Beyond the job</Label>
      <div className="nc-head">
        <h2 className="nc-title rv">How I <em>think through problems.</em></h2>
        <p className="jh-intro rv">Daily problem solving keeps the fundamentals sharp. The same plan carries into product work, and the notes below are what real releases taught me.</p>
      </div>

      <div className="ps rv">
        <LeetCard />
        <div className="ps-plan">
          <p className="ps-k">my problem-solving plan</p>
          <ol className="ps-steps" role="tablist">
            {PLAN.map((x, i) => (
              <li key={x.t}><button type="button" role="tab" aria-selected={step === i} className={step === i ? 'on' : ''} onClick={() => setStep(i)} onPointerEnter={() => setStep(i)}>
                <span>{String(i + 1).padStart(2, '0')}</span>{x.t}
              </button></li>
            ))}
          </ol>
          <div className="ps-detail" role="tabpanel" key={step}>
            <h3>{PLAN[step].t}</h3>
            <p>{PLAN[step].d}</p>
            <code>{PLAN[step].c}</code>
          </div>
        </div>
      </div>

      <p className="ps-k fn-k rv">field notes · lessons I shipped my way into</p>

      <div className="fn rv">
        {NOTES.map((n, i) => (
          <article key={n.title} className={`fn-card${open === i ? ' open' : ''}`} onPointerEnter={() => setOpen(i)}>
            <button type="button" className="fn-spine" aria-expanded={open === i} onClick={() => setOpen(i)} onFocus={() => setOpen(i)}>
              <span className="fn-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="fn-t">{n.title}</span>
              <span className="fn-tag">#{n.tag}</span>
            </button>
            <div className="fn-body">
              <p className="fn-from">learned at {n.from}</p>
              <h3>{n.title}</h3>
              <p className="fn-gist">{n.gist}</p>
              <ol>{n.steps.map((s, k) => <li key={s}><span>{k + 1}</span>{s}</li>)}</ol>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
