import { defineArrayMember, defineField, defineType } from 'sanity';

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: () => 'Navbar',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({ type: 'navLink' }),
        defineArrayMember({ type: 'navDropdownColumn' }),
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Call to Action',
      type: 'array',
      of: [{ type: 'button' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
