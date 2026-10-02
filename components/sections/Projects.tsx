'use client';
import { useRef } from 'react';
import { PROFILE, PROJECTS, type Project } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_OFF, finePointer, revealBatch } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';

const GITHUB = PROFILE.links.find(l => l.label === 'github')!.href;
const MONO = { fontFamily: 'var(--f-mono)' };

function Vis({ kind }: { kind: Project['vis'] }) {
  if (kind === 'codecraft') return (
    <svg viewBox="0 0 400 212" preserveAspectRatio="xMidYMid slice">
      <rect className="wf" x="20" y="20" width="170" height="172" rx="4" />
      <rect className="wf-f" x="32" y="34" width="120" height="8" rx="4" /><rect className="wf-f" x="32" y="50" width="90" height="6" rx="3" />
      <rect className="wf" x="32" y="150" width="146" height="28" rx="4" />
      <text className="cc-prompt" x="42" y="168" style={MONO} fontSize="10" fill="var(--ink-2)" />
      <rect className="wf" x="210" y="20" width="170" height="172" rx="4" />
      <g className="cc-out">
        <rect className="wf-a" x="224" y="34" width="60" height="8" rx="4" />
        <rect className="wf-f" x="224" y="52" width="142" height="44" rx="3" />
        <rect className="wf-f" x="224" y="104" width="68" height="36" rx="3" /><rect className="wf-f" x="298" y="104" width="68" height="36" rx="3" />
        <rect className="wf-am" x="224" y="152" width="54" height="18" rx="9" />
      </g>
      <path className="wf-as cc-arrow" d="M190 106h20" />
    </svg>
  );
  if (kind === 'roomz') return (
    <svg viewBox="0 0 400 212" preserveAspectRatio="xMidYMid slice">
      <rect className="wf" x="24" y="30" width="190" height="130" rx="5" /><rect className="wf" x="24" y="30" width="190" height="14" rx="5" />
      <rect className="wf" x="232" y="44" width="70" height="120" rx="10" /><rect className="wf" x="318" y="30" width="62" height="100" rx="4" />
      <g className="rz-rooms">
        {[[36, 56], [94, 56], [152, 56], [36, 104], [94, 104], [152, 104]].map(([x, y]) => <rect key={`${x}${y}`} className="wf-f" x={x} y={y} width="50" height="40" rx="3" />)}
      </g>
      {[62, 90, 118].map(y => <rect key={y} className="wf-f" x="242" y={y} width="50" height="22" rx="3" />)}
      <rect className="wf-f" x="326" y="44" width="46" height="6" rx="3" /><rect className="wf-f" x="326" y="58" width="30" height="6" rx="3" />
      <text x="24" y="186" style={MONO} fontSize="9" fill="var(--ink-3)">web · mobile · desktop</text>
    </svg>
  );
  return (
    <svg viewBox="0 0 400 212" preserveAspectRatio="xMidYMid slice">
      <rect className="wf" x="24" y="76" width="80" height="56" rx="5" /><rect className="wf" x="160" y="66" width="80" height="76" rx="5" /><rect className="wf" x="296" y="76" width="80" height="56" rx="5" />
      <text x="38" y="108" style={MONO} fontSize="9" fill="var(--ink-3)">customer</text>
      <text x="176" y="100" style={MONO} fontSize="9" fill="var(--ink-3)">gateway</text>
      <text x="176" y="116" style={MONO} fontSize="8" fill="var(--accent)">AES-256-GCM</text>
      <text x="318" y="108" style={MONO} fontSize="9" fill="var(--ink-3)">bank</text>
      <path className="wf" d="M104 104H160" /><path className="wf" d="M240 104H296" />
      <circle className="wf-a" r="4"><animateMotion dur="2.4s" repeatCount="indefinite" path="M104 104H160" /></circle>
      <circle className="wf-am" r="4"><animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M240 104H296" /></circle>
      <rect className="wf-f" x="160" y="160" width="80" height="18" rx="9" /><text x="178" y="172" style={MONO} fontSize="8" fill="var(--ink-2)">OTP · KYC</text>
    </svg>
  );
}

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGSAP((_, contextSafe) => {
    const el = ref.current!;
    const prompt = el.querySelector('.cc-prompt')!, out = el.querySelector('.cc-out');
    const P = '> a pricing page, 3 tiers';
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      revealBatch(el);
      // CodeCraft: type a prompt, generate a layout
      const o = { n: 0 };
      const tl = gsap.timeline({ repeat: -1, paused: true, repeatDelay: 1 });
      tl.set(out, { opacity: 0 }).set(o, { n: 0 })
        .to(o, { n: P.length, duration: 1.6, ease: 'none', onUpdate: () => { prompt.textContent = P.slice(0, Math.round(o.n)); } })
        .fromTo(el.querySelector('.cc-arrow'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: .3 })
        .to(out, { opacity: 1, duration: .5 })
        .fromTo(out!.querySelectorAll('rect'), { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: .5, stagger: .07, ease: 'expo.out' }, '<')
        .to({}, { duration: 2 });
      ScrollTrigger.create({ trigger: prompt.closest('.pj'), start: 'top 90%', end: 'bottom 10%', onToggle: s => { if (s.isActive) tl.play(); else tl.pause(); } });
      // Roomz: rooms light up as they're booked
      const rooms = el.querySelectorAll('.rz-rooms rect');
      let iv = 0;
      const step = () => rooms.forEach(r => r.setAttribute('class', Math.random() < .35 ? 'wf-a' : 'wf-f'));
      ScrollTrigger.create({ trigger: rooms[0].closest('.pj'), start: 'top 90%', end: 'bottom 10%', onToggle: s => { clearInterval(iv); if (s.isActive) { step(); iv = window.setInterval(step, 1100); } } });
      return () => clearInterval(iv);
    });
    mm.add(MOTION_OFF, () => { prompt.textContent = P; gsap.set(out, { opacity: 1 }); });

    // spotlight follows the cursor
    if (finePointer() && contextSafe) {
      const move = contextSafe((e: PointerEvent) => {
        const card = e.currentTarget as HTMLElement, r = card.getBoundingClientRect();
        card.style.setProperty('--mx', e.clientX - r.left + 'px'); card.style.setProperty('--my', e.clientY - r.top + 'px');
      });
      const cards = el.querySelectorAll<HTMLElement>('.pj');
      cards.forEach(c => c.addEventListener('pointermove', move));
      return () => cards.forEach(c => c.removeEventListener('pointermove', move));
    }
  }, { scope: ref });

  return (
    <section className="sec bp" id="projects" data-path="~/projects/" aria-labelledby="projects-t" ref={ref}>
      <div className="wrap">
        <SectionHead num="07" path="~/projects/" titleId="projects-t" lines={['Built on', <em key="e">my own time.</em>]} />
        <div className="pj-grid">
          {PROJECTS.map(p => (
            <article className="pj brk rv" key={p.name}>
              <span className="pj-spot" aria-hidden="true" />
              <div className="pj-vis" aria-hidden="true"><Vis kind={p.vis} /></div>
              <div className="pj-body">
                <div className="pj-kind"><span>{p.kind}</span><span>{p.badge}</span></div>
                <h3>{p.name}<small>{p.sub}</small></h3>
                <ul>{p.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                <div className="pj-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                <a className="pj-link" href={GITHUB} target="_blank" rel="noopener noreferrer" data-cursor="open">code on GitHub <Arrow /></a>
              </div>
            </article>
          ))}
          <article className="pj next brk rv" aria-label="Next project, in development">
            <div className="pj-kind w-full"><span>04 · next</span><span>branch: feat/next</span></div>
            <h3>Next project<small>in development</small></h3>
            <div className="build"><span>$ git checkout -b next && npm run build</span><div className="build-bar"><i /></div></div>
            <p className="m-0 text-sm text-ink-3">Something new is on the bench. <span className="ph">[ADD: next project name + one-line pitch]</span></p>
          </article>
        </div>
      </div>
    </section>
  );
}
