import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  const draft = draftMode();

  draft.enable();

  return redirect(slug);
}
