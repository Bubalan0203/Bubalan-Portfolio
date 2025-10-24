import React from 'react';
import Title from '../layouts/Title';
import { projectOne, projectTwo, projectThree ,projectFour,projectFive,projectSix,projectSeven,projectEight,projectNine} from "../../assets/index"; // Replace with actual screenshots as needed
import ProjectsCard from './ProjectsCard';

const Projects = () => {
  return (
    <section id="projects" className="w-full py-20 border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          des="My Projects"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">

  {/* NEW PROJECT 1 */}
  <ProjectsCard
    title="CodeCraft – AI-Powered No-Code UI Builder"
    des="Built an AI-based no-code platform using OpenAI, React, and Firebase. Enabled code generation from prompts with Razorpay integration and real-time previews."
    src={projectSeven}
  />

  {/* NEW PROJECT 2 */}
  <ProjectsCard
    title="FlavOr – AI-Powered Food Discovery App"
    des="A multilingual AI food app built with React Native and OpenRouter. Users get recipes via ingredients, images, or voice — with YouTube video suggestions."
    src={projectEight}
  />

  {/* NEW PROJECT 3 */}
  <ProjectsCard
    title="TIA – Centralized Operations Hub"
    des="MERN-based enterprise suite for 10+ departments. Unified CRM, chat, and reports with role-based access and real-time AWS sync."
    src={projectNine}
  />

  {/* EXISTING PROJECT 1 */}
  <ProjectsCard
    title="Air Drawing App"
    des="Draw with your hand in real-time using webcam and hand-tracking. Features gesture detection, undo/redo, shape recognition, voice commands, and theme toggle."
    src={projectOne}
  />

  {/* EXISTING PROJECT 2 */}
  <ProjectsCard
    title="Eats.com - Food Ordering Platform"
    des="A food ordering platform with dynamic menus, cart, order history, and authentication. Built with React, Node.js, and MongoDB."
    src={projectTwo}
  />

  {/* EXISTING PROJECT 3 */}
  <ProjectsCard
    title="Investment Suggestion Chatbot"
    des="Chatbot that provides investment advice and feedback using Mistral LLM. Built with React, Clerk auth, and MongoDB Atlas."
    src={projectThree}
  />

  {/* EXISTING PROJECT 4 */}
  <ProjectsCard
    title="Shortest Path Mapping (Dijkstra)"
    des="Interactive pathfinding visualizer using Dijkstra’s algorithm. Built in React to help users understand graph theory and path logic."
    src={projectFour}
  />

  {/* EXISTING PROJECT 5 */}
  <ProjectsCard
    title="TIA Profit & Loss Calculator"
    des="A MERN app to manage transaction-based investment data, showing real-time P&L analytics with a modern, secure dashboard."
    src={projectFive}
  />

  {/* EXISTING PROJECT 6 */}
  <ProjectsCard
    title="Crowd Catch Cost Analysis"
    des="MERN stack web app that analyzes the cost efficiency and impact of crowd gathering events using visual reports and financial projections."
    src={projectSix}
  />
</div>
    </section>
  );
}

export default Projects;
