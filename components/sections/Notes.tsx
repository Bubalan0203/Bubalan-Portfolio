'use client';
import { useRef, useState } from 'react';
import { useGSAP, revealBatch } from '@/lib/motion';
import { Label } from './About';

// LeetCode profile snapshot; the 450+ total elsewhere includes GeeksforGeeks
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
      <p className="lc-asof">LeetCode only · as of Oct 2026 · 450+ including GeeksforGeeks</p>
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

/** Beyond the job: a LeetCode snapshot and the plan I solve problems with. */
export default function Notes() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  useGSAP(() => revealBatch(root.current!), { scope: root });

  return (
    <section className="sec notes" id="notes" ref={root}>
      <Label n="07">Beyond the job</Label>
      <div className="nc-head">
        <h2 className="nc-title rv">How I <em>think through problems.</em></h2>
        <p className="jh-intro rv">Daily problem solving keeps the fundamentals sharp. The same plan carries into product work.</p>
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

    </section>
  );
}
