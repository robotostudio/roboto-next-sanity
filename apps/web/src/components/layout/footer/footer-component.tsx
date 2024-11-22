import { handleErrors } from '~/lib/helper';
import { getFooterData } from './footer-api';

import Link from 'next/link';
import type { GetFooterDataQueryResult } from '~/sanity.types';
import type { PageComponentProps } from '~/types';





export function FooterSkeleton() {
  return (
    <footer className="animate-pulse bg-primary">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pb-6">
              <div className="h-4 w-24 rounded bg-slate-300/20" />
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10" />
        <div className="mx-auto mt-10 h-4 w-64 rounded bg-slate-300/20" />
      </div>
    </footer>
  );
}

export function FooterClient({
  data,
}: PageComponentProps<GetFooterDataQueryResult>) {
  const { links } = data ?? {};
  return (
    <footer className="bg-primary">
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
        <div className="mt-10 flex justify-center space-x-10" />
        <p className="mt-10 text-center text-xs leading-5 text-slate-200">
          &copy; 2020 Roboto Studio, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default async function FooterComponent() {
  const [result, error] = await handleErrors(getFooterData());
  if (error || !result) return null;
  const { data } = result ?? {};
  return <FooterClient data={data} />;
}
