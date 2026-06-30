'use client'

const TimelineItem = ({ year, title, org, result, desc }) => (
  <div className="relative pl-6 pb-10 border-l border-black/[0.08] last:border-l-transparent last:pb-0">
    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-designColor ring-4 ring-designColor/15" />
    <span className="inline-block text-xs font-semibold text-designColor tracking-widest uppercase mb-2">{year}</span>
    <div className="flex items-start justify-between gap-4 mb-1">
      <h4 className="text-lightText font-semibold text-sm leading-snug">{title}</h4>
      <span className="text-xs font-bold text-greenAccent whitespace-nowrap mt-0.5 px-2 py-0.5 rounded-md border border-greenAccent/20 bg-greenAccent/5">{result}</span>
    </div>
    <p className="text-mutedText text-xs mb-2">{org}</p>
    <p className="text-mutedText text-xs leading-relaxed">{desc}</p>
  </div>
)

const EDUCATION = [
  {
    year: '2021 – 2026',
    title: 'MSc in Software Systems',
    org: 'PSG College of Technology, Coimbatore',
    result: '8.35 / 10',
    desc: 'A comprehensive 5-year integrated program focused on advanced software development, systems design, and project-based learning.',
  },
  {
    year: '2018',
    title: 'Higher Secondary (12th Grade)',
    org: "St. Joseph's Matric. HSS, Coimbatore",
    result: '86%',
    desc: 'Core science subjects — Mathematics, Physics, Computer Science.',
  },
  {
    year: '2016',
    title: 'Secondary School (10th Grade)',
    org: "St. Joseph's Matric. HSS, Coimbatore",
    result: '84%',
    desc: 'Strong foundation in mathematics, science, and language skills.',
  },
]

const EXPERIENCE = [
  {
    year: 'Dec 2024 – May 2025',
    title: 'Full Stack Developer',
    org: 'Create Digital Solution — Part Time',
    result: 'Active',
    desc: 'MERN Stack development across multiple client projects. Involved deployment on Vercel, AWS, and SQL-based services.',
  },
  {
    year: 'Jul – Nov 2024',
    title: 'Full Stack Developer',
    org: 'TIA IT Wing — Full Time Intern',
    result: 'Intern',
    desc: 'Led development of two major MERN Stack products. Handled AWS deployment workflows and real-time feature integration.',
  },
  {
    year: 'Feb – Jun 2024',
    title: 'Full Stack Developer',
    org: 'TIA IT Wing — Part Time Intern',
    result: 'Intern',
    desc: 'Built scalable and responsive web apps with MERN stack and AWS integration.',
  },
]

const Education = () => (
  <div className="grid grid-cols-1 lgl:grid-cols-2 gap-12 lgl:gap-20">
    <div>
      <h3 className="text-lightText font-bold text-lg mb-8">Education</h3>
      {EDUCATION.map((e, i) => <TimelineItem key={i} {...e} />)}
    </div>
    <div>
      <h3 className="text-lightText font-bold text-lg mb-8">Experience</h3>
      {EXPERIENCE.map((e, i) => <TimelineItem key={i} {...e} />)}
    </div>
  </div>
)

export default Education
