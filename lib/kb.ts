// Offline answers for the ⌘K box: small-talk intents, then fuzzy topic matching over the résumé, then page text.
export type KBEntry = { k: string[]; a: string; src: string; next?: string[] };

export const KB: KBEntry[] = [
  { k: ['who', 'about', 'yourself', 'intro', 'introduce', 'bubalan', 'name', 'summary', 'you'], src: '~/about.md',
    a: "I'm Bubalan S, an Associate Product Engineer at Predigle. I completed an integrated M.Sc. in Software Systems at Coimbatore Institute of Technology in May 2026 (CGPA 8.22). I build products end to end: the data model, the API, the interface and the release that ships it." },
  { k: ['healthcare', 'health', 'hospital', 'clinic', 'doctor', 'hipaa', 'phi', 'medical', 'patient', 'extraction', 'document', 'documents'], src: '~/work/predigle.md',
    a: "At Predigle I work on healthcare assist applications for clinics and hospitals:\n• Role-based flows for doctors, front desk, office staff and admins across many features.\n• A document extraction agent that maps healthcare documents into the right keys, with high validation and confidence checks.\n• Healthcare use cases taken end to end across front end and back end.\n• Everything built under HIPAA compliance and PHI handling rules." },
  { k: ['predigle', 'current', 'now', 'job', 'today', 'present', 'company', 'work', 'role', 'doing'], src: '~/work/predigle.md',
    a: "I joined Predigle in Dec 2025 as a Software Developer Intern and since May 2026 I've been an Associate Product Engineer at Predigle, working on healthcare assist applications. Now: role-based flows for clinic roles (doctor, front desk, office, admin), a document extraction agent that maps healthcare documents to the right keys with high validation, healthcare features end to end across front end and back end, and HIPAA and PHI compliance. As an intern I built dashboards in AngularJS and React, REST APIs in Django and Node.js, secure auth with role-based access, and zero-downtime releases." },
  { k: ['experience', 'earlier', 'previous', 'before', 'history', 'career', 'tia', 'intern', 'internship', 'jobs'], src: '~/work/earlier.log',
    a: "Before Predigle:\n• TIA IT Wing, Feb–Nov 2024. I started as a part-time intern and was promoted to full-time. I built a reusable React component library (UI cycles cut by 35%), streamlined form workflows (manual processing cut by 60%), deployed JWT-secured APIs on cloud servers, and led a 4-member team through 4 deployments.\n• Create Digital Solution, Dec 2024–May 2025, part-time. I shipped 5+ responsive client websites in React and Bootstrap, with real-time contact forms and mobile-friendly interfaces." },
  { k: ['create', 'digital', 'websites', 'clients', 'client', 'site'], src: '~/work/earlier.log',
    a: "At Create Digital Solution (Dec 2024–May 2025, part-time) I built 5+ responsive websites in React and Bootstrap to each client's brand and requirements. I also wired real-time contact forms to an email service and delivered fast, mobile-friendly interfaces." },
  { k: ['skills', 'stack', 'tech', 'technologies', 'tools', 'languages', 'know'], src: '~/stack.json',
    a: "Languages: Python, JavaScript.\nInterfaces: React (web and native), AngularJS, HTML, CSS, Bootstrap.\nServices and data: Node.js, Express.js, Django, MongoDB, MySQL, Postman.\nPlatform: Firebase, AWS, Git.\nAI: the OpenAI API and prompt engineering." },
  { k: ['react', 'angular', 'angularjs', 'frontend', 'front', 'ui', 'interface', 'dashboard', 'dashboards', 'component', 'bootstrap', 'css', 'html'], src: '~/work/predigle.md',
    a: "Most of my frontend work is in React (web and native) and AngularJS. As a Predigle intern I built dashboards from reusable components. At TIA IT Wing I built a reusable React component library that cut UI development cycles by 35%." },
  { k: ['backend', 'api', 'apis', 'rest', 'django', 'node', 'express', 'server', 'python', 'services'], src: '~/work/predigle.md',
    a: "I write REST APIs in Django, Node.js and Express. At Predigle I work across front end and back end on healthcare features; as an intern I focused on performance and reliability. At TIA IT Wing I deployed JWT-secured APIs on cloud servers and connected dynamic interfaces to them for real-time updates." },
  { k: ['database', 'data', 'mongodb', 'mongo', 'mysql', 'sql', 'query', 'queries', 'schema'], src: '~/stack.json',
    a: "I work with MongoDB and MySQL. At TIA IT Wing I wrote complex MongoDB queries and optimised data handling, and gathered requirements so data flowed correctly between front end and back end." },
  { k: ['deploy', 'deployment', 'deployments', 'aws', 'cloud', 'devops', 'release', 'downtime', 'firebase', 'hosting'], src: '~/work/predigle.md',
    a: "As a Predigle intern I shipped production releases with zero-downtime deployments. At TIA IT Wing I deployed JWT-secured APIs on AWS cloud servers and managed 4 deployments while leading the team. For side projects I use Firebase and Netlify." },
  { k: ['auth', 'authentication', 'security', 'secure', 'jwt', 'role', 'roles', 'rbac', 'access', 'permission', 'encryption'], src: '~/work/predigle.md',
    a: "Security shows up throughout my work. At Predigle I build role-based flows for clinic roles under HIPAA and PHI rules, and as an intern I built secure authentication and role-based access. At TIA IT Wing I shipped JWT-secured APIs. In Paygate I used OTP authorisation and AES-256-GCM encrypted communication." },
  { k: ['projects', 'project', 'side', 'built', 'portfolio', 'personal'], src: '~/projects/',
    a: "Three side projects:\n• CodeCraft, an AI no-code UI builder (React, OpenAI, Firebase, Razorpay).\n• Paygate, a secure payment gateway prototype (MERN, JWT, AES-256-GCM).\n• Roomz, a cross-platform room booking system (React, React Native, Electron, Firebase)." },
  { k: ['codecraft', 'nocode', 'no-code', 'builder', 'generation', 'razorpay', 'openai'], src: '~/projects/codecraft',
    a: "CodeCraft turns natural-language prompts into production-ready frontend code. I built it with React, OpenAI and Firebase. Credits are metered through Razorpay and Firebase Auth, and 100+ generations have been sold. Real-time previews and one-click Netlify deploys cut development time by 50%." },
  { k: ['roomz', 'room', 'booking', 'electron', 'native', 'mobile', 'desktop', 'cross-platform'], src: '~/projects/roomz',
    a: "Roomz is a room booking system for web, mobile and desktop, built with React, React Native, Electron and Firebase. It covers room management, bookings and live active-room tracking, plus a management interface for rooms, bookings, payments and analytics." },
  { k: ['paygate', 'payment', 'gateway', 'upi', 'kyc', 'otp', 'bank', 'aes', 'fintech'], src: '~/projects/paygate',
    a: "Paygate is a payment gateway prototype for secure transactions between customers, merchants and banks. It has admin approval workflows with KYC for onboarding, settlements and refunds, multi-bank UPI with OTP authorisation, and AES-256-GCM encrypted communication. Built on MERN with JWT." },
  { k: ['ai', 'agent', 'agents', 'agentic', 'llm', 'prompt', 'prompting', 'claude', 'copilot', 'gpt', 'chatgpt', 'subagents', 'mcp'], src: '~/ai/workflow.md',
    a: "I've built on the OpenAI API (CodeCraft), and prompt engineering is one of my focus areas. I code with agents the way I'd work with a team: I write the spec first, keep standards in reusable skills, connect real tools over MCP, run explore/implement/test/review subagents in parallel, keep persistent memory, and review every diff before it becomes a PR." },
  { k: ['education', 'degree', 'college', 'university', 'study', 'studying', 'cit', 'coimbatore', 'cgpa', 'gpa', 'msc', 'student'], src: '~/about.md',
    a: "I completed a five-year integrated M.Sc. in Software Systems at Coimbatore Institute of Technology (2021–May 2026) with a CGPA of 8.22." },
  { k: ['certification', 'certifications', 'certificate', 'course', 'courses', 'udemy', 'coursera'], src: '~/package.json',
    a: "Certifications: Web Developer Bootcamp (Udemy) and Developing Front-End Apps with React (Coursera)." },
  { k: ['achievements', 'achievement', 'leetcode', 'dsa', 'algorithms', 'hackathon', 'award', 'awards', 'sensai', 'competitive', 'problems'], src: '~/impact.csv',
    a: "• 450+ DSA problems solved on LeetCode and GFG.\n• Top-6 finalist among 45+ teams at the SensAI Hackathon.\n• Led a 4-member dev team through 4 deployments." },
  { k: ['lead', 'led', 'leadership', 'team', 'manage', 'managed', 'mentor'], src: '~/work/earlier.log',
    a: "During my 8-month internship at TIA IT Wing I led a 4-member dev team and managed 4 deployments. I was also promoted from part-time to full-time intern there." },
  { k: ['impact', 'numbers', 'metrics', 'results', 'achieved', 'percent'], src: '~/impact.csv',
    a: "From my résumé: 60% less manual form-processing time, 35% shorter UI development cycles, 5+ client websites, 4 deployments led, 450+ DSA problems solved, and a top-6 hackathon finish among 45+ teams. On CodeCraft: 100+ paid generations and 50% less development time." },
  { k: ['contact', 'email', 'mail', 'hire', 'hiring', 'freelance', 'freelancer', 'opportunity', 'collaborate', 'phone', 'number', 'reach', 'linkedin', 'github', 'connect', 'talk', 'available'], src: '~/contact.sh',
    a: "I'm open to projects and freelance work. Email is best: bubalan28@gmail.com. I'm also on LinkedIn (linkedin.com/in/bubalans), GitHub (github.com/Bubalan0203) and LeetCode." },
  { k: ['where', 'location', 'based', 'live', 'city', 'india', 'timezone'], src: '~/contact.sh',
    a: "I'm in Coimbatore, India, on IST (UTC+5:30)." }
];
const STOP = new Set<string>('a an the is are was were do does did you your i me my to of in on for and or at with what whats how tell about can could would should have has any which who please he him his bubalan s it its this that be am so some more give know want'.split(' '));
const norm = (w: string) => w.replace(/(ing|ed|es|s)$/, '');
const toks = (q: string) => q.toLowerCase().replace(/[^a-z0-9+\-\s]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w));

// edit distance, so "projetcs" or "expirience" still land
function lev(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0]; d[0] = i;
    for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; }
  }
  return d[b.length];
}
// broad words count for less, so "hipaa experience" lands on hipaa, not on the experience log
const GENERIC = new Set(['experience', 'work', 'job', 'role', 'skills', 'about', 'doing', 'know', 'built', 'tech', 'data']);
const near = (t: string, k: string) => {
  if (k === t) return 1;
  const nt = norm(t), nk = norm(k);
  if (nt === nk) return 1;
  if (nt.length > 3 && nk.length > 3 && (nk.startsWith(nt) || nt.startsWith(nk))) return .8;
  if (t.length >= 4 && lev(t, k) <= (t.length >= 7 ? 2 : 1)) return .7;
  return 0;
};

// conversational intents, checked on the raw question before topics
const RAW = (q: string) => ' ' + q.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
const INTENTS: { re: RegExp; a: string; next?: string[] }[] = [
  { re: / (fuck\w*|f+k|shit|bitch|bastard|asshole|idiot|stupid|dumb|wtf|damn|crap|sex\w*|porn\w*|nude\w*) /, a: "Let's keep it professional. I'm here to help with Bubalan's work, skills and projects. What would you like to know?" },
  { re: /^ (hi+|hey+|hello+|hii+|yo|hola|vanakkam|namaste|good (morning|afternoon|evening)|greetings|sup|what s up)( there| friday| bro| buddy| team| all)? $/, a: "Hi! I'm F.R.I.D.A.Y., Bubalan's portfolio assistant. Ask me about his work at Predigle, his healthcare projects, his stack, side projects, or how to reach him." },
  { re: / how (are|r) (you|u)| how s it going| how do you do /, a: "Running smoothly, thanks for asking. What would you like to know about Bubalan?" },
  { re: / (thanks|thank you|thx|ty|cool|great|awesome|nice|ok|okay|got it) /, a: "Glad that helped. Anything else you'd like to know?" },
  { re: / (bye|goodbye|see you|cya) /, a: "Thanks for stopping by. If you'd like to work together, bubalan28@gmail.com is the quickest way to reach him." },
  { re: / (who|what) are you | your name | what is friday | are you (an? )?(ai|bot|human|real)|what can you (do|answer)| help /, a: "I'm F.R.I.D.A.Y., an assistant that knows Bubalan's résumé and this site. I run entirely in your browser, so nothing you type leaves the page. Try: his current role, healthcare work, tech stack, projects, education, LeetCode, or contact details." },
  { re: / (salary|ctc|package|pay|age|old|married|wife|girlfriend|religion|caste|address) /, a: "That's personal, so I'll leave it for Bubalan to discuss directly. You can reach him at bubalan28@gmail.com." },
  { re: / (why|should).*(hire|choose|pick)|(strength|strengths|good at|best at|unique|stand out) /, a: "In short: he owns features end to end. Today that means healthcare applications at Predigle, with role-based clinic flows, a document extraction agent and HIPAA-aware features. Before that he led a 4-member team at TIA IT Wing and shipped client sites at Create Digital Solution. He also solves problems daily on LeetCode." },
  { re: / (resume|cv) /, a: "Everything on this page comes from Bubalan's résumé. For the PDF, email bubalan28@gmail.com and he'll send the latest copy." },
  { re: / (joke|weather|news|cricket|movie|song|recipe|capital of|president|bitcoin) /, a: "I only know about Bubalan, so I'd be guessing there. Ask me about his work, projects or skills instead." },
];

export type Answer = { a: string; src: string; next?: string[] };

export function answer(q: string): Answer | null {
  const raw = RAW(q);
  for (const it of INTENTS) if (it.re.test(raw)) return { a: it.a, src: '~/friday' };
  const qt = toks(q);
  if (!qt.length) return null;

  const scored = KB.map(e => {
    let s = 0;
    qt.forEach(t => { let m = 0; e.k.forEach(k => { m = Math.max(m, near(t, k)); }); s += m * (1 + Math.min(t.length, 8) / 10) * (GENERIC.has(norm(t)) || GENERIC.has(t) ? .4 : 1); });
    return { e, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);

  if (scored.length) {
    const [top, second] = scored;
    // two clearly different topics in one question ("stack and projects") → answer both
    if (second && second.s >= top.s * .8 && second.s >= 1.2 && qt.length > 1) return { a: `${top.e.a}\n\n${second.e.a}`, src: `${top.e.src} + ${second.e.src}` };
    return { a: top.e.a, src: top.e.src };
  }

  // fallback: search page text
  const blocks = [...document.querySelectorAll<HTMLElement>('main p, main li, main dd, main h4')].map(el => ({ el, t: (el.textContent || '').replace(/\s+/g, ' ').trim() })).filter(b => b.t.length > 30);
  let fb: { el: HTMLElement; t: string } | null = null, fs = 0;
  for (const b of blocks) { const lt = b.t.toLowerCase(); let s = 0; qt.forEach(t => { if (t.length > 2 && lt.includes(norm(t))) s++; }); if (s > fs) { fs = s; fb = b; } }
  if (fb) { const sec = fb.el.closest<HTMLElement>('section[data-path]'); return { a: `Here's what the page says: ${fb.t}`, src: sec?.dataset.path || '~/' }; }
  return null;
}
