'use client';
import { useRef } from 'react';
import { EARLIER, type Bullet } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';

const Bullets = ({ items }: { items: Bullet[] }) => (
  <ul>
    {items.map(b => <li key={b.did}>{b.problem} → <b>{b.did}</b> <em>· {b.role}</em></li>)}
  </ul>
);

/** Earlier companies as a `git log --graph` that pins and scrolls sideways on desktop, vertical on mobile. */
export default function Earlier() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const track = el.querySelector<HTMLElement>('.gl-track')!;
    const line = el.querySelector<SVGSVGElement>('.gl-line')!;
    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      const drawLine = () => {
        const W = track.scrollWidth, tr = track.getBoundingClientRect();
        const xs = [...track.querySelectorAll('.gl-dot')].map(d => { const r = d.getBoundingClientRect(); return r.left - tr.left + r.width / 2; });
        line.setAttribute('width', String(W)); line.setAttribute('height', '40'); line.setAttribute('viewBox', `0 0 ${W} 40`);
        const d = `M0 20 H${W}`;
        const br = `M${xs[1]} 20 C${xs[1] + 40} 20 ${xs[1] + 40} 4 ${xs[1] + 90} 4 H${xs[2] - 90} C${xs[2] - 40} 4 ${xs[2] - 40} 20 ${xs[2]} 20`;
        line.innerHTML = `<defs><linearGradient id="glg" x1="0" x2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--amber)"/></linearGradient></defs>` +
          `<path d="${d}" stroke="var(--line)"/><path d="${br}" stroke="var(--line)" stroke-dasharray="3 5"/>` +
          `<path class="gl-fg" d="${d}" stroke="url(#glg)" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>` +
          xs.map(x => `<line x1="${x}" x2="${x}" y1="20" y2="40" stroke="var(--line)"/>`).join('');
      };
      drawLine();
      const tw = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: el.querySelector('.gl-pin'), start: 'top 64px', end: () => '+=' + dist() * 1.4, pin: true, scrub: .8,
          invalidateOnRefresh: true, anticipatePin: 1, onRefresh: drawLine,
          onUpdate: s => { const fg = line.querySelector<SVGPathElement>('.gl-fg'); if (fg) fg.style.strokeDashoffset = String(1 - s.progress); },
        },
      });
      track.querySelectorAll('.gl-card').forEach(c => gsap.from(c, {
        y: 50, rotate: 1.5, opacity: .25, ease: 'none',
        scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 95%', end: 'left 60%', scrub: true },
      }));
      return () => { line.innerHTML = ''; };
    });
    mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
      track.querySelectorAll('.gl-card').forEach(c => gsap.from(c, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 88%' } }));
    });
  }, { scope: ref });

  return (
    <section className="earlier" id="earlier" data-path="~/work/earlier.log" aria-labelledby="earlier-t" ref={ref}>
      <div className="wrap">
        <SectionHead num="03" path="~/work/earlier.log" titleId="earlier-t" lines={['Before Predigle,', <em key="e">the commits.</em>]} />
        <p className="gl-cmd"><span className="p">$</span> git log --graph --reverse --oneline <span className="text-ink-3">— scroll →</span></p>
      </div>
      <div className="gl-pin">
        <div className="gl-track">
          <svg className="gl-line" aria-hidden="true" />
          {EARLIER.map(c => (
            <article className={`gl-card brk${c.small ? ' small' : ''}`} key={c.hash}>
              <span className={`gl-dot${c.amber ? ' am' : ''}`} aria-hidden="true" />
              <span className="gl-hash">{c.hash} <span className="ref">{c.ref}</span></span>
              <h3 className="gl-co">{c.company}</h3>
              <p className="gl-meta">{c.meta}</p>
              <p className="gl-sum">{c.summary}</p>
              {c.roles && (
                <div className="gl-roles">
                  {c.roles.map(r => (
                    <div className="gl-role" key={r.title}>
                      <h4>{r.title} <span>{r.dates}</span>{r.promo && <span className="promo">▲ promoted</span>}</h4>
                      <Bullets items={r.bullets} />
                    </div>
                  ))}
                </div>
              )}
              {c.bullets && <Bullets items={c.bullets} />}
              {c.big && <p className="gl-big"><b>{c.big.value}</b><br />{c.big.label}</p>}
              {c.link && (
                <a href={c.link.href} className="pj-link mt-auto">{c.link.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
