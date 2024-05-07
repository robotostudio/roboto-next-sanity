import { defineType, defineField, defineArrayMember } from 'sanity';
import { customSlugField } from '../../utils/common';

export const formFields = defineType({
  name: 'formFields',
  title: 'Form Field Group',
  type: 'object',
  fields: [
    defineField({
      name: 'fields',
      type: 'array',
      description: 'This is a way of bundling multiple form fields together',
      of: [{ type: 'formField' }],
    }),
  ],
  preview: {
    select: {
      field0: 'fields.0.fieldName',
      field1: 'fields.1.fieldName',
      field2: 'fields.2.fieldName',
      field3: 'fields.3.fieldName',
    },
    prepare: ({ field0, field1, field2, field3 }) => {
      const fields = [field0, field1, field2, field3]
        .filter(Boolean)
        .join(', ');

      return {
        title: fields,
        subtitle: 'Form field group',
      };
    },
  },
});

export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fieldName',
      title: 'Field Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),
    customSlugField({ name: 'fieldId' }),
    // defineField({
    //   name: 'fieldId',
    //   title: 'Field ID',
    //   type: 'slug',
    //   options: {
    //     source: (_, { parent }) =>
    //       (parent as { fieldName?: string }).fieldName ?? '',
    //     maxLength: 200, // will be ignored if slugify is set
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: 'inputType',
      title: 'Input Type',
      type: 'string',
      initialValue: 'text',
      options: {
        layout: 'dropdown',
        list: [
          { value: 'text', title: 'Text input' },
          { value: 'email', title: 'Email' },
          { value: 'phone', title: 'Phone number' },
          { value: 'textArea', title: 'Text area' },
          { value: 'file', title: 'File upload' },
          { value: 'checkbox', title: 'CheckBox' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkboxFields',
      type: 'object',
      hidden: ({ parent }) => parent.inputType !== 'checkbox',
      fields: [
        defineField({ name: 'checkboxTitle', type: 'string' }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'required',
                  title: 'Required',
                  type: 'boolean',
                  initialValue: () => false,
                }),
                defineField({
                  name: 'label',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
                defineField({ name: 'description', type: 'string' }),
                defineField({
                  name: 'value',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'fieldName',
    },
    prepare: ({ title }) => {
      return {
        title,
        subtitle: 'Form field',
      };
    },
  },
});
