import type { SanityDocument } from 'sanity';

// Environment configuration
const PREVIEW_CONFIG = {
  secret: '34845f83-b24b-4896-b18a-061fffbb8bf1',
  urls: {
    local: 'http://localhost:3000',
    production: 'https://template.roboto.studio',
  },
  draftPath: '/api/draft',
} as const;

// Type for documents that may have a slug
interface DocumentWithSlug extends SanityDocument {
  slug?: {
    current: string;
  };
}

/**
 * Resolves the preview URL for a Sanity document
 * @param doc - The Sanity document to generate preview URL for
 * @returns The complete preview URL as a string
 */
export function resolvePreviewUrl(doc: DocumentWithSlug): string {
  const baseUrl = window.location.hostname === 'localhost' 
    ? PREVIEW_CONFIG.urls.local 
    : PREVIEW_CONFIG.urls.production;

  const previewUrl = new URL(baseUrl);
  
  // Configure preview URL
  previewUrl.pathname = PREVIEW_CONFIG.draftPath;
  previewUrl.searchParams.append('secret', PREVIEW_CONFIG.secret);
  previewUrl.searchParams.append('slug', doc?.slug?.current ?? '/');

  return previewUrl.toString();
}
