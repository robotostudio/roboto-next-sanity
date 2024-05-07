import { defineField, defineType } from 'sanity';
import { capitalize, createRadioListLayout } from '../../utils/helper';
import { iconField } from '../../utils/common';
import { preview } from 'sanity-plugin-icon-picker';

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      initialValue: () => 'default',
      options: createRadioListLayout([
        'default',
        'secondary',
        'outline',
        'link',
      ]),
    }),
    iconField,
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'customUrl',
    }),
  ],
  preview: {
    select: {
      title: 'buttonText',
      variant: 'variant',
      icon: 'icon',
    },
    prepare: ({ title, variant, icon }) => {
      return {
        title,
        subtitle: `${capitalize(variant ?? 'default')} button ${
          icon ? 'With Icon' : ''
        }`,
        media: icon
          ? preview(icon)
          : preview({
              name: 'cursor-click',
              provider: 'hi',
            }),
      };
    },
  },
});
