import { defineArrayMember, defineType } from 'sanity';
import { pagebuilderBlocks } from '../blocks';

export const pagebuilderBlockTypes = pagebuilderBlocks.map(({ name }) => ({
  type: name,
}));

export const pageBuilder = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: pagebuilderBlockTypes.map((block) => defineArrayMember(block)),
});
