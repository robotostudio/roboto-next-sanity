import { FC } from 'react';
import Balancer from 'react-wrap-balancer';
import { ImageCarousel } from '~/sanity.types';
import { Buttons } from '../global/buttons';
import { RichText } from '../global/richText';
import { SanityImage } from '../global/sanity-image';
import { ProcessPageBuilderBlock } from '~/types';

export type ImageCarouselBlockProps = ProcessPageBuilderBlock<ImageCarousel>;

export type CarouselBlockProps = Pick<ImageCarouselBlockProps, 'carousel'>;

export const CarouselBlock: FC<CarouselBlockProps> = ({ carousel }) => {
  if (!Array.isArray(carousel)) return <></>;
  return (
    <section className="overflow-x-auto">
      {/* Grid container - this is what makes them into a row of cards */}
      <div className="grid grid-flow-col gap-4 p-4">
        {carousel.map((slide) => (
          // Card container - This contains the image and title, one below each other
          <div key={slide?._key} className="w-[600px]">
            <SanityImage
              image={slide.image}
              width={900}
              height={600}
              className="rounded-xl"
            />
            {slide?.caption && (
              <span className="text-2xl font-bold">{slide?.caption}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export const ImageCarouselBlock: FC<ImageCarouselBlockProps> = ({
  buttons,
  carousel,
  eyebrow,
  richText,
  title,
}) => {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="uppercase tracking-wide text-slate-600">
              {eyebrow}
            </span>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              <Balancer>{title}</Balancer>
            </h2>
            <RichText value={richText} />
            <Buttons buttons={buttons} />
          </div>
          <div />
        </div>
      </div>
      <CarouselBlock carousel={carousel} />
    </section>
  );
};
