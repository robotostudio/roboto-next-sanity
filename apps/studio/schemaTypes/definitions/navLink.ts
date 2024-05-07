import { ChevronRight, ListPlus } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { iconField } from '../../utils/common';
import { blockPreview } from '../../utils/helper';

export const navLinkColumn = defineType({
  name: 'navLinkColumn',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    iconField,
    defineField({
      name: 'description',
      type: 'string',
      title: 'Descriptions',
    }),
    defineField({
      name: 'url',
      type: 'customUrl',
    }),
  ],
  preview: blockPreview('navLinkColumn'),
});

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  icon: ChevronRight,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'url',
      type: 'customUrl',
      validation: (r) =>
        r.custom(() => {
          return true;
        }),
    }),
  ],
  preview: blockPreview('navLink'),
});

export const navDropdownColumn = defineType({
  name: 'navDropdownColumn',
  type: 'object',
  icon: ListPlus,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'columns',
      type: 'array',
      of: [defineArrayMember({ type: 'navLinkColumn' })],
    }),
  ],
  preview: blockPreview('navDropdownColumn'),
});
