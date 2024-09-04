import { blog } from './blog';
import { blogIndex } from './blogIndex';
import { footer } from './footer';
import { form } from './form';
import { logo } from './logo';
import { mainPage } from './mainPage';
import { navbar } from './navbar';
import { page } from './page';

export const singletons = [blogIndex, mainPage, navbar, logo, footer];

export const documents = [page, blog, form, ...singletons];

export const internationalizedDocuments = [page, blog, mainPage, blogIndex].map(
  ({ name }) => name,
);


