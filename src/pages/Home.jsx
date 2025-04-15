import React from "react";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  // Featured projects data
  const featuredProjects = [
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
      title: "Dynamic Student Record Display",
      description:
        "This project implements a dynamic student table using web technologies. It offers a way to display student data in a clean and potentially interactive manner.",
      image: "images/student_table-1.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "Express.js"],
      githubLink: "https://github.com/karanhb-pixel/Student_table.git",
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
    },
  ];

  return (
    <>
      <Hero />

      <Skills />

      <section className="featured-projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
