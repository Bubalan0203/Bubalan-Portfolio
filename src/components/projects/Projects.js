'use client'
import Title from '../layouts/Title'
import { projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, projectSeven, projectEight, projectNine } from '../../assets/index'
import ProjectsCard from './ProjectsCard'

const PROJECTS = [
  {
    title: 'CodeCraft – AI-Powered No-Code UI Builder',
    des: 'AI-based no-code platform using OpenAI, React, and Firebase. Enables code generation from prompts with Razorpay integration and real-time previews.',
    src: projectSeven,
    tech: ['React', 'Firebase', 'OpenAI', 'Razorpay'],
  },
  {
    title: 'FlavOr – AI-Powered Food Discovery App',
    des: 'Multilingual AI food app built with React Native and OpenRouter. Users get recipes via ingredients, images, or voice with YouTube video suggestions.',
    src: projectEight,
    tech: ['React Native', 'OpenRouter', 'AI'],
  },
  {
    title: 'TIA – Centralized Operations Hub',
    des: 'MERN-based enterprise suite for 10+ departments. Unified CRM, chat, and reports with role-based access and real-time AWS sync.',
    src: projectNine,
    tech: ['MERN', 'AWS', 'Socket.io'],
  },
  {
    title: 'Air Drawing App',
    des: 'Draw in real-time using webcam and hand-tracking. Features gesture detection, undo/redo, shape recognition, and voice commands.',
    src: projectOne,
    tech: ['OpenCV', 'MediaPipe', 'Python'],
  },
  {
    title: 'Eats.com – Food Ordering Platform',
    des: 'Food ordering platform with dynamic menus, cart, order history, and authentication built with the MERN stack.',
    src: projectTwo,
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Investment Suggestion Chatbot',
    des: 'Chatbot providing investment advice using Mistral LLM, built with React, Clerk auth, and MongoDB Atlas.',
    src: projectThree,
    tech: ['React', 'Mistral LLM', 'Clerk', 'MongoDB'],
  },
  {
    title: 'Shortest Path Visualizer',
    des: "Interactive Dijkstra's algorithm visualizer built in React to help understand graph theory and pathfinding logic.",
    src: projectFour,
    tech: ['React', 'Algorithms'],
  },
  {
    title: 'TIA Profit & Loss Calculator',
    des: 'MERN app managing transaction-based investment data with real-time P&L analytics and a modern secure dashboard.',
    src: projectFive,
    tech: ['MERN', 'Chart.js'],
  },
  {
    title: 'Crowd Catch Cost Analysis',
    des: 'MERN stack app analyzing cost efficiency and impact of crowd-gathering events using visual reports and financial projections.',
    src: projectSix,
    tech: ['MERN', 'Data Viz'],
  },
]

const Projects = () => (
  <section id="projects" className="py-24 border-t border-black/[0.08]">
    <div className="max-w-6xl mx-auto px-6">
      <Title title="Selected Work" des="My Projects" />

      {/* Featured row: first project wide, second normal */}
      <div className="grid grid-cols-1 lgl:grid-cols-3 gap-5 mb-5">
        <div className="lgl:col-span-2">
          <ProjectsCard {...PROJECTS[0]} />
        </div>
        <ProjectsCard {...PROJECTS[1]} />
      </div>

      {/* Second row: third project wide */}
      <div className="grid grid-cols-1 lgl:grid-cols-3 gap-5 mb-5">
        <ProjectsCard {...PROJECTS[2]} />
        <div className="lgl:col-span-2">
          <ProjectsCard {...PROJECTS[3]} />
        </div>
      </div>

      {/* Rest: standard 3-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 gap-5">
        {PROJECTS.slice(4).map((p, i) => (
          <ProjectsCard key={i} {...p} />
        ))}
      </div>
    </div>
  </section>
)

export default Projects
