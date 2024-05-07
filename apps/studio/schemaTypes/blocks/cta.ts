import { defineField, defineType } from 'sanity';
import { blockPreview } from '../../utils/helper';
import { PhoneForwarded } from 'lucide-react';
import { buttonsField, richTextField } from '../../utils/common';

export const cta = defineType({
  name: 'cta',
  type: 'object',
  icon: PhoneForwarded,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    richTextField,
    buttonsField,
  ],
  preview: blockPreview('cta'),
});
