import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import ProjectCard from "../components/ProjectCard";
import WhatICanDo from "../components/What I Can Do";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { fetchFeaturedProjects } from "../services/contentful";
import "../styles/Home.css";

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await fetchFeaturedProjects();
        setFeaturedProjects(projects.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      <Hero />

      <Skills />

      <WhatICanDo />

      <section className="featured-projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {loading ? (
              <div className="loading-message">Loading projects...</div>
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="no-projects-message">No projects found</div>
            )}
          </div>
          <div className="view-all-projects">
            <Link to="/projects" className="view-all-link">
              View All Projects <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>Let's Work Together</h2>
            <p>Have a project in mind? I'm available for freelance work.</p>
            <Link to="/contact" className="btn btn-primary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
