'use client';
import { useRef } from 'react';
import { AI_TERM, HOW } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_OFF, revealBatch, typeTerm } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';

/* ---------- diagram: me → orchestrator → parallel subagents → PR → me ---------- */
type DNode = { x: number; y: number; w: number; h: number; t: string; s?: string; c?: string };
type DEdge = { d: string; b?: number; dur?: number; back?: boolean };
type Layout = { id: string; vb: string; nodes: DNode[]; edges: DEdge[]; labels: { x: number; y: number; t: string; r?: number }[] };

const SUBS = [['explore', 'reads the repo'], ['implement', 'writes the change'], ['test', 'runs the suite'], ['review', 'checks the diff']];
const H: Layout = {
  id: 'dh', vb: '0 0 1000 440',
  nodes: [
    { x: 16, y: 150, w: 128, h: 64, t: 'me', s: 'spec + review', c: 'me' },
    { x: 226, y: 150, w: 176, h: 64, t: 'orchestrator', s: 'plans · delegates', c: 'orc' },
    ...SUBS.map((s, i) => ({ x: 492, y: 28 + i * 84, w: 180, h: 56, t: s[0], s: s[1] })),
    { x: 780, y: 150, w: 170, h: 64, t: 'pull request', s: 'ready for review', c: 'pr' },
  ],
  edges: [
    { d: 'M144 182 H226', b: 0 },
    ...SUBS.map((_, i) => ({ d: `M402 182 C447 182 447 ${56 + i * 84} 492 ${56 + i * 84}`, b: .5 + i * .12 })),
    ...SUBS.map((_, i) => ({ d: `M672 ${56 + i * 84} C726 ${56 + i * 84} 726 182 780 182`, b: 1.1 + i * .12 })),
    { d: 'M865 214 C865 450 80 450 80 214', b: 1.8, dur: 3.4, back: true },
  ],
  labels: [{ x: 472, y: 432, t: '↺ back to me for review' }],
};
const V: Layout = {
  id: 'dv', vb: '0 0 400 720',
  nodes: [
    { x: 136, y: 8, w: 128, h: 56, t: 'me', s: 'spec + review', c: 'me' },
    { x: 112, y: 112, w: 176, h: 56, t: 'orchestrator', s: 'plans · delegates', c: 'orc' },
    ...SUBS.map((s, i) => ({ x: 96, y: 222 + i * 78, w: 208, h: 52, t: s[0], s: s[1] })),
    { x: 115, y: 572, w: 170, h: 56, t: 'pull request', s: 'ready for review', c: 'pr' },
  ],
  edges: [
    { d: 'M200 64 V112', b: 0 },
    ...SUBS.map((_, i) => ({ d: `M200 168 V190 H66 V${248 + i * 78} H96`, b: .5 + i * .12 })),
    ...SUBS.map((_, i) => ({ d: `M304 ${248 + i * 78} H334 V546 H200 V572`, b: 1.1 + i * .12 })),
    { d: 'M200 628 V668 H22 V36 H136', b: 1.8, dur: 3.6, back: true },
  ],
  labels: [{ x: 14, y: 400, t: '↺ back to me for review', r: -90 }],
};

function diagramSVG(L: Layout) {
  const node = (n: DNode) => `<g class="node ${n.c || ''}" transform="translate(${n.x} ${n.y})"><rect width="${n.w}" height="${n.h}" rx="6"/>` +
    `<text x="${n.w / 2}" y="${n.s ? n.h / 2 - 3 : n.h / 2 + 4}" text-anchor="middle">${n.t}</text>` +
    (n.s ? `<text class="sub" x="${n.w / 2}" y="${n.h / 2 + 13}" text-anchor="middle">${n.s}</text>` : '') + '</g>';
  let paths = '', dots = '';
  L.edges.forEach((e, i) => {
    const id = `${L.id}-e${i}`;
    paths += `<path id="${id}" class="edge${e.back ? ' back' : ''}" d="${e.d}"/><path class="edge-glow" pathLength="1" d="${e.d}" ${e.back ? 'style="stroke:var(--amber)"' : ''}/>`;
    dots += `<circle class="dotc${e.back ? ' am' : ''}" r="3.6"><animateMotion dur="${e.dur || 2.6}s" begin="${e.b || 0}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".6 0 .4 1"><mpath href="#${id}"/></animateMotion></circle>`;
  });
  const labels = L.labels.map(l => `<text x="${l.x}" y="${l.y}" font-family="var(--f-mono)" font-size="11" fill="var(--amber-ink)" text-anchor="middle" ${l.r ? `transform="rotate(${l.r} ${l.x} ${l.y})"` : ''}>${l.t}</text>`).join('');
  const orc = L.nodes.find(n => n.c === 'orc')!;
  const pulse = `<rect class="pulse" x="${orc.x}" y="${orc.y}" width="${orc.w}" height="${orc.h}" rx="6"><animate attributeName="opacity" values=".6;0" dur="2s" repeatCount="indefinite"/><animate attributeName="stroke-width" values="1;10" dur="2s" repeatCount="indefinite"/></rect>`;
  return `<svg viewBox="${L.vb}" role="img" aria-label="Diagram: I write the spec and hand it to an orchestrator agent, which runs explore, implement, test and review subagents in parallel; their work becomes a pull request that comes back to me for review.">${paths}${pulse}${L.nodes.map(node).join('')}${dots}${labels}</svg>`;
}
const SVG_H = diagramSVG(H), SVG_V = diagramSVG(V);

const HowIcon = ({ name }: { name: (typeof HOW)[number]['icon'] }) => {
  const p: Record<typeof name, React.ReactNode> = {
    spec: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4M9 12h7M9 16h5" /></>,
    layers: <><path d="M4 7l8-4 8 4-8 4z" /><path d="M4 12l8 4 8-4M4 17l8 4 8-4" /></>,
    plug: <><path d="M9 7V3M15 7V3M7 7h10v5a5 5 0 0 1-10 0z" /><path d="M12 17v4" /></>,
    fork: <path d="M5 12h4M9 12l4-6h6M9 12l4 6h6M13 12h6" />,
    db: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
    shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{p[name]}</svg>;
};

export default function Agents() {
  const ref = useRef<HTMLElement>(null);
  const term = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    let stop = () => {};
    mm.add(MOTION_OK, () => {
      revealBatch(el);
      const dg = el.querySelector('.diagram');
      gsap.to(el.querySelectorAll('.edge-glow'), { strokeDashoffset: 0, duration: 1.4, stagger: .06, ease: 'power2.inOut', scrollTrigger: { trigger: dg, start: 'top 80%' } });
      gsap.from(el.querySelectorAll('.dg .node'), { opacity: 0, scale: .85, transformOrigin: '50% 50%', duration: .7, stagger: .06, ease: 'back.out(1.8)', scrollTrigger: { trigger: dg, start: 'top 80%' } });
      ScrollTrigger.create({ trigger: term.current, start: 'top 85%', once: true, onEnter: () => { stop = typeTerm(term.current!, AI_TERM, { speed: 22 }); } });
      gsap.from(el.querySelectorAll('.how-ico'), { scale: 0, rotate: -90, duration: .8, stagger: .08, ease: 'back.out(2)', scrollTrigger: { trigger: el.querySelector('.how'), start: 'top 80%' } });
    });
    mm.add(MOTION_OFF, () => { stop = typeTerm(term.current!, AI_TERM); });
    return () => stop();
  }, { scope: ref });

  return (
    <section className="sec bp" id="agents" data-path="~/ai/workflow.md" aria-labelledby="agents-t" ref={ref}>
      <span className="reg r-tl" aria-hidden="true" /><span className="reg r-tr" aria-hidden="true" />
      <div className="wrap">
        <SectionHead num="05" path="~/ai/workflow.md" titleId="agents-t" lines={['Agentic coding,', <em className="am" key="e">with a spec.</em>]} />
        <div className="ai-top">
          <div className="rv">
            <p className="sec-lede mt-0">AI is part of how I build, not a replacement for thinking. I&apos;ve built on the OpenAI API (CodeCraft, below) and prompt engineering is one of my focus areas. For day-to-day coding I work with agents the way I&apos;d work with a team: a clear spec, shared standards, and review before anything merges.</p>
            <div className="ai-tools"><span>OpenAI API</span><span>Prompt engineering</span><span className="ph">[ADD: AI tools and how I use them]</span></div>
          </div>
          <div className="term ai-term rv">
            <div className="term-bar"><i /><i /><i /><span>agent session</span><span className="tag">illustrative</span></div>
            <div className="term-body" ref={term} aria-label="Illustrative agent session transcript" />
          </div>
        </div>

        <figure className="diagram brk rv mx-0">
          <figcaption className="diagram-bar"><span>~/ai/flow.svg — me → orchestrator → parallel subagents → PR → me</span><span>● live</span></figcaption>
          <div className="dg dg-h" dangerouslySetInnerHTML={{ __html: SVG_H }} />
          <div className="dg dg-v" dangerouslySetInnerHTML={{ __html: SVG_V }} />
        </figure>

        <div className="how">
          {HOW.map(h => (
            <article className="how-card brk rv" key={h.title}>
              <div className="how-top"><span className="how-ico"><HowIcon name={h.icon} /></span></div>
              <h3>{h.title}</h3>
              <p>{h.body}{'code' in h && <> <code>{h.code}</code>{h.tail}</>}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
