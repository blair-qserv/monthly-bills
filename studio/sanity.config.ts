import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'monthly-bills',
//  token: 'skJ784VsPfr0wXVrqlbkcK1XcQC8j9c51ShS4OKJsoCEfB8M0MA6OoduP49YgoeIblZaTtXYo8OJGPA1FFH6wjJ8N6i3MrS4LphWUWm2XNhEobUvi7RGIwSl8vPlEqlMQSwAwUFHngQrURePcFR3nAao8yWV4ZIagULm4abEHn4zRdODlNDd',

  projectId: '7wv9b09h',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
