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

export const getSlugPageDataQuery = defineQuery(`
*[_type == "page" && ${localeMatch} && slug.current == $slug][0]{
    _id,
    _type,
    title,
    ${_image},
    "slug":slug.current,
    ${_pageBuilder}
}
`);

export const getAllSlugPagePathsQuery = defineQuery(`
*[_type == "page" && defined(slug.current)]{
  "slug":slug.current,
  "locale":language
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

const _ogFields = `
  _id,
  "title":select(defined(ogTitle)=>ogTitle,defined(seoTitle)=>seoTitle,title),
  "description":select(defined(ogDescription)=>ogDescription,defined(seoDescription)=>seoDescription,description),
  "image": image.asset->url + "?w=566&h=566&dpr=2&fit=max",  
  "dominantColor":image.asset->metadata.palette.dominant.background,
  "seoImage": seoImage.asset->url + "?w=1200&h=630&dpr=2&fit=max",
  "logo":*[_type =="logo"][0].image.asset->url,
  _type,
  "date":coalesce(date,_createdAt)
`;

export const slugPageQueryOG = defineQuery(`
*[_type == "page" && _id == $id][0]{
  ${_ogFields}
}
`);

export const genericPageQueryOG = defineQuery(`
*[_id == $id && defined(slug.current)][0]{
  ${_ogFields}
}
`);

export const getPageTypeQuery = defineQuery(`
*[defined(slug.current) && slug.current == $slug][0]._type
`);
