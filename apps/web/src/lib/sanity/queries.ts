import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

// const postFields = /* groq */ `
//   _id,
//   "status": select(_originalId in path("drafts.**") => "draft", "published"),
//   "title": coalesce(title, "Untitled"),
//   "slug": slug.current,
//   excerpt,
//   coverImage,
//   "date": coalesce(date, _updatedAt),
//   "author": author->{firstName, lastName, picture},
// `;

export const localeMatch =
  /* groq */
  `select(($locale == 'en-GB' || $locale == '' ) => 
(!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;


export const getMainPageTranslationsQuery = defineQuery(`
*[_type == "mainPage"].language
`);

export const getMainPageDataQuery = defineQuery(`
*[_type == "mainPage" && ${localeMatch}][0]{
  _id,
  _type,
  title,
  description,
}
`);
