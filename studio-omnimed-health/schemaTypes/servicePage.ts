import {defineField, defineType} from 'sanity'

export const servicePageType = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    // ─── Core Identification ───
    defineField({
      name: 'label',
      title: 'Service Label',
      type: 'string',
      description: 'Short identifier for the service (e.g., "Principal Care Management")',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this service page',
      options: {
        source: 'label',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ─── Hero Section ───
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main title displayed in the hero section',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subheadline',
      type: 'text',
      description: 'Description text under the headline',
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main hero image for the service page',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ─── Hero Stats ───
    defineField({
      name: 'heroStats',
      title: 'Hero Statistics',
      type: 'array',
      description: 'Key metrics displayed in the sidebar (3-6 items recommended)',
      of: [
        defineField({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Stat Value',
              type: 'string',
              description: 'e.g., "98%", "24/7", "100%"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Stat Label',
              type: 'string',
              description: 'e.g., "Patient Satisfaction", "Care Team Access"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(2).max(6),
    }),

    // ─── Feature Highlights ───
    defineField({
      name: 'featureHighlights',
      title: 'Feature Highlights',
      type: 'array',
      description: 'List of feature tags displayed with checkmarks',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.min(1).max(8),
    }),

    // ─── How It Works ───
    defineField({
      name: 'howItWorksSteps',
      title: 'How It Works Steps',
      type: 'array',
      description: 'Ordered steps explaining the service process',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: 'howItWorksImage',
      title: 'How It Works Image',
      type: 'image',
      description: 'Image displayed in the How It Works section alongside the steps',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),

    // ─── Support Items ───
    defineField({
      name: 'supportItems',
      title: 'Support Items',
      type: 'array',
      description: 'Service offerings displayed in the "Our Support Includes" section',
      of: [
        defineField({
          type: 'object',
          name: 'supportItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required().max(200),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),

    // ─── Included Items ───
    defineField({
      name: 'includedItems',
      title: 'Included Items',
      type: 'array',
      description: 'Detailed features in the accordion section',
      of: [
        defineField({
          type: 'object',
          name: 'includedItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              description: 'Detailed description (shown when accordion is expanded)',
              rows: 4,
              validation: (Rule) => Rule.required().min(20).max(500),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
            },
          },
        }),
      ],
    }),

    // ─── CTA ───
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Text for the main call-to-action button',
      initialValue: 'Get Started',
      validation: (Rule) => Rule.required().max(30),
    }),

    // ─── SEO ───
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Meta title for search engines',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social sharing',
      options: {
        hotspot: true,
      },
    }),

    // ─── Publishing ───
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'headline',
      media: 'heroImage',
    },
  },
})
