import { FC } from 'react';
import { SanityImage } from '../global/sanity-image';
import { FormBuilderBlock } from './form-builder';
import { SplitForm } from '~/sanity.types';
import { ProcessPageBuilderBlock } from '~/types';

export type SplitFormBlockProps = ProcessPageBuilderBlock<SplitForm>;

export const SplitFormBlock: FC<SplitFormBlockProps> = ({
  form,
  image,
  title,
}) => {
  return (
    <section className="flex items-center justify-center">
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
