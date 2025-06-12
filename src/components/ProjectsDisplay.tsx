import React from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import '@/styles/Projects.css'
import projectsData from '@/data/projects.json'; // Importing the JSON data directly



const ProjectsDisplay: React.FC = () => {
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