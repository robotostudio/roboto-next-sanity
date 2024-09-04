// ./src/app/api/draft-mode/enable/route.ts

import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { client } from '~/lib/sanity/client';
import { token } from '~/lib/sanity/token';

const clientWithToken = client.withConfig({ token });

export async function GET(request: NextRequest) {
  if (!process.env.SANITY_API_TOKEN) {
    return new Response('Missing environment variable SANITY_API_TOKEN', {
      status: 500,
    });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  );

  console.log('🚀 ~ GET ~ isValid:', redirectTo);

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL('/', request.url));
}
