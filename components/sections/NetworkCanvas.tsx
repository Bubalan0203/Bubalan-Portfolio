'use client';
import { useEffect, useRef } from 'react';
import { clamp, cssVar, lerp, pointer, reducedMotion, THEME_EVENT } from '@/lib/motion';

type Node = { x: number; y: number; vx: number; vy: number; r: number; ox: number; oy: number };
type Pulse = { a: number; b: number; t: number; s: number; hops: number; c: 'acc' | 'am' };

/** Dots + lines that part around the cursor, with glowing pulses hopping along the edges. */
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    const still = reducedMotion();
    const D = 150;
    let w = 0, h = 0, nodes: Node[] = [], pulses: Pulse[] = [], visible = true, raf = 0;
    let C = { dot: '', line: '', acc: '', am: '' };
    const readC = () => { C = { dot: cssVar('--ink-3'), line: cssVar('--ink-2'), acc: cssVar('--accent'), am: cssVar('--amber') }; };

    function resize() {
      const r = cv.getBoundingClientRect(); w = r.width; h = r.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp(w * h / 12500, 30, 120));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() * 1.3 + .7, ox: 0, oy: 0 }));
      pulses = [];
    }
    const neighbours = (i: number) => {
      const a = nodes[i], out: number[] = [];
      for (let j = 0; j < nodes.length; j++) if (j !== i && Math.hypot(a.x - nodes[j].x, a.y - nodes[j].y) < D) out.push(j);
      return out;
    };
    const spawn = () => {
      const i = (Math.random() * nodes.length) | 0, nb = neighbours(i);
      if (nb.length) pulses.push({ a: i, b: nb[(Math.random() * nb.length) | 0], t: 0, s: .012 + Math.random() * .014, hops: 2 + ((Math.random() * 4) | 0), c: Math.random() < .28 ? 'am' : 'acc' });
    };

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const r = cv.getBoundingClientRect();
      const mx = pointer.x - r.left, my = pointer.y - r.top;
      if (!still) for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20; if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
        const dx = n.x - mx, dy = n.y - my, d = Math.hypot(dx, dy) || 1;
        const f = d < 170 ? (170 - d) * .22 : 0;
        n.ox += ((dx / d) * f - n.ox) * .08; n.oy += ((dy / d) * f - n.oy) * .08;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i], ax = a.x + a.ox, ay = a.y + a.oy;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], bx = b.x + b.ox, by = b.y + b.oy, d = Math.hypot(ax - bx, ay - by);
          if (d < D) {
            const near = Math.hypot((ax + bx) / 2 - mx, (ay + by) / 2 - my) < 190;
            ctx.globalAlpha = (1 - d / D) * (near ? .55 : .16);
            ctx.strokeStyle = near ? C.acc : C.line;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const x = n.x + n.ox, y = n.y + n.oy, near = Math.hypot(x - mx, y - my) < 190;
        ctx.globalAlpha = near ? .95 : .55; ctx.fillStyle = near ? C.acc : C.dot;
        ctx.beginPath(); ctx.arc(x, y, near ? n.r + .8 : n.r, 0, 6.283); ctx.fill();
      }
      if (!still) {
        if (pulses.length < Math.min(14, nodes.length / 6) && Math.random() < .08) spawn();
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k], a = nodes[p.a], b = nodes[p.b];
          const ax = a.x + a.ox, ay = a.y + a.oy, bx = b.x + b.ox, by = b.y + b.oy;
          if (Math.hypot(ax - bx, ay - by) > D * 1.15) { pulses.splice(k, 1); continue; }
          p.t += p.s;
          const x = lerp(ax, bx, p.t), y = lerp(ay, by, p.t), col = C[p.c];
          const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
          g.addColorStop(0, col); g.addColorStop(1, 'transparent');
          ctx.globalAlpha = .9; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); ctx.fill();
          ctx.globalAlpha = 1; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 1.9, 0, 6.283); ctx.fill();
          const tt = Math.max(0, p.t - .25);
          ctx.globalAlpha = .5; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(lerp(ax, bx, tt), lerp(ay, by, tt)); ctx.lineTo(x, y); ctx.stroke();
          if (p.t >= 1) {
            const nb = neighbours(p.b).filter(j => j !== p.a);
            if (--p.hops > 0 && nb.length) { p.a = p.b; p.b = nb[(Math.random() * nb.length) | 0]; p.t = 0; } else pulses.splice(k, 1);
          }
        }
        if (mx > 0 && my > 0 && mx < w && my < h) {
          for (const n of nodes) {
            const x = n.x + n.ox, y = n.y + n.oy, d = Math.hypot(x - mx, y - my);
            if (d < 200) { ctx.globalAlpha = (1 - d / 200) * .5; ctx.strokeStyle = C.am; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(x, y); ctx.stroke(); }
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    readC(); resize();
    const onTheme = () => { readC(); if (still) draw(); };
    window.addEventListener(THEME_EVENT, onTheme);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { resize(); if (still) draw(); }, 150); };
    addEventListener('resize', onResize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);
    if (still) draw();
    else { const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); }; loop(); }
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', onResize); window.removeEventListener(THEME_EVENT, onTheme); };
  }, []);

  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />;
}
