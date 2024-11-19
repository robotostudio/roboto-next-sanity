'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PreviewBar = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-2 left-0 right-0 z-10 px-2 md:bottom-4 md:px-4 ">
      <div className="mx-auto max-w-2xl rounded-md border border-white border-opacity-5 bg-[#12061F33] p-4 backdrop-blur-[10px]">
        <div className="flex ">
          <div />
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-slate-700">
              You are currently viewing the website in preview mode.
            </p>

            <Link
              className="mt-3 text-sm  text-opacity-80 md:ml-6 md:mt-0"
              href={`/api/disable-draft?slug=${path}`}
              prefetch={false}
            >
              Click here to exit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
