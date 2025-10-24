import React from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2018 - Present</p>
          <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
  <ResumeCard
    title="MSc in Software Systems"
    subTitle="College Name, Coimbatore (2021 - 2026)"
    result="8.35/10"
    des="A comprehensive 5-year integrated program focused on advanced software development, systems design, and project-based learning."
  />
  <ResumeCard
    title="Higher Secondary Education (12th Grade)"
    subTitle="St. Joseph's Matriculation Higher Secondary School, Ondipudur, Coimbatore (2018)"
    result="86%"
    des="Focused on core science subjects including Mathematics, Physics, and Computer Science, laying the foundation for further education in software systems."
  />
  <ResumeCard
    title="Secondary School Education (10th Grade)"
    subTitle="St. Joseph's Matriculation Higher Secondary School, Ondipudur, Coimbatore (2016)"
    result="84%"
    des="General secondary education with a strong foundation in mathematics, science, and language skills."
  />
</div>

      </div>
      {/* part Two */}

      <div>
  <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
    <p className="text-sm text-designColor tracking-[4px]">2024 - 2025</p>
    <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
  </div>
  <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
   
    
    <ResumeCard
      title="Full Stack Developer"
      subTitle="Create Digital Solution — (Dec 2024 - May 2025)"
      result="Part Time"
      des="Currently working as a Full Stack Developer handling multiple roles in MERN Stack development. Involved in projects using Vercel, AWS, SQL, HTML, CSS, and JavaScript."
    />
    <ResumeCard
      title="Full Stack Developer (Full-Time)"
      subTitle="TIA IT Wing — (Jul 2024 - Nov 2024)"
      result="Intern"
      des="Took on a full-time role in the same organization, leading development of two major MERN Stack projects. Also handled deployment workflows using AWS."
    />
     <ResumeCard
      title="Full Stack Developer (Part-Time)"
      subTitle="TIA IT Wing — (Feb 2024 - June 2024)"
      result="Intern"
      des="Worked as a MERN Stack Developer with hands-on experience in AWS integration. Contributed to building scalable and responsive web apps."
    />
  </div>
</div>

    </motion.div>
  );
};

export default Education;
