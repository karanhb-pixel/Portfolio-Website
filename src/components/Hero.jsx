import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">John Doe</span>
          </h1>
          <h2 className="hero-subtitle">
            Frontend Developer & UI/UX Designer
          </h2>
          <p className="hero-description">
            I build responsive, user-friendly web applications with modern technologies.
            Let's work together to bring your ideas to life!
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View My Work</Link>
            <Link to="/contact" className="btn btn-outline">Contact Me</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.svg" alt="Developer illustration" />
        </div>
      </div>
    </section>
  )
}

export default Hero
