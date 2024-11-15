import type { FC } from 'react';
import type { PageComponentProps } from '~/types';

import { PageBuilderBlock } from '~/components/global/pagebuilder';
import type { GetMainPageDataQueryResult, PageBuilder } from '~/sanity.types';

export type MainPageComponentProps =
  PageComponentProps<GetMainPageDataQueryResult>;

export const MainPageComponent: FC<MainPageComponentProps> = ({ data }) => {
  const { pageBuilder ,_id,_type} = data ?? {};
  return (
    <main>
      <PageBuilderBlock id={_id} type={_type} pageBuilder={pageBuilder as unknown as PageBuilder} />
    </main>
  );
};
