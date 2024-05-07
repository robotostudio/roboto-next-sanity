import { LuListTodo } from 'react-icons/lu';
import { MdAddLink, MdImage } from 'react-icons/md';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const richText = defineType({
  name: 'richText',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Inline', value: 'inline' },
      ],
      lists: [
        { title: 'Numbered', value: 'number' },
        { title: 'Bullet', value: 'bullet' },
        { title: 'Check', value: 'check', icon: LuListTodo },
      ],
      marks: {
        annotations: [
          {
            name: 'customLink',
            type: 'object',
            title: 'Internal/External Link',
            icon: MdAddLink,
            fields: [
              {
                name: 'customLink',
                type: 'customUrl',
              },
            ],
          },
        ],
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
      },
    }),
    defineArrayMember({
      name: 'image',
      title: 'Image',
      type: 'image',
      icon: MdImage,
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption Text',
        }),
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
  ],
});
