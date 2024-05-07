/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { ImageResponseOptions } from 'next/server';

import { ogImageDimensions } from '~/config';
import { getClient } from '~/lib/sanity';
import { getOGDataQuery } from '~/lib/sanity/query';
import { GetOGDataQueryResult } from '~/sanity.types';

export const runtime = 'edge';

type Font = 'medium' | 'extra-bold' | 'extra-bold-italic';

// const loadFontData = async (type: Font) => {
//   if (type === 'extra-bold-italic') {
//     const font = fetch(
//       new URL(
//         '../../../font/GalaxieCopernicus-ExtraboldItalic.woff',
//         import.meta.url,
//       ),
//     ).then((res) => res.arrayBuffer());

//     return await font;
//   }
//   if (type === 'extra-bold') {
//     const font = fetch(
//       new URL(
//         '../../../font/GalaxieCopernicus-Extrabold.woff',
//         import.meta.url,
//       ),
//     ).then((res) => res.arrayBuffer());

//     return await font;
//   }
//   const font = fetch(
//     new URL('../../../font/GalaxieCopernicus-Medium.woff', import.meta.url),
//   ).then((res) => res.arrayBuffer());

//   return await font;
// };

const getOptions = async (
  fontType: Font = 'medium',
): Promise<ImageResponseOptions> => {
  // const font = await loadFontData(fontType);

  return {
    width: ogImageDimensions.width,
    height: ogImageDimensions.height,
    // fonts: [
    //   {
    //     data: font,
    //     name: 'GalaxieCopernicus',
    //     style: fontType === 'extra-bold-italic' ? 'italic' : 'normal',
    //     weight: fontType === 'medium' ? 400 : 600,
    //   },
    // ],
  };
};

async function getOGData(id: string) {
  const data = await getClient().fetch<GetOGDataQueryResult>(getOGDataQuery, {
    id,
  });
  console.log('🚀 ~ data ~ data:', data);

  if (!data) return undefined;

  return data;
}

const Generic = async ({ id }: any) => {
  // const { description, image, title } = await getOGData(genericOGQuery, id);
  // const truncatedDesc = description.slice(0, 160).concat('...');
  const data = await getOGData(id);
  let content = (
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw=" flex w-full h-full items-center justify-center ">
        <h1>Something went Wrong with image generation</h1>
      </div>
    </div>
  );
  if (data) {
    const { description, image, title } = data;
    const truncatedDesc = description?.slice(0, 160).concat('...');
    content = (
      <div tw="w-full h-full flex ">
        <div tw="flex flex-row relative items-center justify-center">
          <img
            src={'https://demo.roboto.studio/logo.svg'}
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
                  width={ogImageDimensions.width / 2}
                  height={ogImageDimensions.height / 2}
                  tw="rounded-lg"
                />
              )}
            </div>
            <span tw="w-1/2 px-10">
              <span tw="flex flex-col justify-center w-7/8 text-[#000000]">
                <span tw=" text-5xl text-clip mb-4 line-clamp-2">{title}</span>
                <span tw="text-clip w-full line-clamp-2">{truncatedDesc}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return new ImageResponse(content, await getOptions());
};

const NotFound = async ({ image }: any) => {
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw=" flex w-full h-full items-center justify-center ">
          <h1>Something went Wrong with image generation</h1>
        </div>
      </div>
    ),
    await getOptions(),
  );
};
const block = {
  notFound: Generic,
  page: Generic,
  mainPage: Generic,
} as const;

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const type = searchParams.get('type') as keyof typeof block;
  const para = Object.fromEntries(searchParams.entries());
  console.log('🚀 ~ GET ~ type:', type, para);

  const image = block[type] ?? block['notFound'];

  try {
    return await image(para);
  } catch (err) {
    console.log(err);
    return await block['notFound']({});
  }
}
