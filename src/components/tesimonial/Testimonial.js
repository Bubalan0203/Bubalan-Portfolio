'use client'
import Title from '../layouts/Title'
import { FiDownload } from 'react-icons/fi'

const STATS = [
  { label: 'Easy',   solved: 119, total: 951  },
  { label: 'Medium', solved: 147, total: 2077 },
  { label: 'Hard',   solved: 26,  total: 949  },
]

const Codingarena = () => (
  <section id="testimonial" className="py-24 border-t border-black/[0.08]">
    <div className="max-w-6xl mx-auto px-6">
      <Title title="Competitive Programming" des="Coding Arena" />

      <div className="grid grid-cols-1 lgl:grid-cols-2 gap-12 lgl:gap-20 items-center">
        {/* LeetCode card embed */}
        <div className="rounded-2xl overflow-hidden border border-black/[0.08] bg-cardColor">
          <img
            src="https://leetcard.jacoblin.cool/Bubalan_Shanmuga_sundaram?theme=light&font=Nunito&ext=heatmap"
            alt="LeetCode Stats"
            className="w-full"
          />
        </div>

        {/* Stats + content */}
        <div className="space-y-8">
          <div>
            <p className="text-mutedText text-sm uppercase tracking-widest font-semibold mb-1">Total Solved</p>
            <p className="text-lightText font-black" style={{ fontSize: 'clamp(56px, 6vw, 80px)', lineHeight: 1 }}>
              292
            </p>
          </div>

          <div className="space-y-3">
            {STATS.map(({ label, solved, total }) => (
              <div key={label} className="flex items-center gap-4">
                <span className={`w-16 text-xs font-semibold ${label === 'Easy' ? 'text-greenAccent' : label === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {label}
                </span>
                <div className="flex-1 h-1.5 bg-black/[0.07] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${label === 'Easy' ? 'bg-greenAccent' : label === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'}`}
                    style={{ width: `${(solved / total) * 100}%` }}
                  />
                </div>
                <span className="text-mutedText text-xs w-20 text-right">{solved} / {total}</span>
              </div>
            ))}
          </div>

          <p className="text-mutedText text-sm leading-relaxed border-l-2 border-designColor/40 pl-4 italic">
            "By engaging in dedicated LeetCode practice, I continuously refine my algorithmic thinking and
            problem-solving skills — building towards excellence one solution at a time."
          </p>

          <div className="pt-2">
            <p className="text-lightText font-semibold mb-1">Aspiring Software Engineer</p>
            <p className="text-mutedText text-sm mb-5">Open to SDE / SWE internship or full-time opportunities.</p>
            <a
              href="/Bubalan.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-designColor text-white text-sm font-bold rounded-xl hover:bg-designColor/90 transition-all duration-200"
            >
              <FiDownload size={15} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Codingarena
