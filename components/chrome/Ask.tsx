'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { answer } from '@/lib/kb';
import { ASK_EVENT, getLenis, reducedMotion } from '@/lib/motion';

const SUGG = ['What do you do at Predigle?', "What's your stack?", 'Tell me about CodeCraft', 'How do you use AI?', 'What have you led?', 'How can I contact you?'];
const MISS = "I couldn't match that to anything on this page. Try asking about my work at Predigle, my stack, projects, education or how to reach me.";

/** ⌘K "Ask about me": streams answers matched offline from page content. */
export default function Ask() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [shown, setShown] = useState('');
  const [src, setSrc] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);
  const timer = useRef<number>(0);

  const show = useCallback(() => { lastFocus.current = document.activeElement; setOpen(true); }, []);
  const hide = useCallback(() => { setOpen(false); clearTimeout(timer.current); (lastFocus.current as HTMLElement | null)?.focus?.(); }, []);

  useEffect(() => {
    const onEvt = () => show();
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => { if (!o) lastFocus.current = document.activeElement; return !o; }); return; }
      if (e.key === '/' && !/INPUT|TEXTAREA/.test((document.activeElement as HTMLElement)?.tagName || '')) { e.preventDefault(); show(); }
    };
    window.addEventListener(ASK_EVENT, onEvt);
    document.addEventListener('keydown', onKey);
    return () => { window.removeEventListener(ASK_EVENT, onEvt); document.removeEventListener('keydown', onKey); };
  }, [show]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) { lenis?.stop(); setTimeout(() => input.current?.focus(), 20); } else lenis?.start();
  }, [open]);

  const stream = (text: string) => {
    clearTimeout(timer.current);
    const r = answer(text);
    const full = r ? r.a : MISS;
    setSrc(null); setShown(''); setStreaming(true);
    let i = 0;
    const step = () => {
      i = reducedMotion() ? full.length : i + 1 + ((Math.random() * 4) | 0);
      setShown(full.slice(0, i));
      if (i < full.length) timer.current = window.setTimeout(step, 14);
      else { setStreaming(false); setSrc(r ? r.src : null); }
    };
    step();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); hide(); return; }
    if (e.key === 'Tab') {
      const f = [...box.current!.querySelectorAll<HTMLElement>('input,button')];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  return (
    <div className={`ask${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="askLabel" onKeyDown={onKeyDown}>
      <div className="ask-backdrop" onClick={hide} />
      <div className="ask-box" ref={box}>
        <label className="ask-in">
          <span className="sr-only" id="askLabel">Ask about Bubalan</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
          <input ref={input} type="text" autoComplete="off" spellCheck={false} placeholder="Ask about my work, stack, projects…"
            value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && q.trim()) stream(q); }} />
          <kbd>esc</kbd>
        </label>
        <div className="ask-body">
          <div className="ask-ans" aria-live="polite">
            {shown}
            {streaming && <span style={{ display: 'inline-block', width: '.55em', height: '1.05em', verticalAlign: '-.15em', background: 'var(--amber)', marginLeft: 2 }} />}
            {src && <span className="src">source: {src} · matched offline</span>}
          </div>
          <div className="ask-sugg">
            {SUGG.map(s => <button key={s} type="button" onClick={() => { setQ(s); stream(s); }}>{s}</button>)}
          </div>
        </div>
        <div className="ask-foot"><span>offline · keyword-matched against this page — not an LLM</span><span>↵ ask · esc close</span></div>
      </div>
    </div>
  );
}
