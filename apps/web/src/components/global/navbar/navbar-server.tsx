import { FC } from 'react';
import { getNavbarData } from './navbar-api';
import { NavbarClient } from './navbar.client';

export const Navbar: FC = async () => {
  const [data, error] = await getNavbarData();
  if (error || !data) {
    return <div>Error</div>;
  }
  return <NavbarClient data={data} />;
};
