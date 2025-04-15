import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/Projects.css";

const Projects = () => {
  const allProjects = [
    {
      id: 1,
      title: "Minimalist To-Do List Application",
      description:
        "A personal project to build a functional to-do list application. This web app allows users to manage their daily tasks efficiently through an intuitive interface, enabling them to add, modify, and track the completion of their activities.",
      image: "images/TodoList-1.jpg",
      technologies: ["React", "Node.js", "MySql", "express"],
      githubLink: "https://github.com/karanhb-pixel/TODOList.git",
      liveLink: "https://example.com/",
      category: "web",
    },
    {
      id: 2,
      title: "Travel Planner App",
      description:
        "A mobile-responsive web application that helps users plan their trips with itinerary management and location suggestions.",
      image: "/images/project2.jpg",
      technologies: ["React", "Firebase", "Google Maps API", "Tailwind CSS"],
      githubLink: "https://github.com/",
      liveLink: "https://example.com/",
      category: "web",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website template for developers and designers to showcase their work.",
      image: "/images/project3.jpg",
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      githubLink: "https://github.com/",
      liveLink: "https://example.com/",
      category: "web",
    },
    {
      id: 4,
      title: "Weather App",
      description:
        "A weather application that provides real-time weather information and forecasts for locations worldwide.",
      image: "/images/project4.jpg",
      technologies: ["React", "OpenWeather API", "CSS3"],
      githubLink: "https://github.com/",
      liveLink: "https://example.com/",
      category: "web",
    },
    {
      id: 5,
      title: "Task Management UI",
      description:
        "A clean and intuitive user interface design for a task management application.",
      image: "/images/project5.jpg",
      technologies: ["Figma", "Adobe XD", "UI/UX"],
      githubLink: "https://github.com/",
      liveLink: "https://example.com/",
      category: "design",
    },
    {
      id: 6,
      title: "Mobile Banking App",
      description:
        "A mobile banking application design with a focus on user experience and security.",
      image: "/images/project6.jpg",
      technologies: ["Figma", "Prototyping", "UI/UX"],
      githubLink: "https://github.com/",
      liveLink: "https://example.com/",
      category: "design",
    },
  ];

  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === filter);

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
