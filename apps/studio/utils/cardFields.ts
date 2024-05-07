import { defineField } from 'sanity';
import { CONST } from './constant';

export const cardFields = [
  defineField({
    name: 'cardTitle',
    title: 'Card title override',
    description:
      'This will override the card title. If left blank it will inherit the description from the page title.',
    type: 'string',
    validation: (Rule: any) => Rule.warning('A page title is required'),
    group: CONST.CARD,
  }),
  defineField({
    name: 'cardDescription',
    title: 'Card description override',
    description:
      'This will override the card description. If left blank it will inherit the description from the page description.',
    type: 'text',
    rows: 2,
    validation: (Rule: any) => [
      Rule.warning('A description is required'),
      Rule.max(160).warning('No more than 160 characters'),
    ],
    group: CONST.CARD,
  }),
  defineField({
    name: 'cardImage',
    title: 'Card image override',
    description:
      'This will override the main image. If left blank it will inherit the image from the main image.',
    type: 'image',
    group: CONST.CARD,
    options: {
      hotspot: true,
    },
  }),
];
