import React, { useEffect, useRef, useState } from 'react';
import Title from '../layouts/Title';
import img1 from '../../assets/images/LOGOS/aws.svg';
import img2 from '../../assets/images/LOGOS/c++.png';
import img3 from '../../assets/images/LOGOS/css.png';
import img4 from '../../assets/images/LOGOS/express.png';
import img5 from '../../assets/images/LOGOS/firebase.png';
import img6 from '../../assets/images/LOGOS/git.png';
import img7 from '../../assets/images/LOGOS/html.png';
import img8 from '../../assets/images/LOGOS/js.png';
import img9 from '../../assets/images/LOGOS/mongodb.png';
import img10 from '../../assets/images/LOGOS/mysql.png';
import img11 from '../../assets/images/LOGOS/nginx.png';
import img12 from '../../assets/images/LOGOS/nodejs.png';
import img13 from '../../assets/images/LOGOS/python.png';
import img14 from '../../assets/images/LOGOS/react.png';

const techLogos = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10,img11,img12,img13,img14,
];

const Features = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const prevScrollY = useRef(window.scrollY);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="w-full py-20 border-b-black transition-all duration-700 ease-in-out"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Animation Styles */}
      <style>{`
        .scroll-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .scroll-content {
          display: flex;
          width: max-content;
          gap: 3rem;
          animation: scrollLeft 30s linear infinite;
        }

        .scroll-content-reverse {
          animation: scrollRight 30s linear infinite;
        }

        .scroll-wrapper:hover .scroll-content,
        .scroll-wrapper:hover .scroll-content-reverse {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <Title title="Technologies" des="I worked with" />

      <div className="mt-12 space-y-10">
        {/* Row 1 - Left to Right */}
        <div className="scroll-wrapper">
          <div className="scroll-content">
            {[...techLogos, ...techLogos].map((logo, idx) => (
              <img key={`r1-${idx}`} src={logo} alt="Tech" className="h-10" />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="scroll-wrapper">
          <div className="scroll-content scroll-content-reverse">
            {[...techLogos, ...techLogos].map((logo, idx) => (
              <img key={`r2-${idx}`} src={logo} alt="Tech" className="h-10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
