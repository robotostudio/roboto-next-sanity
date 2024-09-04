import type { FC } from 'react';
import type { PageComponentProps } from '~/types';

import { PageBuilderBlock } from '~/components/global/pagebuilder';
import type { GetMainPageDataQueryResult, PageBuilder } from '~/sanity.types';

export type MainPageComponentProps =
  PageComponentProps<GetMainPageDataQueryResult>;

export const MainPageComponent: FC<MainPageComponentProps> = ({ data }) => {
  const { pageBuilder } = data ?? {};
  return (
    <main>
      <PageBuilderBlock pageBuilder={pageBuilder as unknown as PageBuilder} />
    </main>
  );
};
