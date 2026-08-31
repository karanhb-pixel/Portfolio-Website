import React from "react";
import { FaDownload, FaUserGraduate } from "react-icons/fa";
import "../styles/About.css";
import MagneticButton from "../components/MagneticButton";

const About = () => {
  const education = [
    {
      degree: "Bachelor of Engineering (Computer Science)",
      institution: "Government Engineering College (GEC) Dahod",
      period: "2014 - 2018",
      description:
        "Academic Accomplishment: BE Computer Engineering with a CGPA of 8 from GEC College Dahod.",
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="/images/hero-image.png" alt="John Doe" />
            </div>
            <div className="about-text">
              <h1>About Me</h1>
              <p>
                I am a web developer focused on WordPress, Elementor, and frontend development. I have hands-on experience creating and customizing responsive websites using WordPress, Elementor, HTML, CSS, JavaScript, and WooCommerce. I also have experience working with React and modern web technologies, which helps me understand frontend structure, responsive design, and reusable UI components.
              </p>
              <MagneticButton>
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-primary resume-btn"
                >
                  <FaDownload /> Download Resume
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section className="education-section section">
        <div className="container">
          <h2 className="section-title">
            <FaUserGraduate /> Education
          </h2>
          <div className="timeline">
            {education.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-content">
                  <h3>{item.degree}</h3>
                  <h4>{item.institution}</h4>
                  <p className="timeline-period">{item.period}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
