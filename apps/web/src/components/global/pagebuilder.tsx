/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDataAttribute } from 'next-sanity';
import { draftMode } from 'next/headers';
import type { ComponentType } from 'react';
import type { PageBuilder } from '~/sanity.types';
import { CtaBlock } from '../blocks/cta';
import { HeroBlock } from '../blocks/hero';
import { ImageCarouselBlock } from '../blocks/image-carousel';
import { SplitFormBlock } from '../blocks/split-form';
import type { Maybe } from '~/types';

interface PageBuilderBlockProps<T> {
  pageBuilder?: T | null;
  id?: Maybe<string>;
  type?: Maybe<string>;
}

type BlockType = PageBuilder[number]['_type'];

function BlockNotFound({ _type }: { _type: string }) {
  return (
    <div className="grid place-items-center" role="alert">
      Block Not Found: {_type}
    </div>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const BLOCK_COMPONENTS: Record<BlockType, ComponentType<any>> = {
  cta: CtaBlock,
  hero: HeroBlock,
  splitForm: SplitFormBlock,
  imageCarousel: ImageCarouselBlock,
} as const;

function renderBlock(
  block: PageBuilder[number],
  draftModeEnabled: boolean,
  id?: Maybe<string>,
  type?: Maybe<string>,
) {
  const Component = BLOCK_COMPONENTS[block._type] ?? BlockNotFound;

  if (!draftModeEnabled || !id || !type) {
    return <Component key={block._key} {...block} />;
  }

  const sanityAttribute = createDataAttribute({
    id,
    type,
    path: `pageBuilder[_key=="${block._key}"]`,
  });

  return (
    <div key={block._key} data-sanity={sanityAttribute()}>
      <Component {...block} />
    </div>
  );
}

export async function PageBuilderBlock({
  pageBuilder,
  id,
  type,
}: PageBuilderBlockProps<PageBuilder>) {
  if (!Array.isArray(pageBuilder) || pageBuilder.length === 0) {
    return null;
  }

  const { isEnabled: draftModeEnabled } = await draftMode();

  return (
    <section className="flex flex-col gap-4">
      {pageBuilder.map((block) =>
        renderBlock(block, draftModeEnabled, id, type),
      )}
    </section>
  );
}
