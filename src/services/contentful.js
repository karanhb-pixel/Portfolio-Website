import { createClient } from 'contentful';

// Validate environment variables
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  console.warn('Contentful credentials not found. Using fallback data.');
}

// Create Contentful client
export const client = createClient({
  space: spaceId || 'placeholder-space-id',
  accessToken: accessToken || 'placeholder-access-token',
});

// Check if Contentful is properly configured
export const isContentfulConfigured = () => {
  return spaceId && accessToken && spaceId !== 'placeholder-space-id';
};

// Fallback data for when Contentful is not available
export const FALLBACK_PROJECTS = [
  {
    id: '1',
    title: 'Minimalist To-Do List Application',
    description: 'A personal project to build a functional to-do list application. This web app allows users to manage their daily tasks efficiently through an intuitive interface, enabling them to add, modify, and track the completion of their activities.',
    image: '/images/TodoList-1.jpg',
    technologies: ['React', 'Node.js', 'MySql', 'Express.js'],
    githubLink: 'https://github.com/karanhb-pixel/TODOList.git',
    liveLink: 'https://example.com/',
    category: 'web',
  },
  {
    id: '2',
    title: 'Dynamic Student Record Display',
    description: 'This project implements a dynamic student table using web technologies. It offers a way to display student data in a clean and potentially interactive manner.',
    image: '/images/student_table-1.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express.js'],
    githubLink: 'https://github.com/karanhb-pixel/Student_table.git',
    liveLink: 'https://student-table-withcrud.netlify.app/',
    category: 'web',
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website template for developers and designers to showcase their work.',
    image: '/images/portfoliyo-website-1.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'ReactJs'],
    githubLink: 'https://github.com/karanhb-pixel/Portfolio-Website.git',
    liveLink: 'https://karanbhanushali-portfolio.netlify.app/',
    category: 'web',
  },
  {
    id: '4',
    title: 'Next.js Dashboard Application',
    description: 'A modern, full-stack dashboard application built with Next.js 14, featuring authentication, database integration, and real-time data visualization.',
    image: '/images/nextjs-dashboard.jpg',
    technologies: ['NextJs', 'Tailwind CSS', 'NextAuth.js', 'PostgreSQL'],
    githubLink: 'https://github.com/karanhb-pixel/nextjs-dashboard.git',
    liveLink: 'https://nextjs-dashboard-nine-kappa-38.vercel.app/',
    category: 'web',
  },
  {
    id: '5',
    title: '1Cable Network - React + Vite (Headless WordPress)',
    description: '1Cable Network is a headless WordPress application with a React (Vite) frontend for managing WiFi and OTT plans, users, and related workflows. The frontend consumes APIs and emphasizes performance, resilience, and modern UX.',
    image: '/images/1Cable-Network_HomePage.jpeg',
    technologies: ['ReactJs', 'Axios', 'Formik + Yup', 'Mysql', 'Wordpress'],
    githubLink: 'https://github.com/karanhb-pixel/1cable-network.git',
    liveLink: 'http://1cable-network.infy.uk',
    category: 'web',
  },
  {
    id: '6',
    title: 'Game Dev Landing Page',
    description: 'This application is a single-page website designed to promote and enroll users in a comprehensive Game Development course. It features sections including a hero section, course listings, testimonials, app download prompts, and a footer.',
    image: '/images/GameDev_homepage.jpeg',
    technologies: ['ReactJs', 'TypeScript', 'Vite', 'CSS(with Custom Styles)', 'ESLint', 'Lazy Loading'],
    githubLink: 'https://github.com/karanhb-pixel/figmaSite/tree/6e9a4232f88f5f678e8855e7f00ae750de7ed7c1/vite-project',
    liveLink: 'http://1cable-network.infy.uk',
    category: 'web',
  },
];

export const FALLBACK_SKILLS = [
  { name: 'HTML5', icon: 'FaHtml5', category: 'frontend' },
  { name: 'CSS3', icon: 'FaCss3Alt', category: 'frontend' },
  { name: 'JavaScript', icon: 'FaJs', category: 'frontend' },
  { name: 'React', icon: 'FaReact', category: 'frontend' },
  { name: 'Node.js', icon: 'FaNodeJs', category: 'backend' },
  { name: 'Git', icon: 'FaGitAlt', category: 'tools' },
  { name: 'Figma', icon: 'SiFigma', category: 'design' },
];

// Content fetching functions
export const fetchProjects = async () => {
  try {
    // Check if Contentful is properly configured
    if (!isContentfulConfigured()) {
      console.log('Using fallback projects data');
      return FALLBACK_PROJECTS;
    }

    // First check if the content type exists by fetching content types
    try {
      const contentTypes = await client.getContentTypes();
      const portfolioContentType = contentTypes.items.find(ct => ct.sys.id === 'portfolio');
      
      if (!portfolioContentType) {
        console.log('Content type "portfolio" not found in Contentful, using fallback data');
        return FALLBACK_PROJECTS;
      }
    } catch (ctError) {
      console.log('Unable to verify content types, using fallback data:', ctError.message);
      return FALLBACK_PROJECTS;
    }

    const response = await client.getEntries({
      content_type: 'portfolio',
      order: '-sys.createdAt',
    });
    return response.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.image?.fields?.file?.url ? `https:${item.fields.image.fields.file.url}` : '/images/portfoliyo-website-1.jpg',
      technologies: item.fields.technologies || [],
      githubLink: item.fields.githubLink || '',
      liveLink: item.fields.liveLink || '',
      category: item.fields.category || 'web',
    }));
  } catch (error) {
    // Check if it's specifically the unknown content type error
    if (error.message && error.message.includes('unknownContentType')) {
      console.log('Content type "portfolio" does not exist in Contentful, using fallback data');
    } else {
      console.error('Error fetching projects from Contentful:', error);
    }
    console.log('Falling back to local projects data');
    return FALLBACK_PROJECTS;
  }
};

export const fetchSkills = async () => {
  try {
    // Check if Contentful is properly configured
    if (!isContentfulConfigured()) {
      console.log('Using fallback skills data');
      return FALLBACK_SKILLS;
    }

    const response = await client.getEntries({
      content_type: 'skill',
      order: 'fields.name',
    });
    return response.items.map(item => ({
      name: item.fields.name,
      icon: item.fields.icon,
      category: item.fields.category || 'frontend',
    }));
  } catch (error) {
    console.error('Error fetching skills from Contentful:', error);
    console.log('Falling back to local skills data');
    return FALLBACK_SKILLS;
  }
};

export const fetchPersonalInfo = async () => {
  try {
    // Check if Contentful is properly configured
    if (!isContentfulConfigured()) {
      console.log('Using fallback personal info data');
      return {
        name: "Karan Bhanushali",
        role: "Frontend Developer & UI/UX Designer",
        location: "Navsari, India",
        email: "karan.9924304045@gmail.com",
        socialLinks: {
          github: "https://github.com/karanhb-pixel",
          linkedin: "https://www.linkedin.com/in/karan-bhanushali/",
          twitter: "https://twitter.com/karanbhanushali",
          email: "karan.9924304045@gmail.com",
        },
        projectLinks: {
          repository: "https://github.com/karanhb-pixel/portfolio",
          live: "https://karanbhanushali.dev",
        },
      };
    }

    const response = await client.getEntries({
      content_type: 'personalInfo',
      limit: 1,
    });
    
    if (response.items.length === 0) {
      console.log('No personal info found in Contentful, using fallback');
      return fetchPersonalInfo(); // This will trigger fallback
    }
    
    const item = response.items[0];
    return {
      name: item.fields.name || '',
      role: item.fields.role || '',
      location: item.fields.location || '',
      email: item.fields.email || '',
      socialLinks: item.fields.socialLinks || {},
      projectLinks: item.fields.projectLinks || {},
    };
  } catch (error) {
    console.error('Error fetching personal info from Contentful:', error);
    console.log('Falling back to local personal info data');
    return fetchPersonalInfo(); // This will trigger fallback
  }
};