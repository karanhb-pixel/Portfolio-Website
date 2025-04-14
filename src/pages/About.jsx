import React from 'react'
import { FaDownload, FaUserGraduate, FaBriefcase } from 'react-icons/fa'
import '../styles/About.css'

const About = () => {
  const education = [
    {
      degree: 'Master of Computer Science',
      institution: 'Stanford University',
      period: '2018 - 2020',
      description: 'Specialized in Human-Computer Interaction and Web Technologies.'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      period: '2014 - 2018',
      description: 'Graduated with honors. Focused on Software Engineering and UI/UX Design.'
    }
  ]

  const experience = [
    {
      position: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Lead the frontend development team in building responsive web applications. Implemented modern UI/UX designs and improved performance by 40%.'
    },
    {
      position: 'UI/UX Developer',
      company: 'Digital Solutions LLC',
      period: '2020 - 2021',
      description: 'Designed and developed user interfaces for various clients. Collaborated with UX researchers to implement user-centered designs.'
    },
    {
      position: 'Web Developer Intern',
      company: 'StartUp Hub',
      period: '2019 - 2020',
      description: 'Assisted in developing web applications using React and Node.js. Participated in agile development processes.'
    }
  ]

  return (
    <div className="about-page">
      <section className="about-hero section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="/images/profile.jpg" alt="John Doe" />
            </div>
            <div className="about-text">
              <h1>About Me</h1>
              <p>
                Hello! I'm John Doe, a passionate frontend developer and UI/UX designer based in New York. 
                I enjoy creating beautiful, functional, and user-friendly web applications.
              </p>
              <p>
                With over 5 years of experience in web development, I've worked on various projects 
                ranging from small business websites to complex web applications. I'm dedicated to 
                writing clean, efficient code and creating intuitive user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or enjoying outdoor activities.
              </p>
              <a href="/resume.pdf" download className="btn btn-primary resume-btn">
                <FaDownload /> Download Resume
              </a>
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

      <section className="experience-section section">
        <div className="container">
          <h2 className="section-title">
            <FaBriefcase /> Work Experience
          </h2>
          <div className="timeline">
            {experience.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-content">
                  <h3>{item.position}</h3>
                  <h4>{item.company}</h4>
                  <p className="timeline-period">{item.period}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
