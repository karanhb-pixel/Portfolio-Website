// export-contentful.js
import fs from 'fs';
import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import dotenv from 'dotenv';
dotenv.config();

// Use same env vars you already use in Vite
const spaceId =
  process.env.VITE_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
const accessToken =
  process.env.VITE_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  console.error('❌ Missing Contentful credentials in .env');
  process.exit(1);
}

const client = createClient({
  space: spaceId,
  accessToken,
});

// Same helpers as in your contentful.js
const getAssetUrl = (asset) => {
  if (!asset || !asset.fields || !asset.fields.file) return null;
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
};

const getAssetDetails = (asset) => {
  if (!asset || !asset.fields) return null;
  return {
    url: getAssetUrl(asset),
    alt: asset.fields.title || '',
    caption: asset.fields.description || '',
  };
};

async function exportProjects() {
  console.log('🔍 Checking available content types...');
  const contentTypes = await client.getContentTypes();
  console.log('Available content types:', contentTypes.items.map(ct => ct.sys.id));
  
  // Try different variations of content type ID
  const contentTypeIds = ['projectSingle', 'project-single', 'project_single', 'projects'];
  
  for (const contentTypeId of contentTypeIds) {
    console.log(`\n📝 Trying content type: "${contentTypeId}"`);
    
    try {
      const response = await client.getEntries({
        content_type: contentTypeId,
        limit: 100,
      });
      
      console.log(`Found ${response.items.length} entries for "${contentTypeId}"`);
      
      if (response.items.length > 0) {
        const projects = response.items.map((item) => {
          const fields = item.fields;

          const screenshotsArray = fields.screenshots || [];
          const screenshots = screenshotsArray
            .map((shot) => getAssetDetails(shot))
            .filter((s) => s && s.url);

          const overviewHtml = fields.overview
            ? documentToHtmlString(fields.overview)
            : '';

          return {
            id: item.sys.id,
            slug: fields.slug,
            title: fields.title || '',
            subtitle: fields.subtitle || '',
            category: fields.category || 'web',
            techStack: fields.techStack || [],
            coverImageUrl: getAssetUrl(fields.coverImage),
            overviewHtml,
            liveDemoUrl: fields.liveDemoUrl || '',
            githubUrl: fields.githubUrl || '',
            features: fields.features || [],
            plugins: fields.plugins || [],
            screenshots, // [{ url, alt, caption }]
          };
        });
        
        console.log(`✅ Successfully exported ${projects.length} projects from "${contentTypeId}"`);
        return projects;
      }
    } catch (err) {
      console.log(`❌ Error with "${contentTypeId}": ${err.message}`);
    }
  }
  
  console.log('\n⚠️  No projects found. Returning empty array.');
  return [];
}

async function exportSkills() {
  const response = await client.getEntries({
    content_type: 'skill',
    order: 'fields.name',
  });

  const skills = response.items.map((item) => ({
    name: item.fields.name,
    icon: item.fields.icon,
    category: item.fields.category || 'frontend',
  }));

  return skills;
}

async function exportPersonalInfo() {
  const response = await client.getEntries({
    content_type: 'personalInfo',
    limit: 1,
  });

  if (!response.items.length) {
    return null;
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
}

async function main() {
  try {
    console.log('⬇️  Fetching data from Contentful...');
    console.log('Space ID:', spaceId ? '✅ Set' : '❌ Missing');
    console.log('Access Token:', accessToken ? '✅ Set' : '❌ Missing\n');
    
    const projects = await exportProjects();
    const skills = await exportSkills();
    const personalInfo = await exportPersonalInfo();

    console.log('\n📊 Export Summary:');
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Skills: ${skills.length}`);
    console.log(`   - Personal Info: ${personalInfo ? 'Yes' : 'No'}`);

    const data = {
      projects,
      skills,
      personalInfo,
    };

    fs.writeFileSync('content-export.json', JSON.stringify(data, null, 2));
    console.log('\n✅ Export complete → content-export.json');
  } catch (err) {
    console.error('\n❌ Export failed:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  }
}

main();
