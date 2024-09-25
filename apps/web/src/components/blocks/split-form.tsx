import type { FC } from 'react';
import { SanityImage } from '../global/sanity-image';
import { FormBuilderBlock } from './form-builder';
import type { SplitForm } from '~/sanity.types';
import type { ProcessPageBuilderBlock } from '~/types';

export type SplitFormBlockProps = ProcessPageBuilderBlock<SplitForm>;

export const SplitFormBlock: FC<SplitFormBlockProps> = ({
  form,
  image,
  title,
  _type,
}) => {
  return (
    <section className="flex items-center justify-center" id={_type}>
      <div className="grid max-w-6xl grid-cols-2 place-items-center">
        <div>
          <SanityImage image={image} />
        </div>
        {form && (
          <div className="flex items-center justify-center">
            <FormBuilderBlock {...form} title={title} />
          </div>
        )}
      </div>
    </section>
  );
};
