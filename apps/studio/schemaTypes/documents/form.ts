import { defineField, defineType } from 'sanity';
import { FaWpforms } from 'react-icons/fa';
import { languageField } from '../../utils/common';
import { getFlag } from '../../utils/helper';

export const form = defineType({
  name: 'form',
  type: 'document',
  icon: FaWpforms,
  fields: [
    defineField({ name: 'label', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'formId',
      title: 'FormSpark Form Id',
      type: 'string',
      validation: (r) => [r.required()],
    }),
    defineField({
      name: 'fields',
      type: 'array',
      of: [{ type: 'formField' }],
    }),
    defineField({ name: 'buttonText', type: 'string' }),
    // defineField({ name: 'terms', type: 'boolean', initialValue: false }),
    // defineField({
    //   name: 'termsText',
    //   title: 'Notice text',
    //   type: 'richText',
    //   hidden: ({ parent }) => !parent.terms,
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      label: 'label',
    },
    prepare: ({ title, label }) => {
      return {
        title: [title ?? label].join(' '),
        subtitle: 'Form',
        media: FaWpforms,
      };
    },
  },
});
