import { FC } from 'react';
import { PageBuilderBlock } from '~/components/global/pagebuilder';
import { GetSlugPageDataQueryResult, PageBuilder } from '~/sanity.types';
import { PageComponentProps } from '~/types';

export type SlugPageProps = PageComponentProps<GetSlugPageDataQueryResult>;

export const SlugPage: FC<SlugPageProps> = ({ data }) => {
  const {  pageBuilder } = data ?? {};
  return (
    <main>
      {Array.isArray(pageBuilder) && (
        <PageBuilderBlock pageBuilder={pageBuilder as unknown as PageBuilder} />
      )}
    </main>
  );
};
