'use client';
import { useEffect, useState } from 'react';

type Kind = 'me' | 'agent' | 'mcp' | 'task' | 'pr' | 'bot' | 'merged';
type Node = { id: string; x: number; y: number; w: number; h: number; label: string; sub?: string; kind: Kind; note: string };

// Bubalan specs the work, Claude Code and Codex run in parallel through shared MCP tools,
// everything lands in one PR, and nothing merges until he has read the diff.
const NODES: Node[] = [
  { id: 'me', x: 340, y: 44, w: 132, h: 40, label: 'bubalan', sub: 'spec · approve', kind: 'me', note: 'I write the spec and the acceptance criteria, then approve the plan.' },
  { id: 'claude', x: 175, y: 150, w: 160, h: 52, label: 'Claude Code', sub: 'plan · build', kind: 'agent', note: 'Claude Code plans the change and implements it with team skills.' },
  { id: 'codex', x: 505, y: 150, w: 160, h: 52, label: 'Codex', sub: 'test · refactor', kind: 'agent', note: 'Codex runs in parallel: tests, refactors and a second opinion.' },
  { id: 'mcp', x: 340, y: 150, w: 104, h: 34, label: 'mcp: tools', kind: 'mcp', note: 'Both agents share real tools over MCP: code search, browser, cloud.' },
  { id: 'explore', x: 105, y: 262, w: 104, h: 36, label: 'explore', kind: 'task', note: 'Read the codebase first, reuse what already exists.' },
  { id: 'implement', x: 240, y: 262, w: 104, h: 36, label: 'implement', kind: 'task', note: 'Small, typed changes that follow the team standards.' },
  { id: 'test', x: 440, y: 262, w: 104, h: 36, label: 'test', kind: 'task', note: 'Unit and browser tests, green before anything moves on.' },
  { id: 'review', x: 575, y: 262, w: 104, h: 36, label: 'review', kind: 'task', note: 'Agents review each other; issues are fixed before the PR.' },
  { id: 'pr', x: 340, y: 350, w: 120, h: 40, label: 'PR', sub: 'one change set', kind: 'pr', note: 'Everything both agents did lands in one pull request.' },
  { id: 'copilot', x: 340, y: 440, w: 170, h: 46, label: 'GitHub Copilot', sub: 'automated review', kind: 'bot', note: 'Copilot reviews the PR. Issues go back to Claude Code to fix; a clean PR comes to me.' },
  { id: 'merged', x: 140, y: 44, w: 150, h: 40, label: 'merged', sub: 'deployed to cloud', kind: 'merged', note: 'Only after my approval: merged and deployed with zero downtime.' },
];
const BY = Object.fromEntries(NODES.map(n => [n.id, n]));

// [from, to, pulse colour, delay]
const LINKS: [string, string, 'down' | 'up' | 'side', number][] = [
  ['me', 'claude', 'down', 0], ['me', 'codex', 'down', .2],
  ['claude', 'mcp', 'side', .6], ['codex', 'mcp', 'side', .9],
  ['claude', 'explore', 'down', .5], ['claude', 'implement', 'down', .8],
  ['codex', 'test', 'down', .6], ['codex', 'review', 'down', .9],
  ['explore', 'pr', 'up', 1.2], ['implement', 'pr', 'up', 1.4], ['test', 'pr', 'up', 1.3], ['review', 'pr', 'up', 1.5],
  ['pr', 'copilot', 'up', 1.8], ['me', 'merged', 'up', 3],
];

function path(a: Node, b: Node) {
  if (a.y === b.y) return `M${a.x} ${a.y} L${b.x} ${b.y}`;
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
}
// clean PR → back to me for approval; issues → back to Claude Code to fix
const LOOP = 'M425 440 C800 440 800 44 406 44';
const FIX_CLAUDE = 'M255 440 C-10 440 -10 150 95 150';

// a short, illustrative session log that cycles under the map
const LOG: [string, string][] = [
  ['claude', 'plan · 4 steps · approved by bubalan'],
  ['codex', 'parallel · writing tests for export.service'],
  ['claude', 'implement · export.service.ts +84 −3'],
  ['mcp', 'browser · clicked Export, file downloaded ✓'],
  ['codex', 'vitest · 12 passed · 1 nit fixed'],
  ['copilot', 'review · 1 issue: missing null check → sent back'],
  ['claude', 'fix · null check added · tests green'],
  ['copilot', 're-review · no issues ✓'],
  ['bubalan', 'reading the diff… approved · merged → deployed'],
];

export default function SystemMap() {
  const [hover, setHover] = useState<Node | null>(null);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setLine(l => (l + 1) % LOG.length), 2200);
    return () => clearInterval(id);
  }, []);

  const [who, text] = LOG[line];

  return (
    <div className="sysmap" aria-label="How Bubalan ships with AI: he writes the spec, Claude Code and Codex work in parallel through shared MCP tools, the work lands in one pull request, GitHub Copilot reviews it and sends issues back to Claude Code, and only after he reads and approves the diff is it merged and deployed">
      <div className="sm-bar">
        <span className="sm-title">agents.parallel</span>
        <span className="sm-live"><i /> 2 agents running</span>
      </div>
      <svg className="sm-svg" viewBox="-12 6 760 486" aria-hidden="true">
        {LINKS.map(([a, b], i) => (
          <path key={i} id={`sm-l${i}`} className={`sm-link${BY[b].kind === 'mcp' ? ' mcp' : ''}`} d={path(BY[a], BY[b])} />
        ))}
        <path id="sm-loop" className="sm-link loop" d={LOOP} />
        <path id="sm-fix1" className="sm-link fix" d={FIX_CLAUDE} />
        <text className="sm-loop-t" x="640" y="30" textAnchor="middle">↩ every diff read by me</text>
        <text className="sm-fix-t" x="40" y="300" textAnchor="middle">changes</text>
        <text className="sm-fix-t" x="40" y="314" textAnchor="middle">requested</text>

        {LINKS.map(([, , kind, delay], i) => (
          <circle key={i} className={`sm-pulse ${kind}`} r="3.4">
            <animateMotion dur={kind === 'side' ? '1.6s' : '2.2s'} begin={`${delay}s`} repeatCount="indefinite">
              <mpath href={`#sm-l${i}`} />
            </animateMotion>
          </circle>
        ))}
        <circle className="sm-pulse loop" r="4">
          <animateMotion dur="3.2s" begin="2.2s" repeatCount="indefinite"><mpath href="#sm-loop" /></animateMotion>
        </circle>
        <circle className="sm-pulse fix" r="3.4">
          <animateMotion dur="3s" begin="2.6s" repeatCount="indefinite"><mpath href="#sm-fix1" /></animateMotion>
        </circle>

        {NODES.map(n => (
          <g key={n.id} transform={`translate(${n.x - n.w / 2} ${n.y - n.h / 2})`}>
            <g
              className={`sm-node ${n.kind}${hover?.id === n.id ? ' on' : ''}`}
              onPointerEnter={() => setHover(n)}
              onPointerLeave={() => setHover(null)}
            >
              <rect width={n.w} height={n.h} rx={n.kind === 'me' || n.kind === 'pr' || n.kind === 'merged' ? n.h / 2 : 11} />
              <text className="sm-l" x={n.w / 2} y={n.sub ? n.h / 2 - 2 : n.h / 2 + 5}>{n.label}</text>
              {n.sub && <text className="sm-s" x={n.w / 2} y={n.h / 2 + 13}>{n.sub}</text>}
            </g>
          </g>
        ))}
      </svg>
      <p className="sm-note">
        {hover
          ? <><b>{hover.label}</b> — {hover.note}</>
          : <span key={line} className="sm-log"><em className={who}>{who}</em> {text}</span>}
      </p>
    </div>
  );
}
