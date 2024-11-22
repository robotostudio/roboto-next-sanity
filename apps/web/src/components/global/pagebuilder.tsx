/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDataAttribute } from 'next-sanity';
import { draftMode } from 'next/headers';
import type { ComponentType } from 'react';
import type { PageBuilder } from '~/sanity.types';
import { CtaBlock } from '../blocks/cta';
import { HeroBlock } from '../blocks/hero';
import { ImageCarouselBlock } from '../blocks/image-carousel';
import { SplitFormBlock } from '../blocks/split-form';
export type PageBuilderBlockProps<T> = {
  pageBuilder?: T | null;
  id?: string;
  type?: string;
};

type BlockTypeKeys = PageBuilder[number]['_type'];

export function BlockNotFound({ _type }: { _type: string }) {
  return (
    <div className="grid place-items-center">Block Not Found : {_type}</div>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Blocks: Record<BlockTypeKeys, ComponentType<any>> = {
  cta: CtaBlock,
  hero: HeroBlock,
  splitForm: SplitFormBlock,
  imageCarousel: ImageCarouselBlock,
};

export async function PageBuilderBlock({
  pageBuilder,
  id,
  type,
}: PageBuilderBlockProps<PageBuilder>) {
  if (!Array.isArray(pageBuilder)) return null;
  const { isEnabled } = await draftMode();
  return (
    <section className="flex flex-col gap-4">
      {pageBuilder.map((block) => {
        const Comp = Blocks[block._type] ?? BlockNotFound;
        if (id && type && isEnabled) {
          const attr = createDataAttribute({
            id,
            type,
            path: `pageBuilder[_key=="${block._key}"]`,
          });
          return (
            <div key={block._key} data-sanity={attr()}>
              <Comp {...block} />
            </div>
          );
        }
        return <Comp {...block} key={block._key} />;
      })}
    </section>
  );
}
