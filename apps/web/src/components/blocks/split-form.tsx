import type { SplitForm } from '~/sanity.types';
import type { ProcessPageBuilderBlock } from '~/types';
import { SanityImage } from '../global/sanity-image';
import { FormBuilderBlock } from './form-builder';

export type SplitFormBlockProps = ProcessPageBuilderBlock<SplitForm>;

export function SplitFormBlock({
  form,
  image,
  title,
  _type,
}: SplitFormBlockProps) {
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
}
