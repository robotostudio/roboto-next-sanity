import { defineField, defineType } from 'sanity';
import { blockPreview } from '../../utils/helper';
import { ImagePlus } from 'lucide-react';
import { buttonsField, richTextField } from '../../utils/common';

export const hero = defineType({
  name: 'hero',
  type: 'object',
  icon: ImagePlus,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'isTitleH1',
      title: 'Is It a <h1>?',
      type: 'boolean',
      initialValue: () => false,
    }),
    richTextField,
    buttonsField,
  ],
  preview: blockPreview('hero', { title: 'title' }),
});
