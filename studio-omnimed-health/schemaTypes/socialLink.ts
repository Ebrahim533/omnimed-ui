import {defineType} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: ['linkedin', 'twitter', 'github', 'email'],
        layout: 'radio',
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
})
