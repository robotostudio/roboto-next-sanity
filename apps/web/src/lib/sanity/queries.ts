import { defineQuery } from 'next-sanity';

// Base fragments for reusable query parts
const imageFragment = /* groq */ `
  image{
    ...,
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`;

const urlFragment = /* groq */ `
  url{
    openInNewTab,
    "href": select(
      type == "internal" => internal->slug.current,
      type == "external" => external,
      "#"
    ),
  }
`;

const customLinkFragment = /* groq */ `
  customLink{
    openInNewTab,
    "href": select(
      type == "internal" => internal->slug.current,
      type == "external" => external,
      "#"
    ),
  }
`;

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  }
`;

const iconFragment = /* groq */ `
  icon{
    svg
  }
`;

const buttonsFragment = /* groq */ `
  buttons[]{
    ...,
    ${urlFragment},
    icon{
      svg
    }
  }
`;

const richTextFragment = /* groq */ `
  richText[]{
    ...,
    ${markDefsFragment}
  }
`;

const formFragment = /* groq */ `
  form->{
    ...
  }
`;

// Page builder block fragments
const ctaBlock = /* groq */ `
  _type == "cta" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment}
  }
`;

const heroBlock = /* groq */ `
  _type == "hero" => {
    ...,
    ${buttonsFragment},
    ${richTextFragment}
  }
`;

const imageCarouselBlock = /* groq */ `
  _type == "imageCarousel" => {
    ...,
    ${buttonsFragment},
    ${richTextFragment}
  }
`;

const splitFormBlock = /* groq */ `
  _type == "splitForm" => {
    ...,
    ${imageFragment},
    ${formFragment},
    ${richTextFragment}
  }
`;

// Reusable query parts
const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    ...,
    _type,
    ${ctaBlock},
    ${heroBlock}, 
    ${imageCarouselBlock},
    ${splitFormBlock}
  }
`;

const localeMatchFragment = /* groq */ `
  select(
    ($locale == 'en-US' || $locale == '') => (!defined(language) || language == 'en-US'),
    language == $locale => language == $locale
  )
`;



// Query definitions
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const getMainPageTranslationsQuery = defineQuery(`
  *[_type == "mainPage"].language
`);

export const getMainPageDataQuery = defineQuery(`
  *[_type == "mainPage" && ${localeMatchFragment}][0]{
    _id,
    _type,
    title,
    description,
    ${pageBuilderFragment}
  }
`);

export const getSlugPageDataQuery = defineQuery(`
  *[_type == "page" && ${localeMatchFragment} && slug.current == $slug][0]{
    _id,
    _type,
    title,
    ${imageFragment},
    "slug": slug.current,
    ${pageBuilderFragment}
  }
`);

export const getAllSlugPagePathsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    "locale": language
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
      ${urlFragment},
      columns[]{
        ...,
        title,
        description,
        ${iconFragment},
        ${urlFragment}
      }
    },
    ${buttonsFragment},
    "logo": *[_type == "logo"][0].image.asset->url
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
      ${urlFragment},
      columns[]{
        ...,
        title,
        description,
        ${iconFragment},
        ${urlFragment}
      }
    },
    "logo": *[_type == "logo"][0].image.asset->url
  }
`);



export const getPageTypeQuery = defineQuery(`
  *[defined(slug.current) && slug.current == $slug][0]._type
`);

const blogCardProjection = /* groq */ `
  "title":coalesce(cardTitle,title),
  "description":coalesce(cardDescription,description),
  "image":coalesce(cardImage,image)
`;

export const getBlogIndexDataQuery = defineQuery(`
{
    "seo":*[_type == "blogIndex" && ${localeMatchFragment}][0]{
        ...,
    },
    "blogs":*[_type == "blog" && ${localeMatchFragment}]{
      _id,
      ${blogCardProjection},
      "slug":slug.current
    }
}
`);

export const getAllBlogIndexTranslationsQuery = defineQuery(`
  *[_type == "blogIndex"].language
`);

export const getAllBlogsPathsQuery = defineQuery(`
*[_type == "blog" && defined(slug.current) && !seoNoIndex]{
  "slug":slug.current,
  "locale":language
}
`);

export const getBlogPageDataQuery = defineQuery(`
*[_type == "blog" && slug.current == $slug && ${localeMatchFragment}][0]{
    ...,
    ${imageFragment},
    ${richTextFragment}
  }
`);
const ogFieldsFragment = /* groq */ `
  _id,
  "title": select(
    defined(ogTitle) => ogTitle,
    defined(seoTitle) => seoTitle,
    title
  ),
  "description": select(
    defined(ogDescription) => ogDescription,
    defined(seoDescription) => seoDescription,
    description
  ),
  "image": image.asset->url + "?w=566&h=566&dpr=2&fit=max",
  "dominantColor": image.asset->metadata.palette.dominant.background,
  "seoImage": seoImage.asset->url + "?w=1200&h=630&dpr=2&fit=max", 
  "logo": *[_type == "logo"][0].image.asset->url,
  _type,
  "date": coalesce(date, _createdAt)
`;

export const getOGDataQuery = defineQuery(`
*[_id == $id && defined(slug.current)][0]{
    ${ogFieldsFragment}
}
`);

export const blogPageQueryOG = defineQuery(`
*[_type == "blog" && defined(slug.current) && _id == $id][0]{
  ${ogFieldsFragment}
}
`);
export const mainPageQueryOG = defineQuery(`
  *[_type == "mainPage" && defined(slug.current) && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const slugPageQueryOG = defineQuery(`
  *[_type == "page" && defined(slug.current) && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const genericPageQueryOG = defineQuery(`
  *[_id == $id && defined(slug.current)][0]{
    ${ogFieldsFragment}
  }
`);


export const sitemapQuery = defineQuery(`
*[_type in $types && defined(slug.current) && seoNoIndex != true ]{
  "slug":slug.current,
  _updatedAt,
  _type,
    _id
  }
`);
