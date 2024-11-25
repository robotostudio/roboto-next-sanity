/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { ImageResponseOptions } from 'next/server';
import { getBlogPageOGData } from '~/components/pages/blog-page/blog-page-api';
import { getMainPageOGData } from '~/components/pages/main-page/main-page-api';
import {
  getGenericPageOGData,
  getSlugPageOGData,
} from '~/components/pages/slug-page/slug-page-api';

import { ogImageDimensions } from '~/config';
import { getTitleCase } from '~/lib/helper';
import type { Maybe } from '~/types';

export const runtime = 'edge';

const errorContent = (
  <div tw="flex flex-col w-full h-full items-center justify-center">
    <div tw=" flex w-full h-full items-center justify-center ">
      <h1 tw="text-white">Something went Wrong with image generation</h1>
    </div>
  </div>
);

type SeoImageRenderProps = {
  seoImage: string;
};

type ContentProps = Record<string, string>;

type DominantColorSeoImageRenderProps = {
  image?: Maybe<string>;
  title?: Maybe<string>;
  logo?: Maybe<string>;
  dominantColor?: Maybe<string>;
  date?: Maybe<string>;
  _type?: Maybe<string>;
};

const seoImageRender = ({ seoImage }: SeoImageRenderProps) => {
  return (
    <div tw="flex flex-col w-full h-full items-center justify-center">
      <img
        src={seoImage}
        alt="SEO preview"
        width={ogImageDimensions.width}
        height={ogImageDimensions.height}
      />
    </div>
  );
};

const dominantColorSeoImageRender = ({
  image,
  title,
  logo,
  dominantColor,
  date,
  _type,
}: DominantColorSeoImageRenderProps) => {
  return (
    <div
      tw={`bg-[${
        dominantColor ?? '#12061F'
      }] flex flex-row overflow-hidden relative w-full`}
      style={{ fontFamily: 'Inter' }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'transparent' }} />
            <stop offset="100%" style={{ stopColor: 'white' }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.2" />
      </svg>

      <div tw="flex-1 p-10 flex flex-col justify-between relative z-10">
        <div tw="flex justify-between items-start w-full">
          {logo && <img src={logo} alt="Logo" width={70} height={48} />}
          <div tw="bg-white flex bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
            {new Date(date ?? new Date()).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>

        <h1 tw="text-5xl font-bold leading-tight max-w-[90%] text-white">
          {title}
        </h1>

        {_type && (
          <div
            tw={`bg-white text-[${
              dominantColor ?? '#12061F'
            }] flex px-5 py-2 rounded-full text-base font-semibold self-start`}
          >
            {getTitleCase(_type)}
          </div>
        )}
      </div>

      <div tw="w-[630px] h-[630px] flex items-center justify-center p-8 relative z-10">
        <div tw="w-[566px] h-[566px] bg-white bg-opacity-20 flex flex-col justify-center items-center rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03),0_4px_6px_-1px_rgba(0,0,0,0.05),0_8px_10px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
          <div tw="flex relative w-full h-full">
            {image ? (
              <img
                src={image}
                tw="w-full h-full rounded-3xl shadow-2xl"
                width={566}
                height={566}
                alt="Content preview"
                style={{
                  objectFit: 'cover',
                }}
              />
            ) : logo ? (
              <div tw="flex items-center justify-center h-full w-full">
                <img src={logo} alt="Logo" width={400} height={400} />
              </div>
            ) : (
              <div tw="w-full h-full bg-gradient-to-r from-white to-transparent" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

async function getTtfFont(
  family: string,
  axes: string[],
  value: number[],
): Promise<ArrayBuffer> {
  const familyParam = `${axes.join(',')}@${value.join(',')}`;

  // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure non-variable TTF is returned
  const cssCall = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 Firefox/1.0',
      },
    },
  );

  const css = await cssCall.text();
  const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

  if (!ttfUrl) {
    throw new Error('Failed to extract font URL from CSS');
  }

  return await fetch(ttfUrl).then((res) => res.arrayBuffer());
}

const getOptions = async (): Promise<ImageResponseOptions> => {
  const [interRegular, interBold, interSemiBold] = await Promise.all([
    getTtfFont('Inter', ['wght'], [400]),
    getTtfFont('Inter', ['wght'], [700]),
    getTtfFont('Inter', ['wght'], [600]),
  ]);
  return {
    width: ogImageDimensions.width,
    height: ogImageDimensions.height,
    fonts: [
      {
        name: 'Inter',
        data: interRegular,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Inter',
        data: interBold,
        style: 'normal',
        weight: 700,
      },
      {
        name: 'Inter',
        data: interSemiBold,
        style: 'normal',
        weight: 600,
      },
    ],
  };
};

const getMainPageContent = async ({ id }: ContentProps) => {
  console.log('🚀 ~ getMainPageContent ~ id:', id);
  const [result, err] = await getMainPageOGData(id);
  console.log('🚀 ~ getMainPageContent ~ err:', err);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};
const getSlugPageContent = async ({ id }: ContentProps) => {
  const [result, err] = await getSlugPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const getBlogPageContent = async ({ id }: ContentProps) => {
  const [result, err] = await getBlogPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const getGenericPageContent = async ({ id }: ContentProps) => {
  const [result, err] = await getGenericPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const block = {
  mainPage: getMainPageContent,
  page: getSlugPageContent,
  blog: getBlogPageContent,
} as const;

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const type = searchParams.get('type') as keyof typeof block;
  const para = Object.fromEntries(searchParams.entries());
  const image = block[type] ?? getGenericPageContent;
  try {
    const content = await image(para);
    return new ImageResponse(
      content ? content : errorContent,
      await getOptions(),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log({ err });
    return new ImageResponse(errorContent, await getOptions());
  }
}
