import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getAllSlugPagePaths,
	getSlugPageData,
} from "~/components/pages/slug-page/slug-page-api";
import { SlugPage } from "~/components/pages/slug-page/slug-page-component";
import type { Locale } from "~/config";
import { getMetaData } from "~/lib/seo";

type PageParams = {
	params: Promise<{ locale: Locale; slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateStaticParams = async () => {
	const slugs = await getAllSlugPagePaths();
	return slugs;
};

export const generateMetadata = async (props: PageParams): Promise<Metadata> => {
    const params = await props.params;
    const [data, err] = await getSlugPageData(params.slug, params.locale);
    if (err || !data) return {};
    return getMetaData(data);
};

export default async function Page(props: PageParams) {
    const params = await props.params;
    const { locale, slug } = params ?? {};
    const [data, err] = await getSlugPageData(slug, locale);

    if (err || !data) {
		return notFound();
	}
    return <SlugPage data={data} />;
}
