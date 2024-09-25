import { groq } from 'next-sanity';

export const localeMatch = `select(($locale == 'en-GB' || $locale == '' ) => 
  (!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;

export const getAllSlugPagePathsQuery = groq`
*[_type == "page" && defined(slug.current) && !seoNoIndex]{
  "slug":slug.current,
  "locale":language
}
`;

export const getAllMainPageTranslationsQuery = groq`
*[_type == "mainPage"].language
`;

const cardProjection = `
"title":coalesce(cardTitle,title),
"description":coalesce(cardDescription,description),
"image":coalesce(cardImage,image)
`;

export const getBlogIndexDataQuery = groq`
{
    "seo":*[_type == "blogIndex" && ${localeMatch}][0]{
        ...,
    },
    "blogs":*[_type == "blog" && ${localeMatch}]{
      _id,
      ${cardProjection},
      "slug":slug.current
    }
}
`;

export const getAllBlogIndexTranslationsQuery = groq`
*[_type == "blogIndex"].language
`;

export const getAllBlogsPathsQuery = groq`
*[_type == "blog" && defined(slug.current) && !seoNoIndex]{
  "slug":slug.current,
  "locale":language
}
`;

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
const _columns = `
  columns[]{
    ...,
    title,
    description,
    ${_icon},
    ${_url}
  }
`;

const _links = `
  links[]{
    ...,
    title,
    _type,
    ${_url},
    ${_columns}
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

export const getFooterDataQuery = groq`
*[_type == "footer"][0]{
    _id,
    title,
    ${_links},
    "logo":*[_type == "logo"][0].image.asset->url
}
`;

export const getNavbarDataQuery = groq`
*[_type == "navbar"][0]{
    _id,
    title,
    ${_links},
    ${_buttons},
    "logo":*[_type == "logo"][0].image.asset->url
  }
  `;

export const getBlogPageDataQuery = groq`
*[_type == "blog" && slug.current == $slug && ${localeMatch}][0]{
    ...,
    ${_image},
    ${_richText}
  }
  `;

export const getMainPageDataQuery = groq`
*[_type == "mainPage" && ${localeMatch}][0]{
  _id,
  _type,
  title,
  description,
  ${_image},
  ${_pageBuilder}
}
`;

export const getSlugPageDataQuery = groq`
*[_type == "page" && slug.current == $slug ][0]{
    _id,
    _type,
    title,
    content,
    ${_image},
    "slug":slug.current,
    ${_pageBuilder}
    
}
`;

export const getOGDataQuery = groq`
*[_id == $id][0]{
    _id,
    "title":coalesce(ogTitle,title),
    "description":coalesce(ogDescription,description),
    "image":coalesce(seoImage,image,*[_type =="logo"][0].image).asset->url
}
`;

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

export const genericPageQueryOG = groq`
*[_id == $id && defined(slug.current)][0]{
  ${_ogFields}
}
`;
export const slugPageQueryOG = groq`
*[_type == "page" && _id == $id][0]{
  ${_ogFields}
}
`;

export const blogPageQueryOG = groq`
*[_type == "blog" && _id == $id][0]{
  ${_ogFields}
}
`;

export const mainPageQueryOG = groq`
*[_type == "mainPage"][0]{
  ${_ogFields}
}
`;

export const sitemapQuery = groq`
*[_type in $types && defined(slug.current) && seoNoIndex != true ]{
  "slug":slug.current,
  _updatedAt,
  _type,
  _id
}`;
