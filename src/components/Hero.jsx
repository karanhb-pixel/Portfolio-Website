import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PORTFOLIO_CONFIG } from "../config/constants";
import MagneticButton from "./MagneticButton";
import "../styles/Hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = clientX / window.innerWidth - 0.5;
        const yPos = clientY / window.innerHeight - 0.5;

        // Move image slightly (Foreground layer)
        gsap.to(imageRef.current, {
          x: xPos * 30,
          y: yPos * 30,
          duration: 0.6,
          ease: "power2.out",
        });

        // Move background shape in the opposite direction (Background layer)
        gsap.to(bgRef.current, {
          x: xPos * -50,
          y: yPos * -20,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: heroRef },
  );

  return (
    <section className="hero" ref={heroRef}>
      {/* Target the background shape */}
      <div className="hero-bg-shape" ref={bgRef}></div>

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
            <MagneticButton>
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact" className="btn btn-outline">
                Contact Me
              </Link>
            </MagneticButton>
          </div>
        </div>
        <div className="hero-image" ref={imageRef}>
          <img src="/images/hero-image.webp" alt="Developer illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
