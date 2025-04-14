import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import '../styles/ProjectCard.css'

const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, githubLink, liveLink } = project

  return (
    <article className="project-card">
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tech">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
            <FaGithub /> Code
          </a>
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
            <FaExternalLinkAlt /> Live Demo
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
