
import React from 'react';
import { Project, Experience, Skill } from './types';
import { 
  Cpu, 
  BrainCircuit, 
  Code2, 
  Clock, 
  Layers, 
  Target,
  Smartphone,
  Globe
} from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    title: "AI Planner",
    description: "A personalized intelligent planning system powered by Google AI Studio, designed to optimize daily productivity.",
    tech: ["Google AI Studio", "React", "TypeScript"],
    link: "https://to-do-list-app-three-ashy.vercel.app/",
    icon: "BrainCircuit"
  },
  {
    title: "Shikshak Guide",
    description: "Shikshak Guide is an AI-enhanced digital hub designed to streamline educational workflows and resource management for modern educators.",
    tech: ["JavaScript", "Tailwind CSS", "Local Storage"],
    link: "https://shikshak-guide.netlify.app/",
    icon: "Layers"
  },
  {
    title: "Interactive Counter",
    description: "A sleek, responsive interactive counter showcasing precise DOM manipulation and modern UI principles.",
    tech: ["JavaScript", "CSS3", "HTML5"],
    link: "https://maruthi-vandadi-counter.netlify.app/",
    icon: "Target"
  },
  {
    title: "Productivity Timer",
    description: "A focus-oriented timer clock designed for research sessions, implementing the Pomodoro technique with a minimalist UI.",
    tech: ["JavaScript", "Animation API"],
    link: "#",
    icon: "Clock"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "AI-Intern",
    company: "Proddy AI",
    period: "Apr 2026 – Present",
    description: [
      "Product Enhancement: Dedicated to evolving existing software through intelligent automation.",
      "Recently introduced the AI_Task_Blocking_Detector feature, enhancing product utility by automating the detection of task dependencies and blockers.",
      "Focused on delivering production-ready AI solutions within established development lifecycles."
    ]
  },
  {
    role: "Research & Development Intern",
    company: "Krytil",
    period: "Dec 2025 – Mar 2026",
    description: [
      "Contributing to research-driven projects focused on automation and data extraction.",
      "Developing scripts to extract fresher job data from company career pages.",
      "Applying analytical and development skills to generate actionable industry insights."
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "HTML/CSS", category: "Tech" },
  { name: "JavaScript", category: "Tech" },
  { name: "React Fundamentals", category: "Tech" },
  { name: "Google AI Studio", category: "Tools" },
  { name: "Research & Analysis", category: "Soft Skills" },
  { name: "Problem Solving", category: "Soft Skills" },
  { name: "Robotics & AI", category: "Tech" },
  { name: "Cybersecurity", category: "Tech" }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />
};
