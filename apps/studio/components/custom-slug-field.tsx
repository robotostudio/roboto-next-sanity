import { Button, Grid, Stack } from '@sanity/ui';
import { FC } from 'react';
import slugify from 'slugify';

import { Path, StringInputProps, set, useFormValue } from 'sanity';

const getPath = (path: Path) => {
  const _ = path.slice(0, -1);
  _.push('fieldName');
  return _;
};

export const CustomSlugField: FC<StringInputProps> = (props) => {
  const { renderDefault, onChange, path } = props ?? {};
  const _title = useFormValue(['title']);
  const _path = useFormValue(getPath(path));
  const title = _path ?? _title;
  const handleGenerateSlug = () => {
    if (title && typeof title === 'string') {
      const slug = slugify(title, {
        lower: true,
        remove: /[^a-zA-Z0-9 ]/g,
      });
      onChange(set(slug));
    }
  };
  return (
    <Grid columns={5} gap={2}>
      <Stack columnStart={1} columnEnd={5}>
        {renderDefault(props)}
      </Stack>
      <Button
        colSpan={2}
        text="Generate"
        disabled={!title || typeof title !== 'string'}
        onClick={handleGenerateSlug}
      />
    </Grid>
  );
};
