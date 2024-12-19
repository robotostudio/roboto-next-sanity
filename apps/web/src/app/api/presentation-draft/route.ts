import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { client } from '~/lib/sanity/client';

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_TOKEN,
});

export async function GET(request: NextRequest) {
  if (!process.env.SANITY_API_TOKEN) {
    return new Response('Missing environment variable SANITY_API_TOKEN', {
      status: 500,
    });
  }

  const { isValid } = await validatePreviewUrl(clientWithToken, request.url);

  const params = new URLSearchParams(request.nextUrl.searchParams);
  const preview = params.get('sanity-preview-pathname');

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  (await draftMode()).enable();
  if (preview) {
    return NextResponse.redirect(new URL(preview, request.url));
  }
  return NextResponse.redirect(new URL('/', request.url));
}
