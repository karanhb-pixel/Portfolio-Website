# Project Understanding Prompt for LLM

You are analyzing a personal portfolio website project. Here are the key details to understand this project:

## Project Overview

- **Name**: Portfolio-Website
- **Description**: A personal portfolio website to showcase projects, skills, and experiences. Built with modern web technologies.
- **Primary Technologies**: React.js, HTML5, CSS3, JavaScript, GSAP (for animations)
- **Additional Technologies Demonstrated in Projects**: Node.js, Express.js, PostgreSQL, MySQL, Next.js, Tailwind CSS, NextAuth.js, Git, Figma

## Project Structure

- **Root**: Contains configuration files (.env.example, .gitignore, package.json, vite.config.js, netlify.toml, README.md, etc.)
- **public/**: Static assets including images, resume.pdf, robots.txt, \_redirects
- **src/**: Source code
  - **components/**: Reusable React components (Header, Footer, Hero, ContactForm, Skills, ProjectCard, IdleGachaCaseStudy)
  - **pages/**: Page components (Home, About, Projects, Contact, project-single)
  - **services/**: Contentful service integration (contentful.js)
  - **context/**: Theme context (ThemeContext.jsx)
  - **config/**: Constants (constants.js)
  - **styles/**: CSS modules for each component and page
  - **App.jsx**: Main application component with routing
  - **main.jsx**: Entry point
  - **store.js**: (Possibly for state management, though not used in current setup)

## Key Features

- Clean and modern design
- Responsive layout for mobile and desktop
- Project showcase section
- About/Bio section
- Contact form
- Easy customization
- Contentful CMS integration for dynamic content management (projects, skills, personal info)
- Theme context (likely for light/dark mode)
- React Router for client-side routing
- Vite as build tool and development server

## Setup and Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. For Contentful integration:
   - Copy `.env.example` to `.env`
   - Add Contentful Space ID and Access Token
   - Set up content types in Contentful (project, skill, personalInfo) as per CONTENTFUL_SETUP.md
   - Migrate sample data (provided in CONTENTFUL_SETUP.md)
4. Start development server with `npm run dev` (or `npm start` as both are now available in package.json)

## Contentful CMS Integration

The project is designed to integrate with Contentful for dynamic content management:

- **Content Types**: project, skill, personalInfo
- **Service File**: `src/services/contentful.js` contains functions to fetch data from Contentful
- **Environment Variables**: `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ACCESS_TOKEN`
- **Benefits**: Dynamic content updates without code changes, collaborative editing, version control, API readiness, SEO friendly, free tier available

## Deployment

- Can be deployed to Netlify, Vercel, GitHub Pages, etc.
- Netlify deployment guide available in NETLIFY_DEPLOYMENT_GUIDE.md
- Environment variables must be set in hosting platform for production

## Current State

The project currently uses static data in React components but is prepared for Contentful integration.
The sample data for migration is provided in CONTENTFUL_SETUP.md (6 projects, 7 skills, 1 personal info entry).

## Important Files to Review

- README.md: General overview and setup
- CONTENTFUL_SETUP.md: Detailed Contentful integration guide
- package.json: Dependencies and scripts
- src/App.jsx: Main routing and layout
- src/services/contentful.js: Contentful service functions
- src/pages/Projects.jsx: Sample project data (to be replaced with Contentful data)
- src/components/Skills.jsx: Sample skills data
- src/pages/About.jsx: Sample personal info data

This portfolio website is ready for customization and Contentful CMS integration to become a dynamic, easily maintainable portfolio.
