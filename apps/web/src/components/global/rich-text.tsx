import {
  PortableText,
  type PortableTextComponentProps,
  type PortableTextMarkComponentProps,
  type PortableTextProps,
  type PortableTextReactComponents,
} from '@portabletext/react';
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { cn } from '~/lib/utils';
import type { ProcessedUrl, SanityImageAsset } from '~/types';
import { SanityImage } from './sanity-image';

// Types
interface RichTextProps {
  value?: PortableTextProps['value'] | null;
  className?: string;
}

// Constants
const BASE_PROSE_STYLES = 'prose-slate prose-headings:scroll-m-24 prose-headings:font-bold prose-headings:text-opacity-90 prose-p:text-opacity-80 prose-a:underline prose-a:decoration-dotted prose-ol:list-decimal prose-ol:text-opacity-80 prose-ul:list-disc prose-ul:text-opacity-80';

// Components
const CustomLink: FC<
  PortableTextMarkComponentProps<{
    _type: 'customLink';
    customLink?: ProcessedUrl;
  }>
> = ({ children, value }) => {
  const { href, openInNewTab } = value?.customLink ?? {};
  
  if (!href) return <span className="text-red-500">Link Broken</span>;
  
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

const ImageComponent = ({
  value,
}: PortableTextComponentProps<SanityImageAsset>) => (
  <div className="my-4">
    <SanityImage image={value} className="rounded-xl" />
  </div>
);

// Rich Text Components Configuration
const richTextComponents: PortableTextReactComponents = {
  // Handle unknown components gracefully
  unknownList: () => null,
  unknownListItem: () => null,
  unknownMark: () => null,
  unknownType: () => null,
  unknownBlockStyle: () => null,
  hardBreak: () => <br />,

  // Block styles
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    inline: ({ children }) => <span>{children}</span>,
  },

  // Custom types
  types: {
    image: ImageComponent,
  },

  // Custom marks
  marks: {
    customLink: CustomLink,
  },

  // List styles
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

// Shared Rich Text Wrapper Component
const RichTextWrapper: FC<
  RichTextProps & { size?: 'default' | 'large' | 'native' }
> = ({ value, className, size = 'default' }) => {
  if (!Array.isArray(value)) return null;

  const sizeStyles = {
    default: 'prose',
    large: 'prose-lg',
    native: '',
  };

  return (
    <div
      className={cn(
        size !== 'native' && [sizeStyles[size], BASE_PROSE_STYLES],
        className,
      )}
    >
      <PortableText
        onMissingComponent={(_args, { type }) => {
          console.warn('Missing Portable Text component:', type);
          return null;
        }}
        components={richTextComponents}
        value={value}
      />
    </div>
  );
};

// Exported Components
export const RichText: FC<RichTextProps> = (props) => (
  <RichTextWrapper {...props} className="" size="large" />
);

export const ArticleRichText: FC<RichTextProps> = (props) => (
  <RichTextWrapper {...props} className="" size="default" />
);

export const PortableRichTextNative: FC<RichTextProps> = (props) => (
  <RichTextWrapper {...props} size="native" className="" />
);
