import { handleErrors } from '~/lib/helper';
import { getNavbarData } from './navbar-api';

export default async function NavbarComponent() {
  const [result, error] = await handleErrors(getNavbarData());
  if (error || !result) return null;
  const { data } = result ?? {};
  return <div>{data?.title}</div>;
}
