'use client'
import Title from '../layouts/Title'
import Education from './Education'
import Skills from './Skills'

const Resume = () => (
  <section id="resume" className="py-24 border-t border-black/[0.08]">
    <div className="max-w-6xl mx-auto px-6">
      <Title title="Background" des="Education & Experience" />
      <Education />
      <Skills />
    </div>
  </section>
)

export default Resume
