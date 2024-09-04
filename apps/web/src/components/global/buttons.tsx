import Link from 'next/link';
import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '~/lib/utils';
import type { SanityButton, SanityButtons } from '~/types';
import { Button, type ButtonProps } from '../ui/button';
import { SanityIcon } from './sanity-icon';

export type ButtonsProps = {
  buttons?: SanityButtons | null;
  wrapperProps?: ComponentPropsWithoutRef<'div'>;
} & ButtonProps;

const SanityLinkButton: FC<{ button: SanityButton } & ButtonProps> = ({
  button,
  ...props
}) => {
  const { buttonText, url, variant, icon } = button ?? {};
  // if param carry over needed
  // const search = useSearchParams();
  // const query = search.toString();
  // const param = query ? `?${query}` : '';

  if (!url?.href) {
    return <Button variant={'destructive'}>Link Broken</Button>;
  }
  return (
    <Link href={url.href} target={url.openInNewTab ? '_blank' : '_self'}>
      <Button {...props} variant={variant}>
        {icon?.svg && <SanityIcon icon={icon} className="size-7" />}
        {buttonText}
      </Button>
    </Link>
  );
};

export const Buttons: FC<ButtonsProps> = ({
  buttons,
  wrapperProps,
  ...props
}) => {
  if (!Array.isArray(buttons)) return <></>;
  return (
    <div
      {...wrapperProps}
      className={cn('flex w-full items-center gap-4', wrapperProps?.className)}
    >
      {buttons.map((button) => (
        <SanityLinkButton button={button} key={button._key} {...props} />
      ))}
    </div>
  );
};
