import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-02-17',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
})

const builder = imageUrlBuilder(client);

export const urlFor = (sourse) => builder.image(sourse);