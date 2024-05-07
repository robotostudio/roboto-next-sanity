import { getImageDimensions } from '@sanity/asset-utils';
import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { urlFor } from '~/lib/sanity';

import { SanityImage as SanityImageProp } from '~/types';

const getDimension = (
  image: NonNullable<SanityImageProp['asset']>,
  width?: number,
  height?: number,
) => {
  const dimension = getImageDimensions(image);

  return {
    width: width ?? dimension.width,
    height: height ?? dimension.height,
  };
};

export const getImageBlurProps = (image?: SanityImageProp) => {
  if (!image) return {};
  if ('blurData' in image) {
    const op: Pick<ImageProps, 'placeholder' | 'blurDataURL'> = {
      placeholder: 'blur',
      blurDataURL: image.blurData as string,
    };
    return op;
  }
  return {};
};

type SanityImageProps = {
  image?: SanityImageProp;
  className?: string;
  options?: Omit<ImageProps, 'className' | 'src' | 'width' | 'height'>;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
};

export const SanityImage: FC<SanityImageProps> = ({
  image,
  className,
  options,
  loading = 'lazy',
  height,
  width,
}) => {
  if (!image?.asset) return <></>;

  const dimension = getDimension(image.asset, width, height);
  const _image = {
    ...image,
    _id: image.asset._ref,
  };

  const blurProps = getImageBlurProps(image);

  const url = urlFor(_image)
    .width(dimension.width)
    .height(dimension.height)
    .quality(100)
    .url();

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        alt={image?.asset._ref ?? 'image-broken'}
        src={url}
        loading={loading}
        sizes="(max-width: 640px) 80vw, 80vw"
        width={dimension.width}
        height={dimension.height}
        className={className}
        {...blurProps}
        {...options}
      />
    </div>
  );
};
