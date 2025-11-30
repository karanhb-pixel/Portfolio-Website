import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "../styles/ProjectCard.css";

const ProjectCard = ({ project }) => {
  const { slug, title, subtitle, coverImageUrl, techStack, category } = project;

  return (
    <article className="project-card">
      <Link to={`/projects/${slug}`} className="project-image-link">
        <div className="project-image">
          <img src={coverImageUrl} alt={title} />
          <div className="project-image-overlay">
            <span className="view-details-text">View Details</span>
          </div>
          {category && (
            <span className="category-badge">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}
        </div>
      </Link>
      <div className="project-content">
        <Link to={`/projects/${slug}`} className="project-title-link">
          <h3 className="project-title">{title}</h3>
        </Link>
        <p className="project-description">{subtitle}</p>
        {techStack && techStack.length > 0 && (
          <div className="project-tech">
            {techStack.slice(0, 4).map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="tech-tag more">+{techStack.length - 4}</span>
            )}
          </div>
        )}
        <div className="project-links">
          <Link to={`/projects/${slug}`} className="project-link view-details">
            <FaEye /> View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
