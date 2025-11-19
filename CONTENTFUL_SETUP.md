# Contentful CMS Integration Guide

This guide will help you integrate Contentful CMS with your portfolio website for managing projects, skills, and personal information dynamically.

## Setup Instructions

### 1. Create Contentful Account
1. Go to [contentful.com](https://www.contentful.com/) and sign up for a free account
2. Create a new space for your portfolio
3. Note down your Space ID and generate an API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your Contentful credentials:
   ```
   VITE_CONTENTFUL_SPACE_ID=your-actual-space-id
   VITE_CONTENTFUL_ACCESS_TOKEN=your-actual-access-token
   ```

### 3. Create Content Models in Contentful

#### A. Project Content Model
Create a content type named `project` with the following fields:

**Fields:**
- `title` (Short text, required)
- `description` (Long text, required)
- `image` (Media, single image, required)
- `technologies` (Short text, list, required)
- `githubLink` (Short text, required)
- `liveLink` (Short text, required)
- `category` (Short text, required)

**Validation:**
- `category`: Set to accept values: "web", "design"

#### B. Skill Content Model
Create a content type named `skill` with the following fields:

**Fields:**
- `name` (Short text, required)
- `icon` (Short text, required) - Store icon identifier (e.g., "FaReact", "FaHtml5")
- `category` (Short text, required)

**Validation:**
- `category`: Set to accept values: "frontend", "backend", "design", "tools"

#### C. Personal Info Content Model
Create a content type named `personalInfo` with the following fields:

**Fields:**
- `name` (Short text, required)
- `role` (Short text, required)
- `location` (Short text, required)
- `email` (Short text, required)
- `socialLinks` (JSON object, required)
- `projectLinks` (JSON object, required)

### 4. Data Migration

#### Migrate Projects Data
Your current projects from `src/pages/Projects.jsx`:

```json
// Create 6 project entries in Contentful:

// Project 1: Todo List
{
  "title": "Minimalist To-Do List Application",
  "description": "A personal project to build a functional to-do list application. This web app allows users to manage their daily tasks efficiently through an intuitive interface, enabling them to add, modify, and track the completion of their activities.",
  "technologies": ["React", "Node.js", "MySql", "Express.js"],
  "githubLink": "https://github.com/karanhb-pixel/TODOList.git",
  "liveLink": "https://example.com/",
  "category": "web"
}

// Project 2: Student Table
{
  "title": "Dynamic Student Record Display",
  "description": "This project implements a dynamic student table using web technologies. It offers a way to display student data in a clean and potentially interactive manner.",
  "technologies": ["React", "Node.js", "PostgreSQL", "Express.js"],
  "githubLink": "https://github.com/karanhb-pixel/Student_table.git",
  "liveLink": "https://student-table-withcrud.netlify.app/",
  "category": "web"
}

// Project 3: Portfolio
{
  "title": "Portfolio Website",
  "description": "A modern, responsive portfolio website template for developers and designers to showcase their work.",
  "technologies": ["HTML5", "CSS3", "JavaScript", "ReactJs"],
  "githubLink": "https://github.com/karanhb-pixel/Portfolio-Website.git",
  "liveLink": "https://karanbhanushali-portfolio.netlify.app/",
  "category": "web"
}

// Project 4: Next.js Dashboard
{
  "title": "Next.js Dashboard Application",
  "description": "A modern, full-stack dashboard application built with Next.js 14, featuring authentication, database integration, and real-time data visualization.",
  "technologies": ["NextJs", "Tailwind CSS", "NextAuth.js", "PostgreSQL"],
  "githubLink": "https://github.com/karanhb-pixel/nextjs-dashboard.git",
  "liveLink": "https://nextjs-dashboard-nine-kappa-38.vercel.app/",
  "category": "web"
}

// Project 5: 1Cable Network
{
  "title": "1Cable Network - React + Vite (Headless WordPress)",
  "description": "1Cable Network is a headless WordPress application with a React (Vite) frontend for managing WiFi and OTT plans, users, and related workflows. The frontend consumes APIs and emphasizes performance, resilience, and modern UX.",
  "technologies": ["ReactJs", "Axios", "Formik + Yup", "Mysql","Wordpress"],
  "githubLink": "https://github.com/karanhb-pixel/1cable-network.git",
  "liveLink": "http://1cable-network.infy.uk",
  "category": "web"
}

// Project 6: Game Dev
{
  "title": "Game Dev Landing Page",
  "description": "This application is a single-page website designed to promote and enroll users in a comprehensive Game Development course. It features sections including a hero section, course listings, testimonials, app download prompts, and a footer. The site is optimized for performance with lazy loading and includes SEO enhancements like a robots.txt file.",
  "technologies": ["ReactJs", "TypeScript", "Vite", "CSS(with Custom Styles)","ESLint","Lazy Loading"],
  "githubLink": "https://github.com/karanhb-pixel/figmaSite/tree/6e9a4232f88f5f678e8855e7f00ae750de7ed7c1/vite-project",
  "liveLink": "http://1cable-network.infy.uk",
  "category": "web"
}
```

#### Migrate Skills Data
Create 7 skill entries in Contentful:

```json
{
  "name": "HTML5",
  "icon": "FaHtml5",
  "category": "frontend"
}

{
  "name": "CSS3",
  "icon": "FaCss3Alt",
  "category": "frontend"
}

{
  "name": "JavaScript",
  "icon": "FaJs",
  "category": "frontend"
}

{
  "name": "React",
  "icon": "FaReact",
  "category": "frontend"
}

{
  "name": "Node.js",
  "icon": "FaNodeJs",
  "category": "backend"
}

{
  "name": "Git",
  "icon": "FaGitAlt",
  "category": "tools"
}

{
  "name": "Figma",
  "icon": "SiFigma",
  "category": "design"
}
```

#### Migrate Personal Info
Create 1 personalInfo entry in Contentful:

```json
{
  "name": "Karan Bhanushali",
  "role": "Frontend Developer & UI/UX Designer",
  "location": "Navsari, India",
  "email": "karan.9924304045@gmail.com",
  "socialLinks": {
    "github": "https://github.com/karanhb-pixel",
    "linkedin": "https://www.linkedin.com/in/karan-bhanushali/",
    "twitter": "https://twitter.com/karanbhanushali",
    "email": "karan.9924304045@gmail.com"
  },
  "projectLinks": {
    "repository": "https://github.com/karanhb-pixel/portfolio",
    "live": "https://karanbhanushali.dev"
  }
}
```

### 5. React Component Integration

After setting up Contentful and migrating your data, the next step is to update your React components to use the Contentful API. The service functions in `src/services/contentful.js` are ready to use.

### 6. Environment Variables in Production

For production deployment:
- Vite automatically includes environment variables starting with `VITE_`
- Make sure to set your Contentful credentials in your hosting platform
- For Netlify, set them in Site Settings > Environment Variables
- For Vercel, set them in Project Settings > Environment Variables

### 7. Benefits of This Integration

✅ **Dynamic Content Management**: Update projects, skills, and personal info without code changes  
✅ **Collaborative Editing**: Multiple people can manage content  
✅ **Version Control**: All content changes are tracked  
✅ **API Ready**: Same data can be used for mobile apps or other platforms  
✅ **SEO Friendly**: Contentful provides excellent SEO capabilities  
✅ **Free Tier**: Generous free tier for personal projects  

### 8. Content Management Workflow

1. **Content Creation**: Use Contentful's web interface to add/edit content
2. **Publishing**: Publish changes which are immediately available via API
3. **Frontend Updates**: Your React app automatically fetches the latest content
4. **Backup**: All content is automatically backed up in Contentful

### 9. Next Steps

After setting up Contentful, you'll need to:
1. Update your React components to use the Contentful service functions
2. Add loading states and error handling
3. Test the integration thoroughly
4. Deploy your updated application

The integration will make your portfolio much more maintainable and allow you to focus on development rather than hardcoding content changes.