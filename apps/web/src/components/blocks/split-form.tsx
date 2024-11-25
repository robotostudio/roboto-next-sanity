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
    <section className="my-16 px-4 lg:px-0" id={_type}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <SanityImage image={image} className="object-cover" />
          </div>
          <div className="flex items-center justify-center">
            {form && <FormBuilderBlock {...form} title={title} />}
          </div>
        </div>
      </div>
    </section>
  );
}
