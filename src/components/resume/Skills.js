'use client'

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'HTML5', 'CSS3 / Tailwind', 'JavaScript'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Firebase'],
  },
  {
    label: 'Cloud & Tools',
    skills: ['AWS', 'Git', 'Nginx', 'Vercel', 'Figma'],
  },
  {
    label: 'Languages',
    skills: ['JavaScript', 'Python', 'C++'],
  },
]

const Skills = () => (
  <div className="mt-16 pt-12 border-t border-black/[0.08]">
    <h3 className="text-lightText font-bold text-lg mb-8">Skills</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {SKILL_GROUPS.map(({ label, skills }) => (
        <div key={label}>
          <p className="text-designColor text-xs font-semibold tracking-[0.15em] uppercase mb-4">{label}</p>
          <ul className="space-y-2">
            {skills.map(s => (
              <li key={s} className="text-mutedText text-sm hover:text-lightText transition-colors duration-200">
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)

export default Skills
