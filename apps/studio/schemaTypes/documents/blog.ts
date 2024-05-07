import { defineField, defineType } from 'sanity';
import { languageField, pageBuilderField } from '../../utils/common';
import { cardFields } from '../../utils/cardFields';
import { CONST, GROUPS } from '../../utils/constant';
import { createSlug, getFlag } from '../../utils/helper';
import { ogFields } from '../../utils/ogFields';
import { seoFields } from '../../utils/seoFields';

export const blog = defineType({
  name: 'blog',
  type: 'document',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: CONST.MAIN_CONTENT,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        "Page descriptions shouldn't be too long or too short. Long page descriptions will only be partially shown in search results and short descriptions are unlikely to to be helpful to users. We recommend page descriptions are between 130 and 160 characters for best SEO practice",
      type: 'text',
      rows: 3,
      group: CONST.MAIN_CONTENT,
      validation: (rule) => [
        rule.required(),
        rule
          .min(100)
          .warning('We advise writing a description above 100 characters'),
        rule.max(320).warning('Any more and it will get truncated'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: CONST.MAIN_CONTENT,
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        slugify: createSlug,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: CONST.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'richText',
      group: CONST.MAIN_CONTENT,
      type: 'richText',
    }),
    languageField,
    pageBuilderField,
    ...seoFields,
    ...ogFields,
    ...cardFields,
  ],
  preview: {
    select: {
      title: 'title',
      lang: 'language',
      media: 'image',
      slug: 'slug.current',
      isPrivate: 'seoNoIndex',
    },
    prepare: ({ title, lang, slug, isPrivate, media }) => {
      return {
        title: [getFlag(lang), title].join(' '),
        subtitle: [isPrivate ? 'Private' : 'Public', ':', slug].join(' '),
        media,
      };
    },
  },
});
