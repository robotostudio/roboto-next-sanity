import Link from 'next/link';
import { FC } from 'react';
import { GetFooterDataQueryResult } from '~/sanity.types';
import { PageComponentProps } from '~/types';

export const FooterClient: FC<PageComponentProps<GetFooterDataQueryResult>> = ({
  data,
}) => {
  const { links } = data ?? {};
  return (
    <footer className="bg-primary ">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {Array.isArray(links) &&
            links.map((link) => (
              <div key={link._key} className="pb-6">
                {link?.url?.href && (
                  <Link
                    href={link.url.href}
                    className="text-sm leading-6 text-slate-100 hover:text-slate-300"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10"></div>
        <p className="mt-10 text-center text-xs leading-5 text-slate-200">
          &copy; 2020 Roboto Studio, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
