'use client'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-scroll'

const SOCIALS = [
  { Icon: FaGithub,     href: 'https://github.com/Bubalan0203',       label: 'GitHub' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/bubalans', label: 'LinkedIn' },
  { Icon: FaWhatsapp,   href: 'https://wa.me/918667859174',           label: 'WhatsApp' },
  { Icon: FaEnvelope,   href: 'mailto:bubalan28@gmail.com',           label: 'Email' },
]

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ['Full Stack Developer.', 'MERN Stack Engineer.', 'UI Designer.', 'Problem Solver.'],
    loop: true,
    typeSpeed: 40,
    deleteSpeed: 20,
    delaySpeed: 2500,
  })

  return (
    <div className="max-w-6xl mx-auto px-6 w-full">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-px bg-designColor" />
        <span className="text-designColor text-xs font-semibold tracking-[0.2em] uppercase">
          Available for Work
        </span>
      </div>

      <h1
        className="font-black text-lightText leading-[0.92] tracking-tight mb-6"
        style={{ fontSize: 'clamp(56px, 9vw, 108px)' }}
      >
        BUBALAN<br />
        <span className="text-designColor">S.</span>
      </h1>

      <p className="font-semibold text-mutedText mb-4" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}>
        <span className="text-lightText">{text}</span>
        <Cursor cursorStyle="|" cursorColor="#2EA88A" />
      </p>

      <p className="text-mutedText text-base max-w-xl leading-relaxed mb-10">
        MSc Software Systems student building AI-powered, scalable web apps.
        Passionate about clean code and impactful user experiences.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-10">
        <Link
          to="projects"
          smooth
          duration={500}
          offset={-64}
          className="px-7 py-3 bg-designColor text-white text-sm font-bold rounded-xl hover:bg-designColor/90 transition-all duration-200 cursor-pointer"
        >
          View Work →
        </Link>
        <a
          href="/Bubalan.pdf"
          download
          className="px-7 py-3 border border-black/[0.12] text-lightText text-sm font-semibold rounded-xl hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200"
        >
          Download Resume
        </a>
      </div>

      <div className="flex items-center gap-3">
        {SOCIALS.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="bannerIcon"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default LeftBanner
