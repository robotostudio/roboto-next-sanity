import { handleErrors } from '~/lib/helper';
import { getNavbarData } from './navbar-api';
import { NavbarClient } from './navbar-client';

export async function NavbarComponent() {
  const [result, error] = await handleErrors(getNavbarData());
  if (error || !result) return null;
  const { data } = result ?? {};
  return <NavbarClient data={data} />;
}


