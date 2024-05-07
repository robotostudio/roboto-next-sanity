import { FieldGroupDefinition } from 'sanity';
import {
  ComposeIcon,
  SearchIcon,
  InsertAboveIcon,
  BlockElementIcon,
  InlineElementIcon,
} from '@sanity/icons';

export const CONST = {
  SEO: 'seo',
  MAIN_CONTENT: 'main-content',
  CARD: 'card',
  RELATED: 'related',
  OG: 'og',
} as const;

export const GROUPS: FieldGroupDefinition[] = [
  // { name: CONST.MAIN_CONTENT, default: true },
  {
    name: CONST.MAIN_CONTENT,
    icon: ComposeIcon,
    title: `Content`,
    default: true,
  },
  { name: CONST.SEO, icon: SearchIcon, title: 'SEO' },
  { name: CONST.OG, icon: InsertAboveIcon, title: 'Open Graph' },
  { name: CONST.CARD, icon: BlockElementIcon, title: 'Card' },
  { name: CONST.RELATED, icon: InlineElementIcon, title: 'Related' },
];

