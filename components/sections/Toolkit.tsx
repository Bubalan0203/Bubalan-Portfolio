'use client';
import { useEffect, useRef, useState } from 'react';
import {
  siReact, siNextdotjs, siAngular, siTypescript, siJavascript, siTailwindcss, siBootstrap, siElectron,
  siNodedotjs, siExpress, siDjango, siPython, siOpenapiinitiative, siJsonwebtokens, siRazorpay, siPostman,
  siMongodb, siMysql, siFirebase, siOpenai, siClaude, siGithubcopilot, siAnthropic,
  siAmazonwebservices, siVercel, siNetlify, siGit, siGithub,
  type SimpleIcon,
} from 'simple-icons';
import { useGSAP, revealBatch, reducedMotion } from '@/lib/motion';
import { Label } from './About';

type Group = 'Frontend' | 'Backend' | 'Data' | 'AI & agents' | 'Cloud';
type Tool = { name: string; icon: SimpleIcon | 'prompt'; group: Group; note: string };

const TOOLS: Tool[] = [
  { name: 'React', icon: siReact, group: 'Frontend', note: 'Component UIs for web' },
  { name: 'Next.js', icon: siNextdotjs, group: 'Frontend', note: 'Full-stack React apps' },
  { name: 'TypeScript', icon: siTypescript, group: 'Frontend', note: 'Typed, safer code' },
  { name: 'Node.js', icon: siNodedotjs, group: 'Backend', note: 'Server logic and APIs' },
  { name: 'Claude Code', icon: siClaude, group: 'AI & agents', note: 'Agentic coding, plan to PR' },
  { name: 'Python', icon: siPython, group: 'Backend', note: 'Services and automation' },
  { name: 'MongoDB', icon: siMongodb, group: 'Data', note: 'Flexible document data' },
  { name: 'AWS', icon: siAmazonwebservices, group: 'Cloud', note: 'Cloud hosting and deploys' },
  { name: 'Angular', icon: siAngular, group: 'Frontend', note: 'Structured enterprise apps' },
  { name: 'Django', icon: siDjango, group: 'Backend', note: 'Python web backends' },
  { name: 'OpenAI API', icon: siOpenai, group: 'AI & agents', note: 'LLM features inside apps' },
  { name: 'MySQL', icon: siMysql, group: 'Data', note: 'Relational schemas and SQL' },
  { name: 'React Native', icon: siReact, group: 'Frontend', note: 'Mobile apps' },
  { name: 'Express', icon: siExpress, group: 'Backend', note: 'Routing and middleware' },
  { name: 'Claude', icon: siClaude, group: 'AI & agents', note: 'Reasoning and writing model' },
  { name: 'Vercel', icon: siVercel, group: 'Cloud', note: 'Next.js deploys' },
  { name: 'JavaScript', icon: siJavascript, group: 'Frontend', note: 'Core language of the web' },
  { name: 'Firebase', icon: siFirebase, group: 'Data', note: 'Auth, realtime data, hosting' },
  { name: 'Codex', icon: siOpenai, group: 'AI & agents', note: 'Parallel agent for tests and refactors' },
  { name: 'REST APIs', icon: siOpenapiinitiative, group: 'Backend', note: 'Clean, versioned endpoints' },
  { name: 'Tailwind CSS', icon: siTailwindcss, group: 'Frontend', note: 'Fast, consistent styling' },
  { name: 'GitHub', icon: siGithub, group: 'Cloud', note: 'PRs, reviews and CI' },
  { name: 'GitHub Copilot', icon: siGithubcopilot, group: 'AI & agents', note: 'In-editor help and PR review' },
  { name: 'JWT & RBAC', icon: siJsonwebtokens, group: 'Backend', note: 'Secure auth and roles' },
  { name: 'Bootstrap', icon: siBootstrap, group: 'Frontend', note: 'Responsive UI scaffolding' },
  { name: 'MCP', icon: siAnthropic, group: 'AI & agents', note: 'Agents reach real tools and data' },
  { name: 'Razorpay', icon: siRazorpay, group: 'Backend', note: 'Payments inside products' },
  { name: 'Netlify', icon: siNetlify, group: 'Cloud', note: 'Static site deploys' },
  { name: 'Electron', icon: siElectron, group: 'Frontend', note: 'Desktop apps from web code' },
  { name: 'Postman', icon: siPostman, group: 'Backend', note: 'API testing and docs' },
  { name: 'Prompt engineering', icon: 'prompt', group: 'AI & agents', note: 'Reliable model instructions' },
  { name: 'Git', icon: siGit, group: 'Cloud', note: 'Version control' },
];
const GROUPS: Group[] = ['Frontend', 'Backend', 'Data', 'AI & agents', 'Cloud'];

// brand colours that vanish on the dark page (black logos) fall back to the ink colour
function tint(hex: string) {
  const n = parseInt(hex, 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.28 ? 'var(--ink)' : `#${hex}`;
}

function Icon({ t }: { t: Tool }) {
  if (t.icon === 'prompt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3.5" width="20" height="17" rx="3" /><path d="m6.5 9.5 3 2.5-3 2.5M12 15h5" />
      </svg>
    );
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: tint(t.icon.hex) }} fill="currentColor"><path d={t.icon.path} /></svg>;
}

// points spread evenly over a sphere (golden-angle spiral)
const PTS = TOOLS.map((_, i) => {
  const y = 1 - (i + .5) * (2 / TOOLS.length), r = Math.sqrt(1 - y * y), th = i * 2.399963;
  return [Math.cos(th) * r, y, Math.sin(th) * r] as const;
});

/**
 * Every tool at once, orbiting as a 3D sphere of real logos. Drag to spin it, hover a logo to inspect it,
 * and filter by area to bring that group forward — nothing is hidden by default.
 */
export default function Toolkit() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [pick, setPick] = useState<number>(0);
  const live = useRef({ group: null as Group | null, hover: -1 });
  useGSAP(() => revealBatch(root.current!), { scope: root });

  useEffect(() => { live.current.group = group; }, [group]);

  useEffect(() => {
    const el = stage.current!;
    const still = reducedMotion();
    let ax = -.25, ay = 0, vx = 0, vy = still ? 0 : .0035, drag: { x: number; y: number } | null = null, raf = 0, seen = true;
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; });
    io.observe(el);
    const down = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      vy = (e.clientX - drag.x) * .004; vx = -(e.clientY - drag.y) * .004;
      drag = { x: e.clientX, y: e.clientY };
    };
    const up = () => { drag = null; };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!seen) return;
      ay += vy; ax = Math.max(-1, Math.min(1, ax + vx));
      if (!drag) { vx *= .92; vy += ((still ? 0 : .0035) - vy) * .03; }
      const R = el.clientWidth * .38, cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      const { group: g, hover } = live.current;
      PTS.forEach(([x, y, z], i) => {
        const n = nodes.current[i];
        if (!n) return;
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        const match = !g || TOOLS[i].group === g;
        const s = (.55 + depth * .55) * (match ? 1 : .8) * (hover === i ? 1.18 : 1);
        n.style.transform = `translate(-50%,-50%) translate3d(${(x1 * R).toFixed(1)}px,${(y2 * R).toFixed(1)}px,0) scale(${s.toFixed(3)})`;
        n.style.opacity = String(match ? .25 + depth * .75 : .07 + depth * .1);
        n.style.zIndex = String(Math.round(depth * 100) + (match ? 100 : 0));
        n.style.filter = depth < .35 ? `blur(${((.35 - depth) * 5).toFixed(1)}px)` : '';
      });
    };
    frame();
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
    };
  }, []);

  const t = TOOLS[pick];
  const count = (g: Group) => TOOLS.filter(x => x.group === g).length;

  return (
    <section className="sec toolkit" id="toolkit" ref={root}>
      <Label n="04">Toolkit</Label>
      <div className="nc-head">
        <h2 className="nc-title rv">From the first pixel <em>to production.</em></h2>
        <p className="jh-intro rv">All {TOOLS.length} tools I build and ship with, in one orbit. Drag to spin it, point at a logo to inspect it.</p>
      </div>

      <div className="orb rv">
        <div className="orb-stage" ref={stage}>
          <i className="orb-ring r1" /><i className="orb-ring r2" /><i className="orb-ring r3" /><i className="orb-core" />
          {TOOLS.map((tool, i) => (
            <button key={tool.name} type="button" ref={el => { nodes.current[i] = el; }} className={`orb-node${pick === i ? ' on' : ''}`}
              aria-label={`${tool.name}: ${tool.note}`}
              onPointerEnter={() => { live.current.hover = i; setPick(i); }} onPointerLeave={() => { live.current.hover = -1; }}
              onFocus={() => setPick(i)}>
              <span className="orb-chip"><Icon t={tool} /></span>
              <em>{tool.name}</em>
            </button>
          ))}
        </div>

        <aside className="orb-side">
          <div className="orb-card">
            <p className="orb-k">inspecting</p>
            <div className="orb-big"><span className="orb-chip lg"><Icon t={t} /></span><div><h3>{t.name}</h3><p>{t.group}</p></div></div>
            <p className="orb-note">{t.note}</p>
          </div>
          <div className="orb-filter" role="tablist" aria-label="Highlight an area">
            <p className="orb-k">highlight an area</p>
            <button type="button" role="tab" aria-selected={group === null} className={group === null ? 'on' : ''} onClick={() => setGroup(null)}>
              <i />Everything<span>{TOOLS.length}</span>
            </button>
            {GROUPS.map(g => (
              <button key={g} type="button" role="tab" aria-selected={group === g} className={group === g ? 'on' : ''} onClick={() => setGroup(c => (c === g ? null : g))}>
                <i />{g}<span>{count(g)}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
