'use client';
import { useEffect, useRef } from 'react';
import { HERO_TERM, PROFILE, ROLES } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK, clamp, finePointer, lerp, onIntro, openAsk, pointer, reducedMotion, scramble, typeTerm } from '@/lib/motion';
import NetworkCanvas from './NetworkCanvas';

const LETTERS = [...'Bubalan', ' ', 'S', '.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const term = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLSpanElement>(null);
  // per-letter weight/width state: the intro tweens `base`, the cursor pulls letters thin + narrow
  const base = useRef(LETTERS.map(ch => ({ w: ch === 'S' ? 300 : 800, d: 100 })));

  // letters react to cursor distance
  useEffect(() => {
    if (reducedMotion()) return;
    const chs = [...ref.current!.querySelectorAll<HTMLElement>('.name .ch')];
    const prox = chs.map(() => 0);
    let visible = true, raf = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(ref.current!);
    const fine = finePointer(), R = 300;
    const loop = () => {
      if (visible) chs.forEach((c, i) => {
        let target = 0;
        if (fine) {
          const r = c.getBoundingClientRect();
          target = Math.pow(clamp(1 - Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2)) / R, 0, 1), 1.4);
        }
        prox[i] += (target - prox[i]) * .14;
        const b = base.current[i];
        c.style.fontVariationSettings = `"wght" ${lerp(b.w, 200, prox[i]).toFixed(0)}, "wdth" ${lerp(b.d, 75, prox[i]).toFixed(1)}, "opsz" 96`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    let stopTerm = () => {};
    let roleTimer = 0;
    mm.add(MOTION_OK, () => {
      gsap.set(el.querySelectorAll('.name .ch'), { yPercent: 115 });
      gsap.set(el.querySelectorAll('.h-in'), { opacity: 0, y: 26 });
      base.current.forEach(b => { b.w = 200; b.d = 75; });
    });
    const off = onIntro(() => {
      stopTerm = typeTerm(term.current!, HERO_TERM, { speed: 34 });
      if (reducedMotion()) return;
      gsap.timeline()
        .to(el.querySelectorAll('.name .ch'), { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .055 }, 0)
        .to(base.current, { w: (i: number) => (LETTERS[i] === 'S' ? 300 : 800), d: 100, duration: 1.8, ease: 'expo.out', stagger: .055 }, .1)
        .to(el.querySelectorAll('.h-in'), { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .08 }, .35);
      // rotating role line
      let i = 0;
      roleTimer = window.setInterval(() => {
        const s = slot.current; if (!s) return;
        i = (i + 1) % ROLES.length;
        const old = s.firstElementChild as HTMLElement, nu = document.createElement('span');
        nu.textContent = ROLES[i]; s.appendChild(nu);
        gsap.fromTo(nu, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, ease: 'expo.out' });
        gsap.to(old, { yPercent: -100, opacity: 0, duration: .6, ease: 'expo.in', onComplete: () => old.remove() });
        scramble(nu);
      }, 2800);
    });
    return () => { off(); stopTerm(); clearInterval(roleTimer); };
  }, { scope: ref });

  return (
    <section className="hero bp" id="top" data-path="~/index.tsx" aria-label="Introduction" ref={ref}>
      <NetworkCanvas />
      <span className="reg r-tl" aria-hidden="true" /><span className="reg r-tr" aria-hidden="true" />
      <div className="wrap hero-top h-in">
        <span className="live"><i /><b>{PROFILE.title}</b>&nbsp;@ {PROFILE.company}</span>
        <span>{PROFILE.location}</span>
        <span>M.Sc. Software Systems · CIT</span>
      </div>
      <div className="wrap">
        <div className="hero-kicker h-in"><span className="dash" /><span>~/hello — hi, I&apos;m</span></div>
        <h1 className="name" aria-label="Bubalan S.">
          {LETTERS.map((ch, i) => (
            <span className="ch-wrap" aria-hidden="true" key={i}>
              <span className={`ch${ch === 'S' ? ' ini' : ''}${ch === '.' ? ' dot' : ''}`}
                style={{ fontVariationSettings: `"wght" ${ch === 'S' ? 300 : 800}, "wdth" 100, "opsz" 96` }}>
                {ch === ' ' ? ' ' : ch}
              </span>
            </span>
          ))}
        </h1>
        <div className="hero-grid">
          <div>
            <p className="role h-in"><span className="role-pre">currently →</span><span className="role-slot" ref={slot}><span>{ROLES[0]}</span></span><span className="role-caret" aria-hidden="true" /></p>
            <p className="pitch h-in"><strong>{PROFILE.pitchStrong}</strong>{PROFILE.pitchRest}</p>
            <div className="hero-cta h-in">
              <a href="#work" className="btn primary magnetic" data-cursor="work">
                <span className="btn-t">See the work <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg></span>
              </a>
              <button type="button" className="btn magnetic" onClick={openAsk}><span className="btn-t">Ask about me <kbd>⌘K</kbd></span></button>
            </div>
          </div>
          <div className="term h-in" role="img" aria-label="Terminal summarising Bubalan's career: TIA IT Wing internships with a React component library and a promotion, freelance client websites at Create Digital Solution, and now dashboards, APIs, auth and zero-downtime deploys at Predigle.">
            <div className="term-bar" aria-hidden="true"><i /><i /><i /><span>zsh — ~/bubalan</span></div>
            <div className="term-body" ref={term} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><i />scroll</div>
    </section>
  );
}
