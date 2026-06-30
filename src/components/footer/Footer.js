'use client'
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

const SOCIALS = [
  { Icon: FaGithub,     href: 'https://github.com/Bubalan0203',       label: 'GitHub' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/bubalans', label: 'LinkedIn' },
  { Icon: FaWhatsapp,   href: 'https://wa.me/918667859174',           label: 'WhatsApp' },
  { Icon: FaEnvelope,   href: 'mailto:bubalan28@gmail.com',           label: 'Email' },
]

const Footer = () => (
  <footer id="contact" className="py-20 border-t border-black/[0.08]">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-lightText font-black text-2xl tracking-tight mb-1">
            B<span className="text-designColor">.</span>
          </p>
          <p className="text-mutedText text-sm max-w-xs leading-relaxed">
            MERN Stack Developer · Open to SDE / SWE Roles<br />
            <a href="mailto:bubalan28@gmail.com" className="text-designColor hover:underline">
              bubalan28@gmail.com
            </a>
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-designColor/25 text-designColor text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-designColor animate-pulse" />
            Available for Work
          </span>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
