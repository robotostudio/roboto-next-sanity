'use client';
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextProps,
  PortableTextReactComponents,
} from '@portabletext/react';
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { cn } from '~/lib/utils';
import { ProcessedUrl, SanityImage as SanityImageProps } from '~/types';
import { SanityImage } from './sanity-image';

export const CustomLinkResolver: FC<
  PortableTextMarkComponentProps<{
    _type: 'customLink';
    customLink?: ProcessedUrl;
  }>
> = ({ children, value }) => {
  const { href, openInNewTab } = value?.customLink ?? {};
  if (!href) return <span>Link Broken</span>;
  return (
    <span className="underline underline-offset-2">
      <Link
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : ''}
      >
        {children}
      </Link>
    </span>
  );
};

const NextImageResolver = ({
  value,
}: PortableTextComponentProps<SanityImageProps>) => {
  return (
    <div className="my-4">
      <SanityImage image={value} className="rounded-xl" />
    </div>
  );
};

const nativeComponents: PortableTextReactComponents = {
  unknownList: () => <></>,
  unknownListItem: () => <></>,
  unknownMark: () => <></>,
  unknownType: () => <></>,
  unknownBlockStyle: () => <></>,
  hardBreak: () => <br />,
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    inline: ({ children }) => <span>{children}</span>,
  },
  types: {
    image: NextImageResolver,
  },
  marks: {
    customLink: CustomLinkResolver,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc px-8 py-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal px-8 py-2">{children}</ol>
    ),
    check: ({ children }) => (
      <ol className="list-inside px-8 py-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
    check: ({ children }) => (
      <li className="flex items-center gap-2">
        <CheckSquare /> {children}
      </li>
    ),
  },
};

type PortableRichTextProps = {
  value?: PortableTextProps['value'] | null;
  className?: string; // Added className prop
};

export const RichText: FC<PortableRichTextProps> = ({ value, className }) => {
  if (!Array.isArray(value)) return <></>;
  return (
    <div
      className={cn(
        `prose-lg prose-slate prose-headings:scroll-m-24 prose-headings:font-bold prose-headings:text-opacity-90 prose-p:text-opacity-80 prose-a:underline prose-a:decoration-dotted  prose-ol:list-decimal prose-ol:text-opacity-80 prose-ul:list-disc prose-ul:text-opacity-80`,
        className,
      )}
    >
      <PortableText
        onMissingComponent={(_args, { type }) => {
          console.log('missing components', type);
        }}
        components={nativeComponents}
        value={value}
      />
    </div>
  );
};

export const ArticleRichText: FC<PortableRichTextProps> = ({
  value,
  className,
}) => {
  if (!Array.isArray(value)) return <></>;
  return (
    <div
      className={cn(
        `prose prose-slate prose-headings:scroll-m-24 prose-headings:font-bold prose-headings:text-opacity-90 prose-p:text-opacity-80 prose-a:underline prose-a:decoration-dotted  prose-ol:list-decimal prose-ol:text-opacity-80 prose-ul:list-disc prose-ul:text-opacity-80`,
        className,
      )}
    >
      <PortableText
        onMissingComponent={(_args, { type }) => {
          console.log('missing components', type);
        }}
        components={nativeComponents}
        value={value}
      />
    </div>
  );
};

export const PortableRichTextNative: FC<PortableRichTextProps> = ({
  value,
  className, // Added className prop
}) => {
  if (!Array.isArray(value)) return <></>;
  return (
    <div className={className}>
      {' '}
      {/* Wrapped PortableText in a div with className */}
      <PortableText
        onMissingComponent={(...args) => {
          console.log('missing components', args);
        }}
        components={nativeComponents}
        value={value}
      />
    </div>
  );
};
