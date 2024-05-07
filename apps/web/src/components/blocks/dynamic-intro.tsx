import { FC, Suspense } from 'react';
import { SearchParamsText } from '../atoms/searchParamsText';
import { ProcessPageBuilderBlock } from '~/types';
import { RichText } from '../global/richText';
import { Buttons } from '../global/buttons';
import { DynamicIntro } from '~/sanity.types';

export type DynamicIntroBlockProps = ProcessPageBuilderBlock<DynamicIntro>;

export const DynamicIntroBlock: FC<DynamicIntroBlockProps> = ({
  buttons,
  richText,
  eyebrow,
}) => {
  return (
    <section className="mx-auto w-full max-w-6xl py-24">
      <div className="container flex flex-col items-start gap-4 px-4 md:px-6">
        <div className="max-w-xl space-y-2">
          <h2 className="text-5xl font-bold tracking-tighter">
            Hey!{' '}
            <Suspense>
              <SearchParamsText
                param={'name'}
                fallback={'Buddy'}
                className="underline decoration-dotted"
              />
            </Suspense>{' '}
            <div className="inline-block animate-wave direction-alternate">
              👋
            </div>
          </h2>
          <div className="max-w-4xl">
            <p className="uppercase md:text-xl/relaxed">{eyebrow}</p>
            <RichText value={richText} />
          </div>
        </div>
        <Buttons buttons={buttons} />
      </div>
    </section>
  );
};
