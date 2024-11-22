import { getImageDimensions } from '@sanity/asset-utils';
import Image, { type ImageProps } from 'next/image';
import { memo } from 'react';
import { urlFor } from '~/lib/sanity/utils';
import type { Maybe, SanityImageAsset } from '~/types';

interface ImageDimensions {
  width: number;
  height: number;
}

function getDimensions(
  asset: NonNullable<SanityImageAsset['asset']>,
  width?: number,
  height?: number,
): ImageDimensions {
  const { width: assetWidth, height: assetHeight } = getImageDimensions(asset);
  return {
    width: width ?? assetWidth,
    height: height ?? assetHeight,
  };
}

function getBlurProps(
  image?: SanityImageAsset,
): Partial<Pick<ImageProps, 'placeholder' | 'blurDataURL'>> {
  if (!image || !('blurData' in image)) return {};

  return {
    placeholder: 'blur',
    blurDataURL: image.blurData as string,
  };
}

function getAlt(image: unknown): string {
  if (
    !image ||
    typeof image !== 'object' ||
    !('alt' in image) ||
    typeof image.alt !== 'string'
  ) {
    return 'image-broken';
  }
  return image.alt;
}

interface SanityImageProps {
  image?: Maybe<SanityImageAsset>;
  className?: string;
  options?: Omit<ImageProps, 'className' | 'src' | 'width' | 'height' | 'alt'>;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export const SanityImage = memo(function SanityImageUnmemorized({
  image,
  className,
  options,
  loading = 'lazy',
  height,
  width,
}: SanityImageProps) {
  if (!image?.asset) {
    return null;
  }

  const { width: dimensionWidth, height: dimensionHeight } = getDimensions(
    image.asset,
    width,
    height,
  );

  const url = urlFor({
    ...image,
    _id: image.asset._ref,
  })
    .width(dimensionWidth)
    .height(dimensionHeight)
    .quality(100)
    .url();

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Image
        alt={getAlt(image)}
        src={url}
        loading={loading}
        sizes="(max-width: 640px) 80vw, 80vw"
        width={dimensionWidth}
        height={dimensionHeight}
        className={className}
        {...getBlurProps(image)}
        {...options}
      />
    </div>
  );
});
