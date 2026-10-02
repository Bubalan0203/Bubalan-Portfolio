'use client';
import { useRef } from 'react';
import type { Story } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_OFF, cssVar } from '@/lib/motion';

const GREEN = '#2BD576', RED = '#FF5F57';

/* ---------- 1. an item moving through workflow stages ---------- */
function Flow() {
  const cols = [14, 110, 206, 302];
  return (
    <svg viewBox="0 0 400 290" preserveAspectRatio="xMidYMid meet">
      {cols.map(x => <rect key={x} x={x} y="52" width="84" height="220" rx="4" fill="none" stroke="var(--line)" />)}
      <rect className="colhl" x="14" y="52" width="84" height="220" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" opacity="0" />
      {['INTAKE', 'REVIEW', 'APPROVE', 'DONE'].map((t, i) => <text key={t} x={cols[i] + 8} y="72" fontSize="9">{t}</text>)}
      <g fill="var(--line)">
        {[[22, 130], [22, 168], [22, 206], [118, 130], [214, 130], [214, 168], [310, 130]].map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="68" height="30" rx="3" />)}
      </g>
      <g className="tk">
        <rect x="22" y="86" width="68" height="34" rx="3" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.5" />
        <rect x="29" y="94" width="34" height="4" rx="2" fill="var(--accent)" />
        <rect x="29" y="103" width="50" height="3" rx="1.5" fill="var(--ink-3)" opacity=".5" />
        <rect x="29" y="110" width="26" height="3" rx="1.5" fill="var(--ink-3)" opacity=".5" />
        <circle className="tk-ok" cx="82" cy="96" r="5" fill={GREEN} opacity="0" />
      </g>
    </svg>
  );
}
function animateFlow(el: Element, still: boolean) {
  const tk = el.querySelector('.tk'), hl = el.querySelector('.colhl'), ok = el.querySelector('.tk-ok');
  if (still) { gsap.set([tk, hl], { x: 288, opacity: 1 }); gsap.set(ok, { opacity: 1 }); return null; }
  const tl = gsap.timeline({ repeat: -1, paused: true, repeatDelay: .3 });
  tl.set([tk, hl], { x: 0 }).set(ok, { opacity: 0 })
    .fromTo(tk, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'back.out(2)' })
    .to(hl, { opacity: 1, duration: .3 }, '<');
  [1, 2, 3].forEach(i => tl.to([tk, hl], { x: 96 * i, duration: .8, ease: 'power3.inOut' }, '+=.55'));
  tl.to(ok, { opacity: 1, duration: .3 }).to(tk, { opacity: 0, y: 8, duration: .4 }, '+=1').to(hl, { opacity: 0, duration: .3 }, '<');
  return tl;
}

/* ---------- 2. interface and service staying in sync ---------- */
function Sync() {
  const rows = [92, 116, 140, 164];
  return (
    <svg viewBox="0 0 400 290" preserveAspectRatio="xMidYMid meet">
      <rect x="20" y="60" width="130" height="150" rx="5" fill="var(--surface-2)" stroke="var(--line)" />
      <rect x="250" y="60" width="130" height="150" rx="5" fill="var(--surface-2)" stroke="var(--line)" />
      <text x="30" y="80" fontSize="9">INTERFACE</text><text x="260" y="80" fontSize="9">SERVICE / API</text>
      <g className="rowsL">{rows.map(y => <rect key={y} x="30" y={y} width="110" height="18" rx="2" fill="var(--line)" />)}</g>
      <g className="rowsR">{rows.map(y => <rect key={y} x="260" y={y} width="110" height="18" rx="2" fill="var(--line)" />)}</g>
      <path className="syncA" d="M150 105 C 200 80, 200 80, 250 105" fill="none" stroke="var(--line)" strokeWidth="1.5" />
      <path className="syncB" d="M250 165 C 200 190, 200 190, 150 165" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="178" y="76" fontSize="8">GET /items</text><text x="182" y="204" fontSize="8">200 · json</text>
      <circle className="pkA" r="4" fill="var(--accent)" cx="150" cy="105" /><circle className="pkB" r="4" fill="var(--amber)" cx="250" cy="165" />
      <text x="20" y="240" fontSize="9">RESPONSE TIME</text>
      <rect x="20" y="248" width="360" height="8" rx="4" fill="var(--line)" />
      <rect className="lat" x="20" y="248" width="300" height="8" rx="4" fill="var(--accent)" />
      <text x="380" y="240" fontSize="9" textAnchor="end">slower → faster</text>
    </svg>
  );
}
function animateSync(el: Element, still: boolean) {
  const pa = el.querySelector<SVGPathElement>('.syncA')!, pb = el.querySelector<SVGPathElement>('.syncB')!;
  const A = el.querySelector('.pkA')!, B = el.querySelector('.pkB')!, lat = el.querySelector('.lat');
  const rowsL = el.querySelectorAll('.rowsL rect'), rowsR = el.querySelectorAll('.rowsR rect');
  if (still) { gsap.set([A, B], { opacity: 0 }); gsap.set(lat, { attr: { width: 110 } }); return null; }
  const la = pa.getTotalLength(), lb = pb.getTotalLength();
  const move = (c: Element, p: SVGPathElement, L: number, t: number) => { const pt = p.getPointAtLength(t * L); c.setAttribute('cx', String(pt.x)); c.setAttribute('cy', String(pt.y)); };
  const oa = { t: 0 }, ob = { t: 0 };
  let r = 0;
  const tl = gsap.timeline({ repeat: -1, paused: true });
  tl.set(oa, { t: 0 })
    .to(oa, { t: 1, duration: .9, ease: 'power2.inOut', onUpdate: () => move(A, pa, la, oa.t) })
    .add(() => { gsap.fromTo(rowsR[r % 4], { attr: { fill: cssVar('--accent') } }, { attr: { fill: cssVar('--line') }, duration: .8 }); })
    .set(ob, { t: 0 }, '+=.15')
    .to(ob, { t: 1, duration: .9, ease: 'power2.inOut', onUpdate: () => move(B, pb, lb, ob.t) })
    .add(() => { gsap.fromTo(rowsL[r % 4], { attr: { fill: cssVar('--amber') } }, { attr: { fill: cssVar('--line') }, duration: .8 }); r++; })
    .to({}, { duration: .25 });
  gsap.to(lat, { attr: { width: 110 }, duration: 5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  return tl;
}

/* ---------- 3. masked sign-in, role check, traffic switch ---------- */
function Access() {
  return (
    <svg viewBox="0 0 400 290" preserveAspectRatio="xMidYMid meet">
      <rect x="20" y="42" width="200" height="132" rx="5" fill="var(--surface-2)" stroke="var(--line)" />
      <text x="30" y="62" fontSize="9">SIGN IN</text>
      <text x="30" y="84" fontSize="8">user</text><rect x="30" y="88" width="180" height="18" rx="3" fill="none" stroke="var(--line)" /><text className="f1" x="37" y="101" fontSize="10" style={{ fill: 'var(--ink)' }} />
      <text x="30" y="120" fontSize="8">token</text><rect x="30" y="124" width="180" height="18" rx="3" fill="none" stroke="var(--line)" /><text className="f2" x="37" y="137" fontSize="10" style={{ fill: 'var(--ink)' }} />
      <text x="30" y="160" fontSize="8">role</text><text className="f3" x="60" y="160" fontSize="10" style={{ fill: 'var(--accent-ink)' }} />
      <g fontSize="9">
        <rect x="236" y="42" width="144" height="132" rx="5" fill="var(--surface-2)" stroke="var(--line)" />
        <text x="246" y="62">ACCESS</text>
        <text x="246" y="88">view</text><text x="246" y="114">edit</text><text x="246" y="140">admin</text>
        <circle className="pm" cx="360" cy="85" r="6" fill="var(--line)" /><circle className="pm" cx="360" cy="111" r="6" fill="var(--line)" /><circle className="pm" cx="360" cy="137" r="6" fill="var(--line)" />
      </g>
      <rect x="20" y="194" width="60" height="70" rx="5" fill="none" stroke="var(--line)" /><text x="30" y="234" fontSize="9">users</text>
      <rect className="v1" x="300" y="190" width="80" height="34" rx="5" fill="var(--surface-2)" stroke="var(--accent)" /><text x="312" y="211" fontSize="9">release n</text>
      <rect className="v2" x="300" y="234" width="80" height="34" rx="5" fill="var(--surface-2)" stroke="var(--line)" /><text x="312" y="255" fontSize="9">release n+1</text>
      <path className="r1" d="M80 229 C 190 229, 190 207, 300 207" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path className="r2" d="M80 229 C 190 229, 190 251, 300 251" fill="none" stroke="var(--amber)" strokeWidth="2" opacity=".15" />
      <circle cx="120" cy="280" r="3.5" fill={GREEN} /><text x="130" y="283" fontSize="8">online · no interruption</text>
    </svg>
  );
}
function animateAccess(el: Element, still: boolean) {
  const [f1, f2, f3] = ['.f1', '.f2', '.f3'].map(s => el.querySelector(s)!);
  const pms = el.querySelectorAll('.pm');
  const r1 = el.querySelector('.r1'), r2 = el.querySelector('.r2'), v1 = el.querySelector('.v1'), v2 = el.querySelector('.v2');
  const T: [Element, string][] = [[f1, 'b•••••@••••••.com'], [f2, 'eyJhbGci••••••••••'], [f3, 'editor']];
  if (still) {
    T.forEach(([n, t]) => { n.textContent = t; });
    gsap.set(pms[0], { attr: { fill: GREEN } }); gsap.set(pms[1], { attr: { fill: GREEN } }); gsap.set(pms[2], { attr: { fill: RED } });
    gsap.set(r1, { opacity: .15 }); gsap.set(r2, { opacity: 1 }); gsap.set(v2, { attr: { stroke: cssVar('--amber') } }); gsap.set(v1, { attr: { stroke: cssVar('--line') } });
    return null;
  }
  const typer = (node: Element, txt: string) => { const o = { n: 0 }; return gsap.to(o, { n: txt.length, duration: txt.length * .045, ease: 'none', onUpdate: () => { node.textContent = txt.slice(0, Math.round(o.n)); } }); };
  const tl = gsap.timeline({ repeat: -1, paused: true, repeatDelay: .6 });
  tl.add(() => { T.forEach(([n]) => { n.textContent = ''; }); })
    .set(pms, { attr: { fill: cssVar('--line') } }).set(r1, { opacity: 1 }).set(r2, { opacity: .15 })
    .set(v1, { attr: { stroke: cssVar('--accent') } }).set(v2, { attr: { stroke: cssVar('--line') } });
  T.forEach(([n, t], i) => tl.add(typer(n, t), i ? '+=.15' : '+=.3'));
  tl.to(pms[0], { attr: { fill: GREEN }, duration: .2 }, '+=.2').to(pms[1], { attr: { fill: GREEN }, duration: .2 }, '+=.15').to(pms[2], { attr: { fill: RED }, duration: .2 }, '+=.15')
    .to(r2, { opacity: 1, duration: .6 }, '+=.5').to(r1, { opacity: .15, duration: .6 }, '<.2')
    .to(v2, { attr: { stroke: cssVar('--amber') }, duration: .3 }, '<').to(v1, { attr: { stroke: cssVar('--line') }, duration: .3 }, '<')
    .to({}, { duration: 1.6 });
  return tl;
}

const SCENES = { flow: [Flow, animateFlow], sync: [Sync, animateSync], access: [Access, animateAccess] } as const;

/** Small, generic looping animation for a work story. Plays only while on screen. */
export default function StoryScene({ scene, label }: { scene: Story['scene']; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [Svg, animate] = SCENES[scene];
  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tl = animate(el, false);
      if (tl) ScrollTrigger.create({ trigger: el, start: 'top 90%', end: 'bottom 10%', onToggle: s => { if (s.isActive) tl.play(); else tl.pause(); } });
    });
    mm.add(MOTION_OFF, () => { animate(el, true); });
  }, { scope: ref });
  return (
    <div className="scene" ref={ref} aria-hidden="true">
      <span className="scene-label">{label}</span>
      <Svg />
    </div>
  );
}
