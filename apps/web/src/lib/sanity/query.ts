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

const _url = `defined(url)=>{
  url{
    openInNewTab,
    "href": select(type == "internal"=>internal->slug.current, type == "external" => external,"#"),
  }
}`;

const _customLink = `defined(customLink)=>{
  customLink{
    openInNewTab,
    "href": select(type == "internal"=>internal->slug.current, type == "external" => external,"#"),
  }
}`;

const _markDefs = ` defined(markDefs)=>{
  markDefs[]{
    ...,
    ${_customLink}   
  }
}`;

const _icon = `defined(icon)=>{
  icon{
    svg
  }
}`;
const _columns = `defined(columns)=>{
  columns[]{
    ...,
    title,
    description,
    ${_icon},
    ${_url}
  }
}`;

const _links = `defined(links)=>{
  links[]{
    ...,
    title,
    _type,
    ${_url},
    ${_columns}
  }
}`;

const _buttons = `defined(buttons)=>{
  buttons[]{
    ...,
    ${_url},
    ${_icon}
  }
}`;

const _richText = `defined(richText)=>{
  richText[]{
    ...,
    ${_markDefs}
   
  }
}`;

const _form = `defined(form)=>{
  form->{
    ...,
  }
}`;

const _pageBuilder = `defined(pageBuilder)=>{
  pageBuilder[]{
    ...,
    _type,
    ${_buttons},
    ${_richText},
    ${_form}

  }

}`;
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
    ${_richText}
  }
  `;

export const getMainPageDataQuery = groq`
*[_type == "mainPage" && ${localeMatch}][0]{
  _id,
  _type,
  title,
  description,
  ${_pageBuilder}
}
`;

export const getSlugPageDataQuery = groq`
*[_type == "page" && slug.current == $slug ][0]{
    _id,
    _type,
    title,
    content,
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
