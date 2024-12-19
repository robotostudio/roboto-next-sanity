import { set } from 'sanity';
import {defineMigration, patch, at, setIfMissing} from 'sanity/migrate'


const query = `
*[_type in [
"blog",
"blogIndex",
"mainPage",
"page"
] && language == "en-GB"]{_id,language,_type}`;


type Document = {
  _id: string;
  language: string;
  _type: string;
}

/**
 * this migration will set `Default title` on all documents that are missing a title
 * and make `true` the default value for the `enabled` field
 */
export default defineMigration({
  title: 'migrate-default-locale-from-en-gb-to-en-us',

  async *migrate(_, context) {
    const client = context.client;
    const documents = await client.fetch<Document[]>(query);
    console.log('🚀 ~ documents:', documents);
  
    const patchPayload = documents.map((document) => {
      return patch(document._id, [
        at('language', set('en-US')),
      ])
    })
    yield patchPayload;
  },
})
