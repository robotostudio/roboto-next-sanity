import type { ComponentProps } from 'react';
import { cn } from '~/lib/utils';

type IconProps = Pick<ComponentProps<'span'>, 'className'> & {
  icon?: {
    svg?: string | null;
  };
};

export const SanityIcon = ({ icon, className, ...props }: IconProps) => {
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
