import { PageBuilderBlock } from '~/components/global/pagebuilder';
import type { GetMainPageDataQueryResult, PageBuilder } from '~/sanity.types';
import type { PageComponentProps } from '~/types';

export function MainPageComponent({
  data,
}: PageComponentProps<GetMainPageDataQueryResult>) {
  const { pageBuilder, _id, _type } = data ?? {};
  return (
    <main>
      <PageBuilderBlock
        pageBuilder={pageBuilder as PageBuilder}
        id={_id}
        type={_type}
      />
    </main>
  );
}
