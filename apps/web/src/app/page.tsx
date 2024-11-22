import { Button } from '~/components/ui/button';
import { sanityFetch } from '~/lib/sanity/live';
import { getMainPageDataQuery } from '~/lib/sanity/queries';

export default async function Home() {
  const { data } = await sanityFetch({
    query: getMainPageDataQuery,
    params: {
      locale: 'en-GB',
    },
  });

  console.log(data);

  return (
    <main>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </main>
  );
}
