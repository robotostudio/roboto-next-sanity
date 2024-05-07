import { defineField } from 'sanity';
import { blockPreview } from '../../utils/helper';
import { buttonsField, richTextField } from '../../utils/common';
import { Zap } from 'lucide-react';

export const dynamicIntro = defineField({
  name: 'dynamicIntro',
  type: 'object',
  icon: Zap,
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
    }),
    richTextField,
    buttonsField,
  ],
  preview: blockPreview('dynamicIntro'),
});
