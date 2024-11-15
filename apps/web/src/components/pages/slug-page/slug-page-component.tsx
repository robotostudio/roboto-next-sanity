import type { FC } from 'react';
import { PageBuilderBlock } from '~/components/global/pagebuilder';
import type { GetSlugPageDataQueryResult, PageBuilder } from '~/sanity.types';
import type { PageComponentProps } from '~/types';

export type SlugPageProps = PageComponentProps<GetSlugPageDataQueryResult>;

export const SlugPage: FC<SlugPageProps> = ({ data }) => {
  const { pageBuilder ,_id,_type} = data ?? {};
  return (
    <main>
      {Array.isArray(pageBuilder) && (
        <PageBuilderBlock id={_id} type={_type} pageBuilder={pageBuilder as unknown as PageBuilder} />
      )}
    </main>
  );
};
