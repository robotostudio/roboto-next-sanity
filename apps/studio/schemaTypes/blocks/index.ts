import { cta } from './cta';
import { dynamicIntro } from './dynamicIntro';
import { hero } from './hero';
import { carouselField, imageCarousel } from './image-carousel';
import { splitForm } from './split-form';

export const pagebuilderBlocks = [
  hero,
  cta,
  splitForm,
  imageCarousel,
  dynamicIntro,
];

export const blocks = [...pagebuilderBlocks, carouselField];
