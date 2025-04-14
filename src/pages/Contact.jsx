import React from "react";
import ContactForm from "../components/ContactForm";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { PORTFOLIO_CONFIG, SOCIAL_LINKS } from "../config/constants";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-description">
            Have a question or want to work together? Feel free to contact me
            using the form below or through any of my social media channels.
          </p>
        </div>
      </section>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>
                I'm currently available for freelance work. If you have a
                project that needs some creative touch, I'd love to hear about
                it.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-text">
                    <h3>Location</h3>
                    <p>Navsari, India.</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p>karan.9924304045@gmail.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-text">
                    <h3>Phone</h3>
                    <p>9924304045</p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h3>Connect With Me</h3>
                <div className="social-links">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send Me a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
