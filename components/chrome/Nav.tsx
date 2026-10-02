'use client';
import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/lib/content';
import { getLenis, openAsk, reducedMotion, SECTION_EVENT, THEME_EVENT } from '@/lib/motion';

const SECTION_TO_NAV: Record<string, string> = { earlier: 'work' };

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function applyTheme(t: string) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('theme', t); } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuBtn = useRef<HTMLButtonElement>(null);
  const mnav = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => { const id = (e as CustomEvent<string>).detail; setActive(SECTION_TO_NAV[id] || id); };
    window.addEventListener(SECTION_EVENT, on);
    // follow the OS theme until the visitor picks one
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const sys = () => {
      let saved = null; try { saved = localStorage.getItem('theme'); } catch {}
      if (!saved) { document.documentElement.removeAttribute('data-theme'); window.dispatchEvent(new Event(THEME_EVENT)); }
    };
    mq.addEventListener('change', sys);
    return () => { window.removeEventListener(SECTION_EVENT, on); mq.removeEventListener('change', sys); };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) { lenis?.stop(); setTimeout(() => mnav.current?.querySelector('a')?.focus(), 300); }
    else lenis?.start();
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); menuBtn.current?.focus(); } };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    if (!document.startViewTransition || reducedMotion()) { applyTheme(next); return; }
    const root = document.documentElement;
    root.classList.add('no-tr');
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(() => {});
    vt.finished.finally(() => root.classList.remove('no-tr'));
  };

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo magnetic" aria-label="Bubalan S — back to top">
          <span className="logo-mark">bs</span><span className="logo-t">bubalan<small>.dev</small></span>
        </a>
        <nav className="nav-pill" aria-label="Primary">
          <ul className="nav-links">
            {NAV.map(k => (
              <li key={k}><a href={`#${k}`} className={`scramble${active === k ? ' is-active' : ''}`} aria-current={active === k ? 'true' : undefined}>{k}</a></li>
            ))}
          </ul>
          <button className="kbd-btn" type="button" onClick={openAsk} aria-label="Ask about me (Command K)">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
            <span className="kbd-label">ask</span><kbd>⌘K</kbd>
          </button>
          <button className="icon-btn theme-btn" type="button" onClick={toggleTheme} aria-label="Toggle colour theme">
            <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button ref={menuBtn} className="icon-btn menu-btn" type="button" onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mnav">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h10'} />
            </svg>
          </button>
        </nav>
      </header>
      <div className={`mnav${open ? ' open' : ''}`} id="mnav" ref={mnav} aria-hidden={!open} inert={!open}>
        <ol>
          {NAV.map(k => <li key={k}><a href={`#${k}`} onClick={() => setOpen(false)}>{k}</a></li>)}
        </ol>
      </div>
    </>
  );
}
