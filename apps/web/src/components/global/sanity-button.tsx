import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '~/lib/utils';
import type { Maybe, SanityButtonProps } from '~/types';
import { Button, type ButtonProps } from '../ui/button';
import { SanityIcon } from './sanity-icon';

interface SanityLinkButtonProps extends ButtonProps {
  button: SanityButtonProps;
}

interface ButtonsProps extends ButtonProps {
  buttons?: Maybe<Array<SanityButtonProps>>;
  wrapperProps?: ComponentPropsWithoutRef<'div'>;
}

function SanityLinkButton({ button, ...props }: SanityLinkButtonProps) {
  const { buttonText, url, variant = 'default', icon } = button ?? {};

  if (!url?.href || url.href === '#') {
    return <Button variant="destructive">Link Broken</Button>;
  }

  const linkProps = {
    href: url.href,
    target: url.openInNewTab ? '_blank' : '_self',
    rel: url.openInNewTab ? 'noopener noreferrer' : undefined,
  };

  return (
    <Link {...linkProps}>
      <Button {...props} variant={variant}>
        {icon?.svg && <SanityIcon icon={icon} className="size-7" />}
        {buttonText}
      </Button>
    </Link>
  );
}

export function SanityButtons({
  buttons,
  wrapperProps,
  ...props
}: ButtonsProps) {
  if (!buttons?.length) {
    return null;
  }

  return (
    <div
      {...wrapperProps}
      className={cn('flex w-full items-center gap-4', wrapperProps?.className)}
    >
      {buttons.map(
        (button) =>
          button && (
            <SanityLinkButton key={button._key} button={button} {...props} />
          ),
      )}
    </div>
  );
}
