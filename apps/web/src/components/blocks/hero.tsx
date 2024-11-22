import type { Hero } from '~/sanity.types';
import type { ProcessPageBuilderBlock } from '~/types';
import { RichText } from '../global/rich-text';
import { SanityButtons } from '../global/sanity-button';

export type HeroBlockProps = ProcessPageBuilderBlock<Hero>;

export function HeroBlock({
  title,
  buttons,
  richText,
  isTitleH1,
  _type,
}: HeroBlockProps) {
  return (
    <section key="1" className="py-8 text-center" id={_type}>
      <div className="container px-4 text-center md:px-6">
        {isTitleH1 ? (
          <h1 className="mb-2 text-3xl font-bold tracking-tighter">{title}</h1>
        ) : (
          <h2 className="mb-2 text-3xl font-bold tracking-tighter">{title}</h2>
        )}
        <div>
          <RichText value={richText} className="prose-invert" />
        </div>
        <SanityButtons
          buttons={buttons}
          wrapperProps={{
            className:
              'mt-8 flex flex-col items-center justify-center gap-4 md:flex-row',
          }}
        />
      </div>
    </section>
  );
}
