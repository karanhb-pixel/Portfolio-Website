import React, { useState, useEffect } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";
import { SiFigma } from "react-icons/si";
import { fetchSkills } from "../services/contentful";
import "../styles/Skills.css";

// Icon mapping for Contentful skill data
const iconMap = {
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  FaJs: <FaJs />,
  FaReact: <FaReact />,
  FaNodeJs: <FaNodeJs />,
  FaGitAlt: <FaGitAlt />,
  SiFigma: <SiFigma />,
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const skillsData = await fetchSkills();
        setSkills(skillsData);
        setError(null);
      } catch (err) {
        setError('Failed to load skills. Please try again later.');
        console.error('Error loading skills:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  if (loading) {
    return (
      <section className="skills section">
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <p>Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="skills section">
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <p className="error">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="skills section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{iconMap[skill.icon] || <FaJs />}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
