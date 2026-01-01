
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
    link: "#",
    icon: "BrainCircuit"
  },
  {
    title: "Intelligent To-Do",
    description: "Beyond a simple list, this tool uses task prioritization logic to manage complex workflows efficiently.",
    tech: ["JavaScript", "Tailwind CSS", "Local Storage"],
    link: "#",
    icon: "Layers"
  },
  {
    title: "Interactive Counter",
    description: "A sleek, responsive interactive counter showcasing precise DOM manipulation and modern UI principles.",
    tech: ["JavaScript", "CSS3", "HTML5"],
    link: "#",
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
    role: "Research & Development Intern",
    company: "Krytil",
    period: "Dec 2025 – Present",
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
