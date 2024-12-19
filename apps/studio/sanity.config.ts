import { defineConfig, type TemplateResolver } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { defaultDocumentNode, structure } from "./structure";
import { assist } from "@sanity/assist";
import { documentInternationalization } from "@sanity/document-internationalization";
import { media } from "sanity-plugin-media";
import { iconPicker } from "sanity-plugin-icon-picker";
import { internationalizedDocuments } from "./schemaTypes/documents";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { resolve } from "./resolve-presentation-document";
import { presentationUrl } from "./plugin/presentation-url";
import { getFlag } from "./utils/helper";

const template: TemplateResolver = (prev) => {
	const _internalizedDocs = internationalizedDocuments.map((doc) => `${doc}`);
	const filtered = prev
		.filter((template) => !_internalizedDocs.includes(template.id))
		.map((template) => {
			return {
				...template,
				...(template?.value?.language && {
					title: `${getFlag(template.value.language)} ${template.title}`,
				}),
			};
		});
	return [...filtered];
};

export default defineConfig({
	name: "default",
	title: "roboto-next-sanity",
	projectId: "hlsgi7fv",
	dataset: "production",

	plugins: [
		structureTool({
			structure,
			defaultDocumentNode,
		}),
		visionTool(),
		assist({
			translate: {
				document: {
					languageField: "language",
				},
			},
		}),
		unsplashImageAsset(),
		presentationUrl(),
		media(),
		iconPicker(),
		presentationTool({
			resolve: resolve,
			previewUrl: {
				origin:
					window.location.hostname === "localhost"
						? "http://localhost:3000"
						: "https://template.roboto.studio",
				previewMode: {
					enable: "/api/presentation-draft",
				},
			},
		}),
		documentInternationalization({
			schemaTypes: internationalizedDocuments,
			supportedLanguages: [
				{ id: "en-US", title: "English (US)" },
				{ id: "en-GB", title: "English (UK)" },
				{ id: "de", title: "German" },
				{ id: "fr", title: "French" },
			],
		}),
	],

	document: {
		newDocumentOptions: (prev, { creationContext }) => {
			const { type } = creationContext;
			if (type === "global") return [];
			return prev;
		},
	},
	scheduledPublishing: {
		enabled: false,
	},
	schema: {
		types: schemaTypes,
		templates: template,
	},
});
