import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { PORTFOLIO_CONFIG, SOCIAL_LINKS } from "../config/constants";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>{PORTFOLIO_CONFIG.name}</h2>
            <p>{PORTFOLIO_CONFIG.role}</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Info</h3>
            <p>Email: {PORTFOLIO_CONFIG.email}</p>
            <p>Location: {PORTFOLIO_CONFIG.location}</p>
          </div>
        </div>

        <div className="footer-social">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a href={SOCIAL_LINKS.email} aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {PORTFOLIO_CONFIG.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
