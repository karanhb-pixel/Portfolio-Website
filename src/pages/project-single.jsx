import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjectBySlug } from "../services/contentful";
import "../styles/ProjectSingle.css";

const ProjectSingle = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const projectData = await fetchProjectBySlug(slug);
        setProject(projectData);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="project-single-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="project-single-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <Link to="/projects" className="btn-back">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!project) {
    return (
      <div className="project-single-not-found">
        <div className="not-found-content">
          <div className="not-found-icon">🔍</div>
          <h2>Project Not Found</h2>
          <p>
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/projects" className="btn-browse">
            Browse All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-single-page">
      {/* Hero Section with Cover Image */}
      <section className="project-hero">
        {project.coverImageUrl && (
          <div className="project-hero-image">
            <img
              src={project.coverImageUrl}
              alt={project.title}
            />
            <div className="project-hero-overlay"></div>
          </div>
        )}
        <div className="project-hero-content">
          <div className="project-hero-inner">
            <h1 className="project-hero-title">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="project-hero-subtitle">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="project-single-main">
        {/* Action Buttons */}
        <div className="project-actions">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-demo"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
          )}
        </div>

        {/* Overview Section */}
        {project.overviewHtml && (
          <section className="project-section">
            <h2 className="project-section-title">
              Overview
            </h2>
            <div
              className="project-overview"
              dangerouslySetInnerHTML={{ __html: project.overviewHtml }}
            />
          </section>
        )}

         {/* My Contribution Section */}
         {project.myContribution && (
           <section className="project-section">
             <h2 className="project-section-title">
               My Contribution
             </h2>

             <div className="contribution-content">
               <p>{project.myContribution}</p>
             </div>
           </section>
         )}

         {/* What I Worked On Section */}
         {project.whatIWorkedOn?.length > 0 && (
           <section className="project-section">
             <h2 className="project-section-title">
               What I Worked On
             </h2>

             <ul className="worked-on-list">
               {project.whatIWorkedOn.map((item, index) => (
                 <li key={index} className="worked-on-item">
                   <svg
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M5 13l4 4L19 7"
                     />
                   </svg>

                   <span>{item}</span>
                 </li>
               ))}
             </ul>
           </section>
         )}

         {/* Features Section */}
        {project.features.length > 0 && (
          <section className="project-section">
            <h2 className="project-section-title">
              Features
            </h2>
            <ul className="features-list">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="feature-item"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack Section */}
        {project.techStack.length > 0 && (
          <section className="project-section">
            <h2 className="project-section-title">
              Tech Stack
            </h2>
            <div className="tech-tags">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="tech-tag"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Plugins Section */}
        {project.plugins.length > 0 && (
          <section className="project-section">
            <h2 className="project-section-title">
              Plugins & Libraries
            </h2>
            <div className="plugin-tags">
              {project.plugins.map((plugin, index) => (
                <span
                  key={index}
                  className="plugin-tag"
                >
                  {plugin}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Screenshots Gallery */}
        {project.screenshots.length > 0 && (
          <section className="project-section">
            <h2 className="project-section-title">
              Screenshots
            </h2>
            <div className="screenshots-grid">
              {project.screenshots.map((screenshot, index) => (
                <figure
                  key={index}
                  className="screenshot-item"
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.alt || `Screenshot ${index + 1}`}
                  />
                  {screenshot.caption && (
                    <figcaption className="screenshot-caption">
                      {screenshot.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Back to Projects Link */}
        <div className="project-back-link">
          <Link
            to="/projects"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Projects
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProjectSingle;