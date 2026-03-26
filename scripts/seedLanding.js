// Simple Sanity seeder for a starter Landing Page (slug: 'home')
// Usage:
// 1) set SANITY_API_TOKEN with a token that has write permissions
//    export SANITY_API_TOKEN=sk....
// 2) run: node scripts/seedLanding.js

const sanityClient = require('@sanity/client');

const projectId = process.env.SANITY_PROJECT_ID || 'i7vyc4cx';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('ERROR: SANITY_API_TOKEN is required. Create a token in manage.sanity.io and export it as SANITY_API_TOKEN');
  process.exit(1);
}

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function seed() {
  try {
    const landingDoc = {
      _id: 'landingPage.home',
      _type: 'landingPage',
      title: 'Home',
      slug: { current: 'home' },
      heroSection: {
        headline: 'Proactive Care <span class="gradient-text">Management</span> for Better Outcomes',
        subheadline: 'OmniMed combines advanced technology with compassionate care to deliver proactive health management that keeps patients healthier, longer.',
        // backgroundImage: { }  // upload via Studio for best results
        ctaButtonText: 'Book a Consultation',
        ctaButtonLink: '/appointment',
        secondaryCtaText: 'Learn More',
        secondaryCtaLink: '/about',
      },
      statsSection: [
        { value: '10,000+', label: 'Patients Managed', icon: 'Users' },
        { value: '40%', label: 'Reduction in ER Visits', icon: 'TrendingUp' },
        { value: '24/7', label: 'Monitoring & Support', icon: 'Clock' },
      ],
      cta: {
        title: 'Ready to Transform Patient Care?',
        description: 'Join thousands of healthcare providers who trust OmniMed for proactive, technology-driven care management.',
        buttonText: 'Schedule a Demo',
        buttonLink: '/appointment',
      },
      publishedAt: new Date().toISOString(),
    };

    console.log('Upserting landing page (slug: home) ...');
    const res = await client.createOrReplace(landingDoc);
    console.log('Landing page created/updated:', res._id);

    // Optionally create default Site Settings if not present
    const settingsId = 'siteSettings.global';
    const existing = await client.getDocument(settingsId);
    if (!existing) {
      const settingsDoc = {
        _id: settingsId,
        _type: 'siteSettings',
        title: 'OmniMed',
        companyDescription: 'Proactive, technology-enabled care management for better health outcomes.',
      };
      await client.createIfNotExists(settingsDoc);
      console.log('Created default Site Settings');
    } else {
      console.log('Site Settings already exist, skipping creation');
    }

    console.log('Seeding complete. Open Sanity Studio and publish/upload images as needed.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
