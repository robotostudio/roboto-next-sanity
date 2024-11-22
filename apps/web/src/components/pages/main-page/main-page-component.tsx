import { PageBuilderBlock } from '~/components/global/pagebuilder';
import type { GetMainPageDataQueryResult, PageBuilder } from '~/sanity.types';
import type { PageComponentProps } from '~/types';

export default function MainPageComponent({
  data,
}: PageComponentProps<GetMainPageDataQueryResult>) {
  const { pageBuilder } = data ?? {};
  return (
    <main>
      <PageBuilderBlock pageBuilder={pageBuilder as PageBuilder} />
    </main>
  );
}
