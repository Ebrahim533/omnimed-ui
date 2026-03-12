import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schemas from './schemaTypes'

export default defineConfig({
  name: 'omnimed-ui-studio',
  title: 'OmniMed Health Studio',
  projectId: 'i7vyc4cx',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemas,
  },
})
