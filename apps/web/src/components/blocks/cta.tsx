import { FC } from 'react';

import { Cta } from '~/sanity.types';
import { ProcessPageBuilderBlock } from '~/types';
import { Buttons } from '../global/buttons';
import { RichText } from '../global/richText';
import Ripple from '../global/ripple';

export type CtaBlockProps = ProcessPageBuilderBlock<Cta>;

export const CtaBlock: FC<CtaBlockProps> = ({ title, richText, buttons }) => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <Ripple />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <div className="text-balance text-white text-opacity-80">
            <RichText value={richText} />
          </div>
          <Buttons
            buttons={buttons}
            wrapperProps={{
              className:
                'mt-8 flex flex-col items-center justify-center gap-4 md:flex-row',
            }}
          />
        </div>
      </div>
    </section>
  );
};
