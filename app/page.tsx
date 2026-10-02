import Hero from '@/components/sections/Hero';
import Tapes from '@/components/sections/Tapes';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Earlier from '@/components/sections/Earlier';
import Skills from '@/components/sections/Skills';
import Agents from '@/components/sections/Agents';
import Impact from '@/components/sections/Impact';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

// Order matters: ScrollTriggers are created top-to-bottom so the pinned git log offsets everything after it.
export default function Home() {
  return (
    <>
      <Hero />
      <Tapes />
      <About />
      <Work />
      <Earlier />
      <Skills />
      <Agents />
      <Impact />
      <Projects />
      <Contact />
    </>
  );
}
