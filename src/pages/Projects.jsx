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
      technologies: ["React", "Node.js", "MySql", "Express.js"],
      githubLink: "https://github.com/karanhb-pixel/TODOList.git",
      liveLink: "https://example.com/",
      category: "web",
    },
    {
      id: 2,
      title: "Dynamic Student Record Display",
      description:
        "This project implements a dynamic student table using web technologies. It offers a way to display student data in a clean and potentially interactive manner.",
      image: "images/student_table-1.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "Express.js"],
      githubLink: "https://github.com/karanhb-pixel/Student_table.git",
      liveLink: "https://student-table-withcrud.netlify.app/",
      category: "web",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website template for developers and designers to showcase their work.",
      image: "/images/portfoliyo-website-1.jpg",
      technologies: ["HTML5", "CSS3", "JavaScript", "ReactJs"],
      githubLink: "https://github.com/karanhb-pixel/Portfolio-Website.git",
      liveLink: "https://karanbhanushali-portfolio.netlify.app/",
      category: "web",
    },
    {
      id: 4,
      title: "Next.js Dashboard Application",
      description:
        "A modern, full-stack dashboard application built with Next.js 14, featuring authentication, database integration, and real-time data visualization.",
      image: "/images/nextjs-dashboard.jpg",
      technologies: ["NextJs", "Tailwind CSS", "NextAuth.js", "PostgreSQL"],
      githubLink: "https://github.com/karanhb-pixel/nextjs-dashboard.git",
      liveLink: "https://nextjs-dashboard-nine-kappa-38.vercel.app/",
      category: "web",
    },
    {
      id: 5,
      title: "1Cable Network - React + Vite (Headless WordPress)",
      description:
        "1Cable Network is a headless WordPress application with a React (Vite) frontend for managing WiFi and OTT plans, users, and related workflows. The frontend consumes APIs and emphasizes performance, resilience, and modern UX.",
      image: "/images/1Cable-Network_HomePage.jpeg",
      technologies: ["ReactJs", "Axios", "Formik + Yup", "Mysql","Wordpress"],
      githubLink: "https://github.com/karanhb-pixel/1cable-network.git",
      liveLink: "http://1cable-network.infy.uk",
      category: "web",
    },
    {
      id: 6,
      title: "Game Dev Landing Page",
      description:
        "This application is a single-page website designed to promote and enroll users in a comprehensive Game Development course. It features sections including a hero section, course listings, testimonials, app download prompts, and a footer. The site is optimized for performance with lazy loading and includes SEO enhancements like a robots.txt file.",
      image: "/images/GameDev_homepage.jpeg",
      technologies: ["ReactJs", "TypeScript", "Vite", "CSS(with Custom Styles)","ESLint","Lazy Loading"],
      githubLink: "https://github.com/karanhb-pixel/figmaSite/tree/6e9a4232f88f5f678e8855e7f00ae750de7ed7c1/vite-project",
      liveLink: "http://1cable-network.infy.uk",
      category: "web",
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
