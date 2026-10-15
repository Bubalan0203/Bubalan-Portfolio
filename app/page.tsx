import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Journey from '@/components/sections/Journey';
import Toolkit from '@/components/sections/Toolkit';
import Projects from '@/components/sections/Projects';
import Numbers from '@/components/sections/Numbers';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

// Order matters: ScrollTriggers are created top-to-bottom, and the pinned projects track offsets everything after it.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Journey />
      <Toolkit />
      <Projects />
      <Numbers />
      <Process />
      <Contact />
    </>
  );
}
