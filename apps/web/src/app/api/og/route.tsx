/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { ImageResponseOptions } from 'next/server';
import { getMainPageOGData } from '~/components/pages/main-page/main-page-api';

import {
  getGenericPageOGData,
  getSlugPageOGData,
} from '~/components/pages/slug-page/slug-page-api';
import { ogImageDimensions, sanityOgImageDimensions } from '~/config';

export const runtime = 'edge';

const loadFontData = async () => {
  const font = fetch(
    new URL('../../../font/PolySans-Bulky.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return await font;
};

const errorContent = (
  <div tw="flex flex-col w-full h-full items-center justify-center bg-[#12061F]">
    <div tw=" flex w-full h-full items-center justify-center ">
      <h1 tw="text-white">Something went Wrong with image generation</h1>
    </div>
  </div>
);

const getDimensions = (isSanityView: boolean) => {
  return isSanityView ? sanityOgImageDimensions : ogImageDimensions;
};

const seoImageRender = ({
  seoImage,
  isSanityView = false,
}: {
  seoImage: string;
  isSanityView?: boolean;
}) => {
  const dimensions = getDimensions(isSanityView);
  return (
    <div tw="flex flex-col w-full h-full items-center justify-center bg-[#12061F]">
      <img
        src={seoImage}
        alt="SEO preview"
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

const getOptions = async ({
  isSanityView = false,
}: {
  isSanityView?: boolean;
}): Promise<ImageResponseOptions> => {
  const font = await loadFontData();

  return {
    ...(isSanityView ? sanityOgImageDimensions : ogImageDimensions),
    fonts: [
      {
        data: font,
        name: 'PolySans',
        style: 'normal',
      },
    ],
  };
};

const getHomePageContent = async ({ isSanityView }: any) => {
  const [data] = await getMainPageOGData();
  if (!data) return undefined;
  const { resource } = data?.image ?? {};
  const dimensions = getDimensions(isSanityView);
  const { url } = resource ?? {};
  if (!url) return undefined;
  return (
    <div tw="flex flex-col w-full h-full items-center justify-center">
      <img
        src={url}
        alt="home page"
        tw="flex w-full h-full"
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

const getSlugPageContent = async ({ id, isSanityView }: any) => {
  const [data] = await getSlugPageOGData(id);
  if (!data) return undefined;
  if (!data?.image) return undefined;
  return seoImageRender({ seoImage: data.image, isSanityView });
};

const getGenericPageContent = async ({ id, isSanityView }: any) => {
  const [data] = await getGenericPageOGData(id);
  if (!data) return undefined;
  const dimensions = getDimensions(isSanityView);
  const { description, image, seoImage, title } = data ?? {};
  if (seoImage) return seoImageRender({ seoImage, isSanityView });
  return (
    <div tw="w-full h-full flex bg-[#12061F]">
      <div tw="flex flex-row relative items-center justify-center">
        <img
          src={'https://roboto.studio/logo.svg'}
          width={70}
          height={48}
          alt=""
          tw="absolute top-4 left-10 items-center justify-center"
        />
        <div tw="flex px-10">
          <div tw="flex ">
            {image && (
              <img
                src={image}
                alt=""
                width={dimensions.width / 2}
                height={dimensions.height / 2}
                tw="rounded-lg"
              />
            )}
          </div>
          <span tw="w-1/2 px-10 text-white">
            <span tw="flex flex-col justify-center w-7/8">
              <span tw=" text-5xl text-clip mb-4 line-clamp-2">{title}</span>
              {typeof description === 'string' && (
                <span tw="text-clip w-full line-clamp-2">{description}</span>
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

const block = {
  mainPage: getHomePageContent,
  page: getSlugPageContent,
} as const;

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const type = searchParams.get('type') as keyof typeof block;
  const para = Object.fromEntries(searchParams.entries());
  const isSanityView = para?.view === 'sanity';
  const image = block[type] ?? getGenericPageContent;
  try {
    const content = await image({ ...para, isSanityView });
    return new ImageResponse(
      content ? content : errorContent,
      await getOptions({ isSanityView }),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return new ImageResponse(errorContent, await getOptions({ isSanityView }));
  }
}
