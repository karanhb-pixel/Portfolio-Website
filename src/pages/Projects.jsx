import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../services/contentful";
import "../styles/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await fetchProjects();
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  if (loading) {
    return (
      <div className="projects-page">
        <section className="projects-hero section">
          <div className="container">
            <h1 className="page-title">My Projects</h1>
            <p className="page-description">Loading projects...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page">
        <section className="projects-hero section">
          <div className="container">
            <h1 className="page-title">My Projects</h1>
            <p className="page-description error">{error}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <section className="projects-hero section">
        <div className="container">
          <h1 className="page-title">My Projects</h1>
          <p className="page-description">
            Here's a collection of my recent work. Each project represents my
            skills, creativity, and problem-solving abilities.
          </p>

          <div className="project-filters">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>
            <button
              className={`filter-btn ${filter === "web" ? "active" : ""}`}
              onClick={() => setFilter("web")}
            >
              Web Development
            </button>
            <button
              className={`filter-btn ${filter === "design" ? "active" : ""}`}
              onClick={() => setFilter("design")}
            >
              UI/UX Design
            </button>
          </div>
        </div>
      </section>

      <section className="projects-grid-section section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
