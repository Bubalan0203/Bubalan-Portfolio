'use client'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'

const ProjectsCard = ({ title, des, src, github, tech = [] }) => {
  const imgSrc = typeof src === 'string' ? src : src?.src ?? src
  return (
    <div className="group relative flex flex-col bg-cardColor border border-black/[0.08] rounded-2xl overflow-hidden hover:border-designColor/30 transition-all duration-300">
      <div className="relative overflow-hidden aspect-video bg-white">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cardColor via-transparent to-transparent" />
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-lightText font-bold text-base leading-snug">{title}</h3>
        <p className="text-mutedText text-sm leading-relaxed flex-1">{des}</p>

        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tech.map(t => (
              <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-designColor/20 text-designColor bg-designColor/5">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
          <a
            href={github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-mutedText hover:text-lightText text-sm font-medium transition-colors duration-200"
          >
            <FiGithub size={14} />
            View Code
          </a>
          <FiArrowUpRight size={16} className="text-mutedText group-hover:text-designColor transition-colors duration-200" />
        </div>
      </div>
    </div>
  )
}

export default ProjectsCard
