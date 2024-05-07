import { defineField, defineType } from 'sanity';

export const logo = defineType({
  name: 'logo',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});
