import {
  Box,
  Button,
  Card,
  Flex,
  Spinner,
  Text,
  ThemeProvider,
} from '@sanity/ui';
import { type ComponentProps, useRef, useState, memo } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import type { UserViewComponent } from 'sanity/structure';
import { usePreviewIframe } from '../hooks/usePreviewIframe';

interface PreviewErrorProps {
  errors: string[] | undefined;
}

const PreviewError = memo(({ errors }: PreviewErrorProps) => (
  <Flex direction="column" padding={5} align="center" justify="center" gap={2}>
    <Text>There are validation errors in this document.</Text>
    <Text>Kindly resolve these first</Text>
    <ul>
      {errors?.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  </Flex>
));

PreviewError.displayName = 'PreviewError';

const LoadingState = memo(() => (
  <Flex padding={5} align="center" justify="center">
    <Spinner />
  </Flex>
));

LoadingState.displayName = 'LoadingState';

const NoPreviewState = memo(() => (
  <Flex padding={5} align="center" justify="center">
    <Text>No preview URL found</Text>
  </Flex>
));

NoPreviewState.displayName = 'NoPreviewState';

interface PreviewHeaderProps {
  previewUrl: string;
  onReload: () => void;
}

const PreviewHeader = memo(({ previewUrl, onReload }: PreviewHeaderProps) => (
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
          onClick={onReload}
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
));

PreviewHeader.displayName = 'PreviewHeader';

export const PreviewIFrame = memo((props: ComponentProps<UserViewComponent>): JSX.Element => {
  const { document, documentId, schemaType } = props;
  const [id, setId] = useState(1);
  const iframe = useRef<HTMLIFrameElement>(null);

  const { hasErrors, loading, previewUrl, errors } = usePreviewIframe({
    ctx: { documentId, schemaType: schemaType.name },
    document: document.displayed,
  });

  const handleReload = () => {
    if (!iframe?.current) return;
    setId((prevId) => prevId + 1);
  };

  if (hasErrors) {
    return (
      <ThemeProvider>
        <PreviewError errors={errors} />
      </ThemeProvider>
    );
  }

  if (loading) {
    return (
      <ThemeProvider>
        <LoadingState />
      </ThemeProvider>
    );
  }

  if (!previewUrl) {
    return (
      <ThemeProvider>
        <NoPreviewState />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Flex direction="column" style={{ height: '100%' }}>
        <PreviewHeader previewUrl={previewUrl} onReload={handleReload} />
        <Card tone="transparent" padding={0} style={{ height: '100%' }}>
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <iframe
              key={id}
              ref={iframe}
              title="preview"
              style={{ width: '100%', height: '100%', maxHeight: '100%' }}
              src={previewUrl}
              referrerPolicy="origin-when-cross-origin"
              frameBorder={0}
            />
          </Flex>
        </Card>
      </Flex>
    </ThemeProvider>
  );
});

PreviewIFrame.displayName = 'PreviewIFrame';
