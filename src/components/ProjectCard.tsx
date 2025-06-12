import React from 'react';
import { Project } from '@/types'; // Assuming your tsconfig paths are set up for @/
import '@/styles/ScanHover.css';
import '@/styles/CornerGlow.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="scan-hover-wrapper"
      style={{ '--scan-color': '#37F713' } as React.CSSProperties}
    >
      <div className="project-card social-link">
        {/* Glowing Corner Brackets */}
        <div className="corner top-left" />
        <div className="corner top-right" />
        <div className="corner bottom-left" />
        <div className="corner bottom-right" />

        {/* Old Border Elements */}
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
          <div className="project-card-separator">--------------------</div>
          <div className="project-card-description">
            {project.descriptionLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
