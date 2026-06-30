'use client'
import Title from '../layouts/Title'
import img1 from '../../assets/images/LOGOS/aws.svg'
import img2 from '../../assets/images/LOGOS/c++.png'
import img3 from '../../assets/images/LOGOS/css.png'
import img4 from '../../assets/images/LOGOS/express.png'
import img5 from '../../assets/images/LOGOS/firebase.png'
import img6 from '../../assets/images/LOGOS/git.png'
import img7 from '../../assets/images/LOGOS/html.png'
import img8 from '../../assets/images/LOGOS/js.png'
import img9 from '../../assets/images/LOGOS/mongodb.png'
import img10 from '../../assets/images/LOGOS/mysql.png'
import img11 from '../../assets/images/LOGOS/nginx.png'
import img12 from '../../assets/images/LOGOS/nodejs.png'
import img13 from '../../assets/images/LOGOS/python.png'
import img14 from '../../assets/images/LOGOS/react.png'

const techLogos = [
  { src: img1,  name: 'AWS' },
  { src: img2,  name: 'C++' },
  { src: img3,  name: 'CSS3' },
  { src: img4,  name: 'Express' },
  { src: img5,  name: 'Firebase' },
  { src: img6,  name: 'Git' },
  { src: img7,  name: 'HTML5' },
  { src: img8,  name: 'JavaScript' },
  { src: img9,  name: 'MongoDB' },
  { src: img10, name: 'MySQL' },
  { src: img11, name: 'Nginx' },
  { src: img12, name: 'Node.js' },
  { src: img13, name: 'Python' },
  { src: img14, name: 'React' },
]

const LogoItem = ({ src, name }) => {
  const imgSrc = typeof src === 'string' ? src : src?.src ?? src
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-4 mx-3 rounded-xl border border-black/[0.08] bg-cardColor hover:border-designColor/30 hover:bg-designColor/[0.04] transition-all duration-300 group flex-shrink-0">
      <img src={imgSrc} alt={name} className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-mutedText text-xs font-medium group-hover:text-lightText transition-colors duration-300">{name}</span>
    </div>
  )
}

const Features = () => (
  <section id="features" className="py-24 border-t border-black/[0.08] overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <Title title="Technologies" des="I Worked With" />
    </div>

    <style>{`
      .ticker-track { display: flex; width: max-content; animation: tickerLeft 35s linear infinite; }
      .ticker-track-r { animation-direction: reverse; }
      .ticker-wrap:hover .ticker-track,
      .ticker-wrap:hover .ticker-track-r { animation-play-state: paused; }
      @keyframes tickerLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    `}</style>

    <div className="mt-10 space-y-4">
      <div className="ticker-wrap fade-mask">
        <div className="ticker-track">
          {[...techLogos, ...techLogos].map((t, i) => <LogoItem key={i} {...t} />)}
        </div>
      </div>
      <div className="ticker-wrap fade-mask">
        <div className="ticker-track ticker-track-r">
          {[...techLogos, ...techLogos].map((t, i) => <LogoItem key={i} {...t} />)}
        </div>
      </div>
    </div>
  </section>
)

export default Features
