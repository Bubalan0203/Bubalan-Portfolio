import React, { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  FaLinkedinIn,
  FaReact,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiFigma, SiNextdotjs } from "react-icons/si";

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ["Professional Coder.", "Full Stack Developer.", "UI Designer."],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getAnimationClass = (index) => {
    const delay = index * 100;
    return `transition-all duration-500 ease-in-out delay-[${delay}ms] ${
      scrollDirection === "down"
        ? "translate-y-10 opacity-0"
        : "translate-y-0 opacity-100"
    }`;
  };

  return (
    <div className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className={`text-lg font-normal ${getAnimationClass(0)}`}>
          Hello Everyone, I am
        </h4>
        <h1 className={`text-6xl font-bold text-white ${getAnimationClass(1)}`}>
          <span className="text-designColor capitalize">Bubalan</span>
        </h1>
        <h2 className={`text-4xl font-bold text-white ${getAnimationClass(2)}`}>
          a <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff014f"
          />
        </h2>
        <p className={`text-base font-bodyFont leading-6 tracking-wide ${getAnimationClass(3)}`}>
          I'm a passionate Software Systems student with a hunger for learning
          and a knack for problem solving. I strive to create impactful
          solutions that resonate in the digital world.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
        <div className={`${getAnimationClass(4)}`}>
          <h2 className="text-base uppercase font-titleFont mb-4">Find me in</h2>
          <div className="flex gap-4">
            <a href="https://github.com/Bubalan0203" target="_blank" rel="noopener noreferrer">
              <span className="bannerIcon"><FaGithub /></span>
            </a>
            <a href="https://wa.me/918667859174" target="_blank" rel="noopener noreferrer">
              <span className="bannerIcon"><FaWhatsapp /></span>
            </a>
            <a href="mailto:bubalan28@gmail.com" target="_blank" rel="noopener noreferrer">
              <span className="bannerIcon"><FaEnvelope /></span>
            </a>
            <a href="https://www.linkedin.com/in/bubalans" target="_blank" rel="noopener noreferrer">
              <span className="bannerIcon"><FaLinkedinIn /></span>
            </a>
          </div>
        </div>

        <div className={`${getAnimationClass(5)}`}>
          <h2 className="text-base uppercase font-titleFont mb-4">Best Skill On</h2>
          <div className="flex gap-4">
            <span className="bannerIcon"><SiMongodb /></span>
            <span className="bannerIcon"><SiExpress /></span>
            <span className="bannerIcon"><FaReact /></span>
            <span className="bannerIcon"><SiNextdotjs /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBanner;
