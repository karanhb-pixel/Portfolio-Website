// Fallback data in case Contentful is not available
export const FALLBACK_PORTFOLIO_CONFIG = {
  name: "Karan Bhanushali",
  role: "WordPress Developer | Elementor | Frontend Development",
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

// Dynamic data from Contentful (or fallback) - initially set to fallback
export const PORTFOLIO_CONFIG = { ...FALLBACK_PORTFOLIO_CONFIG };
export const SOCIAL_LINKS = { ...FALLBACK_SOCIAL_LINKS };
export const PROJECT_LINKS = { ...FALLBACK_PROJECT_LINKS };

// Function to load data from Contentful and update constants
export const loadPersonalInfo = async () => {
  try {
    const { fetchPersonalInfo } = await import('../services/contentful');
    const personalInfo = await fetchPersonalInfo();
    if (personalInfo) {
      // Update PORTFOLIO_CONFIG
      Object.assign(PORTFOLIO_CONFIG, {
        name: personalInfo.name || FALLBACK_PORTFOLIO_CONFIG.name,
        role: personalInfo.role || FALLBACK_PORTFOLIO_CONFIG.role,
        location: personalInfo.location || FALLBACK_PORTFOLIO_CONFIG.location,
        email: personalInfo.email || FALLBACK_PORTFOLIO_CONFIG.email,
      });

      // Update SOCIAL_LINKS
      Object.assign(SOCIAL_LINKS, {
        github: personalInfo.socialLinks?.github || FALLBACK_SOCIAL_LINKS.github,
        linkedin: personalInfo.socialLinks?.linkedin || FALLBACK_SOCIAL_LINKS.linkedin,
        twitter: personalInfo.socialLinks?.twitter || FALLBACK_SOCIAL_LINKS.twitter,
        email: personalInfo.socialLinks?.email || FALLBACK_SOCIAL_LINKS.email,
      });

      // Update PROJECT_LINKS
      Object.assign(PROJECT_LINKS, {
        repository: personalInfo.projectLinks?.repository || FALLBACK_PROJECT_LINKS.repository,
        live: personalInfo.projectLinks?.live || FALLBACK_PROJECT_LINKS.live,
      });
    }
  } catch (error) {
    console.warn('Failed to load personal info from Contentful, using fallback data:', error);
  }
};
