import React from 'react'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import '../styles/Home.css'

const Home = () => {
  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive dashboard for e-commerce businesses with analytics, inventory management, and order processing.',
      image: '/images/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      githubLink: 'https://github.com/',
      liveLink: 'https://example.com/'
    },
    {
      id: 2,
      title: 'Travel Planner App',
      description: 'A mobile-responsive web application that helps users plan their trips with itinerary management and location suggestions.',
      image: '/images/project2.jpg',
      technologies: ['React', 'Firebase', 'Google Maps API', 'Tailwind CSS'],
      githubLink: 'https://github.com/',
      liveLink: 'https://example.com/'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website template for developers and designers to showcase their work.',
      image: '/images/project3.jpg',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      githubLink: 'https://github.com/',
      liveLink: 'https://example.com/'
    }
  ]

  return (
    <>
      <Hero />
      
      <Skills />
      
      <section className="featured-projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {featuredProjects.map(project => (
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
            <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
