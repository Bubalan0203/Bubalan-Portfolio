'use client'
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { title: 'About', to: 'about' },
  { title: 'Technologies', to: 'features' },
  { title: 'Work', to: 'projects' },
  { title: 'Resume', to: 'resume' },
  { title: 'Contact', to: 'contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="home" smooth duration={500} className="text-lightText font-black text-xl tracking-tight cursor-pointer select-none">
          B<span className="text-designColor">.</span>
        </Link>

        <div className="hidden mdl:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              smooth
              duration={500}
              offset={-64}
              activeClass="text-lightText"
              spy
              className="text-mutedText hover:text-lightText text-sm font-medium tracking-wide cursor-pointer transition-colors duration-200"
            >
              {l.title}
            </Link>
          ))}
        </div>

        <div className="hidden mdl:block">
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-64}
            className="px-5 py-2 text-sm font-semibold text-designColor border border-designColor/30 rounded-lg hover:bg-designColor/10 transition-all duration-200 cursor-pointer"
          >
            Let's Talk
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mdl:hidden text-mutedText hover:text-lightText transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mdl:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.06] px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              smooth
              duration={500}
              offset={-64}
              onClick={() => setOpen(false)}
              className="text-mutedText hover:text-lightText text-sm font-medium py-3 cursor-pointer transition-colors border-b border-black/[0.04] last:border-0"
            >
              {l.title}
            </Link>
          ))}
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-64}
            onClick={() => setOpen(false)}
            className="mt-3 text-center px-5 py-2.5 text-sm font-semibold text-designColor border border-designColor/30 rounded-lg cursor-pointer"
          >
            Let's Talk
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
