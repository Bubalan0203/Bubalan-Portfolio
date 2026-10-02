'use client';
import { useEffect, useRef, useState } from 'react';
import { clamp, openAsk, SECTION_EVENT } from '@/lib/motion';

/** Top scroll-progress bar + IDE-style status bar (current file, line, %). */
export default function StatusBar() {
  const [file, setFile] = useState('~/index.tsx');
  const ln = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = document.getElementById('progress');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (pct.current) pct.current.textContent = Math.round(p * 100) + '%';
      if (ln.current) ln.current.textContent = `Ln ${Math.round(scrollY / 24) + 1}, Col 1`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const s = en.target as HTMLElement;
        setFile(s.dataset.path || '~/');
        window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: s.id }));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[data-path]').forEach(s => io.observe(s));
    return () => { removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <div className="status" aria-hidden="true">
      <span className="st-branch">⎇ main</span>
      <span className="st-file">{file}</span>
      <span className="st-spacer" />
      <span className="st-hide" ref={ln}>Ln 1, Col 1</span>
      <span className="st-hide"><i className="st-dot" />online</span>
      <span ref={pct}>0%</span>
      <button type="button" onClick={openAsk} tabIndex={-1}>⌘K ask</button>
    </div>
  );
}
