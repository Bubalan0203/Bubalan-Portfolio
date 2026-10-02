// Offline, keyword-matched answers for the ⌘K box. Not an LLM.
export type KBEntry = { k: string[]; a: string; src: string };

export const KB: KBEntry[] = [
  { k: ['who', 'about', 'yourself', 'intro', 'introduce', 'bubalan', 'name', 'summary', 'you'], src: '~/about.md',
    a: "I'm Bubalan S, a full-stack developer at Predigle. I'm finishing an integrated M.Sc. in Software Systems at Coimbatore Institute of Technology (CGPA 8.22). I build products end to end: the data model, the API, the interface and the release that ships it." },
  { k: ['predigle', 'current', 'now', 'job', 'today', 'present', 'company', 'work', 'role', 'doing'], src: '~/work/predigle.md',
    a: "Since Dec 2025 I've been a Full Stack Developer (Full-Time Intern) at Predigle, which builds software for enterprise teams. I work on three things: dashboards in AngularJS and React built from reusable components, REST APIs in Django and Node.js tuned for performance and reliability, and secure authentication, role-based access and zero-downtime production deployments." },
  { k: ['experience', 'earlier', 'previous', 'before', 'history', 'career', 'tia', 'intern', 'internship', 'jobs'], src: '~/work/earlier.log',
    a: "Before Predigle:\n• TIA IT Wing, Feb–Nov 2024. I started as a part-time intern and was promoted to full-time. I built a reusable React component library (UI cycles cut by 35%), streamlined form workflows (manual processing cut by 60%), deployed JWT-secured APIs on cloud servers, and led a 4-member team through 4 deployments.\n• Create Digital Solution, Dec 2024–May 2025, part-time. I shipped 5+ responsive client websites in React and Bootstrap, with real-time contact forms and mobile-friendly interfaces." },
  { k: ['create', 'digital', 'freelance', 'websites', 'clients', 'client', 'site'], src: '~/work/earlier.log',
    a: "At Create Digital Solution (Dec 2024–May 2025, part-time) I built 5+ responsive websites in React and Bootstrap to each client's brand and requirements. I also wired real-time contact forms to an email service and delivered fast, mobile-friendly interfaces. Separately, I've completed 5+ freelance projects with 5-star ratings and zero deadline extensions." },
  { k: ['skills', 'stack', 'tech', 'technologies', 'tools', 'languages', 'know'], src: '~/stack.json',
    a: "Languages: Python, JavaScript.\nInterfaces: React (web and native), AngularJS, HTML, CSS, Bootstrap.\nServices and data: Node.js, Express.js, Django, MongoDB, MySQL, Postman.\nPlatform: Firebase, AWS, Git.\nAI: the OpenAI API and prompt engineering." },
  { k: ['react', 'angular', 'angularjs', 'frontend', 'front', 'ui', 'interface', 'dashboard', 'dashboards', 'component', 'bootstrap', 'css', 'html'], src: '~/work/predigle.md',
    a: "Most of my frontend work is in React (web and native) and AngularJS. At Predigle I build enterprise dashboards from reusable components. At TIA IT Wing I built a reusable React component library that cut UI development cycles by 35%." },
  { k: ['backend', 'api', 'apis', 'rest', 'django', 'node', 'express', 'server', 'python', 'services'], src: '~/work/predigle.md',
    a: "I write REST APIs in Django, Node.js and Express. At Predigle they power the dashboards, and I've focused on performance and reliability. At TIA IT Wing I deployed JWT-secured APIs on cloud servers and connected dynamic interfaces to them for real-time updates." },
  { k: ['database', 'data', 'mongodb', 'mongo', 'mysql', 'sql', 'query', 'queries', 'schema'], src: '~/stack.json',
    a: "I work with MongoDB and MySQL. At TIA IT Wing I wrote complex MongoDB queries and optimised data handling, and gathered requirements so data flowed correctly between front end and back end." },
  { k: ['deploy', 'deployment', 'deployments', 'aws', 'cloud', 'devops', 'release', 'downtime', 'firebase', 'hosting'], src: '~/work/predigle.md',
    a: "At Predigle I ship production releases with zero-downtime deployments. At TIA IT Wing I deployed JWT-secured APIs on AWS cloud servers and managed 4 deployments while leading the team. For side projects I use Firebase and Netlify." },
  { k: ['auth', 'authentication', 'security', 'secure', 'jwt', 'role', 'roles', 'rbac', 'access', 'permission', 'encryption'], src: '~/work/predigle.md',
    a: "Security shows up throughout my work. At Predigle I build secure authentication and role-based access. At TIA IT Wing I shipped JWT-secured APIs. In Paygate I used OTP authorisation and AES-256-GCM encrypted communication." },
  { k: ['projects', 'project', 'side', 'built', 'portfolio', 'personal'], src: '~/projects/',
    a: "Three side projects:\n• CodeCraft, an AI no-code UI builder (React, OpenAI, Firebase, Razorpay).\n• Roomz, a cross-platform room booking system (React, React Native, Electron, Firebase).\n• Paygate, a secure payment gateway prototype (MERN, JWT, AES-256-GCM).\nThe next one is in development." },
  { k: ['codecraft', 'nocode', 'no-code', 'builder', 'generation', 'razorpay', 'openai'], src: '~/projects/codecraft',
    a: "CodeCraft turns natural-language prompts into production-ready frontend code. I built it with React, OpenAI and Firebase. Credits are metered through Razorpay and Firebase Auth, and 100+ generations have been sold. Real-time previews and one-click Netlify deploys cut development time by 50%." },
  { k: ['roomz', 'room', 'booking', 'electron', 'native', 'mobile', 'desktop', 'cross-platform'], src: '~/projects/roomz',
    a: "Roomz is a room booking system for web, mobile and desktop, built with React, React Native, Electron and Firebase. It covers room management, bookings and live active-room tracking, plus a management interface for rooms, bookings, payments and analytics." },
  { k: ['paygate', 'payment', 'gateway', 'upi', 'kyc', 'otp', 'bank', 'aes', 'fintech'], src: '~/projects/paygate',
    a: "Paygate is a payment gateway prototype for secure transactions between customers, merchants and banks. It has admin approval workflows with KYC for onboarding, settlements and refunds, multi-bank UPI with OTP authorisation, and AES-256-GCM encrypted communication. Built on MERN with JWT." },
  { k: ['ai', 'agent', 'agents', 'agentic', 'llm', 'prompt', 'prompting', 'claude', 'copilot', 'gpt', 'chatgpt', 'subagents', 'mcp'], src: '~/ai/workflow.md',
    a: "I've built on the OpenAI API (CodeCraft), and prompt engineering is one of my focus areas. I code with agents the way I'd work with a team: I write the spec first, keep standards in reusable skills, connect real tools over MCP, run explore/implement/test/review subagents in parallel, keep persistent memory, and review every diff before it becomes a PR. (The specific tool list is still a placeholder on this page.)" },
  { k: ['education', 'degree', 'college', 'university', 'study', 'studying', 'cit', 'coimbatore', 'cgpa', 'gpa', 'msc', 'student'], src: '~/about.md',
    a: "I'm studying for an M.Sc. in Software Systems (Integrated, 2021–present) at Coimbatore Institute of Technology, with a CGPA of 8.22." },
  { k: ['certification', 'certifications', 'certificate', 'course', 'courses', 'udemy', 'coursera'], src: '~/package.json',
    a: "Certifications: Web Developer Bootcamp (Udemy) and Developing Front-End Apps with React (Coursera)." },
  { k: ['achievements', 'achievement', 'leetcode', 'dsa', 'algorithms', 'hackathon', 'award', 'awards', 'sensai', 'competitive', 'problems'], src: '~/impact.csv',
    a: "• 450+ DSA problems solved on LeetCode and GFG.\n• Top-6 finalist among 45+ teams at the SensAI Hackathon.\n• Led a 4-member dev team through 4 deployments.\n• 5+ freelance projects with 5-star ratings and zero deadline extensions." },
  { k: ['lead', 'led', 'leadership', 'team', 'manage', 'managed', 'mentor'], src: '~/work/earlier.log',
    a: "During my 8-month internship at TIA IT Wing I led a 4-member dev team and managed 4 deployments. I was also promoted from part-time to full-time intern there." },
  { k: ['impact', 'numbers', 'metrics', 'results', 'achieved', 'percent'], src: '~/impact.csv',
    a: "From my résumé: 60% less manual form-processing time, 35% shorter UI development cycles, 5+ client websites, 4 deployments led, 450+ DSA problems solved, and a top-6 hackathon finish among 45+ teams. On CodeCraft: 100+ paid generations and 50% less development time." },
  { k: ['contact', 'email', 'mail', 'hire', 'reach', 'linkedin', 'github', 'connect', 'talk', 'available'], src: '~/contact.sh',
    a: "Email is best: bubalan28@gmail.com. I'm also on LinkedIn (linkedin.com/in/bubalans), GitHub (github.com/Bubalan0203) and LeetCode." },
  { k: ['where', 'location', 'based', 'live', 'city', 'india', 'timezone'], src: '~/contact.sh',
    a: "I'm in Coimbatore, India, on IST (UTC+5:30)." }
];
const STOP = new Set<string>('a an the is are was were do does did you your i me my to of in on for and or at with what whats how tell about can could would should have has any which who please'.split(' '));
const norm = (w: string) => w.replace(/(ing|ed|es|s)$/, '');
const toks = (q: string) => q.toLowerCase().replace(/[^a-z0-9+\-\s]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w));
export function answer(q: string): { a: string; src: string } | null {
  const qt = toks(q);
  if (!qt.length) return null;
  let best: KBEntry | null = null, bs = 0;
  for (const e of KB) {
    let s = 0;
    qt.forEach(t => { const nt = norm(t); if (e.k.some(k => k === t || norm(k) === nt || (nt.length > 3 && (k.startsWith(nt) || nt.startsWith(norm(k)) && norm(k).length > 3)))) s += 1 + Math.min(t.length, 8) / 10; });
    if (s > bs) { bs = s; best = e; }
  }
  if (best) return best;
  // fallback: search page text
  const blocks = [...document.querySelectorAll<HTMLElement>('main p, main li, main dd, main h4')].map(el => ({ el, t: (el.textContent || '').replace(/\s+/g, ' ').trim() })).filter(b => b.t.length > 30);
  let fb: { el: HTMLElement; t: string } | null = null, fs = 0;
  for (const b of blocks) { const lt = b.t.toLowerCase(); let s = 0; qt.forEach(t => { if (t.length > 2 && lt.includes(norm(t))) s++; }); if (s > fs) { fs = s; fb = b; } }
  if (fb) { const sec = fb.el.closest<HTMLElement>('section[data-path]'); return { a: fb.t, src: sec?.dataset.path || '~/' }; }
  return null;
}
