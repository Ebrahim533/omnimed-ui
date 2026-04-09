import {defineField, defineType} from 'sanity'

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'string',
        }),
        defineField({
          name: 'secondaryCtaText',
          title: 'Secondary CTA Button Text',
          type: 'string',
        }),
        defineField({
          name: 'secondaryCtaLink',
          title: 'Secondary CTA Button Link',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroSlider',
      title: 'Hero Slider',
      type: 'array',
      description: 'Slider slides with images, headlines, and doctor info',
      of: [
        defineField({
          type: 'object',
          name: 'heroSlide',
          title: 'Hero Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headline',
              title: 'Headline',
              type: 'string',
              description: 'Full headline text (e.g., "Family Care With Personal Touch Always")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'highlightedWord',
              title: 'Highlighted Word',
              type: 'string',
              description: 'Word to highlight in blue (e.g., "Personal")',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'doctorName',
              title: 'Doctor Name',
              type: 'string',
              description: 'e.g., Dr. Emily Rodriguez',
            }),
            defineField({
              name: 'doctorTitle',
              title: 'Doctor Title',
              type: 'string',
              description: 'e.g., Family Medicine',
            }),
            defineField({
              name: 'availableTime',
              title: 'Available Time',
              type: 'string',
              description: 'e.g., Today 4:15 PM',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'string',
              description: 'e.g., 5.0/5',
            }),
            defineField({
              name: 'reviews',
              title: 'Reviews Text',
              type: 'string',
              description: 'e.g., 987 Reviews',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      description: 'About OmniMed hero section content',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g., "ABOUT OMNIMED"',
          initialValue: 'About OmniMed',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Full headline (e.g., "Redefining the Standard of Care")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Text to highlight in blue (e.g., "Standard of Care")',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          description: 'About section description paragraph',
        }),
        defineField({
          name: 'image',
          title: 'About Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Hero image for about section',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get in Touch',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'partnershipSection',
      title: 'Partnership Section',
      type: 'object',
      description: 'Partner page hero section content',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g., "Partnership Program"',
          initialValue: 'Partnership Program',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Full headline text',
          initialValue: 'Proactive, Technology-Enabled Care Management for Your Practice.',
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Text to highlight in gradient (e.g., "Care Management")',
          initialValue: 'Care Management',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Main paragraph text',
        }),
        defineField({
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          description: 'Bullet points with checkmarks',
          of: [
            defineField({
              type: 'string',
              name: 'benefit',
              title: 'Benefit',
            }),
          ],
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Dashboard/partnership visual image',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Apply for Partnership',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '#partner-form',
        }),
      ],
    }),
    defineField({
      name: 'clinicalImpactSection',
      title: 'Clinical Impact Section',
      type: 'object',
      description: 'Why Offer RPM & CCM section content',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Label',
          type: 'string',
          description: 'e.g., "Clinical Impact"',
          initialValue: 'Clinical Impact',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main headline (e.g., "Why Offer RPM & CCM?")',
          initialValue: 'Why Offer RPM & CCM?',
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Text to highlight in gradient (e.g., "RPM & CCM")',
          initialValue: 'RPM & CCM',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Main paragraph text',
        }),
        defineField({
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          description: 'List of benefit items with icons',
          of: [
            defineField({
              type: 'object',
              name: 'benefit',
              title: 'Benefit',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Benefit Text',
                  type: 'string',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Lucide icon name (e.g., "Activity", "ShieldCheck", "Users", "BarChart3", "DollarSign")',
                  initialValue: 'Activity',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'heroImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Dashboard/medical visualization image',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Start Your Partnership',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '#partner-form',
        }),
      ],
    }),
    defineField({
      name: 'statsSection',
      title: 'Stats Section',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Stat Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Stat Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name (Lucide)',
              type: 'string',
              description: 'e.g., "Users", "TrendingUp", "Clock", "Shield"',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}],
        },
      ],
    }),
    defineField({
      name: 'testimonialSection',
      title: 'Testimonial Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({
                  name: 'quote',
                  title: 'Quote',
                  type: 'text',
                  rows: 4,
                }),
                defineField({
                  name: 'author',
                  title: 'Author Name',
                  type: 'string',
                }),
                defineField({
                  name: 'role',
                  title: 'Author Role',
                  type: 'string',
                }),
                defineField({
                  name: 'avatar',
                  title: 'Author Avatar',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroSection.backgroundImage',
    },
  },
})
