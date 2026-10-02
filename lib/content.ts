// Everything on the site comes from the résumé. Employer work is described by problem and role only.

export const PROFILE = {
  name: 'Bubalan S',
  title: 'Full Stack Developer',
  company: 'Predigle',
  location: 'Coimbatore, IN',
  email: 'bubalan28@gmail.com',
  pitchStrong: 'I build products end to end',
  pitchRest: ' — the data model, the API, the interface and the release that ships it.',
  links: [
    { label: 'linkedin', href: 'https://www.linkedin.com/in/bubalans' },
    { label: 'github', href: 'https://github.com/Bubalan0203' },
    { label: 'leetcode', href: 'https://leetcode.com/u/Bubalan_Shanmuga_sundaram/' },
    { label: 'portfolio v1', href: 'https://bubalan.netlify.app/' },
  ],
};

export const NAV = ['about', 'work', 'stack', 'agents', 'impact', 'projects', 'contact'] as const;

export const ROLES = [
  'Full-stack developer',
  'Dashboards in React & Angular',
  'REST APIs in Django & Node',
  'Auth, roles & zero-downtime releases',
  'Component libraries that last',
];

export type TermLine = { cmd: string } | { out: [string, string][]; wait?: number };

export const HERO_TERM: TermLine[] = [
  { cmd: 'whoami' },
  { out: [['bubalan s', 'c'], [' — full stack developer @ predigle', 'd']] },
  { cmd: 'git log --oneline --reverse' },
  { out: [['a1f3c02 ', 'a'], ['2024 tia it wing — react component library, ui cycles −35%', '']] },
  { out: [['7a3e91f ', 'a'], ['2024 promoted to full-time · led a 4-dev team', '']] },
  { out: [['c41e0b8 ', 'a'], ['2024 create digital — 5+ client websites shipped', '']] },
  { out: [['HEAD    ', 'g'], ['2025 predigle — dashboards, apis, auth, zero-downtime deploys', '']] },
  { cmd: 'cat now.txt' },
  { out: [['building products end to end: data model → api → interface → release.', 'c']] },
];

export const AI_TERM: TermLine[] = [
  { cmd: 'agent run --spec specs/table-filters.md' },
  { out: [['◆ ', 'p'], ['reading spec · 3 acceptance criteria', '']] },
  { out: [['◆ ', 'p'], ['orchestrator: split into 4 parallel tasks', '']] },
  { out: [['  ├─ explore    ', 'a'], ['mapped 6 files, found the shared table', 'd']] },
  { out: [['  ├─ implement  ', 'a'], ['role-aware filter chips + query params', 'd']] },
  { out: [['  ├─ test       ', 'a'], ['12 cases · ', 'd'], ['12 passed', 'g']] },
  { out: [['  └─ review     ', 'a'], ['1 note: debounce search input → fixed', 'd']] },
  { out: [['◆ ', 'p'], ['opened PR "feat(table): role-aware filters"', 'c']] },
  { out: [['→ waiting for human review', 'g']] },
];

export const ABOUT_TEXT =
  "I'm Bubalan, a full-stack developer finishing an integrated M.Sc. in Software Systems at Coimbatore Institute of Technology. I like owning a feature the whole way: shaping the data, writing the API, building the screen and shipping it without taking anything down. Today I do that at Predigle, on dashboards, services and access control for enterprise workflows. Before that I led a four-person team through four deployments, and built client websites on the side.";

export const ABOUT_FACTS = [
  { big: '450+', small: 'DSA problems solved (LeetCode + GFG)' },
  { big: 'Top 6', small: 'of 45+ teams · SensAI Hackathon' },
  { big: '5+', small: 'freelance projects, 5★, zero extensions' },
];

export const CERTS = ['Web Developer Bootcamp — Udemy', 'Developing Front-End Apps with React — Coursera'];

export const TIMELINE = [
  { date: 'Dec 2025', role: 'Full Stack Developer', sub: '(Full-Time Intern)', note: 'Joined to build across interface, services and deployment.' },
  { date: 'Present', role: 'Dashboards · APIs · Auth & releases', note: 'The three problem areas below.' },
  { date: 'Next', placeholder: '[ADD: promotion / title change, if any]' },
];

export type Story = { id: string; tag: string; short: string; title: string; problem: string; did: string; role: string; scene: 'flow' | 'sync' | 'access'; sceneLabel: string };

export const STORIES: Story[] = [
  {
    id: 'story-1', tag: 'interface', short: 'Dashboards teams act on', title: 'Dashboards teams can act on',
    problem: 'Enterprise teams run their day through workflow screens. When each view is built on its own, new screens are slow to ship and never quite consistent.',
    did: 'Built dashboards in AngularJS and React from reusable components, so new workflow views are assembled from shared pieces instead of written from scratch.',
    role: 'Core contributor', scene: 'flow', sceneLabel: 'illustrative · item moving through workflow stages',
  },
  {
    id: 'story-2', tag: 'services', short: 'APIs that hold up', title: 'APIs that hold up under real use',
    problem: 'A dashboard is only as good as the services behind it. Slow or fragile endpoints make every screen feel broken, however good the interface is.',
    did: 'Developed REST APIs in Django and Node.js, improving the performance and reliability of the services the interfaces depend on.',
    role: 'Core contributor', scene: 'sync', sceneLabel: 'illustrative · interface and service staying in sync',
  },
  {
    id: 'story-3', tag: 'access & release', short: 'Secure access, quiet releases', title: 'Secure access, releases nobody notices',
    problem: 'Enterprise users should only see what their role allows, and a release should never interrupt someone in the middle of their work.',
    did: 'Implemented secure authentication and role-based access, and shipped production releases with zero-downtime deployments.',
    role: 'Core contributor', scene: 'access', sceneLabel: 'illustrative · masked sign-in, role check, traffic switch',
  },
];

export type Bullet = { problem: string; did: string; role: string };
export type Commit = {
  hash: string; ref: string; company: string; meta: string; summary: string; small?: boolean; amber?: boolean;
  big?: { value: string; label: string }; link?: { label: string; href: string };
  roles?: { title: string; dates: string; promo?: boolean; bullets: Bullet[] }[];
  bullets?: Bullet[];
};

export const EARLIER: Commit[] = [
  {
    hash: '0c1t2021', ref: '(tag: init)', company: 'CIT', meta: '2021 – present · Coimbatore', small: true, amber: true,
    summary: 'Started the integrated M.Sc. in Software Systems — five years of building, systems design and project work.',
    big: { value: '8.22', label: 'CGPA' },
  },
  {
    hash: '7a3e91f', ref: '(promoted: part-time → full-time)', company: 'TIA IT Wing', meta: 'Feb 2024 – Nov 2024 · 8 months',
    summary: 'Internal workflow tools, the shared UI foundation under them, and the APIs behind them.',
    roles: [
      {
        title: 'Full Stack Developer (Full-Time Intern)', dates: 'Jul – Nov 2024', promo: true,
        bullets: [
          { problem: 'Staff lost hours to manual form handling', did: 'streamlined the form workflows, cutting processing time by 60%', role: 'builder' },
          { problem: 'The backend had to scale and stay secure', did: 'deployed JWT-secured APIs on cloud servers', role: 'builder' },
          { problem: 'Screens showed stale data', did: 'connected dynamic interfaces to REST APIs for real-time updates', role: 'builder' },
          { problem: 'A small team needed direction', did: 'led a 4-member dev team through 4 deployments', role: 'team lead' },
        ],
      },
      {
        title: 'Full Stack Developer (Part-Time Intern)', dates: 'Feb – Jun 2024',
        bullets: [
          { problem: 'UI was rebuilt for every screen', did: 'built a reusable React component library, cutting UI development cycles by 35%', role: 'builder' },
          { problem: 'Front and back end drifted from the brief', did: 'gathered and analysed requirements so data flowed correctly end to end', role: 'analyst' },
          { problem: 'Data handling was heavy', did: 'wrote complex MongoDB queries and optimised data handling', role: 'contributor' },
        ],
      },
    ],
  },
  {
    hash: 'c41e0b8', ref: '(freelance)', company: 'Create Digital Solution', meta: 'Full Stack Developer (Part-Time) · Dec 2024 – May 2025',
    summary: 'Client websites, taken from brand brief to a fast, mobile-friendly launch.',
    bullets: [
      { problem: 'Clients needed on-brand sites that met real requirements', did: 'built 5+ responsive websites in React and Bootstrap', role: 'developer' },
      { problem: 'Visitor enquiries were slow to reach the business', did: 'wired real-time contact forms to an email service', role: 'developer' },
      { problem: 'Visitors left slow, clumsy pages', did: 'delivered mobile-friendly interfaces with fast loads and smooth navigation', role: 'developer' },
    ],
  },
  {
    hash: 'HEAD', ref: '→ main', company: 'Predigle', meta: 'Dec 2025 – present', small: true, amber: true,
    summary: 'Where the log continues: dashboards, APIs, auth and releases.',
    link: { label: 'git checkout predigle', href: '#work' },
  },
];

export const HOW = [
  { icon: 'spec', title: 'Spec first', body: 'Before any prompt, I write what done looks like: the problem, the data, the edge cases. Agents build against', code: 'spec.md', tail: ', not a vibe.' },
  { icon: 'layers', title: 'Skills as team standards', body: 'Conventions live in reusable skills — how we name, test and structure code — so every agent follows the same rules a teammate would.' },
  { icon: 'plug', title: 'Real tools via MCP', body: 'Agents read the actual repo, docs and tickets through MCP connections instead of me pasting context in by hand.' },
  { icon: 'fork', title: 'Parallel subagents', body: 'Explore, implement, test and review run side by side, each with a narrow job, and report back to one orchestrator.' },
  { icon: 'db', title: 'Persistent memory', body: 'Decisions, gotchas and project context are written down once and carried between sessions, so nothing is re-learned from zero.' },
  { icon: 'shield', title: 'Verify everything', body: "Generated code gets the same bar as mine: it runs, it's tested, and I read the diff before it becomes a PR." },
] as const;

export const STATS = [
  { n: 60, suffix: '%', label: 'less manual form-processing time after streamlining workflows', src: 'TIA IT Wing' },
  { n: 35, suffix: '%', label: 'shorter UI development cycles from a reusable component library', src: 'TIA IT Wing' },
  { n: 5, suffix: '+', label: 'responsive client websites shipped', src: 'Create Digital Solution' },
  { n: 4, suffix: '×', label: 'deployments managed while leading a 4-member dev team', src: 'TIA IT Wing · 8 months' },
  { n: 450, suffix: '+', label: 'DSA problems solved', src: 'LeetCode + GFG' },
  { n: 6, pre: '#', suffix: '/45+', label: 'top-6 finalist among 45+ teams', src: 'SensAI Hackathon' },
];

export const LAYERS = [
  { key: 'problem', text: 'Problem — requirements, gathered & analysed' },
  { key: 'data model', text: 'Data model — MongoDB & MySQL' },
  { key: 'api', text: 'API — REST in Django, Node & Express' },
  { key: 'integrations', text: 'Integrations — email, payments, auth services' },
  { key: 'interface', text: 'Interface — React & Angular dashboards' },
  { key: 'access', text: 'Access — JWT auth, role-based access' },
  { key: 'release', text: 'Release — cloud deploys, zero downtime' },
];

export type Project = { kind: string; badge: string; name: string; sub: string; bullets: string[]; tags: string[]; vis: 'codecraft' | 'roomz' | 'paygate' };

export const PROJECTS: Project[] = [
  {
    kind: '01 · ai product', badge: 'solo build', name: 'CodeCraft', sub: 'AI-powered no-code UI builder', vis: 'codecraft',
    bullets: [
      'Describing a UI is faster than coding it → built an AI platform that turns natural-language prompts into production-ready frontend code.',
      'Generations cost money → metered access with credits using Razorpay and Firebase Auth; 100+ code generations sold.',
      'Iterating was slow → real-time previews and one-click Netlify deploys cut development time by 50%.',
    ],
    tags: ['React', 'OpenAI', 'Firebase', 'Razorpay'],
  },
  {
    kind: '02 · cross-platform', badge: 'client brief', name: 'Roomz', sub: 'Room booking system', vis: 'roomz',
    bullets: [
      'One booking system had to run everywhere → built it for web, mobile and desktop from one codebase family.',
      'The client needed real operations → room management, bookings and live active-room tracking, all to spec.',
      'Owners needed oversight → a management interface for rooms, bookings, payments and analytics.',
    ],
    tags: ['React.js', 'React Native', 'Electron.js', 'Firebase'],
  },
  {
    kind: '03 · fintech prototype', badge: 'security-first', name: 'Paygate', sub: 'Secure payment gateway (prototype)', vis: 'paygate',
    bullets: [
      'Customers, merchants and banks need a trusted middle → prototyped a gateway for secure transactions between all three.',
      'Onboarding, settlements and refunds need oversight → admin approval workflows backed by KYC verification.',
      'Payments must be authorised and private → multi-bank UPI with OTP authorisation and AES-256-GCM encrypted communication.',
    ],
    tags: ['MERN', 'JWT', 'AES-256-GCM'],
  },
];

export const TAPE_WORDS = ['Dashboards', 'REST APIs', 'Auth & roles', 'Zero-downtime releases', 'Component libraries'];
export const TAPE_STACK = ['react', 'angularjs', 'node.js', 'express', 'django', 'python', 'mongodb', 'mysql', 'firebase', 'aws', 'git', 'postman', 'html', 'css', 'bootstrap', 'javascript'];
