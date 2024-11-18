import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainPageComponent } from "~/components/pages/main-page";
import {
	getAllMainPageTranslations,
	getMainPageData,
} from "~/components/pages/main-page/main-page-api";
import type { Locale } from "~/config";
import { getMetaData } from "~/lib/seo";

type PageParams = {
	params: Promise<{ locale: Locale }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateStaticParams = async () => {
	const [slugs, err] = await getAllMainPageTranslations();
	if (err || !slugs) return [];
	const locales = slugs.filter(Boolean) as string[];
	return locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (props: PageParams): Promise<Metadata> => {
    const params = await props.params;
    const [data, err] = await getMainPageData(params.locale);
    if (!data || err) return {};
    return getMetaData(data);
};

export default async function Page(props: PageParams) {
    const params = await props.params;
    const [data, err] = await getMainPageData(params.locale);
    if (!data || err) return notFound();
    return <MainPageComponent data={data} />;
}
