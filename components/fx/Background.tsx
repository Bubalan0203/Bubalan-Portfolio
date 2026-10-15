'use client';
import { useEffect, useRef } from 'react';
import { reducedMotion } from '@/lib/motion';

const SNIPPETS = [
  '<Product />', 'ship()', 'await build(idea)', '{ ...ux }', 'useState()', 'git push', 'GET /api/v1',
  'role === "admin"', 'deploy --zero-downtime', '=> ok', '<Dashboard />', 'SELECT *', 'jwt.verify()',
  'npm run build', 'flex: 1', 'async () =>', 'commit -m "feat"', 'z.object({})', '200 OK', '{ }',
];

type Node = { x: number; y: number; vx: number; vy: number; z: number };
type Code = { x: number; y: number; z: number; t: string; v: number };

/**
 * Living backdrop: a sparse node network that reaches toward the pointer, and fragments of code
 * drifting upward at three depths, shifting with the pointer for parallax.
 */
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let nodes: Node[] = [], codes: Code[] = [];
    const mouse = { x: -9999, y: -9999, px: 0, py: 0 };
    let rgb = '76,216,255', mono = 'monospace';

    const readTheme = () => {
      rgb = document.documentElement.getAttribute('data-theme') === 'light' ? '7,132,181' : '76,216,255';
      mono = getComputedStyle(document.body).getPropertyValue('--f-mono') || 'monospace';
    };
    const newCode = (y?: number): Code => {
      const z = Math.random();
      return { x: Math.random() * w, y: y ?? h + 20, z, t: SNIPPETS[(Math.random() * SNIPPETS.length) | 0], v: .12 + z * .3 };
    };
    const resize = () => {
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(70, Math.round((w * h) / 22000));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, z: Math.random() }));
      codes = Array.from({ length: Math.min(26, Math.round(w / 60)) }, () => newCode(Math.random() * h));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.px += ((mouse.x < 0 ? 0 : mouse.x / w - .5) - mouse.px) * .04;
      mouse.py += ((mouse.y < 0 ? 0 : mouse.y / h - .5) - mouse.py) * .04;

      // code fragments
      for (const c of codes) {
        c.y -= c.v;
        if (c.y < -20) Object.assign(c, newCode());
        const ox = -mouse.px * 40 * (c.z + .2), oy = -mouse.py * 30 * (c.z + .2);
        const fade = Math.min(1, (h - c.y) / 200, c.y / 200);
        ctx.font = `${10 + c.z * 4}px ${mono}`;
        ctx.fillStyle = `rgba(${rgb},${(.05 + c.z * .13) * Math.max(0, fade)})`;
        ctx.fillText(c.t, c.x + ox, c.y + oy);
      }

      // node network
      const L2 = 160 * 160, M = 200 * 200;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        const md = (a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2;
        const near = md < M ? 1 - md / M : 0;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d > L2) continue;
          ctx.strokeStyle = `rgba(${rgb},${(1 - d / L2) * (.07 + near * .35)})`;
          ctx.lineWidth = .7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        if (near > 0) {
          ctx.strokeStyle = `rgba(${rgb},${near * .22})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${rgb},${.25 + a.z * .45 + near * .3})`;
        ctx.beginPath(); ctx.arc(a.x, a.y, .8 + a.z * 1.1, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    readTheme(); resize();
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); };
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    if (reducedMotion()) { frame(); cancelAnimationFrame(raf); }
    else raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      removeEventListener('resize', resize); removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bg-glow" />
      <div className="bg-grid" />
      <canvas ref={ref} />
    </div>
  );
}
