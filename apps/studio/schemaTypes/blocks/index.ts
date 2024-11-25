import { cta } from './cta';
import { hero } from './hero';
import { carouselField, imageCarousel } from './image-carousel';
import { splitForm } from './split-form';

export const pagebuilderBlocks = [hero, cta, splitForm, imageCarousel];

export const blocks = [...pagebuilderBlocks, carouselField];
