import React, { useEffect, useRef, useState } from "react";
import {
  FaWordpress,
  FaCube,
  FaShoppingCart,
  FaLaptopCode,
  FaCode,
  FaCog
} from "react-icons/fa";
import "../styles/What I Can Do.css";

const iconMap = {
  "fab fa-wordpress": <FaWordpress />,
  "fas fa-cubes": <FaCube />,
  "fas fa-shopping-cart": <FaShoppingCart />,
  "fas fa-laptop-code": <FaLaptopCode />,
  "fas fa-code": <FaCode />,
  "fas fa-cog": <FaCog />
};

const WhatICanDo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    { id: 1, title: "WordPress Development", description: "Build and customize responsive WordPress websites for businesses and personal projects.", iconClass: "fab fa-wordpress" },
    { id: 2, title: "Elementor Development", description: "Create responsive page layouts and custom sections using Elementor.", iconClass: "fas fa-cubes" },
    { id: 3, title: "WooCommerce", description: "Customize product pages, shop layouts, and e-commerce interfaces.", iconClass: "fas fa-shopping-cart" },
    { id: 4, title: "Responsive Design", description: "Make websites work cleanly across desktop, tablet, and mobile devices.", iconClass: "fas fa-laptop-code" },
    { id: 5, title: "Custom CSS & JavaScript", description: "Customize WordPress and Elementor designs beyond their default options.", iconClass: "fas fa-code" },
    { id: 6, title: "Website Maintenance", description: "Update content, fix layout issues, and improve website usability.", iconClass: "fas fa-cog" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`section what-i-can-do ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title left-aligned">
          What I <span className="highlight-text">Can Do</span>
        </h2>
        <p className="section-intro">
          I build and customize responsive WordPress websites using Elementor, WooCommerce, HTML, CSS, and JavaScript.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="card-icon">
                {iconMap[service.iconClass] || null}
              </div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatICanDo;
