import { defineField, defineType } from 'sanity';
import { FormInput } from 'lucide-react';
import { blockPreview } from '../../utils/helper';
import { richTextField } from '../../utils/common';

export const splitForm = defineType({
  name: 'splitForm',
  type: 'object',
  icon: FormInput,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    richTextField,
    defineField({ name: 'form', type: 'reference', to: [{ type: 'form' }] }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: blockPreview('splitForm'),
});
