'use client';

import { ChevronDownIcon, MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';
import { SanityButtons } from '~/components/global/sanity-button';
import { SanityIcon } from '~/components/global/sanity-icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { useIsMobile } from '~/hooks/use-is-mobile';
import { cn } from '~/lib/utils';
import type { GetNavbarDataQueryResult } from '~/sanity.types';
import type { PageComponentProps } from '~/types';

type NavItem = NonNullable<
  NonNullable<GetNavbarDataQueryResult>['links']
>[number];

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  icon?: { svg?: string | null } | null;
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, icon, href, children, ...props }, ref) => (
    <li>
      <Link
        href={href}
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 hover:bg-accent">
          {icon?.svg && <SanityIcon icon={icon} />}
          <div>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </div>
      </Link>
    </li>
  ),
);
ListItem.displayName = 'ListItem';

function NavItemComponent({ data }: { data: NavItem }) {
  const { _type, title } = data;

  if (_type === 'navLink') {
    const { href, openInNewTab } = data?.url ?? {};
    if (!href) return null;

    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          href={href}
          className={navigationMenuTriggerStyle()}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {data.columns?.map((item) => (
            <ListItem
              key={item._key}
              title={item.title ?? ''}
              href={item?.url?.href ?? '#'}
              icon={item?.icon}
            >
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function MobileNav({ data }: PageComponentProps<GetNavbarDataQueryResult>) {
  const { buttons, links, logo } = data ?? {};
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => setIsOpen(false), []);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="md:hidden" aria-label="Menu">
        <MenuIcon aria-label="Menu icon" />
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent>
          <DrawerHeader className="flex justify-between">
            <Link href="/" onClick={handleClose}>
              {logo && (
                <Image src={logo} alt="Logo" width={80} height={40} priority />
              )}
            </Link>
            <DrawerClose asChild>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <div className="mt-6 flex flex-col pl-4">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col items-start gap-4">
                {links?.map((link) =>
                  link._type === 'navLink' ? (
                    <Link
                      key={link._key}
                      href={link?.url?.href ?? '#'}
                      className="!ml-0"
                      onClick={handleClose}
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <Accordion
                      key={link._key}
                      type="single"
                      collapsible
                      className="!ml-0"
                    >
                      <AccordionItem value={link._key}>
                        <AccordionTrigger className="flex items-center gap-2">
                          {link.title} <ChevronDownIcon className="h-4 w-4" />
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="ml-4 mt-4 flex flex-col items-start gap-4">
                            {link.columns?.map((column) => (
                              <li key={column._key}>
                                <Link
                                  href={column?.url?.href ?? '#'}
                                  onClick={handleClose}
                                >
                                  {column.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <DrawerFooter>
            <SanityButtons buttons={buttons} />
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

function DesktopNav({ data }: PageComponentProps<GetNavbarDataQueryResult>) {
  const { buttons, links } = data ?? {};

  return (
    <>
      <div className="flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {links?.map((link) => (
              <NavItemComponent data={link} key={link._key} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        <SanityButtons buttons={buttons} />
      </div>
    </>
  );
}

export function NavbarClient({
  data,
}: PageComponentProps<GetNavbarDataQueryResult>) {
  const { logo } = data ?? {};
  const isMobile = useIsMobile();

  return (
    <nav className="mx-auto flex w-full max-w-6xl justify-between bg-white/90 p-4 px-4 backdrop-blur-2xl md:grid md:grid-cols-3 md:px-6">
      <div className="flex items-center">
        {logo && (
          <Link href="/">
            <Image
              src={logo}
              className="h-auto"
              alt="Logo"
              width={80}
              height={40}
              priority
            />
          </Link>
        )}
      </div>
      {isMobile ? <MobileNav data={data} /> : <DesktopNav data={data} />}
    </nav>
  );
}
