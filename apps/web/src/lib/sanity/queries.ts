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

const _image = `
image{
  ...,
  "alt":coalesce(asset->altText,asset->originalFilename, "Image-Broken"),
  "blurData":asset->metadata.lqip,
  "dominantColor":asset->metadata.palette.dominant.background,
}
`;

const _url = `
url{
  openInNewTab,
  "href": select(type == "internal"=>internal->slug.current, type == "external" => external,"#"),
}
`;

const _customLink = `
customLink{
  openInNewTab,
  "href": select(type == "internal"=>internal->slug.current, type == "external" => external,"#"),
}
`;

const _markDefs = ` 
markDefs[]{
  ...,
  ${_customLink}   
}
`;

const _icon = `
icon{
  svg
}
`;

const _buttons = `
buttons[]{
  ...,
  ${_url},
  ${_icon}
}
`;

const _richText = `
richText[]{
  ...,
  ${_markDefs}
 
}
`;

const _form = `
form->{
  ...,
}
`;

const _cta = `_type == "cta"=>{
  ...,
  ${_richText},
  ${_buttons}
}`;
const _hero = `_type == "hero"=>{
  ...,
  ${_buttons},
  ${_richText}
}`;

const _imageCarousel = `_type == "imageCarousel"=>{
  ...,
  ${_buttons},
  ${_richText},
}`;

const _splitForm = `_type == "splitForm"=>{
  ...,
  ${_image},
  ${_form},
  ${_richText},
}`;

const _pageBuilder = `
  pageBuilder[]{
    ...,
    _type,
    ${_cta},
    ${_hero},
    ${_imageCarousel},
    ${_splitForm}
  }
`;

export const getMainPageTranslationsQuery = defineQuery(`
*[_type == "mainPage"].language
`);

export const getMainPageDataQuery = defineQuery(`
*[_type == "mainPage" && ${localeMatch}][0]{
  _id,
  _type,
  title,
  description,
  ${_pageBuilder}
}
`);

export const getNavbarDataQuery = defineQuery(`
*[_type == "navbar"][0]{
    _id,
    title,
    links[]{
      ...,
      title,
      _type,
      ${_url},
      columns[]{
        ...,
        title,
        description,
        ${_icon},
        ${_url}
      }
    },
    ${_buttons},
    "logo":*[_type == "logo"][0].image.asset->url
  }
`);

export const getFooterDataQuery = defineQuery(`
*[_type == "footer"][0]{
    _id,
    title,
    links[]{
      ...,
      title,
      _type,
      ${_url},
      columns[]{
        ...,
        title,
        description,
        ${_icon},
        ${_url}
      }
    },
    "logo":*[_type == "logo"][0].image.asset->url
}
`);
