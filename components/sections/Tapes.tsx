'use client';
import { Fragment, useRef } from 'react';
import { TAPE_STACK, TAPE_WORDS } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK, clamp, getLenis } from '@/lib/motion';

const COPIES = 6;
const Star = () => (
  <svg className="tape-star" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" fill="currentColor" /></svg>
);

/** Two crossing tapes that speed up and skew with scroll velocity, and flip direction with scroll direction. */
export default function Tapes() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tracks = [...ref.current!.querySelectorAll<HTMLElement>('.tape-track')];
      const st = tracks.map(tr => ({ tr, x: 0, dir: Number(tr.dataset.dir), w: (tr.firstElementChild as HTMLElement).offsetWidth }));
      const measure = () => st.forEach(s => { s.w = (s.tr.firstElementChild as HTMLElement).offsetWidth; });
      addEventListener('resize', measure);
      document.fonts?.ready.then(measure);
      let vel = 0, sv = 0, sdir = 1, lastY = scrollY, vis = true;
      const onScroll = () => {
        const l = getLenis();
        if (l) { vel = l.velocity; if (l.direction) sdir = l.direction; }
        else { vel = scrollY - lastY; sdir = vel >= 0 ? 1 : -1; lastY = scrollY; }
      };
      addEventListener('scroll', onScroll, { passive: true });
      const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
      io.observe(ref.current!);
      const tick = () => {
        sv += (vel - sv) * .1; vel *= .92;
        if (!vis) return;
        const speed = .6 + Math.min(Math.abs(sv) * .9, 26);
        const skew = clamp(sv * .35, -12, 12);
        st.forEach(s => {
          s.x -= speed * s.dir * sdir;
          if (s.w) s.x = ((s.x % s.w) - s.w) % s.w;
          s.tr.style.transform = `translate3d(${s.x}px,0,0) skewX(${-skew * s.dir}deg)`;
        });
      };
      gsap.ticker.add(tick);
      return () => { gsap.ticker.remove(tick); removeEventListener('resize', measure); removeEventListener('scroll', onScroll); io.disconnect(); };
    });
  }, { scope: ref });

  return (
    <div className="tapes" ref={ref} aria-hidden="true">
      <div className="tape tape-b"><div className="tape-track" data-dir="1">
        {Array.from({ length: COPIES }, (_, c) => (
          <div className="tape-item" key={c}>
            {TAPE_STACK.map((t, i) => <Fragment key={t}>{i % 3 === 1 ? <b>{t}</b> : <span>{t}</span>}·</Fragment>)}
          </div>
        ))}
      </div></div>
      <div className="tape tape-a"><div className="tape-track" data-dir="-1">
        {Array.from({ length: COPIES }, (_, c) => (
          <div className="tape-item" key={c}>
            {TAPE_WORDS.map((t, i) => <Fragment key={t}><span className={i % 2 ? 'o' : undefined}>{t}</span><Star /></Fragment>)}
          </div>
        ))}
      </div></div>
    </div>
  );
}
