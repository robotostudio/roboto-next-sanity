import { BadgePoundSterling } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { CONST, GROUPS } from '../../utils/constant';
import { buttonsField } from '../../utils/common';

export const marketingModal = defineType({
  name: 'marketingModal',
  title: 'Marketing Modal',
  type: 'document',
  icon: BadgePoundSterling,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      initialValue: () => false,
      group: CONST.MAIN_CONTENT,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: CONST.MAIN_CONTENT,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: CONST.MAIN_CONTENT,
    }),
    defineField({
      name: 'form',
      type: 'reference',
      to: [{ type: 'form' }],
      group: CONST.MAIN_CONTENT,
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => {
      return {
        title: title,
      };
    },
  },
});
