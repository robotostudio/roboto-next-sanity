import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogSlugPage } from "~/components/pages/blog-page";
import {
	getAllBlogsPaths,
	getBlogPageData,
} from "~/components/pages/blog-page/blog-page-api";
import type { Locale } from "~/config";
import { getMetaData } from "~/lib/seo";

type PageParams = {
	params: { locale: Locale; slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () => {
	const blogs = await getAllBlogsPaths();
	return blogs;
};

export const generateMetadata = async ({
	params,
}: PageParams): Promise<Metadata> => {
	const [data, err] = await getBlogPageData(params.slug, params.locale);
	if (!data || err) return {};
	return getMetaData(data);
};

export default async function BlogPage({
	params,
}: PageParams) {
	const [data, err] = await getBlogPageData(params.slug, params.locale);
	if (!data || err) return notFound();
	return <BlogSlugPage data={data} />;
}
