import { defineField, defineType } from 'sanity';
import { MessageCircleQuestion } from 'lucide-react';
import { languageField } from '../../utils/common';
import { extractTitleFromRichText, getFlag } from '../../utils/helper';

export const faq = defineType({
  name: 'faq',
  type: 'document',
  icon: MessageCircleQuestion,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    languageField,
    defineField({
      name: 'answer',
      type: 'richText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'question', answer: 'answer', lang: 'language' },
    prepare: ({ answer, title, lang }) => {
      const text = extractTitleFromRichText(answer) ?? '';
      return {
        title: [getFlag(lang), title].join(' '),
        subtitle: text,
      };
    },
  },
});
