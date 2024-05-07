import {
  Box,
  Button,
  Card,
  Flex,
  Spinner,
  Text,
  ThemeProvider,
} from '@sanity/ui';
import { ComponentProps, useRef, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { UserViewComponent } from 'sanity/structure';
import { usePreviewIframe } from '../hooks/usePreviewIframe';




export function PreviewIFrame(
  props: ComponentProps<UserViewComponent>,
): JSX.Element {
  const { document, options, documentId, schemaType } = props;
  const [id, setId] = useState(1);
  const iframe = useRef<HTMLIFrameElement>(null);

  const { hasErrors, loading, previewUrl, errors } = usePreviewIframe({
    ctx: { documentId, schemaType: schemaType.name },
    document: document.displayed,
  });

  function handleReload() {
    if (!iframe?.current) return;
    setId(id + 1);
  }

  if (hasErrors) {
    return (
      <ThemeProvider>
        <Flex
          direction="column"
          padding={5}
          align="center"
          justify="center"
          gap={2}
        >
          <Text>There are validation errors in this document.</Text>
          <Text>Kindly resolve these first</Text>
          <ul>
            {errors?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Flex>
      </ThemeProvider>
    );
  }

  if (loading || !previewUrl)
    return (
      <ThemeProvider>
        <Flex padding={5} align="center" justify="center">
          {loading ? <Spinner /> : <Text>No preview URL found</Text>}
        </Flex>
      </ThemeProvider>
    );

  return (
    <ThemeProvider>
      <Flex direction="column" style={{ height: `100%` }}>
        <Card padding={2} borderBottom>
          <Flex align="center" gap={2}>
            <Box flex={1}>
              <Text size={0} textOverflow="ellipsis">
                {previewUrl}
              </Text>
            </Box>
            <Flex align="center" gap={1}>
              <Button
                fontSize={[1]}
                padding={2}
                icon={AiOutlineReload}
                title="Reload"
                text="Reload"
                aria-label="Reload"
                onClick={() => handleReload()}
              />

              <Button
                fontSize={[1]}
                icon={BiLinkExternal}
                padding={[2]}
                text="Open"
                tone="primary"
                onClick={() => window.open(previewUrl)}
              />
            </Flex>
          </Flex>
        </Card>
        <Card tone="transparent" padding={0} style={{ height: `100%` }}>
          <Flex align="center" justify="center" style={{ height: `100%` }}>
            <iframe
              key={id}
              ref={iframe}
              title="preview"
              style={{ width: '100%', height: `100%`, maxHeight: `100%` }}
              src={previewUrl}
              referrerPolicy="origin-when-cross-origin"
              frameBorder={0}
            />
          </Flex>
        </Card>
      </Flex>
    </ThemeProvider>
  );
}
