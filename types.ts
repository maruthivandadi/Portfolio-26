
export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: 'Tech' | 'Tools' | 'Soft Skills';
  level?: number;
}
