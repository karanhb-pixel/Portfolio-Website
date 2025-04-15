import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";
import { SiFigma } from "react-icons/si";
import "../styles/Skills.css";

const Skills = () => {
  const skills = [
    { name: "HTML5", icon: <FaHtml5 />, category: "frontend" },
    { name: "CSS3", icon: <FaCss3Alt />, category: "frontend" },
    { name: "JavaScript", icon: <FaJs />, category: "frontend" },
    { name: "React", icon: <FaReact />, category: "frontend" },
    { name: "Node.js", icon: <FaNodeJs />, category: "backend" },
    { name: "Git", icon: <FaGitAlt />, category: "tools" },
    { name: "Figma", icon: <SiFigma />, category: "design" },
  ];

  return (
    <section className="skills section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
