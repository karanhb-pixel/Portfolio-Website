import { createClient } from 'contentful';

// Create Contentful client
export const client = createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID || 'your-space-id',
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'your-access-token',
});

// Content fetching functions
export const fetchProjects = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'project',
      order: '-sys.createdAt',
    });
    return response.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.image?.fields?.file?.url ? `https:${item.fields.image.fields.file.url}` : '',
      technologies: item.fields.technologies || [],
      githubLink: item.fields.githubLink || '',
      liveLink: item.fields.liveLink || '',
      category: item.fields.category || 'web',
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchSkills = async () => {
  try {
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
    console.error('Error fetching skills:', error);
    return [];
  }
};

export const fetchPersonalInfo = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'personalInfo',
      limit: 1,
    });
    
    if (response.items.length === 0) return null;
    
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
    console.error('Error fetching personal info:', error);
    return null;
  }
};