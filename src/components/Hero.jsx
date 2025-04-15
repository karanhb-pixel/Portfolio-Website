import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PORTFOLIO_CONFIG } from "../config/constants";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">{PORTFOLIO_CONFIG.name}</span>
          </h1>
          <h2 className="hero-subtitle">{PORTFOLIO_CONFIG.role}</h2>
          <p className="hero-location">
            <FaMapMarkerAlt /> {PORTFOLIO_CONFIG.location}
          </p>
          <p className="hero-description">
            React.js, CSS, and fundamental database knowledge for web
            application development.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Me
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.png" alt="Developer illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
