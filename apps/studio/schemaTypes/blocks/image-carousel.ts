import { defineField, defineType } from 'sanity';
import { buttonsField, richTextField } from '../../utils/common';
import { blockPreview } from '../../utils/helper';
import { GalleryThumbnails } from 'lucide-react';

export const carouselField = defineField({
  name: 'carouselField',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: blockPreview('carouselField', {
    media: 'image',
    title: 'caption',
  }),
});

export const imageCarousel = defineType({
  name: 'imageCarousel',
  type: 'object',
  icon: GalleryThumbnails,
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    richTextField,
    buttonsField,
    defineField({
      name: 'carousel',
      type: 'array',
      of: [{ type: 'carouselField' }],
    }),
  ],
  preview: blockPreview('imageCarousel'),
});
