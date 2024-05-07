// ./src/app/api/revalidate/route.ts
import { parseBody } from 'next-sanity/webhook';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { Locale, getSanityTags } from '~/config';

type WebhookPayload = {
  _type: string;
  slug?: {
    current?: string;
  };
  language?: Locale;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const slug = body?.slug?.current;
    const tags = getSanityTags({
      type: body._type,
      locale: body?.language,
      slug,
    });
    tags.forEach((tag) => revalidateTag(tag));

    revalidateTag(body._type);

    if (slug) {
      revalidatePath(slug);
    }
    const message = `Updated route: ${slug} and tags: ${tags.join(', ')}`;
    return NextResponse.json({ body, message });
  } catch (err: any) {
    console.error(err);
    return new Response(err?.message, { status: 500 });
  }
}
