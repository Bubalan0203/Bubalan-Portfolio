'use client'

import { useState } from 'react'
import Loader from './Loader'

// Module-level flag: false on every fresh page load, true after loader plays once
let loaderShown = false
import Banner from "../src/components/banner/Banner";
import About from "../src/components/contact/Contact";
import Technologies from "../src/components/features/Features";
import Footer from "../src/components/footer/Footer";
import FooterBottom from "../src/components/footer/FooterBottom";
import Navbar from "../src/components/navbar/Navbar";
import Projects from "../src/components/projects/Projects";
import Resume from "../src/components/resume/Resume";
import Codingarena from "../src/components/tesimonial/Testimonial";

export default function Portfolio() {
  const [loaded, setLoaded] = useState(loaderShown)

  const handleComplete = () => {
    loaderShown = true
    setLoaded(true)
  }

  return (
    <>
      {!loaded && <Loader onComplete={handleComplete} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: loaded ? 'opacity 0.6s ease' : 'none',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
        className="w-full h-auto bg-bodyColor text-lightText px-4"
      >
        <Navbar />
        <div className="max-w-screen-xl mx-auto">
          <Banner />
          <About />
          <Technologies />
          <Codingarena />
          <Resume />
          <Projects />
          <Footer />
          <FooterBottom />
        </div>
      </div>
    </>
  );
}
