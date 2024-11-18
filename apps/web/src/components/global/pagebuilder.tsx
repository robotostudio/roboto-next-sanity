import { createDataAttribute } from 'next-sanity';
import type { FC } from 'react';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Blocks: Record<BlockTypeKeys, FC<any>> = {
  hero: HeroBlock,
  cta: CtaBlock,
  // dynamicIntro: DynamicIntroBlock,
  splitForm: SplitFormBlock,
  imageCarousel: ImageCarouselBlock,
};

const BlockNotFound: FC<{ _type: string }> = ({ _type }) => {
  return (
    <div className="grid place-items-center">Block Not Found : {_type}</div>
  );
};

export const PageBuilderBlock: FC<PageBuilderBlockProps<PageBuilder>> = ({
  pageBuilder,
  id,
  type,
}) => {
  if (!Array.isArray(pageBuilder)) return null;
  // const isEnabled = (draftMode() as unknown as UnsafeUnwrappedDraftMode).isEnabled;
  const isEnabled = false;
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
              <Comp {...block}  />
            </div>
          );
        }
        return <Comp {...block} key={block._key} />;
      })}
    </section>
  );
};
