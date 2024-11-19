import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";
import type { Maybe, SanityButton } from "~/types";
import { Button, type ButtonProps } from "../ui/button";
import { SanityIcon } from "./sanity-icon";

export type ButtonsProps = {
	buttons?: Maybe<Array<SanityButton>>;
	wrapperProps?: ComponentPropsWithoutRef<"div">;
} & ButtonProps;

const SanityLinkButton = ({
	button,
	...props
}: { button: SanityButton } & ButtonProps) => {
	const { buttonText, url, variant, icon } = button ?? {};
	if (!url?.href || url?.href === "#")
		return <Button variant={"destructive"}>Link Broken</Button>;
	return (
		<Link href={url.href} target={url.openInNewTab ? "_blank" : "_self"}>
			<Button {...props} variant={variant ?? "default"}>
				{icon?.svg && <SanityIcon icon={icon} className="size-7" />}
				{buttonText}
			</Button>
		</Link>
	);
};

export const Buttons = ({ buttons, wrapperProps, ...props }: ButtonsProps) => {
	if (!Array.isArray(buttons)) return <></>;
	return (
		<div
			{...wrapperProps}
			className={cn("flex w-full items-center gap-4", wrapperProps?.className)}
		>
			{buttons.map((button, index) => (
				<SanityLinkButton button={button} {...props} key={button?._key} />
				// <Fragment key={`${button?._key}-button-${index}`}>
				// {button && <SanityLinkButton button={button} {...props} />}
				// </Fragment>
			))}
		</div>
	);
};
