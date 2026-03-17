/**
 * Seed script for Sanity CMS
 * Populates the Sanity project with initial Person and SiteSettings data
 * 
 * Usage:
 * 1. Go to https://console.sanity.io/project/i7vyc4cx/dataset/production
 * 2. Click "Vision" in the bottom left
 * 3. Copy and paste the queries from this file to create documents
 * 
 * Or use the Sanity CLI:
 * npx sanity dataset import seed.json production --replace
 */

export const SEED_DATA = {
  people: [
    {
      _type: 'person',
      name: 'Dr. Sarah Chen',
      slug: { _type: 'slug', current: 'sarah-chen' },
      role: 'Chief Technology Officer',
      bio: '15+ years in health informatics and AI-driven care platforms. Sarah leads our technical vision and oversees platform development, ensuring OmniMed stays at the forefront of healthcare innovation.',
      featured: false,
      social: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/sarahchen'
        }
      ]
    },
    {
      _type: 'person',
      name: 'Marcus Rivera',
      slug: { _type: 'slug', current: 'marcus-rivera' },
      role: 'VP of Operations',
      bio: 'Scaled care management for 200+ provider networks nationwide. Marcus ensures seamless implementation and operations across all client partnerships.',
      featured: false,
      social: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/marcusrivera'
        }
      ]
    },
    {
      _type: 'person',
      name: 'Dr. Elena Vasquez',
      slug: { _type: 'slug', current: 'elena-vasquez' },
      role: 'Chief Clinical Officer',
      bio: 'Board-certified internist specializing in chronic disease management. Elena brings clinical expertise and patient-centered perspective to all our platform decisions.',
      featured: false,
      social: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/elenavasquez'
        }
      ]
    },
    {
      _type: 'person',
      name: 'Arjun Patel',
      slug: { _type: 'slug', current: 'arjun-patel' },
      role: 'Head of Data Science',
      bio: 'Former Google Health — building predictive models for proactive care. Arjun develops the AI algorithms that power OmniMed\'s predictive analytics.',
      featured: false,
      social: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/arjunpatel'
        }
      ]
    },
    {
      _type: 'person',
      name: 'Dr. James Mitchell',
      slug: { _type: 'slug', current: 'james-mitchell' },
      role: 'CEO & Founder',
      bio: 'We aren\'t just managing health — we\'re predicting a better quality of life. Every patient deserves care that anticipates their needs, not one that merely reacts to crises.',
      featured: true,
      social: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/jamesmitchell'
        }
      ]
    }
  ],
  siteSettings: {
    _type: 'siteSettings',
    _id: 'site-settings',
    title: 'OmniMed',
    logoAlt: 'OmniMed Logo',
    contactEmail: 'info@omnimedhealth.com',
    contactPhone: '(917) 744-7308',
    address: 'New York, NY 10001',
    companyDescription: 'Proactive, technology-enabled care management for better health outcomes. OmniMed combines advanced monitoring, data analytics, and compassionate coordination to deliver better outcomes for every patient.'
  }
}

/**
 * Manually create documents in Sanity Studio:
 * 
 * 1. Go to https://console.sanity.io/project/i7vyc4cx/dataset/production
 * 
 * 2. Create Site Settings Document:
 *    - Title: OmniMed
 *    - Contact Email: info@omnimedhealth.com
 *    - Contact Phone: (917) 744-7308
 *    - Address: New York, NY 10001
 *    - Company Description: Proactive, technology-enabled care management...
 *    - Upload images:
 *      * Logo
 *      * Hero Image
 *      * About Image
 *      * CEO Portrait
 *      * CEO Signature
 * 
 * 3. Create Person Documents (one for each):
 * 
 * Person 1:
 *   - Name: Dr. Sarah Chen
 *   - Role: Chief Technology Officer
 *   - Bio: 15+ years in health informatics and AI-driven care platforms...
 *   - Featured: OFF
 *   - Upload portrait image
 *   - Social: LinkedIn (https://linkedin.com/in/sarahchen)
 * 
 * Person 2:
 *   - Name: Marcus Rivera
 *   - Role: VP of Operations
 *   - Bio: Scaled care management for 200+ provider networks nationwide...
 *   - Featured: OFF
 *   - Upload portrait image
 *   - Social: LinkedIn (https://linkedin.com/in/marcusrivera)
 * 
 * Person 3:
 *   - Name: Dr. Elena Vasquez
 *   - Role: Chief Clinical Officer
 *   - Bio: Board-certified internist specializing in chronic disease management...
 *   - Featured: OFF
 *   - Upload portrait image
 *   - Social: LinkedIn (https://linkedin.com/in/elenavasquez)
 * 
 * Person 4:
 *   - Name: Arjun Patel
 *   - Role: Head of Data Science
 *   - Bio: Former Google Health — building predictive models for proactive care...
 *   - Featured: OFF
 *   - Upload portrait image
 *   - Social: LinkedIn (https://linkedin.com/in/arjunpatel)
 * 
 * Person 5 (CEO):
 *   - Name: Dr. James Mitchell
 *   - Role: CEO & Founder
 *   - Bio: We aren't just managing health — we're predicting a better quality of life...
 *   - Featured: ON (checked)
 *   - Upload portrait image
 *   - Upload signature image
 *   - Social: LinkedIn (https://linkedin.com/in/jamesmitchell)
 */
