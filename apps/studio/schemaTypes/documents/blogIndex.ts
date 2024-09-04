import { defineField, defineType } from 'sanity';
import { CONST, GROUPS } from '../../utils/constant';
import { cardFields } from '../../utils/cardFields';
import { languageField } from '../../utils/common';
import {
  createSlug,
  getFlag,
  isUniqueAcrossAllDocuments,
} from '../../utils/helper';
import { ogFields } from '../../utils/ogFields';
import { seoFields } from '../../utils/seoFields';

export const blogIndex = defineType({
  name: 'blogIndex',
  type: 'document',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: CONST.MAIN_CONTENT,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        "Page descriptions shouldn't be too long or too short. Long page descriptions will only be partially shown in search results and short descriptions are unlikely to to be helpful to users. We recommend page descriptions are between 100 and 320 characters.",
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
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        slugify: createSlug,
        isUnique: isUniqueAcrossAllDocuments,
      },
    }),
    languageField,
    ...seoFields,
    ...ogFields,
    ...cardFields,
  ],
  preview: {
    select: {
      title: 'title',
      lang: 'language',
      slug: 'slug.current',
      isPrivate: 'seoNoIndex',
    },
    prepare: ({ title, lang, slug, isPrivate }) => {
      return {
        title: [getFlag(lang), title].join(' '),
        subtitle: [isPrivate ? 'Private' : 'Public', ':', slug].join(' '),
      };
    },
  },
});
