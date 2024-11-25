// ./src/app/api/revalidate/route.ts
import { parseBody } from 'next-sanity/webhook';
import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import type { Locale } from '~/config';

type WebhookPayload = {
  _id: string;
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

    const tags = [body?._type, body?.slug?.current, body?._id].filter(
      Boolean,
    ) as string[];

    for (const tag of tags) {
      revalidateTag(tag);
    }

    if (slug) {
      revalidatePath(slug);
    }
    const message = `Updated route: ${slug} and tags: ${tags.join(', ')}`;
    return NextResponse.json({ body, message });
  } catch (err: unknown) {
    console.error(err);
    return new Response(err instanceof Error ? err.message : 'Unknown error', {
      status: 500,
    });
  }
}
