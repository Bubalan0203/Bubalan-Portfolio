'use client'
import { useRef, useEffect, useState } from 'react'
import Title from '../layouts/Title'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiNextdotjs } from 'react-icons/si'
import { FaReact } from 'react-icons/fa'

const Contact = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-24 border-t border-black/[0.08]">
      <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Title title="About" des="Who I Am" />
        <div className="grid grid-cols-1 lgl:grid-cols-2 gap-16 items-start">
          <div>
            <p
              className="font-bold text-lightText leading-tight tracking-tight mb-8"
              style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}
            >
              "I build things for the{' '}
              <span className="text-designColor">web</span>
              {' '}that actually{' '}
              <span className="text-greenAccent">matter.</span>"
            </p>
            <div className="flex gap-3 flex-wrap">
              {[SiMongodb, SiExpress, FaReact, SiNextdotjs].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-black/[0.08] text-designColor hover:border-designColor/40 hover:bg-designColor/5 transition-all duration-200"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-mutedText leading-relaxed">
              Hey 👋 I'm{' '}
              <span className="text-lightText font-semibold">Bubalan</span>, a final-year student
              pursuing an{' '}
              <span className="text-designColor font-medium">MSc in Software Systems</span>. I'm
              passionate about building smart, scalable solutions using modern web tech.
            </p>
            <p className="text-mutedText leading-relaxed">
              My journey started with the{' '}
              <span className="text-lightText font-medium">MERN stack</span> and has since expanded
              into AI integration, cloud deployment, and building full-stack products from zero to
              production.
            </p>
            <p className="text-mutedText leading-relaxed">
              Every bug, breakdown, and breakthrough shaped me into a{' '}
              <span className="text-greenAccent font-medium">resilient problem-solver</span> who
              embraces complexity with curiosity. My goal is to contribute meaningfully at a top
              tech company.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              {[
                { Icon: FaGraduationCap, text: 'MSc Software Systems · 8.35 CGPA' },
                { Icon: FaBriefcase,     text: 'Open to SDE / SWE Roles' },
              ].map(({ Icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-black/[0.08] text-sm text-mutedText"
                >
                  <Icon size={13} className="text-designColor" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
