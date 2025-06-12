import React from 'react';
import { Project } from '@/types'; // Assuming your tsconfig paths are set up for @/

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card">
      {/* Border Elements */}
      <span className="border-corner border-top-left">+</span>
      <span className="border-corner border-top-right">+</span>
      <span className="border-corner border-bottom-left">+</span>
      <span className="border-corner border-bottom-right">+</span>
      <span className="border-line border-top"></span>
      <span className="border-line border-right"></span>
      <span className="border-line border-bottom"></span>
      <span className="border-line border-left"></span>

      {/* Actual Content */}
      <div className="project-card-content">
        <div className="project-card-title">
          {project.titleLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className="project-card-separator">--------------------</div> {/* Placeholder for dashed line styling */}
        <div className="project-card-description">
          {project.descriptionLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;