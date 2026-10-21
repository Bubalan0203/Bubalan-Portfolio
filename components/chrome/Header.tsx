'use client';
import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/lib/content';
import { getLenis, openAsk } from '@/lib/motion';
import Logo from '@/components/brand/Logo';

const LINKS = [
  { id: 'about', label: 'About', note: 'Who I am and how I work' },
  { id: 'journey', label: 'Experience', note: 'Predigle, TIA, Create Digital, CIT' },
  { id: 'toolkit', label: 'Toolkit', note: 'Interfaces, services, platform, AI' },
  { id: 'projects', label: 'Projects', note: 'CodeCraft, Roomz, Paygate' },
  { id: 'process', label: 'Process', note: 'How I build with AI agents' },
  { id: 'contact', label: 'Contact', note: 'Start a conversation' },
];

export function useClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const d = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short' });
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });
    const tick = () => { const n = new Date(); setT(`${d.format(n)} · ${f.format(n)}`); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function toggleTheme() {
  const d = document.documentElement;
  const next = d.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  const apply = () => { d.setAttribute('data-theme', next); try { localStorage.setItem('theme', next); } catch {} };
  if (document.startViewTransition) document.startViewTransition(apply); else apply();
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const clock = useClock();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = 0;
    const on = () => { const y = scrollY; setHidden(y > 300 && y > last); last = y; };
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop(); else l?.start();
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <>
      <header className={`hdr${hidden && !open ? ' is-hidden' : ''}${open ? ' is-open' : ''}`}>
        <a href="#top" className="hdr-logo" aria-label="Bubalan S — back to top">
          <Logo className="logo-mark" /><span className="logo-t">Bubalan S<small>{'// '}{PROFILE.title}</small></span>
        </a>
        <div className="hdr-meta" aria-hidden="true">
          <span>{PROFILE.location}</span>
          <span><b className="ok">●</b> Open to projects</span>
          <span className="hdr-clock">{clock || '--:--'} IST</span>
        </div>
        <div className="hdr-actions">
          <button type="button" className="chip" onClick={openAsk} aria-label="Ask about me (Command K)">
            <span className="friday-dot" /> Ask F.R.I.D.A.Y. <kbd>⌘K</kbd>
          </button>
          <button type="button" className="round" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" /></svg>
          </button>
          <button ref={btn} type="button" className="menu-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="overlay">
            <span>{open ? 'Close' : 'Menu'}</span>
            <i className={open ? 'x' : ''} />
          </button>
        </div>
      </header>
      <div className={`scrim${open ? ' open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside id="overlay" className={`drawer${open ? ' open' : ''}`} aria-hidden={!open} inert={!open} aria-label="Site menu">
        <p className="drawer-cap">Navigate</p>
        <nav aria-label="Primary">
          <ol>
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ transitionDelay: open ? `${.1 + i * .04}s` : '0s' }}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                  <small>0{i + 1}</small>
                  <span><b>{l.label}</b><em>{l.note}</em></span>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <button type="button" className="drawer-ask" onClick={() => { setOpen(false); openAsk(); }}>
          <span className="friday-dot" /> Ask F.R.I.D.A.Y. about me <kbd>⌘K</kbd>
        </button>
        <div className="drawer-foot">
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.email)}`} target="_blank" rel="noopener noreferrer">{PROFILE.email}</a>
          <div>{PROFILE.links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}</div>
        </div>
      </aside>
    </>
  );
}
