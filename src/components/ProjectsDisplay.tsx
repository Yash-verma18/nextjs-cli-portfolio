import React from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import '@/styles/Projects.css'
import projectsData from '@/data/projects.json'; // Importing the JSON data directly

interface ProjectsDisplayProps {
  // We might not need props if we directly import data,
  // but could be useful for testing or if data source changes.
  // projects: Project[]; 
}

const ProjectsDisplay: React.FC<ProjectsDisplayProps> = () => {
  const projects: Project[] = projectsData; // Type assertion

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsDisplay;