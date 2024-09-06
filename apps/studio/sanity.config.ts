import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { defaultDocumentNode, structure } from './structure';
import { assist } from '@sanity/assist';
import { documentInternationalization } from '@sanity/document-internationalization';
import { media } from 'sanity-plugin-media';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { internationalizedDocuments } from './schemaTypes/documents';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { resolve } from './resolve-presentation-document';

export default defineConfig({
  name: 'default',
  title: 'roboto-next-sanity',

  projectId: 'hlsgi7fv',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    assist({
      translate: {
        document: {
          languageField: 'language',
        },
      },
    }),
    unsplashImageAsset(),
    media(),
    iconPicker(),
    presentationTool({
      resolve: resolve,
      previewUrl: {
        origin:
          window.location.hostname === 'localhost'
            ? 'http://localhost:3000'
            : 'https://roboto-next-sanity-web-sbe4.vercel.app',
        previewMode: {
          enable: '/api/presentation-draft',
        },
      },
    }),
    documentInternationalization({
      schemaTypes: internationalizedDocuments,
      supportedLanguages: [
        { id: 'en-GB', title: 'English' },
        { id: 'de', title: 'German' },
        { id: 'fr', title: 'French' },
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
