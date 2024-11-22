import Link from 'next/link';
import type { FC } from 'react';
import { ArticleRichText } from '~/components/global/rich-text';
import { SanityImage } from '~/components/global/sanity-image';
import type {
  GetBlogIndexDataQueryResult,
  GetBlogPageDataQueryResult,
} from '~/sanity.types';
import type { PageComponentProps } from '~/types';

// Shared type for blog data
type Blog = GetBlogIndexDataQueryResult['blogs'][number];

export type BlogIndexPageProps =
  PageComponentProps<GetBlogIndexDataQueryResult>;

// Simplified BlogIndexPage component
export const BlogIndexPage: FC<BlogIndexPageProps> = ({ data }) => (
  <main>
    <BlogGrid blogs={data?.blogs ?? []} />
  </main>
);

export type BlogGridProps = {
  blogs: Blog[];
};

// Improved BlogGrid with semantic HTML and consistent spacing
export const BlogGrid: FC<BlogGridProps> = ({ blogs }) => {
  if (!blogs.length) return null;

  return (
    <section className="my-16 px-4 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Our Latest Blog</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type BlogCardProps = {
  blog: Blog;
};

// Optimized BlogCard with better accessibility and layout
export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const { title, image, slug, description } = blog ?? {};

  if (!slug) return null;

  return (
    <article className="group flex flex-col items-center">
      <Link href={slug} className="w-full">
        {image && (
          <div className="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-[1.02]">
            <SanityImage
              image={image}
              className="aspect-video w-full object-cover"
              width={800}
              height={450}
              loading="eager"
            />
          </div>
        )}
        <h2 className="mt-4 text-center text-lg font-bold transition-colors group-hover:text-blue-600">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-2 line-clamp-2 max-w-xs text-center text-sm text-gray-600">
            {description}
          </p>
        )}
      </Link>
    </article>
  );
};

export type BlogSlugPageProps = PageComponentProps<GetBlogPageDataQueryResult>;

// Enhanced BlogSlugPage with better semantics and responsive design
export const BlogSlugPage: FC<BlogSlugPageProps> = ({ data }) => {
  const { richText, title, image, description, _createdAt } = data ?? {};

  return (
    <main className="animate-fade-up my-16 px-4 lg:px-0">
      <article className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          {_createdAt && (
            <time
              dateTime={new Date(_createdAt).toISOString()}
              className="mb-2 block text-sm text-gray-600"
            >
              {new Date(_createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          <h1 className="animate-fade-up mb-4 text-balance text-4xl font-bold md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {description}
            </p>
          )}
        </header>

        {image && (
          <figure className="mb-16">
            <SanityImage
              image={image}
              width={1200}
              height={600}
              loading="eager"
              className="w-full rounded-lg shadow-2xl"
            />
          </figure>
        )}

        {/* <div className="prose prose-lg mx-auto w-full max-w-3xl"> */}
        <ArticleRichText value={richText} className="mx-auto max-w-5xl" />
        {/* </div> */}
      </article>
    </main>
  );
};
