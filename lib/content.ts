// Everything on the site comes from the résumé. Employer work is described by problem and role only.

export const PROFILE = {
  name: 'Bubalan S',
  title: 'Product Engineer',
  company: 'Predigle',
  location: 'Coimbatore, IN',
  email: 'bubalan28@gmail.com',
  resume: '/Bubalan_S_Resume.pdf',
  pitchStrong: 'I build products end to end',
  pitchRest: ' — the data model, the API, the interface and the release that ships it.',
  links: [
    { label: 'linkedin', href: 'https://www.linkedin.com/in/bubalans' },
    { label: 'github', href: 'https://github.com/Bubalan0203' },
    { label: 'leetcode', href: 'https://leetcode.com/u/Bubalan_Shanmuga_sundaram/' },
  ],
};

export const ABOUT_FACTS = [
  { big: '450+', small: 'DSA problems solved across LeetCode and GeeksforGeeks' },
  { big: 'Top 6', small: 'of 45+ teams · SensAI Hackathon' },
];

export const CERTS = ['Web Developer Bootcamp — Udemy', 'Developing Front-End Apps with React — Coursera'];

export type Story = { id: string; tag: string; short: string; title: string; problem: string; did: string; role: string; scene: 'flow' | 'sync' | 'access' | 'shield'; sceneLabel: string };

export const STORIES: Story[] = [
  {
    id: 'story-1', tag: 'roles & flows', short: 'Role-based clinic flows', title: 'Role-based flows for a whole clinic',
    problem: 'A hospital or clinic runs on many roles at once: doctors, front desk, office staff and admins. Each one needs its own screens and permissions inside the same healthcare application.',
    did: 'Built role-based flows across many features of healthcare assist applications, so every role, from doctor to front desk, works through the steps meant for it and the clinic can manage every product in one place.',
    role: 'Product engineer', scene: 'sync', sceneLabel: 'illustrative · one application, many clinic roles',
  },
  {
    id: 'story-2', tag: 'ai · documents', short: 'Document extraction agent', title: 'Extracting healthcare documents accurately',
    problem: 'Healthcare data arrives in documents. Every field has to land under the right key, because a wrong value in a patient record is not a small bug.',
    did: 'Worked on a document extraction agent for healthcare applications that pulls document data into the right keys, with high validation and confidence checks before anything is saved.',
    role: 'Product engineer', scene: 'flow', sceneLabel: 'illustrative · document moving through extraction',
  },
  {
    id: 'story-3', tag: 'full stack', short: 'Features end to end', title: 'Healthcare features, end to end',
    problem: 'Each healthcare use case cuts through every layer: a new screen, the API behind it and the data it reads and writes.',
    did: 'Worked across the front end and back end, taking many healthcare use cases from requirement to a complete end-to-end flow in production.',
    role: 'Product engineer', scene: 'access', sceneLabel: 'illustrative · interface, service and data',
  },
  {
    id: 'story-4', tag: 'compliance', short: 'HIPAA & PHI by default', title: 'Built for HIPAA and PHI from day one',
    problem: 'Healthcare assist applications hold protected health information. One careless log line or open endpoint is a compliance breach, not just a bug.',
    did: 'Worked closely on healthcare assist applications under HIPAA compliance and PHI handling rules, so patient data stays protected in every feature I ship.',
    role: 'Product engineer', scene: 'shield', sceneLabel: 'illustrative · patient data guarded by rules',
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
    hash: '0c1t2021', ref: '(tag: init)', company: 'CIT', meta: '2021 – May 2026 · Coimbatore', small: true, amber: true,
    summary: 'Completed the five-year integrated M.Sc. in Software Systems — years of building, systems design and project work.',
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
    hash: 'c41e0b8', ref: '(part-time)', company: 'Create Digital Solution', meta: 'Full Stack Developer (Part-Time) · Dec 2024 – May 2025',
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

export type Project = { kind: string; badge: string; name: string; sub: string; bullets: string[]; tags: string[]; facts: [string, string][]; vis: 'codecraft' | 'roomz' | 'paygate' };

export const PROJECTS: Project[] = [
  {
    kind: '01 · ai product', badge: 'solo build', name: 'CodeCraft', sub: 'AI-powered no-code UI builder', vis: 'codecraft',
    bullets: [
      'Describing a UI is faster than coding it → built an AI platform that turns natural-language prompts into production-ready frontend code.',
      'Generations cost money → metered access with credits using Razorpay and Firebase Auth; 100+ code generations sold.',
      'Iterating was slow → real-time previews and one-click Netlify deploys cut development time by 50%.',
    ],
    tags: ['React', 'OpenAI', 'Firebase', 'Razorpay'],
    facts: [['100+', 'paid generations'], ['50%', 'less build time']],
  },
  {
    kind: '02 · fintech prototype', badge: 'security-first', name: 'Paygate', sub: 'Secure payment gateway (prototype)', vis: 'paygate',
    bullets: [
      'Customers, merchants and banks need a trusted middle → prototyped a gateway for secure transactions between all three.',
      'Onboarding, settlements and refunds need oversight → admin approval workflows backed by KYC verification.',
      'Payments must be authorised and private → multi-bank UPI with OTP authorisation and AES-256-GCM encrypted communication.',
    ],
    tags: ['MERN', 'JWT', 'AES-256-GCM'],
    facts: [['3', 'parties: customer, merchant, bank'], ['UPI + OTP', 'payment authorisation']],
  },
  {
    kind: '03 · cross-platform', badge: 'client brief', name: 'Roomz', sub: 'Room booking system', vis: 'roomz',
    bullets: [
      'One booking system had to run everywhere → built it for web, mobile and desktop from one codebase family.',
      'The client needed real operations → room management, bookings and live active-room tracking, all to spec.',
      'Owners needed oversight → a management interface for rooms, bookings, payments and analytics.',
    ],
    tags: ['React.js', 'React Native', 'Electron.js', 'Firebase'],
    facts: [['3', 'platforms: web, mobile, desktop'], ['Live', 'active-room tracking']],
  },
];
