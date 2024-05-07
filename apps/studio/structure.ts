import {
  BookMarked,
  Building2,
  ClipboardType,
  File,
  FileText,
  Footprints,
  HomeIcon,
  LucideIcon,
  Menu,
  Settings,
  Split,
} from 'lucide-react';
import {
  DefaultDocumentNodeResolver,
  Divider,
  ListItem,
  ListItemBuilder,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/structure';
import { SchemaType, SingletonType } from './schemaTypes';
import { getTitleCase } from './utils/helper';
import { PreviewIFrame } from './components/preview';

type Base<T = SchemaType> = {
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

const previewTypes = ['page', 'blog', 'mainPage'];

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

// This function creates a single item in the list. It takes a StructureBuilder instance (S),
// a type, a title, and an icon as parameters. If the title or icon is not provided, it
// generates a default title or uses a default icon. It then returns a list item with the
// provided or generated title and icon, and a child document with a form view and the provided type.

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(
      S.document()
        .views([
          S.view.form(),
          ...(previewTypes.includes(type)
            ? [S.view.component(PreviewIFrame).options({}).title('Preview')]
            : []),
        ])
        .schemaType(type)
        .documentId(type),
    );
};

type CreateNestedList = {
  S: StructureBuilder;
  items: (ListItemBuilder | ListItem | Divider)[];
  title: NonNullable<Base['title']>;
  icon?: Base['icon'];
};

const createNestedList = ({ S, title, icon, items }: CreateNestedList) => {
  return S.listItem()
    .title(title)
    .icon(icon ?? Split)
    .child(S.list().title(title).items(items));
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
};

// This function creates a list item for an index. It takes a StructureBuilder instance (S),
// an index object, and a list object as parameters. It generates a title for the index and
// list if they are not provided, and uses a default icon if not provided. It then returns a
// list item with the generated or provided title and icon, and a child list with list items
// for the index and list.
const createIndexList = ({ S, index, list }: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);
  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? File)
    .child(
      S.list()
        .title(indexTitle)
        .items([
          S.listItem()
            .title(indexTitle)
            .icon(index.icon ?? File)
            .child(
              S.document()
                .views([S.view.form()])
                .schemaType(index.type)
                .documentId(index.type),
            ),
          S.documentTypeListItem(list.type)
            .title(`${listTitle}s`)
            .icon(list.icon ?? File),
        ]),
    );
};

type CreateList = {
  S: StructureBuilder;
} & Base;

// This function creates a list item for a type. It takes a StructureBuilder instance (S),
// a type, an icon, and a title as parameters. It generates a title for the type if not provided,
// and uses a default icon if not provided. It then returns a list item with the generated or
// provided title and icon.

const createList = ({ S, type, icon, title }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .title(newTitle)
    .icon(icon ?? File);
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) =>
  S.list()
    .title('Content')
    .items([
      createSingleTon({ S, type: 'mainPage', icon: HomeIcon }),
      S.divider(),
      createList({ S, type: 'page' }),
      // createList({ S, type: 'faq' }),
      createIndexList({
        S,
        index: { type: 'blogIndex', icon: BookMarked },
        list: { type: 'blog', icon: FileText },
      }),
      createList({ S, type: 'form', icon: ClipboardType }),
      createList({ S, type: 'marketingModal', icon: ClipboardType }),
      S.divider(),
      createNestedList({
        S,
        title: 'Settings',
        icon: Settings,
        items: [
          createSingleTon({ S, type: 'navbar', icon: Menu }),
          createSingleTon({ S, type: 'footer', icon: Footprints }),
          createSingleTon({ S, type: 'logo', icon: Building2 }),
        ],
      }),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  context,
) => {
  const { schemaType, documentId } = context ?? {};

  return S.document().views([
    S.view.form(),
    ...(previewTypes.includes(schemaType)
      ? [S.view.component(PreviewIFrame).options(context).title('Preview')]
      : []),
  ]);
};
