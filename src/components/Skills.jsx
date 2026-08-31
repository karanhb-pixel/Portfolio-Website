import React, { useState, useEffect, useRef } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaWordpress,
  FaElementor
} from "react-icons/fa";
import { SiFigma,SiWoocommerce } from "react-icons/si";
import { fetchSkills } from "../services/contentful";
import { useGSAP } from "@gsap/react"; // Import useGSAP
import gsap from "gsap";
import "../styles/Skills.css";

const iconMap = {
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  FaJs: <FaJs />,
  FaReact: <FaReact />,
  FaNodeJs: <FaNodeJs />,
  FaGitAlt: <FaGitAlt />,
  SiFigma: <SiFigma />,
  FaWordpress : <FaWordpress />,
  FaElementor: <FaElementor />,
  SiWoocommerce: <SiWoocommerce />
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const container = useRef(null); // Ref for scoping

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const skillsData = await fetchSkills();
        setSkills(skillsData);
      } catch (err) {
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  // GSAP Floating Animation
  useGSAP(() => {
    if (skills.length > 0 && container.current) {
      const cards = gsap.utils.toArray(
        container.current.querySelectorAll(".skill-card"),
      );

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: -12, // Move up
          duration: 2 + Math.random(), // Varied speed for natural feel
          repeat: -1, // Infinite loop
          yoyo: true, // Reverse back
          ease: "sine.inOut", // Smooth curve
          delay: index * 0.2, // Staggered start
        });
      });
    }
  }, [skills]); // Trigger when skills are loaded

  if (loading)
    return (
      <section className="skills section">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );

  if (error) {
    return (
      <section className="skills section">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="skills section" ref={container}>
      <div className="container">
        <h2 className="section-title">My Expertise</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">
                {iconMap[skill.icon] || <FaJs />}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
