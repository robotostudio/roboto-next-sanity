import type { ComponentProps, FC } from 'react';
import { cn } from '~/lib/utils';

type IconProps = Omit<ComponentProps<'span'>, 'src'> & {
  icon?: {
    svg?: string | null;
  };
};

export const SanityIcon: FC<IconProps> = ({ icon, className, ...props }) => {
  const { svg } = icon ?? {};

  if (!svg) return <></>;

  return (
    <span
      {...props}
      className={cn('flex size-12 items-center justify-center', className)}
      dangerouslySetInnerHTML={{ __html: svg ?? '' }}
    />
  );
};
