/* which shelf a project sits on */
export type ProjectGroup = 'now' | 'proud' | 'more';

export type SketchKind =
  | 'journal' | 'palette' | 'lens' | 'graph' | 'gallery'
  | 'book' | 'dictionary' | 'orbits' | 'frog'
  | 'towers' | 'swatches' | 'sphere';

export interface ProjectInfo {
  title: string;
  url: string;
  tag: string;
  description: string;
  /** empty string hides the section */
  problem: string;
  vision: string;
  stack: string;
  status: string;
  github?: string;
  /** live site, when there is one */
  link?: string;
  /** button label for `link` (default "Live site") */
  linkLabel?: string;
}

export interface Project extends ProjectInfo {
  group: ProjectGroup;
  sketch: SketchKind;
  /** faint word stamped across the window */
  stamp: string;
}

export interface ResumeEntry {
  title: string;
  org?: string;
  place?: string;
  period: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  place: string;
  period: string;
  note?: string;
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  /** the short bio, already wrapped across lines for the name scribble */
  bioLines: string[];
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface Resume {
  name: string;
  role: string;
  summary: string;
  contact: { github: string; linkedin: string; email: string; phone: string };
  experience: ResumeEntry[];
  projects: ResumeEntry[];
  leadership: ResumeEntry[];
  skills: { label: string; items: string }[];
  education: Education[];
  certificates: string[];
}

export interface WritingPost {
  title: string;
  date: string;
  body: string;
}
