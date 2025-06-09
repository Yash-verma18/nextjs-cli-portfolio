// src/portfolioData.ts
import resumeJsonFile from '../public/resume.json'; // Next.js handles JSON imports directly

// --- Interfaces for JSON Resume structure ---
interface ResumeProfile {
  network: string;
  username: string;
  url: string;
}

interface ResumeLocation {
  city: string;
  region?: string;
  countryCode?: string;
}

interface ResumeBasics {
  name: string;
  label: string;
  image?: string;
  email: string;
  phone?: string;
  url?: string;
  summary: string;
  location?: ResumeLocation;
  profiles: ResumeProfile[];
}

interface ResumeWorkItem {
  name: string; // Company name
  position: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface ResumeSkillItem {
  name: string;
  level?: string;
  keywords?: string[];
}

// Add other interfaces if you use more sections from JSON Resume (e.g., education, projects)
interface FullResumeJson {
  basics: ResumeBasics;
  work?: ResumeWorkItem[];
  skills?: ResumeSkillItem[];
  // education?: any[];
  // projects?: any[];
  // volunteer?: any[];
  // awards?: any[];
  // publications?: any[];
  // languages?: any[];
  // interests?: any[];
  // references?: any[];
}

// --- Our desired internal portfolio data structure ---
export interface ExperienceItem {
  key: string; // position
  value: string; // company name
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface SocialLink {
  value: string; // network name
  url: string;
  username?: string;
}

export interface PortfolioData {
  name: string;
  who_am_i: string[]; // For the typing animation (derived from basics.label)
  location: string;
  email: string;
  website?: string;
  summary: string;
  experience: ExperienceItem[];
  skills: ResumeSkillItem[]; // We'll use the skills structure directly for now
  social: SocialLink[];
}

// Cast the imported JSON to our defined type
const resumeData = resumeJsonFile as FullResumeJson;

// --- Transform resume.json to our PortfolioData structure ---
const transformedData: PortfolioData = {
  name: resumeData.basics.name,
  // For the typing animation, we'll use basics.label as a single item array.
  // If you want multiple phrases, you might consider adding a custom array field to your resume.json basics.
  who_am_i: resumeData.basics.label ? [resumeData.basics.label] : [],
  location: resumeData.basics.location
    ? `${resumeData.basics.location.city}${resumeData.basics.location.region ? `, ${resumeData.basics.location.region}` : ''}`
    : 'Location not specified',
  email: resumeData.basics.email,
  website: resumeData.basics.url,
  summary: resumeData.basics.summary,
  experience: (resumeData.work || []).map(w => ({
    key: w.position,
    value: w.name,
    url: w.url,
    startDate: w.startDate,
    endDate: w.endDate,
    summary: w.summary,
    highlights: w.highlights,
  })),
  skills: resumeData.skills || [],
  social: resumeData.basics.profiles.map(p => ({
    value: p.network,
    url: p.url,
    username: p.username,
  })),
};

export const data = transformedData;