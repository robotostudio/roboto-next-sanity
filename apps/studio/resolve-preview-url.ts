import { SanityDocument, Slug } from 'sanity';

const previewSecret = '34845f83-b24b-4896-b18a-061fffbb8bf1';

const localUrl = `http://localhost:3000`;

const remoteUrl = 'https://roboto-demo-new-web.vercel.app';

const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl;

export function resolvePreviewUrl(
  doc: SanityDocument & {
    slug?: {
      current: string;
    };
  },
) {
  const previewUrl = new URL(baseUrl);
  const slug = doc?.slug?.current ?? '/';
  previewUrl.pathname = `/api/draft`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append(`slug`, slug);
  return previewUrl.toString();
}
