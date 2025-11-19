import { fetchPersonalInfo } from '../services/contentful';

// Fallback data in case Contentful is not available
export const FALLBACK_PORTFOLIO_CONFIG = {
  name: "Karan Bhanushali",
  role: "Frontend Developer & UI/UX Designer",
  location: "Navsari, India",
  email: "karan.9924304045@gmail.com",
};

export const FALLBACK_SOCIAL_LINKS = {
  github: "https://github.com/karanhb-pixel",
  linkedin: "https://www.linkedin.com/in/karan-bhanushali/",
  twitter: "https://twitter.com/karanbhanushali",
  email: "karan.9924304045@gmail.com",
};

export const FALLBACK_PROJECT_LINKS = {
  repository: "https://github.com/karanhb-pixel/portfolio",
  live: "https://karanbhanushali.dev",
};

// Dynamic data from Contentful (or fallback)
export let PORTFOLIO_CONFIG = { ...FALLBACK_PORTFOLIO_CONFIG };
export let SOCIAL_LINKS = { ...FALLBACK_SOCIAL_LINKS };
export let PROJECT_LINKS = { ...FALLBACK_PROJECT_LINKS };

// Function to load data from Contentful
export const loadPersonalInfo = async () => {
  try {
    const personalInfo = await fetchPersonalInfo();
    if (personalInfo) {
      PORTFOLIO_CONFIG = {
        name: personalInfo.name || FALLBACK_PORTFOLIO_CONFIG.name,
        role: personalInfo.role || FALLBACK_PORTFOLIO_CONFIG.role,
        location: personalInfo.location || FALLBACK_PORTFOLIO_CONFIG.location,
        email: personalInfo.email || FALLBACK_PORTFOLIO_CONFIG.email,
      };

      SOCIAL_LINKS = {
        github: personalInfo.socialLinks?.github || FALLBACK_SOCIAL_LINKS.github,
        linkedin: personalInfo.socialLinks?.linkedin || FALLBACK_SOCIAL_LINKS.linkedin,
        twitter: personalInfo.socialLinks?.twitter || FALLBACK_SOCIAL_LINKS.twitter,
        email: personalInfo.socialLinks?.email || FALLBACK_SOCIAL_LINKS.email,
      };

      PROJECT_LINKS = {
        repository: personalInfo.projectLinks?.repository || FALLBACK_PROJECT_LINKS.repository,
        live: personalInfo.projectLinks?.live || FALLBACK_PROJECT_LINKS.live,
      };
    }
  } catch (error) {
    console.warn('Failed to load personal info from Contentful, using fallback data:', error);
  }
};

// Initialize data on module load
loadPersonalInfo();
