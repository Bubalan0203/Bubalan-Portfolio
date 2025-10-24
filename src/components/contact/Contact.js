import React, { useEffect, useRef, useState } from 'react';
import Title from '../layouts/Title';
import ContactLeft from './ContactLeft';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Only animate once
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="w-full py-20 border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title title="My journey through bugs, breakthroughs, and big ideas" des="About Me" />
      </div>
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
          <ContactLeft />
          <div
            ref={contentRef}
            className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-6 p-4 lgl:p-8 rounded-2xl shadow-lg text-white leading-relaxed tracking-wide"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease-in-out',
            }}
          >
            <h2 className="text-2xl font-bold" style={{ color: 'rgb(255 1 79)' }}>Hey there 👋</h2>
            <p>
              I'm <span style={{ color: 'rgb(255 1 79)', fontWeight: '600' }}>Bubalan</span>, a final-year student pursuing
              <span style={{ color: 'rgb(255 1 79)', fontWeight: '600' }}> MSc in Software Systems</span>. I'm passionate about building smart, scalable solutions using modern tech.
            </p>
            <p>
              My development journey began with the <span style={{ color: 'rgb(255 1 79)', fontWeight: '600' }}>MERN stack</span>, and since then, I’ve dived deep into full-stack development, AI integration, and cloud deployment.
              I love blending creativity with logic to craft smooth user experiences.
            </p>
            <p>
              Challenges in coding once felt overwhelming, but over time, every bug and breakdown helped me grow. These experiences shaped me into a
              <span style={{ color: 'rgb(255 1 79)', fontWeight: '600' }}> resilient problem-solver</span> who now embraces complexity with curiosity.
            </p>
            <p>
              I'm actively working on innovative AI + web/app-based projects, and my goal is to contribute meaningfully at a
              <span style={{ color: 'rgb(255 1 79)', fontWeight: '600' }}> top tech company</span> where I can keep learning, building, and pushing my limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
