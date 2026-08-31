import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

// Helper function to safely get asset URL
const getAssetUrl = (asset) => {
  if (!asset || !asset.fields || !asset.fields.file) return null;
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
};

// Helper function to get asset details
const getAssetDetails = (asset) => {
  if (!asset || !asset.fields) return null;
  return {
    url: getAssetUrl(asset),
    alt: asset.fields.title || '',
    caption: asset.fields.description || '',
  };
};

// Fallback data for when Contentful is not available
export const FALLBACK_PROJECTS = [
  {
    id: '1',
    slug: 'minimalist-todo-list-application',
    title: 'Minimalist To-Do List Application',
    subtitle: 'A personal project to build a functional to-do list application',
    coverImageUrl: '/images/TodoList-1.jpg',
    techStack: ['React', 'Node.js', 'MySql', 'Express.js'],
    category: 'web',
  },
  {
    id: '2',
    slug: 'dynamic-student-record-display',
    title: 'Dynamic Student Record Display',
    subtitle: 'This project implements a dynamic student table using web technologies',
    coverImageUrl: '/images/student_table-1.jpg',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Express.js'],
    category: 'web',
  },
  {
    id: '3',
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'A modern, responsive portfolio website template',
    coverImageUrl: '/images/portfoliyo-website-1.jpg',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'ReactJs'],
    category: 'web',
  },
  {
    id: '4',
    slug: 'nextjs-dashboard-application',
    title: 'Next.js Dashboard Application',
    subtitle: 'A modern, full-stack dashboard application with authentication',
    coverImageUrl: '/images/nextjs-dashboard.jpg',
    techStack: ['NextJs', 'Tailwind CSS', 'NextAuth.js', 'PostgreSQL'],
    category: 'web',
  },
  {
    id: '5',
    slug: '1cable-network-react-vite',
    title: '1Cable Network - React + Vite (Headless WordPress)',
    subtitle: 'Headless WordPress with React frontend for WiFi and OTT plans',
    coverImageUrl: '/images/1Cable-Network_HomePage.jpeg',
    techStack: ['ReactJs', 'Axios', 'Formik + Yup', 'Mysql', 'Wordpress'],
    category: 'web',
  },
  {
    id: '6',
    slug: 'game-dev-landing-page',
    title: 'Game Dev Landing Page',
    subtitle: 'Single-page website for Game Development course promotion',
    coverImageUrl: '/images/GameDev_homepage.jpeg',
    techStack: ['ReactJs', 'TypeScript', 'Vite', 'CSS', 'ESLint'],
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
      const projectSingleContentType = contentTypes.items.find(ct => ct.sys.id === 'projectSingle');
      
      if (!projectSingleContentType) {
        console.log('Content type "projectSingle" not found in Contentful, using fallback data');
        return FALLBACK_PROJECTS;
      }
    } catch (ctError) {
      console.log('Unable to verify content types, using fallback data:', ctError.message);
      return FALLBACK_PROJECTS;
    }

    const response = await client.getEntries({
      content_type: 'projectSingle',
      order: '-sys.createdAt',
    });

    return response.items.map(item => {
      const fields = item.fields;
      const tags = item.metadata?.tags || [];
      const tagIds = tags.map(tag => tag.sys?.id);

      return {
        id: item.sys.id,
        title: fields.title,
        subtitle: fields.subtitle || "",
        slug: fields.slug,
        category: fields.category || "web",        // REQUIRED for filtering
        techStack: fields.techStack || [],
        tags: tagIds,
        coverImageUrl: fields.coverImage?.fields?.file?.url
          ? "https:" + fields.coverImage.fields.file.url
          : '/images/portfoliyo-website-1.jpg',
      };
    });
  } catch (error) {
    // Check if it's specifically the unknown content type error
    if (error.message && error.message.includes('unknownContentType')) {
      console.log('Content type "projectSingle" does not exist in Contentful, using fallback data');
    } else {
      console.error('Error fetching projects from Contentful:', error);
    }
    console.log('Falling back to local projects data');
    return FALLBACK_PROJECTS;
  }
};

// Fetch only featured projects
export const fetchFeaturedProjects = async () => {
  try {
    if (!isContentfulConfigured()) {
      console.log('Contentful not configured.');
      return [];
    }

    const response = await client.getEntries({
      content_type: 'projectSingle',
      order: '-sys.createdAt',
    });

    const featuredProjects = response.items.filter(item =>
      item.metadata?.tags?.some(
        tag => tag.sys?.id === 'featureProjects'
      )
    );

    return featuredProjects.map(item => {
      const fields = item.fields;
      const tags = item.metadata?.tags || [];
      const tagIds = tags.map(tag => tag.sys?.id);

      return {
        id: item.sys.id,
        title: fields.title,
        subtitle: fields.subtitle || "",
        slug: fields.slug,
        category: fields.category || "web",
        techStack: fields.techStack || [],
        tags: tagIds,
        coverImageUrl: fields.coverImage?.fields?.file?.url
          ? "https:" + fields.coverImage.fields.file.url
          : '/images/portfoliyo-website-1.jpg',
      };
    });

  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Fetch single project by slug for project detail page
export const fetchProjectBySlug = async (slug) => {
  try {
    // Check if Contentful is properly configured
    if (!isContentfulConfigured()) {
      console.log('Using fallback projects data for project lookup');
      // Find project in fallback data by slug
      const project = FALLBACK_PROJECTS.find(p => p.slug === slug);
      if (!project) {
        return null;
      }
      // Map fallback project to projectSingle format with minimal fallback data
      return {
        title: project.title,
        subtitle: project.subtitle,
        coverImageUrl: project.coverImageUrl,
        overviewHtml: `<p>${project.subtitle}</p><p>This is a project built with ${project.techStack.join(', ')}.</p>`,
        liveDemoUrl: '',
        githubUrl: '',
        features: ['Built with ' + project.techStack.join(', ')],
        techStack: project.techStack,
        plugins: [],
        screenshots: [],
      };
    }

    const response = await client.getEntries({
      content_type: 'projectSingle',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const entry = response.items[0];
    const fields = entry.fields;

    // Map screenshots array
    const screenshotsArray = fields.screenshots || [];
    const mappedScreenshots = screenshotsArray
      .map((screenshot) => getAssetDetails(screenshot))
      .filter((item) => item !== null && item.url !== null);

    // Convert rich text to HTML
    const overviewHtml = fields.overview
      ? documentToHtmlString(fields.overview)
      : '';

    // Build and return the mapped project object
    return {
      title: fields.title || '',
      subtitle: fields.subtitle || '',
      coverImageUrl: getAssetUrl(fields.coverImage),
      overviewHtml: overviewHtml,
      liveDemoUrl: fields.liveDemoUrl || '',
      githubUrl: fields.githubUrl || '',
      features: fields.features || [],
      techStack: fields.techStack || [],
      plugins: fields.plugins || [],
      screenshots: mappedScreenshots,
    };
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
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
      order: 'fields.order',
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