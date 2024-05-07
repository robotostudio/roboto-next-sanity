import { blog } from './blog';
import { blogIndex } from './blogIndex';
import { footer } from './footer';
import { form } from './form';
import { logo } from './logo';
import { mainPage } from './mainPage';
import { marketingModal } from './marketingModal';
import { navbar } from './navbar';
import { page } from './page';

export const singletons = [blogIndex, mainPage, navbar, logo, footer];

export const documents = [page, blog, form, marketingModal, ...singletons];

export const internationalizedDocuments = [
  page,
  blog,
  // faq,
  mainPage,
  form,
  blogIndex,
].map(({ name }) => name);


