import 'server-only';


export const token = process.env.SANITY_API_TOKEN;
console.log('🚀 ~ token:', token, { env: process.env });

// if (!token) {
//   throw new Error('Missing SANITY_API_READ_TOKEN');
// }

// experimental_taintUniqueValue(
//   'Do not pass the Sanity API read token to the client.',
//   process,
//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   token as string,
// );

// /api/presentation-draft
