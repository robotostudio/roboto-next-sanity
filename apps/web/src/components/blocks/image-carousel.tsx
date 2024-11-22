import type { ImageCarousel } from '~/sanity.types';
import type { ProcessPageBuilderBlock } from '~/types';
import { RichText } from '../global/rich-text';
import { SanityButtons } from '../global/sanity-button';
import { SanityImage } from '../global/sanity-image';

export type ImageCarouselBlockProps = ProcessPageBuilderBlock<ImageCarousel>;

export type CarouselBlockProps = Pick<ImageCarouselBlockProps, 'carousel'>;

export function CarouselBlock({ carousel }: CarouselBlockProps) {
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
}

export function ImageCarouselBlock({
  buttons,
  carousel,
  eyebrow,
  richText,
  title,
  _type,
}: ImageCarouselBlockProps) {
  return (
    <section className="py-12" id={_type}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="uppercase tracking-wide text-slate-600">
              {eyebrow}
            </span>
            <h2 className="mb-2 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <RichText value={richText} />
            <SanityButtons buttons={buttons} />
          </div>
          <div />
        </div>
      </div>
      <CarouselBlock carousel={carousel} />
    </section>
  );
}
