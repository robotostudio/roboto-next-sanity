import type { GetMainPageDataQueryResult } from '~/sanity.types';
import type { PageComponentProps } from '~/types';

export default function MainPageComponent({
  data,
}: PageComponentProps<GetMainPageDataQueryResult>) {
  const { title } = data ?? {};
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}
