import type { ImageCarousel } from '~/sanity.types';
import type { ProcessPageBuilderBlock } from '~/types';
import { RichText } from '../global/rich-text';
import { SanityButtons } from '../global/sanity-button';
import { SanityImage } from '../global/sanity-image';
import { cn } from '~/lib/utils';

export type ImageCarouselBlockProps = ProcessPageBuilderBlock<ImageCarousel>;

export type CarouselBlockProps = Pick<ImageCarouselBlockProps, 'carousel'>;

// Separate component for carousel slide to improve readability and maintainability
function CarouselSlide({
  slide,
}: {
  slide: NonNullable<ImageCarouselBlockProps['carousel']>[number];
}) {
  if (!slide) return null;

  return (
    <div className="w-[600px]">
      <SanityImage
        image={slide.image}
        width={900}
        height={600}
        className="rounded-xl"
      />
      {slide.caption && (
        <span className="mt-4 block text-2xl font-bold">{slide.caption}</span>
      )}
    </div>
  );
}

export function CarouselBlock({ carousel }: CarouselBlockProps) {
  if (!Array.isArray(carousel) || carousel.length === 0) return null;

  return (
    <section
      className="relative h-full overflow-x-auto"
      aria-label="Image carousel"
    >
      <div className="grid auto-cols-[600px] grid-flow-col gap-8 p-4">
        {carousel.map((slide) => (
          <CarouselSlide key={slide?._key} slide={slide} />
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
    <section
      className="h-fit py-12"
      id={_type}
      aria-labelledby={`${_type}-title`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {eyebrow && (
              <span className="block uppercase tracking-wide text-slate-600">
                {eyebrow}
              </span>
            )}
            <h2
              id={`${_type}-title`}
              className={cn(
                'text-balance text-3xl font-bold tracking-tight text-slate-900',
                'sm:text-4xl',
              )}
            >
              {title}
            </h2>
            {richText && <RichText value={richText} />}
            {buttons && buttons.length > 0 && (
              <SanityButtons buttons={buttons} />
            )}
          </div>
        </div>
      </div>
      <CarouselBlock carousel={carousel} />
    </section>
  );
}
