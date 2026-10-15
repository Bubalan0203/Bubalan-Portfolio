'use client';
import { useEffect, useState } from 'react';
import { onIntro, reducedMotion } from '@/lib/motion';

type Seg = [string, string?];

// Each line is a list of [text, token-class] segments. The preview reacts as lines complete.
const CODE: Seg[][] = [
  [['export default ', 'k'], ['function ', 'k'], ['Product', 'f'], ['() {', 'p']],
  [['  return ', 'k'], ['(', 'p']],
  [['    <', 'p'], ['Ship', 't']],
  [['      requirements', 'a'], ['=', 'p'], ['"clear"', 's']],
  [['      data', 'a'], ['=', 'p'], ['"modelled right"', 's']],
  [['      api', 'a'], ['=', 'p'], ['"fast & secure"', 's']],
  [['      ui', 'a'], ['=', 'p'], ['"feels effortless"', 's']],
  [['      agents', 'a'], ['=', 'p'], ['"AI + MCP"', 's']],
  [['      cloud', 'a'], ['=', 'p'], ['"deployed & scaled"', 's']],
  [['    />', 'p']],
  [['  );', 'p']],
  [['}', 'p']],
];
const FLOW = [['requirements', 'clear'], ['data', 'modelled right'], ['api', 'fast & secure'], ['ui', 'feels effortless'], ['agents', 'AI + MCP'], ['cloud', 'deployed & scaled']];
const LEN = CODE.map(l => l.reduce((n, [t]) => n + t.length, 0));
const TOTAL = LEN.reduce((a, b) => a + b, 0);

/** How many whole lines are typed for a given character count. */
function linesDone(chars: number) {
  let n = 0, acc = 0;
  for (const l of LEN) { acc += l; if (chars >= acc) n++; else break; }
  return n;
}

/** Editor window that types a component, with a preview pane that renders it piece by piece. */
export default function Editor() {
  const [chars, setChars] = useState(0);
  const [tab, setTab] = useState<'code' | 'preview'>('code');

  useEffect(() => {
    let id = 0;
    const off = onIntro(() => {
      if (reducedMotion()) { id = window.setTimeout(() => setChars(TOTAL)); return; }
      let c = 0;
      const tick = () => {
        c++;
        setChars(c);
        if (c >= TOTAL) return;
        const atLineEnd = LEN.slice(0, linesDone(c)).reduce((a, b) => a + b, 0) === c;
        id = window.setTimeout(tick, atLineEnd ? 260 : 22 + Math.random() * 28);
      };
      id = window.setTimeout(tick, 700);
    });
    return () => { off(); clearTimeout(id); };
  }, []);

  const done = linesDone(chars);
  const finished = chars >= TOTAL;

  // render code clipped to `chars`
  let left = chars;
  const lines = CODE.map((segs, i) => {
    const out: React.ReactNode[] = [];
    segs.forEach(([t, cls], j) => {
      if (left <= 0) return;
      const shown = t.slice(0, left);
      left -= t.length;
      out.push(<span key={j} className={cls}>{shown}</span>);
    });
    const active = !finished && i === Math.min(done, CODE.length - 1);
    return (
      <div key={i} className={`ed-line${active ? ' active' : ''}`}>
        <span className="ed-ln">{i + 1}</span>
        <span className="ed-code">{out}{active && <b className="ed-caret" />}</span>
      </div>
    );
  });

  return (
    <div className="editor" aria-label="A code editor typing a component that ships an idea, with a live preview">
      <div className="ed-bar">
        <span className="ed-dots"><i /><i /><i /></span>
        <button type="button" className={`ed-tab${tab === 'code' ? ' active' : ''}`} onClick={() => setTab('code')}>Product.tsx</button>
        <button type="button" className={`ed-tab${tab === 'preview' ? ' active' : ''}`} onClick={() => setTab('preview')}>preview</button>
        <span className={`ed-ai${finished ? ' ok' : ''}`}><span className="friday-dot" /> F.R.I.D.A.Y. · {finished ? 'build passed' : 'pairing'}</span>
      </div>
      <div className={`ed-body${tab === 'preview' ? ' pv-only' : ''}`}>
        <pre className="ed-src" aria-hidden="true">{lines}</pre>
        <div className="ed-preview">
          <div className={`pv-card${done >= 4 ? ' on' : ''}`}>
            <p className="pv-title">ship pipeline</p>
            <ol className="pv-flow">
              {FLOW.map(([k, v], i) => (
                <li key={k} className={done >= 4 + i ? 'on' : ''}><b>✓</b><span>{k}</span><em>{v}</em></li>
              ))}
            </ol>
          </div>
          <div className="pv-deploy">
            <div><span>status</span><b className={finished ? 'ok' : ''}>{finished ? '● live' : '○ building'}</b></div>
            <div><span>errors</span><b>0</b></div>
            <div><span>owner</span><b>end to end</b></div>
          </div>
          <p className={`pv-status${finished ? ' on' : ''}`}>✓ Rendered · 0 errors</p>
        </div>
      </div>
    </div>
  );
}
