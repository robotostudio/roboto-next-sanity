import type { ComponentProps } from 'react';
import { cn } from '~/lib/utils';
import { memo } from 'react';

interface IconProps extends Omit<ComponentProps<'span'>, 'src'> {
  icon?: {
    svg?: string | null;
  };
}

export const SanityIcon = memo(function SanityIconUnmemorized({
  icon,
  className,
  ...props
}: IconProps) {
  const svg = icon?.svg;

  if (!svg) {
    return null;
  }

  return (
    <span
      {...props}
      className={cn('flex size-12 items-center justify-center', className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: svg }}
      role="img"
      aria-hidden="true"
    />
  );
});
