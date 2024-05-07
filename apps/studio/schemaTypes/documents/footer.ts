import { defineArrayMember, defineField, defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: () => 'Footer',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
